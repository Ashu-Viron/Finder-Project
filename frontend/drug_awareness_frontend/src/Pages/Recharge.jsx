import React, { useState } from 'react';
import axios from 'axios';
import {Modal} from '../components/Modal';
import coin from '../assets/Coin.svg'

export function Recharge(){
  const token=localStorage.getItem("token");
  const [showModal, setShowModal] = useState(false);

  const handleRechargeClick = () => {
    setShowModal(true); // Show the modal when user clicks "Recharge"
  };

  const handleAgree = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/account/recharge', { agreement: 'yes'},
        {headers: {
          Authorization: `Bearer ${token}` // Include the token in the headers
      }
    }
      );
      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
    } finally {
      setShowModal(false); // Close the modal after agreement or error occurs
    }
  };

  const handleClose = () => {
    setShowModal(false); // Close modal when user declines
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <img src={coin} alt="Coin Logo" className="mx-auto mb-4 w-15 h-14"/>
      <h1 className="text-2xl font-bold mb-4">Recharge Your Coins</h1>
      <p className="mb-6">Click the button below to recharge your coins by 40.</p>
      <button
        onClick={handleRechargeClick}
        className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition"
      >
        Recharge Now
      </button>

      {/* Modal for recharge commitment */}
      <Modal show={showModal} handleClose={handleClose} handleAgree={handleAgree} />
    </div>
  );
};

