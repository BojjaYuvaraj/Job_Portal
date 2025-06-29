import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { assets } from '../assets/assets';

const ViewApplication = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get('/api/company/applicants'); // Make sure this matches your backend
        if (res.data.success) {
          setApplications(res.data.applications);
        }
      } catch (err) {
        console.error('Error fetching applications:', err);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className='container mx-auto p-4'>
      <div>
        <table className='w-full max-w-4xl bg-white border border-gray-200 max-sm:text-sm'>
          <thead>
            <tr className='border-b'>
              <th className='py-2 px-4 text-left'>#</th>
              <th className='py-2 px-4 text-left'>Username</th>
              <th className='py-2 px-4 text-left max-sm:hidden'>Job Title</th>
              <th className='py-2 px-4 text-left max-sm:hidden'>Location</th>
              <th className='py-2 px-4 text-left'>Resume</th>
              <th className='py-2 px-4 text-left'>Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((applicants, index) => (
              <tr key={index} className='text-gray-700'>
                <td className='py-2 px-4 border-b'>{index + 1}</td>
                <td className='py-2 px-4 border-b flex items-center gap-2'>
                  <img
                    className='w-10 h-10 rounded-full max-sm:hidden'
                    src={applicants.userId?.image || assets.default_profile}
                    alt=''
                  />
                  <span>{applicants.userId?.name}</span>
                </td>
                <td className='py-2 px-4 border-b max-sm:hidden'>{applicants.jobId?.title}</td>
                <td className='py-2 px-4 border-b max-sm:hidden'>{applicants.jobId?.location}</td>
                <td className='py-2 px-4 border-b'>
                  <a
                    href={applicants.userId?.resume}
                    target='_blank'
                    rel='noreferrer'
                    className='bg-blue-50 text-blue-400 px-3 py-1 rounded inline-flex gap-2 items-center'
                  >
                    Resume <span>⬇️</span>
                  </a>
                </td>
                <td className='py-2 px-4 border-b'>
                  <div className='relative inline-block text-left group'>
                    <button className='text-gray-500 action-button'>...</button>
                    <div className='z-10 hidden absolute right-0 md:left-0 top-0 t-2 w-32 bg-white border border-gray-200 rounded shadow group-hover:block'>
                      <button className='block w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100'>
                        Accept
                      </button>
                      <button className='block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100'>
                        Reject
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewApplication;
