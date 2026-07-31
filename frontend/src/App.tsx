import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import { useState } from "react";
import Register from "./pages/Register";


export default function App() {

  const [loggedIn, setLoggedIn] = useState<boolean>(true);

  return(
    <>
      <div className="flex flex-col">
        <BrowserRouter>
          {loggedIn && (
            <div>
              <Navbar />
            </div>
          )}
          <div>
            <Routes>
              <Route path="/" element={<Navigate to={"/login"}/>} />
              <Route path="/home" element={<Home />} />
              <Route path="/anime" element={<Home />} />
              <Route path="/list" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        
        </BrowserRouter>
      </div>
    </>
  );

}