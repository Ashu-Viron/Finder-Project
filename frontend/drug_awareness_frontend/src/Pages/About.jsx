import { Link } from "react-router-dom"
import { Appbar } from "../components/Appbar"

export function About(){
    return (
        <div className="min-h-screen bg-gray-900 text-white">
      <Appbar />
      
      <div className="flex flex-col justify-center items-center h-full text-center px-8 py-16">
        <h1 className="text-5xl font-bold text-green-500 mb-6">
          About Our Mission
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl leading-relaxed mb-6">
          Our platform is dedicated to identifying and combating drug-related activities 
          on Telegram. By leveraging cutting-edge Natural Language Processing (NLP) technology 
          in Python, our system analyzes the contents of Telegram channels to determine whether 
          they are involved in illicit activities. Simply enter the channel you're curious about, 
          and we will provide a detailed analysis.
        </p>
        <p className="text-lg text-gray-300 max-w-3xl leading-relaxed mb-10">
          Our goal is to ensure the safety of communities and promote transparency in the 
          fight against drug trafficking. Join us and stay informed!
        </p>
        
        <div className="flex space-x-4">
         <Link to="/SearchChannel"> <button className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-full text-lg font-semibold transition duration-300">
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
