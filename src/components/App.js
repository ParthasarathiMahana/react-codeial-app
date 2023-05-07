import { getPosts } from "../api";
import {useEffect} from 'react';

function App() {

  useEffect(()=>{
    const fetchPosts = async()=>{
      const response = await getPosts();
      console.log('response', response);
    }
    fetchPosts();
  },[])

  return (
    <div>
      <h1>Hello World.</h1>
    </div>
  );
}

export default App;
