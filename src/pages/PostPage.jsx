import { useParams } from "react-router-dom";
import { post } from '../assets/post';
import styles from '../styles/PostPage.module.css';
import { themeDetails } from '../Hooks/ContextProvider';
import { DarkMode, LiteMode } from '../theme/themeColors';
import { useContext, useMemo } from "react";
import { CommentBlock } from "../components/CommentBlock";


export const PostPage = () => {
  let { theme } = useContext(themeDetails)
  let { text, body } = useMemo(() => theme ? DarkMode : LiteMode, [theme]);

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
      <div className={styles.addCommentBox}>
        <textarea name="" id="" placeholder="Write your Comment" className={styles.commenttextarea}
          style={{ backgroundColor: body, color: text }}></textarea>
        <div className={styles.commentControls}>
          <div>Name</div>
          <div>
            <button className={styles.BTN + " " + styles.cancel} style={{ color: text }}>Cancel</button>
            <button className={styles.BTN + " " + styles.submit} style={{ color: text }}>Submit</button>
          </div>
        </div>
      </div>
      <CommentBlock/>
    </div>
  )
}
