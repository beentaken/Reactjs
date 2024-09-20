import React, { useState } from 'react';
import { Button } from '@mui/material';

const FileUpload = () => {
    const [jsonData, setJsonData] = useState(null);

    // Function to handle file upload
    const handleFileUpload = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            // Read file as text (for simple Excel CSV-like content)
            reader.onload = function (e) {
                const fileContent = e.target.result;
                const jsonResult = excelToJson(fileContent);
                setJsonData(jsonResult);
            };

            reader.readAsText(file);
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
