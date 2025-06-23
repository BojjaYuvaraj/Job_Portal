import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';

const Dashboard = () => {
  const navigate = useNavigate();

  const { companyData, setCompanyData, setCompanyToken } = useContext(AppContext);

  const logout = () => {
    setCompanyToken(null);
    localStorage.removeItem('companyToken');
    setCompanyData(null);
    navigate('/')
    window.location.reload()
  };

  useEffect(() => {
    // Check if companyData is available, otherwise redirect to login or home
    if (!companyData) {
      navigate('/'); // Redirect to home if companyData is null
    } else if (window.location.pathname === '/dashboard') {
      navigate('/dashboard/manage-jobs'); // Redirect to default page
    }
  }, [companyData, navigate]);

  return (
    <div className="min-h-screen">
      {/* Navbar for Recruitment panel */}
      <div className="shadow py-4">
        <div className="px-5 flex justify-between items-center">
          <img
            onClick={() => navigate('/')}
            className="max-sm:w-32 cursor-pointer"
            src={assets.logo}
            alt="Company Logo"
          />
          {companyData && (
            <div className="flex items-center gap-3">
              <p className="max-sm:hidden cursor-pointer">Welcome!.. {companyData.name}</p>
              <div className="flex items-center gap-3 relative group">
                <img className="w-8 border rounded-full" src={companyData.image} alt="Profile" />
                <div className="absolute hidden group-hover:block top-10 right-0 z-10 text-black rounded pt-12">
                  <ul className="list-none m-0 p-2 bg-white rounded-md border text-sm">
                  <button onClick={logout} className="mx-2 px-3 cursor-pointer bg-transparent border-none">Logout</button>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-start">
        {/* Left sidebar with options to add job, manage jobs, view applications */}
        <div className="inline-block min-h-screen border-r-2">
          <ul className="flex flex-col items-start pt-5 text-gray-800">
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`
              }
              to="/dashboard/add-job"
            >
              <img className="min-w-4" src={assets.add_icon} alt="Add Job Icon" />
              <p className="max-sm:hidden">Add Job</p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`
              }
              to="/dashboard/manage-jobs"
            >
              <img className="min-w-4" src={assets.home_icon} alt="Manage Jobs Icon" />
              <p className="max-sm:hidden">Manage Jobs</p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`
              }
              to="/dashboard/view-applications"
            >
              <img className="min-w-4" src={assets.person_tick_icon} alt="View Applications Icon" />
              <p className="max-sm:hidden">View Applications</p>
            </NavLink>
          </ul>
        </div>

        {/* Content area where child components are rendered */}
        <div className="flex-1 h-full p-2 sm:p-5">
          <Outlet /> {/* This is where child routes will be rendered */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
