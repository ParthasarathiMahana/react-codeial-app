import PropTypes from 'prop-types';
import styles from '../styles/home.module.css';
import Comment from '../components/Comments';
import  FriendsList  from '../components/FriendList';
import CreatePost from '../components/CreatePost'
import { useState, useEffect } from 'react';
import { getPosts } from '../api';
import Loader from '../components/Loader';
import {Link} from 'react-router-dom';
import { useAuth } from '../hooks';

export const Home = () => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = useAuth();

  useEffect(()=>{
    const fetchPosts = async()=>{
      const response = await getPosts();

      if(response.success){
        setPosts(response.data.posts);
      }

      setLoading(false);
    }
    fetchPosts();
  },[]);

  if(loading){
    return <Loader />;
  }

  return (
    <div className={styles.home}>
      <div className={styles.postsList}>
      <CreatePost/>
      {posts.map((post)=>(
        <div className={styles.postWrapper} key={`post-${post._id}`}>
        <div className={styles.postHeader}>
          <div className={styles.postAvatar}>
            <img
              src="https://www.svgrepo.com/show/416634/user-profile-avatar.svg"
              alt="user-pic"
            />
            <div>
              <Link to={ `/user/${post.user._id}`} state={{user: post.user}}
              className={styles.postAuthor}>{post.user.name}</Link>
              <span className={styles.postTime}>a minute ago</span>
            </div>
          </div>
          <div className={styles.postContent}>{post.content}</div>

          <div className={styles.postActions}>
            <div className={styles.postLike}>
              <img
                src="https://www.svgrepo.com/show/513857/thumbs-up.svg"
                alt="likes-icon"
              />
              <span>5</span>
            </div>

            <div className={styles.postCommentsIcon}>
              <img
                src="https://www.svgrepo.com/show/506252/message-square.svg"
                alt="comments-icon"
              />
              <span>2</span>
            </div>
          </div>
          <div className={styles.postCommentBox}>
            <input placeholder="Start typing a comment" />
          </div>

          <div className={styles.postCommentsList}>
            {post.comments.map((comment)=>{
              return <Comment comment={comment}/>
            })}
            {console.log(post)}
          </div>
        </div>
      </div>
      ))}
    </div>
    {auth.user && <FriendsList />}
    </div>
  );
};

Home.propTypes = {
  posts: PropTypes.array.isRequired
}