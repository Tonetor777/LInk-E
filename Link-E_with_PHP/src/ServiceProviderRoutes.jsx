import { Route, Routes } from "react-router-dom";
import Dashboard from "./serviceproviders/Dashboard.jsx";
import ProfilePage from "./serviceproviders/Profile.jsx";
import Gallery from "./serviceproviders/Gallery.jsx";

const ServiceProviderRoutes = () => (
  <Routes>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/profile" element={<ProfilePage />} />
    <Route path="/previous-work" element={<Gallery />} />
  </Routes>
);

export default ServiceProviderRoutes;
