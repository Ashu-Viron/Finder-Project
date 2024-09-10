import { useState } from "react";
import { Appbar } from "../components/Appbar";
import magn from "../assets/mag.svg"
import axios from "axios"
export function SearchChannel(){
    const token=localStorage.getItem("token");
    const [channel,setChannel]=useState("")
    const [channelData, setChannelData] = useState(null); 
  const [error, setError] = useState(null);
    const searchChannel = async () => {
        try {
          const response = await axios.get(
            "http://localhost:3000/api/v1/user/Searchchannel",
            { params: { channel } , // Send the channel name as array
              headers: {
                authorization: `Bearer ${token}`, // Include the token in the headers
              },
            }
          );
          setChannelData(response.data.channels); // Store the response data
          setError(null); // Clear any previous errors
        } catch (error) {
          if (error.response && error.response.status === 403) {
            alert(error.response.data.message); // Show the error message from the server
          } else {
            console.error(error);
            setError("An error occurred. Please try again.");
          }
        }
      };
    return(<div className="bg-gray-900 h-screen">
        <Appbar/>
        <h1 className="font-md pt-10 px-16 text-green-400">Provide Channel Name</h1>
        <div className="flex relative pt-2 px-14 h-14">
        <img src={magn} className="w-5 absolute left-20 top-8 transform -translate-y-1/2 h-5 "/>
        <div className="flex justify-center w-full">
                <input onChange={(e)=>{
                    setChannel(e.target.value)
                }} type="text" className="text-center px-2 pt-2 font-light w-full border-2 rounded-full rounded-r-none" placeholder="Search Channels..."/>
        </div>
        <button onClick={searchChannel} type="submit" className="text-white w-32 bg-green-700 hover:bg-green-800 rounded-l-none focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-blue-700 dark:focus:ring-green-800">Search</button>

    </div>
     {/* Display the channel data if it exists */}
     {channelData && (
  <div className="px-16 pt-10 text-green-400">
    <h2 className="text-xl font-semibold mb-6">Channel Information</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {channelData.map((channelInfo, index) => (
        <div 
          key={index} 
          className="bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
        >
          <h3 className="text-lg font-bold mb-2">{channelInfo.channel_name}</h3>
          <p className="text-sm mb-1">
            <span className="font-semibold">Drug Related: </span>{channelInfo.drug_related==='Yes' ? 'Yes' : 'No'}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Total Users: </span>{channelInfo.total_users}
          </p>
        </div>
      ))}
    </div>
  </div>
)}

{error && <p className="text-red-500">{error}</p>}
    </div>)
}

