import styles from '../styles/login.module.css';
import {useState} from 'react';
import toast from 'react-hot-toast';
import {login} from '../api'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggingIn, setloggingIn] = useState(false);

    const handleSubmit =async (e)=>{
        e.preventDefault();

        setloggingIn(true);

        if(!email || !password){
          setloggingIn(false);
          return toast.error('Enter Both Email and Password',{
              position: 'top-left',
              duration: 4000
          });
        }

        console.log("EMAIL:",email, "PASSWORD:",password)

        const response = await login(email, password);

        if(response.success){
            toast.success('successfully logged in',{
              position: 'top-left',
              duration: 4000
          });
        }else{
            toast.error(response.message,{
              position: 'top-left',
              duration: 4000
          });
        }

        setloggingIn(false)
    }
    
  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Log In</span>

      <div className={styles.field}>
        <input type="email" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>
      </div>

      <div className={styles.field}>
        <input type="password" placeholder="Paasword" onChange={(e)=>{setPassword(e.target.value)}} />
      </div>

      <div className={styles.field}>
        <button disabled={loggingIn}>
            {loggingIn? "Logging In..." : "Log In"}</button>
      </div>
    </form>
  );
}
export default Login;