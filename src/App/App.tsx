
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "@/components/HomePage";
import RegisteredUsers from "@/components/RegisteredUsers";
import Login from "@/components/Login";
import Signup from "@/components/SignUp";
import MovieList from "@/components/MovieList";

const App: React.FC = () => {

  return (
    <div className="bg-[#191818]">
      <Router>
        <Routes>
          
          <Route path="/" element={<HomePage />} />
          <Route
            path="/SignIn"
            element={
              <Signup/>}
          />

          <Route
            path="/UserDetails"
            element={
              <RegisteredUsers/>
            }
          />
          <Route path="/MovieList" element={<MovieList />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
};

export { App };
