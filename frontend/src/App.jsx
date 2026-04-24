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
          <Route path="/aboutus" element={<About />} />
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
