import React from "react";
import logo from "../assets/Finder.svg"
import axios from 'axios';
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { Heading } from "../components/Heading";
export function Signout(){
    const navigate =useNavigate();
    const token=localStorage.getItem("token");
    const [username, setUsername] = useState('');

    useEffect(() => {
      // Fetch username from backend
      if (!token) {
        console.error("No token found");
        navigate("/signin"); // Redirect to sign-in if no token is found
        return;
    }

      axios.get('http://localhost:3000/api/v1/user/username',{
        headers: {
          Authorization: `Bearer ${token}` // Include the token in the headers
      }
      })
        .then((response) => {
          setUsername(response.data.username);
        })
        .catch((error) => {
          console.error('There was an error fetching the username!', error);
        });
    }, [token, navigate]);

    return(
        <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <div className="mb-6">
            {/* Logo */}
            <img src={logo} alt="App Logo" className="mx-auto mb-4 w-13 h-20" />
            <Heading label={"Logout"}/>
          </div>
          <p className="text-gray-700 mb-4">
            Hi <span className="font-bold">{username}</span>,
          </p>
          <p className="text-gray-700 mb-6">
            Are you sure you want to log out from <span className="font-bold">Finder</span>?
          </p>
          <div className="flex justify-center gap-4">
            <button type="button" onClick={()=>navigate('/Dashboard')} className="bg-gray-200 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-300 transition-colors duration-200">
              No
            </button>
            <button type="button" onClick={async()=>{
              try {
                await axios.post('http://localhost:3000/api/v1/user/signout',{}, {
                  headers: {
                      Authorization: `Bearer ${token}` // Include token in headers
                  }
              });
                localStorage.removeItem("token");
                navigate("/signin")
            }catch(error){
              console.error('Error signing out', error);
          }
          }} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Yes
            </button>
          </div>
        </div>
      </div>
    )
}