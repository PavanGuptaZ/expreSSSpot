import { useContext } from 'react';
import { Heading, PostBlock, PostBlock02, ViewMore } from '../components';
import styles from '../styles/userHomePage.module.css';
import { themeDetails } from '../Hooks/ContextProvider';
import { DarkMode, LiteMode } from '../theme/themeColors';


export const UserHomePage = () => {
  let { theme } = useContext(themeDetails)
  let { third } = theme ? DarkMode : LiteMode;

  return (
    <>
      <div className={styles.PostBlockBox} style={{ backgroundColor: third }}>
        <Heading title="New Things" />
        <div className={styles.newPosts}>
          <PostBlock typeBlock="PostBlock01" />
          <div className={styles.newPostsAside}>
            <PostBlock typeBlock="PostBlock02" />
            <PostBlock typeBlock="PostBlock02" />
          </div>
        </div>
        <ViewMore />
      </div>
      <div className={styles.PostBlockBox} style={{ backgroundColor: third }}>
        <Heading title="Following" />
        <div className={styles.newPosts}>
          <PostBlock typeBlock="PostBlock01" />
          <div className={styles.newPostsAside}>
            <PostBlock typeBlock="PostBlock02" />
            <PostBlock typeBlock="PostBlock02" />
          </div>
        </div>
        <ViewMore />
      </div>
      <div className={styles.PostBlockBox} style={{ backgroundColor: third }}>
        <Heading title="Some" />
        <div className={styles.newPosts}>
          <PostBlock02 typeBlock="PostBlock03" />
          <PostBlock02 typeBlock="PostBlock03" />
          <PostBlock02 typeBlock="PostBlock03" />
          <PostBlock02 typeBlock="PostBlock03" />
          <PostBlock02 typeBlock="PostBlock03" />
          <PostBlock02 typeBlock="PostBlock03" />
          <PostBlock02 typeBlock="PostBlock03" />
          <PostBlock02 typeBlock="PostBlock03" />
        </div>
        <ViewMore />
      </div>
    </>
  )
}
