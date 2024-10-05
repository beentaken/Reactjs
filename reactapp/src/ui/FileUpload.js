import React, { useState } from 'react';
import { Button } from '@mui/material';
import * as XLSX from 'xlsx';
const FileUpload = () => {
    const [jsonDataCvs, setJsonDataCvs] = useState(null);
    const [jsonDataExcel, setJsonDataExcel] = useState(null);
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

        } catch (error) {
            console.error('Error posting data:', error);
        }
    };

    // Function to handle file upload
    const handleFileUploadCvs = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                const fileContent = e.target.result;

                // Convert Excel/CSV content to JSON
                const jsonResult = excelToJson(fileContent);

                // Now post the converted JSON data
                postDataToAPI(jsonResult);
                setJsonDataCvs(jsonResult);
            };

            reader.readAsText(file); // Read file as text
        }
    };

    const handleFileUploadExcel = (event) => {
        const file = event.target.files[0];
        if (file) {

            const reader1 = new FileReader();

            // On file load, read the file's content
            reader1.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });

                // Get the first sheet's name
                const firstSheetName = workbook.SheetNames[0];
                // Get the first sheet
                const worksheet = workbook.Sheets[firstSheetName];
                // Convert the sheet to JSON
                const json = XLSX.utils.sheet_to_json(worksheet);
                postDataToAPI(json);
                // Set the converted JSON data
                setJsonDataExcel(json);
            };

            reader1.readAsArrayBuffer(file);
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
                accept=".csv"
                style={{ display: 'none' }}
                id="excel-file-upload"
                type="file"
                onChange={handleFileUploadCvs}
            />
            <label htmlFor="excel-file-upload">
                <Button variant="contained" component="span">
                    Upload CSV File
                </Button>
            </label>

            <input
                accept=".xls, .xlsx"
                style={{ display: 'none' }}
                id="excel-file-upload"
                type="file"
                onChange={handleFileUploadExcel}
            />
            <label htmlFor="excel-file-upload">
                <Button variant="contained" component="span">
                    Upload Excel File
                </Button>
            </label>

            {/* Display JSON data if available */}
            {jsonDataCvs && (
                <pre style={{ marginTop: '20px' }}>
                    {JSON.stringify(jsonDataCvs, null, 2)}
                </pre>
            )}
            {/* Display JSON data if available */}
            {jsonDataExcel && (
                <pre style={{ marginTop: '20px' }}>
                    {JSON.stringify(jsonDataExcel, null, 2)}
                </pre>
            )}
        </div>
    );
};

export default FileUpload;
