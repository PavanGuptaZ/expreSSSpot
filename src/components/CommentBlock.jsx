import { MdModeEditOutline, MdOutlineDelete } from "react-icons/md";
import styles from '../styles/PostPage.module.css';

export const CommentBlock = () => {
  return (
<div className={styles.commentBox}>
        <div className={styles.commentHead}>
          <div className={styles.profileImg}>
            <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="" width={"100%"} />
          </div>
          <div className={styles.userDetails}>
            <div className={styles.userName}>
              Sam
            </div>
            <div className={styles.time}>
              6min back
            </div>
          </div>
        </div>
        <div className={styles.commentText}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, modi? Officia quibusdam porro, illo iure beatae qui quas ad nobis, sed corporis quisquam saepe placeat eum perspiciatis, eius obcaecati. Similique.
        </div>
        <div className={styles.commentControls}>
          <MdModeEditOutline className={styles.commentBtn}/>
          <MdOutlineDelete className={styles.commentBtn}/>
        </div>
      </div>  )
}
