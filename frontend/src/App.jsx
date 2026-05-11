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
import About from "./pages/About.jsx";
import PostCard from "./components/PostCard.jsx";
import PostDetails from "./pages/PostDetails.jsx";
import AppLayout from "./Layouts/AppLayout.jsx"
import MitraAI from "./pages/MitraAI.jsx";

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
          <AppLayout>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/connect" element={<Connect  />} />
              <Route path="/explore" element={<Explore/>} />
              <Route path="/aboutus" element={<About />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/users/:id" element={<Profile />} />
              <Route path="/posts/:id" element={<PostDetails />} />
              <Route path="/mitra" element={<MitraAI />} />
              <Route path="/posts" element={
                <ProtectedRoute>
                  <CreatePost />
                </ProtectedRoute>
              } />
            </Routes>
          </AppLayout >
        </BrowserRouter>
      </AuthProvider>
    )
  }

  export default App
