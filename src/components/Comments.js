import {PropTypes} from 'prop-types';
import styles from '../styles/home.module.css';

const comments = ({comment})=>{
    return(
        <div className={styles.postCommentsList}>
            <div className={styles.postCommentsItem}>
              <div className={styles.postCommentHeader}>
                <span className={styles.postCommentAuthor}>{comment.user.name}</span>
                <span className={styles.postCommentTime}>a minute ago</span>
                <span className={styles.postCommentLikes}>22</span>
              </div>

              <div className={styles.postCommentContent}>{comment.content}</div>
            </div>
          </div>
    );
};

Comment.propTypes = {
    comment: PropTypes.object.isRequired
}

export default comments;