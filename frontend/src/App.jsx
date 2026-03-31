import {BrowserRouter , Routes , Route , Navigate} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { useAuth } from "./hooks/useAuth.js";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import Home from "./pages/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import Connect from "./pages/Connect.jsx";

const ProtectedRoute = ({children}) => {
  const {user , loading} = useAuth();

  if(loading) return <div>Loading....</div>
  if(!user) return <Navigate to="/login" />;

  return children;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/connect" element={<Connect  />} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile/>
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

// import React from "react";
// import UserCard from "./components/UserCard.jsx";

// const user = {
//     avatar: "/images/buyer5.jpg",
//     fullname: "Krishna Sharma",
//     username: "krishna123",
//     business: "Krishna Agro Traders",
//     type: "BULK BUYER",
//     city: "Bhopal",
//     country: "India",
//     contact: "+91 9876543210",
//     about:
//       "We deal in bulk agricultural produce and connect farmers directly with large market buyers across multiple regions.",
// };

// const App = () => {
//   return (
//     <div className="min-h-screen bg-zinc-100 flex items-center justify-center p-8">
//       <div className="w-full max-w-sm">
//         <UserCard user={user} />
//       </div>
//     </div>
//   );
// };

// export default App;