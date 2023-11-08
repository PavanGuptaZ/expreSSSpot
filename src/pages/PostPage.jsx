import { useParams } from "react-router-dom";
import styles from '../styles/PostPage.module.css';
import { userDetails } from '../Hooks/ContextProvider';
import { useContext } from "react";
import { CommentBlock, PostCommentBlock } from "../components";
import { useQuery } from '@tanstack/react-query';
import { fetchPost } from '../api/posts'
import { fetchCommentsByPostId } from '../api/comments'
import { LoginForm } from "./LoginForm";
import { LoadingComponent } from "../components";
import { PagenotFound } from "./index"

export const PostPage = () => {
  let { id } = useParams()
  let { user } = useContext(userDetails);


  const postQuary = useQuery({
    queryKey: ['post', `post-${id}`],
    queryFn: () => fetchPost(user, id),
    enabled: user !== null,
  })

  const commentQuary = useQuery({
    queryKey: ['comments', `comments-${postQuary?.data?.post?._id}`],
    enabled: postQuary.data?.post?._id !== null && postQuary.data?.post?._id !== undefined,
    queryFn: () => fetchCommentsByPostId(user, postQuary?.data?.post?._id)
  })
  if (!user) {
    return <LoginForm />
  }
  if (postQuary.isLoading) {
    return <LoadingComponent />
  }
  if (!postQuary.data?.result) {
    return <PagenotFound />
  }

  let { post } = postQuary.data
  return (
    <div className={styles.postPageBox}>
      <div className={styles.postId}>
        {post._id}
      </div>
      <div className={styles.postTitle}>
        {post.title}
      </div>
      <div className={styles.postAuthor}>
        by {post.name}
      </div>
      <div className={styles.breakLine}></div>
      <div className={styles.postImage}>
        <img src={`${import.meta.env.VITE_BACKEND_LINK}/images/${post.image || 'blog.png'}`} alt="" style={{ maxWidth: "100%", maxHeight: "100%" }} />
      </div>
      <div className={styles.breakLine}></div>
      <div className={styles.postContent}>
        {post.text}
      </div>
      <div className={styles.postPostedOn}>
        {post.updatedAt}
      </div>
      <PostCommentBlock post={post} postQuary={postQuary} />
      {commentQuary.data?.result === true ?
        commentQuary.data?.list?.comments.map((eachComment) => {
          return <CommentBlock key={eachComment._id} eachComment={eachComment} postQuary={postQuary} />
        })
        : <h3>No comments Found</h3>
      }
    </div>
  )
}
