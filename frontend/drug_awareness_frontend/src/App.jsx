import React from "react"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import {Signup} from "./Pages/Signup"
import {Signin} from "./Pages/Signin"
import {Dashboard} from "./Pages/Dashboard"
import {Recharge} from "./Pages/Recharge"
import {About} from "./Pages/About"
import {SearchChannel} from "./Pages/SearchChannel"
import { Signout } from "./Pages/Signout"
function App() {

  return (
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Signup/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/Dashboard" element={<Dashboard/>}/>
      <Route path="/Recharge" element={<Recharge/>}/>
      <Route path="/About" element={<About/>}/>
      <Route path="/signout" element={<Signout/>}/>
      <Route path="/SearchChannel" element={<SearchChannel/>}/>
     </Routes>
     </BrowserRouter>
  )
}

export default App
