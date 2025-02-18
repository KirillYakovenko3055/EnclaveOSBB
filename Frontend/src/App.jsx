import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import RegisterForm from './components/Auth/Register';
import LoginForm from './components/Auth/Login';
import VerifyCodeForm from './components/Auth/VerifyCodeForm';

import Navbar from "./components/Main/Header";
import Main from "./components/Main/Main";
import ScrollTop from "./components/Main/ScrollTop";
import Footer from "./components/Main/Footer";
import Error from './components/Error';
import PrivateRoute from './components/PrivateRoute';

import About from "./components/OSBB/About";
import FAQ from "./components/OSBB/FAQ";
import Contact from "./components/OSBB/Contact";
import Payment from "./components/OSBB/Payment";
import Tariphes from "./components/OSBB/Tariphes";


import Collections from "./components/Collections/Collections";
import CollProps from "./components/Collections/CollectionProps";
import CollList from "./components/Collections/CollectionList";

import Measurers from './components/Measurers/Measurers';
import AddMeasurerValue from './components/Measurers/AddMeasurerValue';

import Services from './components/Services/Services';

import Payments from './components/Money/Payments';
import FinancePage from "./components/Money/FinancePage";
import Spendings from "./components/Money/Spendings";
import Income from "./components/Money/Income";
import Debt from "./components/Money/Debt";

import AllVotings from "./components/Votings/AllVotings";
import Voting from "./components/Votings/Voting";
import VotingCheck from "./components/Votings/VotingCheck";
import CreateVoting from "./components/Votings/CreateVoting";

import ResidentDashboard from './components/User/ResidentDashboard';
import Neighbours from './components/User/Neighbours'; 
import AddResidents from "./components/Admin/addResidents";

import AccountDetails from './components/User/AccountDetails';
import Profile from "./components/User/Profile"
import Mydocs from "./components/User/Mydocs"
import OSBBdoc from "./components/User/OSBBdoc"
import Buydoc from "./components/User/Buydoc"
import Rentdoc from "./components/User/RentDoc"
import ChangeProfile from "./components/User/ChangeProfile";
import AddPersonalACcount from "./components/Admin/addPersonalAccount";
import PersonalAccountDetails from "./components/Admin/PersonalAccountDetails";

import OSBBList from "./components/Admin/OSBBList";
import OSBBDetails from "./components/Admin/OSBBDetails";
import AddOSBB from "./components/Admin/AddOSBB";
import AdminDashboard from "./components/Admin/AdminDashboard";

import AddSaldo from "./components/Admin/addSaldo";


import "./index.css";

const App = () => {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Router>
        <Navbar />
        <div style={{ flexGrow: "2", alignContent: "center" }}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="*" element={<Error />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/contacts" element={<Contact />}></Route>
            <Route path="/payment" element={<Payment />}></Route>
            <Route path="/tariphes" element={<Tariphes />}></Route>
            <Route path="/FAQ" element={<FAQ />}></Route>
            <Route path="/verify" element={<VerifyCodeForm />} />
            <Route path="/user/*" element={<PrivateRoute allowedRoles={['user', 'admin']}>
              <Routes>
                <Route path="*" element={<Error />}></Route>
                <Route index element={<ResidentDashboard />} />
                <Route path="mydocs" element={<Mydocs />} />
                <Route path="docRent" element={<Rentdoc />} />
                <Route path="docOSBB" element={<OSBBdoc />} />
                <Route path="docBuy" element={<Buydoc />} />
                <Route path="account/:accountId" element={<AccountDetails />} />
                <Route path="measurers" element={<Measurers />} />
                <Route path="add-measurer-data" element={<AddMeasurerValue />} />
                <Route path="services/:accountId" element={<Services />} />
                <Route path="payments/:accountId" element={<Payments />} />
                <Route path="votings" element={<AllVotings />} />
                <Route path="voting/:votingId" element={<Voting />} />
                <Route path="profile" element={<Profile />} />
                <Route path="/update-contact/:type" element={<ChangeProfile />} />
                <Route path="/finances" element={<FinancePage />} />
                <Route path="/finances/spendings" element={<Spendings />} />
                <Route path="/finances/debt" element={<Debt />} />
                <Route path="/finances/income" element={<Income />} />
                <Route path="/collections" element={<Collections />}></Route>
                <Route path="/collProps" element={<CollProps />}></Route>
                <Route path="/collList" element={<CollList />}></Route>
                <Route path="/neighbours" element={<Neighbours />} />
                <Route path="/checkvotings" element={<VotingCheck />} />
              </Routes>
            </PrivateRoute>} />
            <Route path="/admin/*" element={<PrivateRoute allowedRoles={['admin']}>
              <Routes>
                <Route index element={<AdminDashboard />} />
                <Route path="/:OSBBId" element={<OSBBDetails />} />
                <Route path="/OSBB-list" element={<OSBBList />} />
                <Route path="add-OSBB-data" element={<AddOSBB />} />
                <Route path="createvoting" element={<CreateVoting />} />
                <Route path="votingcheck/:votingId" element={<VotingCheck />} />
                <Route path="add-personal-account" element={<AddPersonalACcount />} />
                <Route path="add-Resident/:personalAccountId" element={<AddResidents />} />
                <Route path="personal-account/:personalAccountId" element={<PersonalAccountDetails />} />
                <Route path="personal-account/addSaldo/:personalAccountId" element={<AddSaldo />} />
              </Routes>
            </PrivateRoute>} />
          </Routes>
        </div>
        <Footer />
        <ScrollTop />
      </Router>
    </div>
  );
};

export default App;
