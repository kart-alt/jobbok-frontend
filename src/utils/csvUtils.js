export const exportJobsToCSV = (jobs, filename = 'jobs.csv') => {
  if (!jobs || jobs.length === 0) {
    alert('No jobs to export');
    return;
  }

  const headers = ['Title', 'Company', 'Location', 'Salary', 'Status', 'Applied Date', 'Notes'];
  const csvContent = [
    headers.join(','),
    ...jobs.map(job =>
      [
        `"${job.title || ''}"`,
        `"${job.company || ''}"`,
        `"${job.location || ''}"`,
        `"${job.salary || ''}"`,
        `"${job.status || ''}"`,
        `"${job.appliedDate || ''}"`,
        `"${(job.notes || '').replace(/"/g, '""')}"`
      ].join(',')
    )
  ].join('\n');

  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

export const importJobsFromCSV = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const csv = event.target.result;
        const lines = csv.split('\n');
        const headers = lines[0].split(',').map(h => h.trim().toLowerCase());

        const jobs = [];
        for (let i = 1; i < lines.length; i++) {
          if (lines[i].trim() === '') continue;

          // Simple CSV parsing (handles quoted values)
          const values = [];
          let current = '';
          let insideQuotes = false;

          for (let j = 0; j < lines[i].length; j++) {
            const char = lines[i][j];
            if (char === '"') {
              insideQuotes = !insideQuotes;
            } else if (char === ',' && !insideQuotes) {
              values.push(current.trim().replace(/^"|"$/g, ''));
              current = '';
            } else {
              current += char;
            }
          }
          values.push(current.trim().replace(/^"|"$/g, ''));

          if (values.length >= 4) {
            jobs.push({
              title: values[0] || '',
              company: values[1] || '',
              location: values[2] || '',
              salary: values[3] || '',
              status: values[4] || 'Applied',
              appliedDate: values[5] || new Date().toISOString().split('T')[0],
              notes: values[6] || ''
            });
          }
        }

        resolve(jobs);
      } catch (error) {
        reject(new Error('Failed to parse CSV: ' + error.message));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsText(file);
  });
};

export const generateJobsReport = (jobs) => {
  const statusCounts = {};
  let totalSalary = 0;
  let jobsWithSalary = 0;

  jobs.forEach(job => {
    statusCounts[job.status] = (statusCounts[job.status] || 0) + 1;
    if (job.salary) {
      const salaryMin = parseInt(job.salary.split('-')[0]);
      totalSalary += salaryMin;
      jobsWithSalary++;
    }
  });

  return {
    totalJobs: jobs.length,
    statusCounts,
    averageSalary: jobsWithSalary > 0 ? (totalSalary / jobsWithSalary).toFixed(0) : 0,
    generatedAt: new Date().toISOString()
  };
};
