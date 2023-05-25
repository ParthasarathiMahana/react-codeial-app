import styles from '../styles/settings.module.css';
import { useState } from 'react';
import  {useAuth} from '../hooks';
import toast from 'react-hot-toast';


const Setting = () =>{
    const auth = useAuth();
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState(auth.user?.name ? auth.user.name:''); 
    const [password, setPassword] = useState(''); 
    const [confirmPassword, setConfirmPassword] = useState(''); 
    const [savingForm, setSavingForm] = useState(false);
    
    const clearForm = () =>{
        setPassword("");
        setConfirmPassword("");
    }

    const updateProfile=async()=>{
        setSavingForm(true);
        
        let error = false;
        if(!name || !password || !confirmPassword){
            toast.error("Please fill all the fields.")
            error = true;
        }

        if(password !== confirmPassword){
            toast.error("Password does not match.")
            error = true;
        }

        if(error){
            return setSavingForm(false);
        }

        const response = await auth.updateUser(auth.user._id, name, password, confirmPassword);

        if(response.success){
            setEditMode(false);
            setSavingForm(false);
            clearForm();

            return toast.success("user updated successfully!!!")
        }
        else{
            return toast.error("Error while updating the user.")
        }

        setSavingForm(false);
    };


    return(
        <div className={styles.settings}>
        <div className={styles.imgContainer}>
            <img src='https://www.svgrepo.com/show/416634/user-profile-avatar.svg' alt=''/>
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
                <button className={`button ${styles.editBtn}`} onClick={updateProfile } disabled={savingForm}>
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