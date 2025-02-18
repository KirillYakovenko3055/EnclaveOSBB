require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const apiUrl = `${process.env.API_URL}/api/telegram`;
const userState = {};

function addUserState(chatId, stateData) {
  userState[chatId] = { ...stateData };
}

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

const helpText = `
/help - Показати список доступних команд.
/login - Увійти в систему, ввівши логін і пароль.
/accounts - Показати всі особові рахунки, а також вибрати особовий рахунок для перегляду інформації про нього.
/measurers - Показати список лічильників для вибраного особового рахунку і вибрати лічильник для перегляду інформації.
/services - Показати всі діючі сервіси.
`;

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Введіть команду /help для отримання інформації про всі команди");
});

bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, helpText);
});

bot.onText(/\/login/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Введіть ваш логін і пароль у форматі "<логін> <пароль>":');
  addUserState(chatId, { isLoggingIn: true, isAuthenticated: false });
});

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const userInput = msg.text;

  if (userInput.startsWith('/')) {
    return;
  }

  if (userState[chatId] && userState[chatId].isLoggingIn) {
    const [login, password] = userInput.split(' ');

    if (!login || !password) {
      bot.sendMessage(chatId, 'Невірний формат. Введіть логін і пароль у форматі "<логін> <пароль>".');
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/login`, { login, password });
      bot.sendMessage(chatId, `Код відправлено на вашу пошту (${response.data.email}). Введіть код для підтвердження.`);
      userState[chatId].isLoggingIn = false;
      userState[chatId].isVerifyingCode = true;
    } catch (error) {
      bot.sendMessage(chatId, 'Помилка при логіні: ' + error.response?.data?.message || 'Невідома помилка');
    }
  }
  else if (userState[chatId] && userState[chatId].isVerifyingCode) {
    const enteredCode = userInput;

    try {
      const response = await axios.post(`${apiUrl}/verify-code`, { chatId, code: enteredCode });
      bot.sendMessage(chatId, 'Успішна аутентифікація!');
      userState[chatId].isAuthenticated = true;
      userState[chatId].token = response.data.token;
      delete userState[chatId].isVerifyingCode;
    } catch (error) {
      bot.sendMessage(chatId, 'Помилка: ' + error.response?.data?.message || 'Невірний або прострочений код. Спробуйте ще раз.');
    }
  }
});

bot.onText(/\/accounts/, async (msg) => {
  const chatId = msg.chat.id;

  if (userState[chatId] && userState[chatId].isAuthenticated) {
    try {
      const response = await axios.get(`${apiUrl}/accounts/${chatId}`, {
        headers: { Authorization: `Bearer ${userState[chatId].token}` }
      });

      const accounts = response.data;

      if (accounts.length > 0) {
        const accountList = accounts.map((acc, index) => `${index + 1}. Особовий рахунок: ${acc.personalNumber}`).join('\n');
        bot.sendMessage(chatId, `Ваші особові рахунки:\n${accountList}`);
        userState[chatId].accounts = accounts;
        bot.sendMessage(chatId, 'Введіть порядковий номер особового рахунку, який хочете вибрати.');
        userState[chatId].isChoosingAccount = true;
      } else {
        bot.sendMessage(chatId, `У вас немає пов'язаних особових рахунків.`);
      }
    } catch (error) {
      bot.sendMessage(chatId, 'Помилка: ' + error.response?.data?.message || 'Невідома помилка');
    }
  } else {
    bot.sendMessage(chatId, 'Ви повинні пройти автентифікацію. Введіть команду /login.');
  }
});

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const userInput = msg.text;

  if (userInput.startsWith('/')) {
    return;
  }

  if (userState[chatId]?.isChoosingAccount) {
    const accountIndex = parseInt(userInput) - 1;

    if (isNaN(accountIndex) || !userState[chatId].accounts || !userState[chatId].accounts[accountIndex]) {
      bot.sendMessage(chatId, 'Невірний вибір. Введіть номер рахунку зі списку.');
      return;
    }

    const selectedAccount = userState[chatId].accounts[accountIndex];
    await bot.sendMessage(chatId, `Ви вибрали особовий рахунок: ${selectedAccount.personalNumber}`);

    userState[chatId].selectedAccount = selectedAccount._id;
    userState[chatId].selectedAccountNumber = selectedAccount.personalNumber;
    userState[chatId].isChoosingAccount = false;
  }
  else if (userState[chatId]?.isChoosingMeasurer) {
    const measurerIndex = parseInt(userInput) - 1;

    if (isNaN(measurerIndex) || !userState[chatId].measurers || !userState[chatId].measurers[measurerIndex]) {
      bot.sendMessage(chatId, 'Невірний вибір. Введіть номер лічильника зі списку.');
      return;
    }

    const selectedMeasurer = userState[chatId].measurers[measurerIndex];
    userState[chatId].selectedMeasurer = selectedMeasurer._id;
    await bot.sendMessage(chatId, `Ви вибрали лічильник: ${selectedMeasurer.service} (${selectedMeasurer.number})`);
    await bot.sendMessage(chatId, `Інформація про лічильник:
       Час дії: ${formatDate(new Date(selectedMeasurer.startDate))} - ${formatDate(new Date(selectedMeasurer.endDate))}
       Код виробника: ${selectedMeasurer.vendorCode}
       `);
    try {
      const response = await axios.get(`${apiUrl}/measurements/${selectedMeasurer._id}`, {
        headers: { Authorization: `Bearer ${userState[chatId].token}` }
      });

      const records = response.data;
      if (Array.isArray(records) && records.length > 0) {
        const sortedRecords = records.sort((a, b) => new Date(b.date) - new Date(a.date));

        const recordList = sortedRecords.map(record => {
          const recordDate = record.date ? new Date(record.date).toLocaleDateString() : 'Дата невідома';
          const recordValue = record.value !== undefined ? record.value : 'Показник невідомий';

          return `Дата: ${formatDate(new Date(recordDate))}, Показник: ${recordValue}`;
        }).join('\n');

        bot.sendMessage(chatId, `Записи лічильника:\n${recordList}`);
      }
      else {
        bot.sendMessage(chatId, `Записи не знайдені для лічильника ${selectedMeasurer.typeMeasurer.number}.`);
      }
    } catch (error) {
      bot.sendMessage(chatId, 'Помилка: ' + error.response?.data?.message || 'Невідома помилка');
    }
  }
});

bot.onText(/\/measurers/, async (msg) => {
  const chatId = msg.chat.id;

  if (userState[chatId] && userState[chatId].selectedAccount && userState[chatId].isAuthenticated) {
    try {
      const response = await axios.get(`${apiUrl}/measurers/${userState[chatId].selectedAccount}`, {
        headers: { Authorization: `Bearer ${userState[chatId].token}` }
      });

      const measurers = response.data;

      if (measurers.length > 0) {
        bot.sendMessage(chatId, 'Введіть порядковий номер лічильника, який хочете вибрати.');
        userState[chatId].isChoosingMeasurer = true;
        const measurerList = measurers.map((m, index) => `${index + 1}. ${m.service} (${m.number})`).join('\n');
        bot.sendMessage(chatId, `Лічильники для рахунку ${userState[chatId].selectedAccountNumber}:\n${measurerList}`);
        userState[chatId].measurers = measurers;
      } else {
        bot.sendMessage(chatId, `Лічильники не знайдені для особового рахунку ${userState[chatId].selectedAccountNumber}.`);
      }
    } catch (error) {
      bot.sendMessage(chatId, 'Помилка: ' + error.response?.data?.message || 'Невідома помилка');
    }
  } else {
    bot.sendMessage(chatId, 'Ви повинні вибрати особовий рахунок за допомогою команди /accounts.');
  }
});

bot.onText(/\/services/, async (msg) => {
  const chatId = msg.chat.id;

  if (userState[chatId] && userState[chatId].selectedAccount && userState[chatId].isAuthenticated) {
    try {
      const response = await axios.get(`${apiUrl}/services/${userState[chatId].selectedAccount}`, {
        headers: { Authorization: `Bearer ${userState[chatId].token}` }
      });

      const services = response.data;
      if (services.length > 0) {
        const serviceList = services.map((service, index) =>
`${index + 1}. ${service.serviceDetails.name} (початок: ${formatDate(new Date(service.startDate))}, закінчення: ${service.endDate ? formatDate(new Date(service.endDate)) : 'без закінчення'})`
        ).join('\n');

        bot.sendMessage(chatId, `Діючі послуги для рахунку ${userState[chatId].selectedAccountNumber}:\n${serviceList}`);
      } else {
        bot.sendMessage(chatId, `Немає діючих послуг для особового рахунку ${userState[chatId].selectedAccountNumber}.`);
      }
    } catch (error) {
      bot.sendMessage(chatId, 'Помилка: ' + error.response?.data?.message || 'Невідома помилка');
    }
  } else {
    bot.sendMessage(chatId, 'Ви повинні вибрати особовий рахунок за допомогою команди /accounts.');
  }
});


