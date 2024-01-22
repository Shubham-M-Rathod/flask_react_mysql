import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navigbar from "./pages/Navigbar";
import './App.css'
import Home from "./pages/Home";
import Signup from "./pages/Singup";
import Profile from "./pages/Profile";
import EditPage from "./pages/EditPage";
import Logout from "./pages/Logout";

function App() {

  return (
    <>
     <Router>
      <Navigbar />
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/signup" element={<Signup />} />
         <Route path="/profile/:user" element={<Profile />} />
         <Route path="/editProfile/:user" element={<EditPage />} />
         <Route path="/logout" element={<Logout />} />
       </Routes>
     </Router>
    </>
  )
}

export default App
