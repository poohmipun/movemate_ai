import React from "react";

const SummaryPage = ({ formData }) => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">Summary of Inputs</h2>
      <div>
        <p>Here's a summary of the data you entered:</p>
        <ul>
          {Object.entries(formData).map(([key, value], index) => (
            <li key={index}>{`${key}: ${value}`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SummaryPage;
