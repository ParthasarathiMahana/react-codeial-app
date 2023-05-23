import { Home } from '../pages';
import Loader from "./Loader";
import Navbar from "./Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from "../pages/Login";
import { useAuth } from "../hooks";
import Signup from '../pages/SignUp';

const Page404 =() =>{
  return <h1>404: Error Finding the requested page.</h1>
}

function App() {
  const auth = useAuth();

  if(auth.loading){
    return <Loader />;
  }

  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="*" element={<Page404/>}/>
        </Routes>
      </Router>
    </div>
  );
}


export default App;
