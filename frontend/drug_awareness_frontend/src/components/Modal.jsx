import React from 'react';

export function Modal({ show, handleClose, handleAgree }){
  if (!show) return null; // Do not render if the modal is not visible

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full text-center">
        <h2 className="text-xl font-bold mb-4">Commitment to a Drug-Free Community</h2>
        <p className="mb-6">
          As part of our commitment to a safe and drug-free community, we ask that you pledge not to
          engage in or promote any drug-related activities. By confirming, you promise to uphold
          this standard. Do you agree to this commitment?
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleAgree}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
          >
            I Agree
          </button>
          <button
            onClick={handleClose}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            No Thanks
          </button>
        </div>
      </div>
    </div>
  );
};

