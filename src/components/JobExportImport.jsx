import React, { useRef } from 'react';
import { Box, Button, Menu, MenuItem } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { exportJobsToCSV, importJobsFromCSV } from '../utils/csvUtils';

const JobExportImport = ({ jobs, onImport }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const fileInputRef = useRef(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExportCSV = () => {
    const timestamp = new Date().toISOString().split('T')[0];
    exportJobsToCSV(jobs, `job-applications-${timestamp}.csv`);
    handleClose();
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
    handleClose();
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const importedJobs = await importJobsFromCSV(file);
      onImport(importedJobs);
      alert(`Successfully imported ${importedJobs.length} jobs!`);
    } catch (error) {
      alert('Import failed: ' + error.message);
    } finally {
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <Box>
      <Button
        variant="outlined"
        startIcon={<FileDownloadIcon />}
        onClick={handleClick}
        sx={{
          textTransform: 'none',
          fontSize: '15px',
          fontWeight: 500
        }}
      >
        Export / Import
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleExportCSV}>
          📥 Export to CSV
        </MenuItem>
        <MenuItem onClick={handleImportClick}>
          📤 Import from CSV
        </MenuItem>
      </Menu>
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />
    </Box>
  );
};

export default JobExportImport; 