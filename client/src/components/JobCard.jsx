import React from 'react';
import { useNavigate } from 'react-router-dom';

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div className='border p-6 shadow-lg rounded-xl bg-white hover:shadow-2xl transition duration-300 ease-in-out'>
      <div className='flex justify-between items-center'>
        <img className='h-10' src={job.companyId.image} alt="" />
      </div>
      <h4 className='font-semibold text-xl mt-3 text-gray-800'>{job.title}</h4>
      <div className='flex items-center gap-3 mt-3 text-xs'>
        <span className='bg-blue-500 text-white px-4 py-1 rounded-full'>{job.location}</span>
        <span className='bg-red-500 text-white px-4 py-1 rounded-full'>{job.level}</span>
      </div>
      <p className='text-gray-600 text-sm mt-4' dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) }}></p>
      <div className='mt-5 flex gap-4 text-sm'>
        <button
          onClick={() => { navigate(`/apply-job/${job._id}`); scrollTo(0, 0); }}
          className='bg-gradient-to-r from-blue-500 to-blue-700 text-white px-5 py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition-all duration-300'>
          Apply now
        </button>
        <button
          onClick={() => { navigate(`/apply-job/${job._id}`); scrollTo(0, 0); }}
          className='text-blue-600 border border-blue-600 rounded-lg px-5 py-2 hover:bg-blue-600 hover:text-white transition-all duration-300'>
          Learn more
        </button>
      </div>
    </div>
  );
};

export default JobCard;
