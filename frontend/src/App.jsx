import {BrowserRouter , Routes , Route , Navigate} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { useAuth } from "./hooks/useAuth.js";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import Home from "./pages/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import Connect from "./pages/Connect.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import Explore from "./pages/Explore.jsx";
import Footer from "./components/Footer.jsx";

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
          <Route path="/explore" element={<Explore/>} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile/>
            </ProtectedRoute>
          } />
          <Route path="/posts" element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          } />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

// import React from "react";
// import UserCard from "./components/UserCard.jsx";
// import PostCard from "./components/PostCard.jsx";

// const post = {
//     _id: "69cf80248bed6852ae5bd983",
//     createdby: {
//       _id: "69c8006082424880dcfc4120",
//       avatar: "https://res.cloudinary.com/dyvoisqoz/image/upload/v1774714976/profile_pictures/tycqdc2tbxaepfea7lmf.jpg",
//       fullname: "Adarsh Gurjar",
//       username: "adarshgurjar",
//       contact: "9244809244",
//       business: "Geetanjali Hotels"
//     },
//     title: "Organic Tomatoes and Organic Lady finger",
//     description: "Fresh red organic tomatoes and organic lady finger harvested this morning.",
//     picture: "",
//     category: "VEGETABLES",
//     quantity: 150,
//     quantityunit: "kg",
//     price: 6800,
//     views: 0,
//     likes: [],
//     comments: [],
// };
// import { BrowserRouter } from "react-router-dom";
// import CreatePost from "./pages/CreatePost.jsx";
// const App = () => {
//   return (
//     <BrowserRouter>
//       <div className="min-h-screen bg-zinc-100 flex items-center justify-center">
//         <CreatePost />
//       </div>
//     </BrowserRouter>
//   );
// };

// export default App;