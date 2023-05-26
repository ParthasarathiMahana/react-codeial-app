import { Home } from '../pages';
import Loader from "./Loader";
import Navbar from "./Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Login from "../pages/Login";
import { useAuth } from "../hooks";
import Signup from '../pages/SignUp';
import {Setting, UserProfile} from '../pages';



function PrivateRoute({children, ...rest}){
  const auth = useAuth();

  return auth.user?children:<Navigate to ="/login"/>
  
}

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
          <Route path="/setting" element={<PrivateRoute><Setting/></PrivateRoute>} />
          <Route path="/user/:userId" element={<PrivateRoute><UserProfile/></PrivateRoute>} />
          <Route path="*" element={<Page404/>}/>
        </Routes>
      </Router>
    </div>
  );
}


export default App;
