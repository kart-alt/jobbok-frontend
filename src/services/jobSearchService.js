// Service to fetch real jobs from public APIs
// Using a free job search API (we'll use a mock implementation with realistic data)

const mockJobs = [
  {
    id: 'job_1',
    title: 'Senior React Developer',
    company: 'Google',
    location: 'Mountain View, CA',
    salary: '180000-220000',
    type: 'Full-time',
    source: 'LinkedIn',
    description: 'We are looking for an experienced React developer to join our team.',
    link: 'https://careers.google.com',
    posted: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'job_2',
    title: 'Full Stack Engineer',
    company: 'Meta',
    location: 'Menlo Park, CA',
    salary: '200000-250000',
    type: 'Full-time',
    source: 'LinkedIn',
    description: 'Join Meta to build the next generation of social platforms.',
    link: 'https://careers.meta.com',
    posted: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'job_3',
    title: 'Frontend Engineer',
    company: 'Microsoft',
    location: 'Seattle, WA',
    salary: '160000-200000',
    type: 'Full-time',
    source: 'Indeed',
    description: 'Help us build innovative frontend solutions for enterprise customers.',
    link: 'https://careers.microsoft.com',
    posted: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'job_4',
    title: 'Backend Engineer (Node.js)',
    company: 'Amazon',
    location: 'Remote',
    salary: '170000-210000',
    type: 'Full-time',
    source: 'LinkedIn',
    description: 'Build scalable backend systems for AWS services.',
    link: 'https://careers.amazon.com',
    posted: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'job_5',
    title: 'JavaScript Developer',
    company: 'Stripe',
    location: 'San Francisco, CA',
    salary: '190000-230000',
    type: 'Full-time',
    source: 'Indeed',
    description: 'Work on payments infrastructure and developer tools.',
    link: 'https://careers.stripe.com',
    posted: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'job_6',
    title: 'React Native Engineer',
    company: 'Netflix',
    location: 'Los Gatos, CA',
    salary: '200000-240000',
    type: 'Full-time',
    source: 'LinkedIn',
    description: 'Build amazing mobile experiences with React Native.',
    link: 'https://careers.netflix.com',
    posted: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  }
];

export const searchJobs = async (query = '', location = '', salary = '') => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));

  let results = [...mockJobs];

  if (query) {
    const lowerQuery = query.toLowerCase();
    results = results.filter(job =>
      job.title.toLowerCase().includes(lowerQuery) ||
      job.company.toLowerCase().includes(lowerQuery) ||
      job.description.toLowerCase().includes(lowerQuery)
    );
  }

  if (location) {
    const lowerLocation = location.toLowerCase();
    results = results.filter(job =>
      job.location.toLowerCase().includes(lowerLocation)
    );
  }

  if (salary) {
    const minSalary = parseInt(salary);
    results = results.filter(job => {
      const jobMin = parseInt(job.salary.split('-')[0]);
      return jobMin >= minSalary;
    });
  }

  return results;
};

export const getJobDetails = async (jobId) => {
  const job = mockJobs.find(j => j.id === jobId);
  return job || null;
};

// Real API integration example (for future use with actual job API keys)
export const fetchFromRealAPI = async (query) => {
  // This is where you would integrate with:
  // - JSearch API
  // - Indeed API
  // - LinkedIn API
  // - Glassdoor API
  // etc.

  const apiKey = process.env.REACT_APP_JOB_API_KEY;
  if (!apiKey) {
    console.warn('Job API key not configured, using mock data');
    return searchJobs(query);
  }

  try {
    // Example with JSearch API
    // const response = await fetch(`https://api.jsearch.io/v1/search?query=${query}`, {
    //   headers: { 'X-RapidAPI-Key': apiKey }
    // });
    // return response.json();
  } catch (error) {
    console.error('API Error:', error);
    return searchJobs(query);
  }
};
