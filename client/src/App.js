import React, { useEffect, useState } from "react";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Notes from "./Pages/Notes/Notes";
import Error from "./Pages/Error/Error";
import NavBr from "./Components/NavBr/NavBr";
import Footer from "./Components/Footer/Footer";
import { useDispatch } from "react-redux";
import { current } from "./JS/Actions/user";
import CreateNote from "./Pages/CreateNote/CreateNote";
import UpdateNote from "./Pages/UpdateNote/UpdateNote";
import Profile from "./Pages/Profile/Profile";
import Admin from "./Pages/Admin/Admin";

function App() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(current());
    }
  }, [dispatch]);

  return (
    <div className="App">
      <NavBr setSearch={setSearch} />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add" element={<CreateNote />} />
          <Route path="/notes" element={<Notes search={search} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/notes/:id" element={<UpdateNote />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer transition={Flip} />
    </div>
  );
}

export default App;
