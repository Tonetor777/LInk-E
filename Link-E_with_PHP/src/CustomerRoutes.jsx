import { Route, Routes } from "react-router-dom";
import Home from "./view/home";
import UserTypeSelection from "./view/UserTypeSelection";
import SignupFormCustomer from "./view/SignupFormCustomer";
import SignupFormServiceProvider from "./view/SignupFormServiceProvider";
import LoginForm from "./view/LoginForm";
import Register from "./view/register";
import ResetPassword from "./view/reset";
import Profile from "./view/profile";
import Birthday from "./view/Birthday.jsx";
import Concert from "./view/Concert";
import Contactus from "./view/Contactus";
import Event from "./view/Event";
import Wedding from "./view/Wedding";
import Graduation from "./view/Graduation";
import FAQ from "./view/FAQ";
import Funeral from "./view/Funeral";
import Aboutus from "./view/Aboutus";

const CustomerRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/home" element={<Home />} />
    <Route path="/login" element={<UserTypeSelection />} />
    <Route path="/signin" element={<LoginForm />} />
    <Route path="/signup-customer" element={<SignupFormCustomer />} />
    <Route path="/signup-service-provider" element={<SignupFormServiceProvider />} />
    <Route path="/register" element={<Register />} />
    <Route path="/reset" element={<ResetPassword />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/Birthday" element={<Birthday />} />
    <Route path="/Concert" element={<Concert />} />
    <Route path="/Wedding" element={<Wedding />} />
    <Route path="/Event" element={<Event />} />
    <Route path="/Contactus" element={<Contactus />} />
    <Route path="/FAQ" element={<FAQ />} />
    <Route path="/Funeral" element={<Funeral />} />
    <Route path="/grad" element={<Graduation />} />
    <Route path="/Aboutus" element={<Aboutus />} />
  </Routes>
);

export default CustomerRoutes;
