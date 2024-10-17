import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react"; // Add lazy loading for components
import Loading from "@/components/Loading";

// Lazy load components for performance optimization
const HomePage = lazy(() => import("@/components/HomePage"));
const RegisteredUsers = lazy(() => import("@/components/RegisteredUsers"));
const Login = lazy(() => import("@/components/Login"));
const Signup = lazy(() => import("@/components/SignUp"));
const MovieList = lazy(() => import("@/components/MovieList"));
const EditUser = lazy(() => import("@/components/EditUser"));

const App: React.FC = () => {
  return (
    <div className="bg-[#191818] min-h-screen text-white">
      <Router>
        <Suspense fallback={<Loading />}> {/* Loading fallback */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<Signup />} />
            <Route path="/userdetails" element={<RegisteredUsers />} />
            <Route path="/MovieList" element={<MovieList />} />
            <Route path="/edit-user/:id" element={<EditUser />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
};

export { App };
