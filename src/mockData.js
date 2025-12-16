import { v4 as uuidv4 } from 'uuid';

const today = new Date();
const days = (d) => new Date(today.getTime() - d * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

const job1Id = uuidv4();
const job2Id = uuidv4();
const job3Id = uuidv4();
const job4Id = uuidv4();

export const initialJobs = [
  {
    id: job1Id,
    companyName: 'Acme Corp',
    jobRole: 'Frontend Engineer',
    jobType: 'Full-time',
    location: 'Bangalore',
    package: '12 LPA',
    jobLink: 'https://acme.example/jobs/123',
    appliedDate: days(10),
    currentStatus: 'Applied',
    notes: 'Applied via campus placement portal',
    userId: 'user-1'
  },
  {
    id: job2Id,
    companyName: 'ByteWave',
    jobRole: 'Backend Developer',
    jobType: 'Full-time',
    location: 'Remote',
    package: '15 LPA',
    jobLink: 'https://bytewave.example/careers/12',
    appliedDate: days(30),
    currentStatus: 'Assessment',
    notes: 'Coding test scheduled for next week',
    userId: 'user-1'
  },
  {
    id: job3Id,
    companyName: 'Cloudify',
    jobRole: 'DevOps Intern',
    jobType: 'Internship',
    location: 'Hyderabad',
    package: '6 LPA',
    jobLink: '',
    appliedDate: days(3),
    currentStatus: 'HR Round',
    notes: 'Referral from alumni, first round passed',
    userId: 'user-1'
  },
  {
    id: job4Id,
    companyName: 'DataSense',
    jobRole: 'Data Scientist',
    jobType: 'Full-time',
    location: 'Bengaluru',
    package: '20 LPA',
    jobLink: 'https://datasense.example/jobs/77',
    appliedDate: days(60),
    currentStatus: 'Technical Interview',
    notes: 'Interview with senior data engineer scheduled',
    userId: 'user-1'
  },
  {
    id: uuidv4(),
    companyName: 'FinEdge',
    jobRole: 'Software Engineer',
    jobType: 'Full-time',
    location: 'Mumbai',
    package: '10 LPA',
    jobLink: 'https://finedge.example/apply',
    appliedDate: days(2),
    currentStatus: 'Applied',
    notes: 'Applied online through their careers page',
    userId: 'user-1'
  },
  {
    id: uuidv4(),
    companyName: 'GreenCloud',
    jobRole: 'Cloud Engineer',
    jobType: 'Full-time',
    location: 'Remote',
    package: '18 LPA',
    jobLink: '',
    appliedDate: days(15),
    currentStatus: 'Rejected',
    notes: 'Received rejection email after technical round',
    userId: 'user-1'
  },
  {
    id: uuidv4(),
    companyName: 'HealthSync',
    jobRole: 'Mobile Developer',
    jobType: 'Part-time',
    location: 'Pune',
    package: '8 LPA',
    jobLink: '',
    appliedDate: days(5),
    currentStatus: 'Final Decision',
    notes: 'Offer received! Pending response',
    userId: 'user-1'
  },
  {
    id: uuidv4(),
    companyName: 'InnoTech',
    jobRole: 'Full Stack Developer',
    jobType: 'Full-time',
    location: 'Chennai',
    package: '11 LPA',
    jobLink: 'https://innotech.example/jobs/2',
    appliedDate: days(22),
    currentStatus: 'Technical Interview',
    notes: 'System design round scheduled',
    userId: 'user-1'
  },
  {
    id: uuidv4(),
    companyName: 'Jupiter Labs',
    jobRole: 'Research Intern',
    jobType: 'Internship',
    location: 'Remote',
    package: '4 LPA',
    jobLink: '',
    appliedDate: days(45),
    currentStatus: 'Assessment',
    notes: 'Take-home assignment pending submission',
    userId: 'user-1'
  },
  {
    id: uuidv4(),
    companyName: 'Krypton',
    jobRole: 'Systems Engineer',
    jobType: 'Full-time',
    location: 'Bangalore',
    package: '13 LPA',
    jobLink: 'https://krypton.example/careers',
    appliedDate: days(8),
    currentStatus: 'HR Round',
    notes: 'HR interview scheduled with Priya Sharma',
    userId: 'user-1'
  },
  {
    id: uuidv4(),
    companyName: 'Lumina',
    jobRole: 'AI Engineer',
    jobType: 'Full-time',
    location: 'Bangalore',
    package: '25 LPA',
    jobLink: 'https://lumina.example/jobs/99',
    appliedDate: days(120),
    currentStatus: 'Rejected',
    notes: 'Did not clear technical round',
    userId: 'user-1'
  },
  {
    id: uuidv4(),
    companyName: 'NovaWorks',
    jobRole: 'QA Engineer',
    jobType: 'Part-time',
    location: 'Delhi',
    package: '7 LPA',
    jobLink: '',
    appliedDate: days(1),
    currentStatus: 'Applied',
    notes: 'Just applied yesterday',
    userId: 'user-1'
  }
];

export const initialInterviews = [
  {
    id: uuidv4(),
    jobId: job2Id,
    roundName: 'Coding Round',
    dateTime: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    meetingLink: 'https://meet.google.com/tech-coding-round',
    interviewerDetails: 'Alice Johnson - Senior Backend Engineer',
    notes: 'Focus on algorithms, data structures, and system design'
  },
  {
    id: uuidv4(),
    jobId: job4Id,
    roundName: 'Manager Round',
    dateTime: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    meetingLink: 'https://zoom.us/j/datasense-manager',
    interviewerDetails: 'Bob Chen - Engineering Manager',
    notes: 'Discussion on past projects and team collaboration'
  },
  {
    id: uuidv4(),
    jobId: job3Id,
    roundName: 'Technical Round',
    dateTime: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    meetingLink: 'https://meet.google.com/cloudify-tech',
    interviewerDetails: 'Carol White - DevOps Lead',
    notes: 'Docker, Kubernetes, CI/CD pipelines'
  },
  {
    id: uuidv4(),
    jobId: job1Id,
    roundName: 'HR Round',
    dateTime: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    meetingLink: 'https://meet.google.com/acme-hr-round',
    interviewerDetails: 'Diana Martinez - HR Manager',
    notes: 'General intro, expectations, and company culture fit'
  }
];

export const initialUser = {
  id: 'user-1',
  name: 'Student User',
  email: 'student@example.com',
  phone: '+91-9000-0000-00',
  status: 'Actively looking',
  skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL'],
  preferences: { jobType: 'Full-time', location: 'Bangalore' },
  resume: null
};

const mock = {
  initialJobs,
  initialInterviews,
  initialUser
};

export default mock;
