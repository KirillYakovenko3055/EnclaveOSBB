const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');
const crypto = require('crypto');
const axios = require('axios')
const stripe = require("stripe")(process.env.STRIPE_SECRET);

exports.getPayments = async (req, res) => {
  const { accountId } = req.params;
  try {
    const db2 = getDB();

    const paymentsCollection = await db2.collection('payments');

    const payments = await paymentsCollection.find({ personalAccountId: new ObjectId(accountId) }).toArray();

    res.json(payments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Ошибка получения активных услуг' });
  }
};

exports.createPayment = async (req, res) => {
  const { reason, price, accountId, saldoId } = req.body.body;

  const lineItems = [
    {
      price_data: {
        currency: "uah",
        product_data: {
          name: reason,
          images: []
        },
        unit_amount: Math.round(price * 100),
      },
      quantity: 1
    }
  ];

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:5173/user/finances",
      cancel_url: "http://localhost:5173/user/finances/debt",
      metadata: { reason, accountId, saldoId }
    });

    const paymentData = {
      type: reason,
      sum: price,
      personalAccountId: accountId,
      saldoId: saldoId,
      date: new Date(),
      stripeSessionId: session.id,
      status: 'pending'
    };

    const db = getDB();
    const paymentsCollection = db.collection('payments');
    await paymentsCollection.insertOne(paymentData); 

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    res.status(500).json({ error: "Failed to create payment session" });
  }
};

exports.webhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;

      let sessions;
      try {
        sessions = await stripe.checkout.sessions.list({
          limit: 1,
        });
      } catch (error) {
        console.error('Failed to list sessions:', error);
        return res.status(400).send('Failed to list sessions');
      }
      console.log(sessions.data[0].metadata);
      const sessionIds = sessions.data.map(session => session.id); 

      const db = getDB();
      const paymentData = {
        sum: paymentIntent.amount_received / 100,
        type: paymentIntent.metadata.reason,
        personalAccountId: paymentIntent.metadata.accountId,
        date: new Date(),
      };

      try {
        const paymentsCollection = db.collection('payments');
        
        const updateResult = await paymentsCollection.updateMany(
          { stripeSessionId: { $in: sessionIds } }, 
          { $set: { status: 'succeeded'} }
        );
        const saldoCollection = db.collection('saldos');
        await saldoCollection.deleteOne({
          _id: new ObjectId(sessions.data[0].metadata.saldoId)
        });
        console.log(`PaymentIntent was successful! Updated ${updateResult.modifiedCount} payments: ${JSON.stringify(paymentData)}`);
      } catch (error) {
        console.error('Failed to update payment:', error);
        return res.status(500).send('Failed to update payment');
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};

exports.getSpendings = async (req, res) => {
  const {accountId} = req.params;
  try {
    const db = getDB();
    const paymentsCollection = db.collection('payments');

    const payments = await paymentsCollection.find({personalAccountId: accountId}).toArray();

    res.json(payments);
  } catch (error) {
    console.error('Ошибка при получении платежей:', error);
    res.status(500).send('Ошибка сервера при получении платежей');
  }
};