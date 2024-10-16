

import Login from "@/components/Login";
import MovieList from "@/components/MovieList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "@/components/SignUp";
import HomePage from "@/components/HomePage";
 
const App = () => {
  

  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Default route to Login */}
        <Route path="/movies" element={<MovieList />} />
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
       
    </div>
  )
}

export { App }
