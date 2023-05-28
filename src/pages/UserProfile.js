import styles from '../styles/settings.module.css';
// import { useLocation,useParams,useNavigate } from 'react-router-dom';
import { useParams,useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import  {useAuth} from '../hooks';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import {fetchUserProfile} from '../api/index';



const UserProfile = () =>{
    // const location = useLocation();
    // console.log(location);
    // const {user={}}  = location.state;

    const [user, setUser] = useState({});
    const[loading, setLoading] = useState(true);
    const {userId} = useParams();
    const navigate = useNavigate();
    const auth = useAuth();

    // console.log(userId);
    useEffect(()=>{
        const getUser = async ()=>{
            const response = await fetchUserProfile(userId);

            if(response.success){
                setUser(response.data.user);
            }
            else{
                toast.error(response.message);
                return navigate('/');
            }

            setLoading(false);
        }

        getUser();
    },[userId, navigate]);

    if(loading){
        return <Loader/>
    }

    const checkIfUserIsAFriend=()=>{
        const friends = auth.user.friendships;
        const friendIds = friends.map(friend => friend.to_user._id)
        const index = friendIds.indexOf(userId);

        if(index !== -1)
        {
            return true;
        }

        return false;
    }

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
            {checkIfUserIsAFriend()?
            <button className={`button ${styles.saveBtn}`}>Add Friend</button>:
            <button className={`button ${styles.saveBtn}`}>Add Friend</button>
        }
        </div>
    </div>
    );
}

export default UserProfile;