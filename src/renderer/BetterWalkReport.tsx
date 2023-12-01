/* eslint-disable no-alert */
/* eslint-disable no-use-before-define */
/* eslint-disable react/button-has-type */
/* eslint-disable @typescript-eslint/no-shadow */
// Use React.FC instead of function for better type inference
import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const _ = require('lodash');

function displayData(data: any[]): React.ReactElement {
  if (data) {
    const groupedData = _.groupBy(data, (row) => row[3]); // Group by the value of row 3

    return (
      <div className="container mt-3" id="zoomContent" style={{transform: "scale(1)", "transform-origin": "top center"}}>
        <div className="row">
          <h2>Parsed Data</h2>

          <button
            className="floating-button "
            onClick={() => window.location.reload()}
          >
            BACK
          </button>
        </div>

        <div className="row">
          {Object.keys(groupedData).map((groupKey) => (
            <div key={groupKey} className="col-md-6 mb-3">
              <h3>{groupKey}</h3>
              <table
                id="print-content"
                className="table table-striped table-bordered"
              >
                <thead>
                  <tr>
                    <th>Name</th>
                    <th></th>
                    <th>Hours</th>

                    <th>Area</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedData[groupKey].map((row) => (
                    <tr key={row[0]}>
                      <td>{row[0]}</td>
                      <td>{row[1]}</td>
                      <td>{row[2]}</td>
                      <td>{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>No Data</h1>
    </div>
  );
}

// Main component
function Better() {
  const [data, setData] = useState<any[]>([]); // Declare state
  const [file, setFile] = useState<File | undefined>(); // Declare state

  // Function definitions
  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const selectedFile = event.target.files?.[0];


    if (selectedFile) {
      const isExcelFile =
        selectedFile.type ===
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        selectedFile.type === 'application/vnd.ms-excel' ||
        selectedFile.type === 'application/vnd.ms-excel.sheet.macroEnabled.12';

      if (isExcelFile) {
        setFile(selectedFile);
        parseExcelSheet(selectedFile);
      } else {
        alert('Please select a valid Excel file.');
        event.target.value = ''; // Clear the input value
      }
    }
  }

  function handleSubmit(): void {
    if (file) {
      alert(`Selected file: ${file.name}`);
    } else {
      alert('Please select a file before submitting.');
    }
  }

  function parseExcelSheet(file: File): void {
    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryString = event.target?.result;
      if (binaryString) {
        const workbook = XLSX.read(binaryString, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        setData(rawData);
        console.log(data);
      }
    };
    reader.readAsBinaryString(file);
  }

  let zoomLevel = 1;
  const zoomStep = 0.1;

  window.addEventListener('wheel', (event) => {
    if (event.ctrlKey) {

      event.preventDefault();
      if (event.deltaY < 0) {
        // Zoom in
        if (zoomLevel < 1) {
          zoomLevel += zoomStep;
        }
      } else {
        // Zoom out
        zoomLevel -= zoomStep;
      }
      console.log(document.getElementById('zoomContent'));
      document.getElementById(
        'zoomContent',
      )!.style.transform = `scale(${zoomLevel})`;
    }
  });
  // JSX and conditional rendering
  return (
    <div>
      <input type="file" onChange={handleChange} accept=".xls, .xlsx, .xlsm" />
      <button className="btn btn-danger" onClick={handleSubmit}>
        Submit
      </button>
      {data.length > 0 && displayData(data)}
    </div>
  );
}

export default Better;
