import React, { useContext, useRef, useEffect, useState } from "react";
import { assets } from "../assets/assets.js";
import { AppContext } from "../context/AppContext.jsx";
import { motion } from "framer-motion";

const Hero = () => {
  const { setSearchFilter, setIsSearched } = useContext(AppContext);
  const titleRef = useRef(null);
  const locationRef = useRef(null);
  const [jobCount, setJobCount] = useState(9967);

  useEffect(() => {
    const interval = setInterval(() => {
      setJobCount((prev) => (prev < 10000 ? prev + 1 : prev));
    }, 80);

    return () => clearInterval(interval);
  }, []);

  const onSearch = () => {
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });
    setIsSearched(true);
  };

  return (
    <div className="container 2xl:px-20 mx-auto my-10 ">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-800 to-black text-white py-16 text-center mx-2 rounded-xl shadow-lg border border-black"
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4">
          Over <motion.span>{jobCount}</motion.span>+ jobs to apply
        </h2>
        <p className="mb-8 max-w-xl mx-auto text-sm font-light px-5">
          Your Next Big Career Move Starts Right Here - Explore the Best Job
          Opportunities and Take the First Step Toward Your Future!
        </p>

        {/* Search Box */}
        <div className="flex items-center justify-between bg-white rounded-xl shadow-lg max-w-xl mx-auto p-2 border">
          <div className="flex items-center w-full px-2 border-r">
            <img className="h-5 mr-2" src={assets.search_icon} alt="Search Icon" />
            <input
              type="text"
              placeholder="Search for a job"
              className="text-sm p-2 rounded-md outline-none w-full text-gray-700 border-none focus:ring-2 focus:ring-purple-400"
              ref={titleRef}
            />
          </div>
          <div className="flex items-center w-full px-2 ">
            <img className="h-5 mr-2" src={assets.location_icon} alt="Location Icon" />
            <input
              type="text"
              placeholder="Location"
              className="text-sm p-2 rounded-md outline-none w-full text-gray-700 border-none focus:ring-2 focus:ring-purple-400"
              ref={locationRef}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSearch}
            className="bg-blue-600 px-6 py-3 rounded-lg text-white transition duration-300 hover:bg-blue-700 "
          >
            Search
          </motion.button>
        </div>
      </motion.div>

      {/* Trusted By Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="border border-black shadow-md mx-2 mt-5 p-6 rounded-md flex flex-col m:flex-row items-center justify-center gap-10"
      >
        <h2 className="font-medium">Trusted by</h2>
        <div className="flex gap-10 flex-wrap justify-center  p-4 rounded-lg">
          <a
            href="https://careers.microsoft.com/v2/global/en/home.html"
            target="_blank"
            className=" p-2 rounded-lg"
          >
            <img className="h-10 hover:scale-110 transition" src={assets.microsoft_logo} alt="Microsoft Logo" />
          </a>
          <a href="https://www.amazon.jobs/content/en/job-categories" target="_blank" className=" p-2 rounded-lg">
            <img className="h-10 pt-2 hover:scale-110 transition" src={assets.amazon_logo} alt="Amazon Logo" />
          </a>
          <a href="https://careers.walmart.com/" target="_blank" className=" p-2 rounded-lg">
            <img className="h-10 hover:scale-110 transition" src={assets.walmart_logo} alt="Walmart Logo" />
          </a>
          <a href="https://www.accenture.com/in-en/careers" target="_blank" className="p-2 rounded-lg">
            <img className="h-10 hover:scale-110 transition" src={assets.accenture_logo} alt="Accenture Logo" />
          </a>
          <a href="http://samsung.com/in/about-us/careers" target="_blank" className="p-2 rounded-lg">
            <img className="h-10 hover:scale-110 transition" src={assets.samsung_logo} alt="Samsung Logo" />
          </a>
          <a href="https://careers.adobe.com/us/en" target="_blank" className="p-2 rounded-lg">
            <img className="h-10 hover:scale-110 transition" src={assets.adobe_logo} alt="Adobe Logo" />
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
