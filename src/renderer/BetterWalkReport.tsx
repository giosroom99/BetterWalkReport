/* eslint-disable react/button-has-type */
import React, { useState } from 'react';

function Better() {
  const [file, setFile] = useState<File | undefined>();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      const isExcelFile =
        selectedFile.type ===
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        selectedFile.type === 'application/vnd.ms-excel';

      if (isExcelFile) {
        setFile(selectedFile);
      } else {
        alert('Please select a valid Excel file.');
        event.target.value = ''; // Clear the input value
      }
    }
  }

  function handleSubmit() {
    if (file) {
      alert(`Selected file: ${file.name}`);
      // You can perform further actions with the file here
    } else {
      alert('Please select a file before submitting.');
    }
  }

  return (
    <div>
      <input type="file" onChange={handleChange} accept=".xls, .xlsx" />
      <button className="btn btn-danger" onClick={handleSubmit}>
        Submit
      </button>
      {/* Add more UI or functionality as needed */}
    </div>
  );
}

export default Better;
