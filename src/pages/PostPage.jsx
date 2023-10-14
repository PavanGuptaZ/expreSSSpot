import { useParams } from "react-router-dom";
import { post } from '../assets/post';
import styles from '../styles/PostPage.module.css'

export const PostPage = () => {
  let { id } = useParams()
  console.log(post);
  return (
    <div className={styles.postPageBox}>
      <div className={styles.postId}>
        {id}
      </div>
      <div className={styles.postTitle}>
        {post.head}
      </div>
      <div className={styles.postAuthor}>
        by {post.author}
      </div>
      <div className={styles.breakLine}></div>
      <div className={styles.postImage}>
        <img src="https://source.unsplash.com/B5PNmw5XSpk" alt="" style={{ maxWidth: "100%" }} />
      </div>
      <div className={styles.breakLine}></div>
      <div className={styles.postContent}>
        {post.content}
      </div>
      <div className={styles.postPostedOn}>
        {post.postedOn}
      </div>
    </div>
  )
}
