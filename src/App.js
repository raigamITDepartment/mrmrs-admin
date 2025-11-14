// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";
import Dashboard from "./Pages/Dashboard";
import Comments from "./Pages/Comments";
import RaffleDraw from "./Pages/RaffleDraw";
import Winners from "./Pages/Winners";
import History from "./Pages/History";
import Login from "./Components/Login"
import DataMigration from "./Pages/DataMigration";
import WinnerForm from "./Pages/WinnerForm";

function App() {
  return (
    <Router>
      
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/comments" element={<Comments />} />
              <Route path="/datamigration" element={<DataMigration />} />
              <Route path="/raffle" element={<RaffleDraw />} />
              <Route path="/winners" element={<Winners />} />
              <Route path="/history" element={<History />} />
              <Route path="/" element={<Login />}/>
              <Route path="/winner/:name" element={<WinnerForm />} />
            </Routes>
    </Router>
  );
}

export default App;