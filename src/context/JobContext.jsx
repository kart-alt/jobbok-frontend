import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { initialJobs, initialInterviews } from '../mockData';

const JobContext = createContext();

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const initialState = {
  jobs: initialJobs,
  interviews: initialInterviews,
  user: null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_TOKEN':
      return { ...state, token: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_JOBS':
      return { ...state, jobs: action.payload };
    case 'ADD_JOB':
      return { ...state, jobs: [action.payload, ...state.jobs] };
    case 'UPDATE_JOB':
      return { ...state, jobs: state.jobs.map(j => j._id === action.payload._id ? action.payload : j) };
    case 'DELETE_JOB':
      return { ...state, jobs: state.jobs.filter(j => j._id !== action.payload) };
    case 'SET_INTERVIEWS':
      return { ...state, interviews: action.payload };
    case 'ADD_INTERVIEW':
      return { ...state, interviews: [action.payload, ...state.interviews] };
    case 'UPDATE_INTERVIEW':
      return { ...state, interviews: state.interviews.map(i => i._id === action.payload._id ? action.payload : i) };
    case 'DELETE_INTERVIEW':
      return { ...state, interviews: state.interviews.filter(i => i._id !== action.payload) };
    case 'LOGOUT':
      return { ...initialState, token: null };
    default:
      return state;
  }
}

const apiCall = async (endpoint, method = 'GET', body = null, token = null) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
    console.log('🔐 Sending token:', token.substring(0, 20) + '...');
  } else {
    console.warn('⚠️ No token provided for', method, endpoint);
  }

  const config = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  console.log(`📤 ${method} ${API_URL}${endpoint}`);
  const response = await fetch(`${API_URL}${endpoint}`, config);
  
  if (!response.ok) {
    const errorData = await response.json();
    console.error('❌ API Error:', errorData);
    throw new Error(errorData.error || 'API Error');
  }

  const data = await response.json();
  console.log('📥 Response:', data);
  return data;
};

export function JobProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    console.log('🔄 JobProvider init - token:', token ? 'Present' : 'Missing', 'user:', user ? 'Present' : 'Missing');
    if (token) {
      dispatch({ type: 'SET_TOKEN', payload: token });
    }
    if (user) {
      dispatch({ type: 'SET_USER', payload: user });
    }
  }, []);

  const getToken = () => {
    const token = state.token || localStorage.getItem('token');
    console.log('🔑 getToken():', token ? 'Found' : 'Not found');
    return token;
  };

  const loadJobs = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const token = getToken();
      const data = await apiCall('/jobs', 'GET', null, token);
      dispatch({ type: 'SET_JOBS', payload: data });
      dispatch({ type: 'SET_ERROR', payload: null });
    } catch (error) {
      console.error('❌ loadJobs error:', error);
      dispatch({ type: 'SET_JOBS', payload: initialJobs });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const loadInterviews = async () => {
    try {
      const token = getToken();
      const data = await apiCall('/interviews', 'GET', null, token);
      dispatch({ type: 'SET_INTERVIEWS', payload: data });
    } catch (error) {
      console.error('❌ loadInterviews error:', error);
      dispatch({ type: 'SET_INTERVIEWS', payload: initialInterviews });
    }
  };

  const register = async (name, email, password, phone) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const data = await apiCall('/users/register', 'POST', { name, email, password, phone });
      dispatch({ type: 'SET_TOKEN', payload: data.token });
      dispatch({ type: 'SET_USER', payload: data.user });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      console.log('✅ Register success');
      dispatch({ type: 'SET_ERROR', payload: null });
      return data;
    } catch (error) {
      console.error('❌ Register error:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const login = async (email, password) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const data = await apiCall('/users/login', 'POST', { email, password });
      dispatch({ type: 'SET_TOKEN', payload: data.token });
      dispatch({ type: 'SET_USER', payload: data.user });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      console.log('✅ Login success, token stored');
      dispatch({ type: 'SET_ERROR', payload: null });
      return data;
    } catch (error) {
      console.error('❌ Login error:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const addJob = async (job) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const token = getToken();
      if (!token) throw new Error('No authentication token found');
      const newJob = await apiCall('/jobs', 'POST', job, token);
      dispatch({ type: 'ADD_JOB', payload: newJob });
      dispatch({ type: 'SET_ERROR', payload: null });
      return newJob;
    } catch (error) {
      console.error('❌ addJob error:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const updateJob = async (id, job) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const token = getToken();
      if (!token) throw new Error('No authentication token found');
      const updatedJob = await apiCall(`/jobs/${id}`, 'PUT', job, token);
      dispatch({ type: 'UPDATE_JOB', payload: updatedJob });
      dispatch({ type: 'SET_ERROR', payload: null });
      return updatedJob;
    } catch (error) {
      console.error('❌ updateJob error:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const deleteJob = async (id) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const token = getToken();
      if (!token) throw new Error('No authentication token found');
      await apiCall(`/jobs/${id}`, 'DELETE', null, token);
      dispatch({ type: 'DELETE_JOB', payload: id });
      dispatch({ type: 'SET_ERROR', payload: null });
    } catch (error) {
      console.error('❌ deleteJob error:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const addInterview = async (interview) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const token = getToken();
      if (!token) throw new Error('No authentication token found');
      const newInterview = await apiCall('/interviews', 'POST', interview, token);
      dispatch({ type: 'ADD_INTERVIEW', payload: newInterview });
      dispatch({ type: 'SET_ERROR', payload: null });
      return newInterview;
    } catch (error) {
      console.error('❌ addInterview error:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const updateInterview = async (id, interview) => {
    try {
      const token = getToken();
      if (!token) throw new Error('No authentication token found');
      const updatedInterview = await apiCall(`/interviews/${id}`, 'PUT', interview, token);
      dispatch({ type: 'UPDATE_INTERVIEW', payload: updatedInterview });
      return updatedInterview;
    } catch (error) {
      console.error('❌ updateInterview error:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  const deleteInterview = async (id) => {
    try {
      const token = getToken();
      if (!token) throw new Error('No authentication token found');
      await apiCall(`/interviews/${id}`, 'DELETE', null, token);
      dispatch({ type: 'DELETE_INTERVIEW', payload: id });
    } catch (error) {
      console.error('❌ deleteInterview error:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  const updateProfile = async (profile) => {
    try {
      const token = getToken();
      if (!token) throw new Error('No authentication token found');
      const updated = await apiCall('/users/profile', 'PUT', profile, token);
      dispatch({ type: 'SET_USER', payload: updated });
      localStorage.setItem('user', JSON.stringify(updated));
    } catch (error) {
      console.error('❌ updateProfile error:', error);
      throw error;
    }
  };

  return (
    <JobContext.Provider value={{
      ...state,
      register,
      login,
      logout,
      addJob,
      updateJob,
      deleteJob,
      addInterview,
      updateInterview,
      deleteInterview,
      updateProfile,
      loadJobs,
      loadInterviews
    }}>
      {children}
    </JobContext.Provider>
  );
}

export const useJobs = () => useContext(JobContext);
