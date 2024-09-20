import React, { useState } from 'react';
import { Button } from '@mui/material';

const FileUpload = () => {
    const [jsonData, setJsonData] = useState(null);

    const postDataToAPI = async (data) => {
        try {
            const response = await fetch('weatherforecast/PostExcel', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), // Send data as JSON string
            });

            if (!response.ok) {
                throw new Error('Failed to post data');
            }

            const responseData = await response.json();
            console.log('Response from server:', responseData);
            setJsonData(responseData); // Display server response if needed
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };

    // Function to handle file upload
    const handleFileUpload = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                const fileContent = e.target.result;

                // Convert Excel/CSV content to JSON
                const jsonResult = excelToJson(fileContent);

                // Now post the converted JSON data
                postDataToAPI(jsonResult);
            };

            reader.readAsText(file); // Read file as text
        }
    };

    // Convert CSV-like Excel file to JSON manually
    const excelToJson = (csvContent) => {
        const lines = csvContent.split("\n");
        const result = [];
        const headers = lines[0].split(",");

        for (let i = 1; i < lines.length; i++) {
            const obj = {};
            const currentLine = lines[i].split(",");

            headers.forEach((header, index) => {
                obj[header.trim()] = currentLine[index] ? currentLine[index].trim() : "";
            });

            result.push(obj);
        }

        return result;
    };

    return (
        <div>
            <input
                accept=".csv, .xls, .xlsx"
                style={{ display: 'none' }}
                id="excel-file-upload"
                type="file"
                onChange={handleFileUpload}
            />
            <label htmlFor="excel-file-upload">
                <Button variant="contained" component="span">
                    Upload Excel File
                </Button>
            </label>

            {/* Display JSON data if available */}
            {jsonData && (
                <pre style={{ marginTop: '20px' }}>
                    {JSON.stringify(jsonData, null, 2)}
                </pre>
            )}
        </div>
    );
};

export default FileUpload;
