import React, { useEffect, useRef, useState, useContext } from 'react';
import Quill from 'quill';
import { JobCategories, JobLocations } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Addjob = () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('Bangalore');
  const [category, setCategory] = useState('Programming');
  const [level, setLevel] = useState(0);
  const [salary, setSalary] = useState(0);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const { backendUrl, companyToken } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const description = quillRef.current.root.innerHTML;

      const { data } = await axios.post(
        `${backendUrl}/api/company/post-job`,
        { title, description, location, salary, category, level },
        { headers: { token: companyToken } }
      );

      if (data.success) {
        toast.success('Added successfully!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });

        // Reset form fields after success
        setTitle('');
        setLocation('Bangalore');
        setCategory('Programming');
        setLevel(0);
        setSalary(0);
        quillRef.current.root.innerHTML = ''; // Reset the quill editor

      } else {
        toast.error(data.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    // Initiate Quill only once
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
      });
    }
  }, []);

  return (
    <form onSubmit={onSubmitHandler} className='container p-4 flex flex-col w-full items-start gap-3'>
      
      <div className='w-full'>
        <p className='mb-2'>Job Title</p>
        <input
          type="text"
          placeholder='Type here'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
          className='w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded'
        />
      </div>

      <div className='w-full max-w-lg'>
        <p className='my-2'>Job Description</p>
        <div ref={editorRef}></div>
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Job Category</p>
          <select
            className='w-36 px-3 py-2 border-2 border-gray-300 rounded'
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            {JobCategories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div>
          <p className='mb-2'>Job Location</p>
          <select
            className='px-3 py-2 border-2 border-gray-300 rounded w-36'
            onChange={(e) => setLocation(e.target.value)}
            value={location}
          >
            {JobLocations.map((location, index) => (
              <option key={index} value={location}>{location}</option>
            ))}
          </select>
        </div>

        <div>
          <p className='mb-2'>Job Level</p>
          <select
            className='w-36 px-2 py-2 border-2 border-gray-300 rounded'
            onChange={(e) => setLevel(e.target.value)}
            value={level}
          >
            <option value="Beginner level">Beginner level</option>
            <option value="Intermediate level">Intermediate level</option>
            <option value="Senior level">Senior level</option>
          </select>
        </div>
      </div>

      <div>
        <p className='mb-2'>Job Salary</p>
        <input
          min={0}
          className='w-full px-3 py-2 border-2 border-gray-300 rounded sm:w-[120px]'
          type="number"
          placeholder='Eg: 25000'
          onChange={(e) => setSalary(e.target.value)}
          value={salary}
          required
        />
      </div>

      <button className='w-28 py-3 mt-4 bg-black text-white rounded'>ADD</button>
    </form>
  );
};

export default Addjob;
