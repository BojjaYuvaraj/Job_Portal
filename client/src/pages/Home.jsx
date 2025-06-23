import React from 'react';
import Hero from '../components/Hero';
import JobListings from '../components/JobListings';
import Footer from '../components/Footer';
import AppDownload from '../components/AppDownload';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero/>
      <JobListings />
      <AppDownload />
      <Footer />
    </div>
  );
};

export default Home;
