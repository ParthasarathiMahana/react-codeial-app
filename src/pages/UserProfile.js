import styles from '../styles/settings.module.css';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import  {useAuth} from '../hooks';
import toast from 'react-hot-toast';


const UserProfile = () =>{
    const location = useLocation();
    // console.log(location);
    const {user={}}  = location.state;

    return(
        <div className={styles.settings}>
        <div className={styles.imgContainer}>
            <img src='https://www.svgrepo.com/show/416634/user-profile-avatar.svg' alt=''/>
        </div>

        <div className={styles.field}>
            <div className={styles.fieldName}>Email</div>
            <div className={styles.fieldValue}>{user.email}</div>
        </div>

        <div className={styles.field}>
            <div className={styles.fieldName}>Name</div>
            <div className={styles.fieldValue}>{user.name}</div>
        </div>

        <div className={styles.btnGrp}>
            <button className={`button ${styles.saveBtn}`}>Add Friend</button>
            <button className={`button ${styles.saveBtn}`}>Remove Friend</button>
        </div>
    </div>
    );
}

export default UserProfile;