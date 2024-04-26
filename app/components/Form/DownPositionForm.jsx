import React from "react";

const DownPositionForm = ({ formData, onNextPage }) => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">Down Position Form</h2>
      <p>This is a placeholder for the down position form.</p>
      <button
        onClick={() =>
          onNextPage({ dummyData: "Some data from DownPositionForm" })
        }
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Next
      </button>
    </div>
  );
};

export default DownPositionForm;
