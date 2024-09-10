import {Link} from "react-router-dom"
import Finder from "../assets/Finder.svg"
import Coin from "../assets/Coin.svg"
import axios from "axios"
import { useEffect, useState } from "react"
export function Appbar(){
    const[coins,setCoins]=useState(0);
    const token=localStorage.getItem("token");
    useEffect(()=>{
        const fetchCoins = async () => {
          if (!token) {
            console.error("No token found");
            return;
        }
            try {
              const response = await axios.get("http://localhost:3000/api/v1/account/coins",{
                headers: {
                  Authorization: `Bearer ${token}` // Include token in headers
              }
              });
              setCoins(response.data.Coins);
            } catch (error) {
              console.error("Error fetching coins:", error.response ? error.response.data : error.message);
            }
          };
        
          fetchCoins();
    },[token])
    return(
        <div className="flex h-15 justify-between bg-black">
            <div className="flex flex-col justify-center h-21 w-20 ml-8">
              <Link to="/Dashboard"><img src={Finder} className="w-14 h-14"/></Link>
            </div>
            <div className="flex pt-5 px-5  h-full text-green-300">
                <Link className="font-bold flex flex-col justify-center px-5 hover:underline hover:text-green-500" to="/Recharge">
                Recharge 
                </Link>
                <Link className="font-bold flex flex-col justify-center px-5 hover:underline hover:text-green-500" to="/SearchChannel">
                SearchChannels 
                </Link>
                <Link className="font-bold flex flex-col justify-center px-5 hover:underline hover:text-green-500" to="/About">
                About 
                </Link>
                <Link className="font-bold flex flex-col justify-center hover:underline hover:text-green-500" to="/signout">
                Signout
                </Link>
                <div className="flex  items-center px-5">
                    <img src={Coin} alt="Coin Icon" className="w-5 h-5 "/>
                    <div className="text-white ml-2">{coins}</div>
                 </div>
            </div>
        </div>
    )
}