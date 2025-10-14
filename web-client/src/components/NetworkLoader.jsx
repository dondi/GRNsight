import React, { useContext, useEffect, useState } from 'react';
import { getDemoWorkbook, uploadWorkbook, DEMO_TYPES } from '../services/api';
import { GrnStateContext } from '../App'; // Adjust import path as needed

function NetworkLoader() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [file, setFile] = useState(null);
  
  // Assuming you have these in your context
  const { 
    demoValue, 
    setDemoValue, 
    // You'll need to add this state to your context
    setNetworkData 
  } = useContext(GrnStateContext);

  // Map from demo display names to API endpoint names
  const getApiEndpointFromDemoValue = (demoDisplayName) => {
    const mapping = Object.entries(DEMO_TYPES).find(([_, value]) => value === demoDisplayName);
    return mapping ? mapping[0] : null;
  };

  // Load demo when demoValue changes
  useEffect(() => {
    const loadDemo = async () => {
      const demoEndpoint = getApiEndpointFromDemoValue(demoValue);
      
      if (demoEndpoint) {
        setIsLoading(true);
        setErrorMessage('');
        
        try {
          const data = await getDemoWorkbook(demoEndpoint);
          setNetworkData(data);
        } catch (error) {
          setErrorMessage(`Failed to load demo: ${error.message}`);
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    if (demoValue) {
      loadDemo();
    }
  }, [demoValue, setNetworkData]);

  // Handle file upload
  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setErrorMessage('Please select a file to upload');
      return;
    }
    
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      const data = await uploadWorkbook(file);
      setNetworkData(data);
    } catch (error) {
      setErrorMessage(`Upload failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="network-loader">
      {isLoading && <div className="loading">Loading...</div>}
      {errorMessage && <div className="error">{errorMessage}</div>}
      
      <form onSubmit={handleUpload}>
        <div className="file-upload">
          <input 
            type="file" 
            accept=".xlsx" 
            onChange={handleFileChange}
            disabled={isLoading}
          />
          <button type="submit" disabled={!file || isLoading}>
            Upload Workbook
          </button>
        </div>
      </form>
      
      <div className="demo-selector">
        <label>Select Demo:</label>
        <select 
          value={demoValue} 
          onChange={(e) => setDemoValue(e.target.value)}
          disabled={isLoading}
        >
          {Object.values(DEMO_TYPES).map(demoName => (
            <option key={demoName} value={demoName}>{demoName}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default NetworkLoader;