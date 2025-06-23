import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { motion } from "framer-motion";
import Home from "./pages/Home";
import Applyjob from "./pages/Applyjob";
import Applications from "./pages/Applications";
import Navbar from "./components/Navbar";
import RecruiterLogin from "./components/RecruiterLogin";
import MotionWrapper from "./components/MotionWrapper";
import { AppContext } from "./context/AppContext"
import { Navigate } from "react-router-dom";
import "./input.css";
import './output.css';
import Dashboard from "./pages/Dashboard";
import Addjob from "./pages/Addjob";
import ManageJobs from "./pages/ManageJobs";
import ViewApplication from "./pages/ViewApplication";
import 'quill/dist/quill.snow.css';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from "react-router-dom"; // Required for nested routes

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const App = () => {
  const { showRecruiterLogin, companyToken } = useContext(AppContext);

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {showRecruiterLogin && <RecruiterLogin />}
      {/* <Navbar /> Uncomment to show the Navbar */}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<MotionWrapper><Home /></MotionWrapper>} />
        <Route path="/apply-job/:id" element={<MotionWrapper><Applyjob /></MotionWrapper>} />
        <Route path="/applications" element={<MotionWrapper><Applications /></MotionWrapper>} />

        {/* Dashboard with nested routes */}
        <Route path="/dashboard" element={<Dashboard />}>
          {companyToken ? (
            <>
              <Route index element={<ManageJobs />} /> {/* Default route for /dashboard */}
              <Route path="add-job" element={<Addjob />} />
              <Route path="manage-jobs" element={<ManageJobs />} />
              <Route path="view-applications" element={<ViewApplication />} />
            </>
          ) : (
            <Route path="/dashboard" element={<Navigate to="/login" />} /> // Redirect if no token
          )}
        </Route>
      </Routes>
    </motion.div>
  );
};

export default App;
