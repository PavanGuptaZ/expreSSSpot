import styles from '../../styles/Profile.module.css';
import { post } from '../../assets/post';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { themeDetails } from '../../Hooks/ContextProvider';
import { DarkMode, LiteMode } from '../../theme/themeColors';

export const ProfileList = () => {

  return (
    <div className={styles.ListBlockBox} >
      <ProfileListBox post={post} />
      <ProfileListBox post={post} />
      <ProfileListBox post={post} />
      <ProfileListBox post={post} />
    </div>
  )
}

export const ProfileListBox = (props) => {
  let { theme } = useContext(themeDetails)
  let { third } = theme ? DarkMode : LiteMode;

  let { post } = props;
  console.log(post);
  return (
    <div className={styles.ListBlock} style={{border:`1px solid ${third}`}}>
      <div className={styles.imageBox}>
        <img src="https://source.unsplash.com/_Zua2hyvTBk" alt="Cover Image" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div className={styles.listBlockContent}>
        <div className={styles.listBlockHead}>
          {post.head}
        </div>
        <div className={styles.listBlockText}>
          {post.content}
        </div>
        <div className={styles.listBlockDate}>
          Posted on - {post.postedOn}
        </div>
      </div>
    </div>
  )
}
ProfileListBox.propTypes = {
  post: PropTypes.objectOf.isRequired
}