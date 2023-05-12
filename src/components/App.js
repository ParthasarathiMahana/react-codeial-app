import { getPosts } from "../api";
import {useEffect, useState} from 'react';
import { Home } from '../pages';
import Loader from "./Loader";
import Navbar from "./Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from "../pages/Login";


const About =()=>{
  return <h1>About</h1>
}

const Page404 =() =>{
  return <h1>404: Error Finding the requested page.</h1>
}

function App() {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchPosts = async()=>{
      const response = await getPosts();

      if(response.success){
        setPosts(response.data.posts);
      }

      setLoading(false);
    }
    fetchPosts();
  },[])

  if(loading){
    return <Loader />;
  }

  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home posts={posts}/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="*" element={<Page404/>}/>
        </Routes>
      </Router>
    </div>
  );
}


export default App;
