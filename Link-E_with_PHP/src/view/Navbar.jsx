import logo from '../assets/logos.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from './UserContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const userData = useUser()
  const user = userData ? userData.user : null;
  console.log(user)

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8000/logout.php', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        console.log('User logged out');
        window.location.reload(); 
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="bg-gray-800 bg-opacity-95 fixed w-[100%] top-0">
      <div className="w-100 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-5 h-16">
          <div className="flex items-center justify-between w-[100%]">
            <div className="flex-shrink-0">
              <Link to="/">
                <img
                  className="h-12 w-40 ml-5"
                  src={logo}
                  alt="Workflow"
                />
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center justify-center space-x-4">
                <Link to="/" className="text-white px-3 py-2 rounded-md text-sm font-medium">
                 Home
                </Link>
                <Link to="/events" className="text-white px-3 py-2 rounded-md text-sm font-medium">
                  Events
                </Link>
                <Link to="/aboutus" className="text-white px-3 py-2 rounded-md text-sm font-medium">
                  About Us
                </Link>
                {user ? (
                  <>
                    <div className="text-white px-3 py-2 rounded-md text-sm font-medium">
                      Welcome, {user.name}
                    </div>
                    <button onClick={handleLogout} className="bg-blue-500 hover:bg-blue-700 text-gray-300 px-4 py-2 rounded-lg text-sm font-bold">
                      Logout
                    </button>
                  </>
                ) : (
                  <Link to="/login">
                    <button className="bg-blue-500 hover:bg-blue-700 text-gray-300 px-4 py-2 rounded-lg text-sm font-bold">
                      Login
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md bg-gray-700  text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/">
            <label className="text-white block px-3 py-2 rounded-md text-base font-medium">Home</label>
          </Link>
          <Link to="/events">
            <label className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Events</label>
          </Link>
          <Link to="/about">
            <label className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">About Us</label>
          </Link>
          <Link to="/login">
                  <button className=" bg-blue-500 hover:bg-blue-700 text-gray-300 px-4 py-2 rounded-lg text-sm font-bold">Login</button>
                </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
