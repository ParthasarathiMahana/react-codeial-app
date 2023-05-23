import styles from '../styles/navbar.module.css';
import { Link } from 'react-router-dom';
import {useAuth} from '../hooks';

const Navbar = () => {
    const auth = useAuth()
    return(
        <div className={styles.nav}>
            <div className={styles.leftDiv}>
                <Link to="/">
                    <img alt="" src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"/>
                </Link>
            </div>

            <div className={styles.rightNav}>
               {auth.user && <div className={styles.user}>
                    <Link to="/">
                        <img src="https://www.svgrepo.com/show/416634/user-profile-avatar.svg" alt="" className={styles.userDp}/>
                    </Link>
                    <span>{auth.user.name}</span>
                </div>}

                <div className={styles.navLinks}>
                    <ul>
                    {
                        auth.user ? 
                            (<>
                            <li>
                                <Link to="">Logout</Link>
                            </li>
                            </>):
                            (<>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            
                            <li>
                                <Link to="/signup">Register</Link>
                            </li>
                            </>)
                    }
                        
                    </ul>
                </div>
            </div>
        </div>
    )
}


export default Navbar;