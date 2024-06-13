import { Route, Routes } from "react-router-dom";
import AccountConfirm from "./view/confirm";
import Home from "./view/home";
// import Login from './view/login'
import UserTypeSelection from "./view/UserTypeSelection";
import SignupFormCustomer from "./view/SignupFormCustomer";
import SignupFormServiceProvider from "./view/SignupFormServiceProvider";
import LoginForm from "./view/LoginForm";
import Logout from "./view/logout";
import Profile from "./view/profile";
import Register from "./view/register";
import ResetPassword from "./view/reset";
import Footer from "./view/Footer";
import Navbar from "./view/Navbar";
import Birthday from "./view/Birthday.jsx";
import Concert from "./view/Concert";
import Contactus from "./view/Contactus";
import Event from "./view/Event";
import Wedding from "./view/Wedding";
import Graduation from "./view/Graduation";
import FAQ from "./view/FAQ";
import Funeral from "./view/Funeral";
import Aboutus from "./view/Aboutus";
import Dashboard from "./serviceproviders/Dashboard.jsx";
import ProfilePage from "./serviceproviders/Profile.jsx";
import Gallery from "./serviceproviders/Gallery.jsx";
import Check from "./Check.jsx";
import { UserProvider , useUser } from "./view/UserContext.jsx";










function App() {
  return (
    <div className="App">
      <UserProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/login" element={<UserTypeSelection />} />
        <Route path="/signin" element={<LoginForm />} />
        <Route path="/signup-customer" element={<SignupFormCustomer />} />
        <Route
          path="/signup-service-provider"
          element={<SignupFormServiceProvider />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/confirm" element={<AccountConfirm />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/Birthday" element={<Birthday />} />
        <Route path="/Concert" element={<Concert />} />
        <Route path="/Wedding" element={<Wedding />} />
        <Route path="/Event" element={<Event />} />
        <Route path="/Contactus" element={<Contactus />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/Funeral" element={<Funeral />} />
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/grad" element={<Graduation />} />
        <Route path="/check" element={<Check />} />
        <Route path="/Aboutus" element={<Aboutus />} />
      </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
