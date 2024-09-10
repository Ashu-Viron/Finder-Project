import { Appbar } from "../components/Appbar";
import backgroundImage from "../assets/inspirational.jpeg"
import { Link } from "react-router-dom";
export function Dashboard(){
    return (
        <div>
           <div className="relative z-20">
                 <Appbar />
            </div>
             {/* Hero Section */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-10"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundColor: "rgba(0, 0, 0, 0.7)", // Dark gray overlay
          backgroundBlendMode: "overlay",
        }}
      ></div>

      <div className="flex flex-col justify-center items-center h-full text-center z-10 relative pt-28">
        <h1 className="text-5xl text-green-500 font-bold mb-4">
          Say No to Drugs. Protect Your Future.
        </h1>
        <p className="text-lg text-green-300 font-light max-w-lg mb-6">
          Join us in the fight against drug-related activities. Search and
          report suspicious channels, protect your community, and stay informed.
        </p>
        <div className="flex space-x-4">
         <Link to="/SearchChannel"><button className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-full text-lg font-semibold transition duration-300">
            Start Searching
          </button></Link>
          <button className="bg-transparent border-2 border-white hover:bg-white hover:text-black px-6 py-3 rounded-full text-lg font-semibold transition duration-300">
            Learn More
          </button>
        </div>
      </div>
        </div>
    )
}