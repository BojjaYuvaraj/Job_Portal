import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";

// Create the AppContext
export const AppContext = createContext();

export const AppContextProvider = (props) => {
  
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const { user } = useUser();
  const { getToken,} = useAuth();

  const [searchFilter, setSearchFilter] = useState({ title: '', location: '' });
  const [isSearched, setIsSearched] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);
  const [companyToken, setCompanyToken] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userApplications, setUserApplications] = useState([]);

  // const value = {setSearchFilter,searchFilter,isSearched,setIsSearched,}

  //Function to Fetch jobs
  const fetchJobs = async () => {
    try {
      const {data} = await axios.get(`${backendUrl}/api/jobs`)
      if(data.success){
        setJobs(data.jobs)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  const logout = () => {
    setCompanyToken(null);
    localStorage.removeItem("companyToken");
    setCompanyData(null);
  };
  const fetchCompanyData = async() =>{
    try {
      const {data} = await axios.get(`${backendUrl}/api/company/company`,{
        headers:{token :companyToken}})
      if(data.success){
        setCompanyData(data.company)
        
      }else{
        toast.error(data.message);
        logout();
      }
    } catch (error) {
      toast.error(error.message);
      logout();
    }
  }
  // Fetch jobs on mount
  useEffect(() => {
    const storedCompanyToken = localStorage.getItem("companyToken");
    if (storedCompanyToken) {
      setCompanyToken(storedCompanyToken);
    }
    fetchJobs(); // Call fetchJobs to load jobs on component mount
  }, []);

  // Fetch company data when token changes
  
  useEffect(() => {
    if (companyToken) {
      fetchCompanyData();
    }
  }, [companyToken]);

  // Function to fetch user data
  const fetchUserData = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(`${backendUrl}/api/users/data`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setUserData(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Function to fetch user applications
  const fetchUserApplications = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(`${backendUrl}/api/users/applications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setUserApplications(data.applications);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Fetch user data & applications when user changes
  useEffect(() => {
    if (user) {
      fetchUserData();
      fetchUserApplications();
    }
  }, [user]);

  const value = {
    setSearchFilter,searchFilter,
    isSearched,setIsSearched,
    jobs,setJobs,
    showRecruiterLogin,setShowRecruiterLogin,
    companyToken,setCompanyToken,
    companyData,setCompanyData,
    backendUrl,
    userData,setUserData,
    userApplications,setUserApplications,
    fetchUserData,fetchUserApplications,
  };
  

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};