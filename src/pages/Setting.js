import styles from '../styles/settings.module.css';
import { useState } from 'react';
import  {useAuth} from '../hooks';

const Setting = () =>{
    const auth = useAuth();
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState(auth.user?.name ? auth.user.name:''); 
    const [password, setPassword] = useState(''); 
    const [confirmPassword, setConfirmPassword] = useState(''); 
    const [savingForm, setSavingForm] = useState(false); 

    const updateProfile=()=>{};


    return(
        <div className={styles.settings}>
        <div className={styles.imgContainer}>
            <img src='' alt=''/>
        </div>

        <div className={styles.field}>
            <div className={styles.fieldName}>Email</div>
            <div className={styles.fieldValue}>{auth.user?.email}</div>
        </div>

        <div className={styles.field}>
            <div className={styles.fieldName}>Name</div>
            {editMode?
            <input type='text' value={name} onChange={(e)=>setName(e.target.value)}/>
            :<div className={styles.fieldValue}>{auth.user?.name}</div>}
        </div>

        {editMode && <>
        <div className={styles.field}>
            <div className={styles.fieldName}>Password</div>
            <input type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
        </div>

        <div className={styles.field}>
            <div className={styles.fieldName}>Confirm Password</div>
            <input type='password' value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
        </div>
        </>}

        <div className={styles.btnGrp}>
            {editMode?<>
                <button className={`button ${styles.editBtn}`} onClick={updateProfile }>
                    {savingForm?'Saving From...':'Save From'}
                </button>
            <button className={`button ${styles.editBtn}`} onClick={(e)=>setEditMode(false)}>Go Back</button>
            </>:
            <button className={`button ${styles.editBtn}`} onClick={(e)=>setEditMode(true)}>Edit Profile</button>
        }
        </div>
    </div>
    );
}

export default Setting;