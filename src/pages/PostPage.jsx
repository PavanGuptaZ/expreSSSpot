import { useParams } from "react-router-dom";
import styles from '../styles/PostPage.module.css';
import { themeDetails, userDetails } from '../Hooks/ContextProvider';
import { DarkMode, LiteMode } from '../theme/themeColors';
import { useContext, useEffect, useMemo, useState } from "react";
import { CommentBlock } from "../components/CommentBlock";
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchPost } from '../api/posts'
import { fetchCommentsByPostId, postComment } from '../api/comments'
import { LoginForm } from "./LoginForm";
import { LoadingComponent } from "../components";
import { PagenotFound } from "./index"

export const PostPage = () => {
  let { id } = useParams()
  let { theme } = useContext(themeDetails)
  let { text, body } = useMemo(() => theme ? DarkMode : LiteMode, [theme]);
  let { user } = useContext(userDetails);
  const [content, setContent] = useState("")
  const [checks, setChecks] = useState(false)

  const titlePattern = /^(?=\S)(?=\S*\s\S)(?=.{5,100}$).+$/

  let ContentCheck01 = !titlePattern.test(content.trim());

  const postQuary = useQuery({
    queryKey: ['post', `post-${id}`],
    queryFn: () => fetchPost(user, id),
    enabled: user !== null,
  })

  const commentQuary = useQuery({
    queryKey: ['comments', `comments-${postQuary?.data?.post?._id}`],
    enabled: postQuary?.data?.post?._id !== null,
    queryFn: () => fetchCommentsByPostId(user, postQuary?.data?.post?._id)
  })
  const commentMutation = useMutation({
    mutationFn: (variables) => postComment(variables),
  })
  useEffect(() => {
    console.log(commentMutation.data)
  }, [commentMutation])
  if (!user) {
    return <LoginForm />
  }
  if (postQuary.isLoading) {
    return <LoadingComponent />
  }
  if (!postQuary.data.result) {
    return <PagenotFound />
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setChecks(true)
    if (ContentCheck01) {
      return
    }
    commentMutation.mutate({ user, post, content })

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
      <div className={styles.addCommentBox}>

        <textarea name="" id="" placeholder="Write your Comment" className={styles.commenttextarea}
          style={{ backgroundColor: body, color: text }}
          value={content} onChange={(e) => setContent(e.target.value)}></textarea>
        {checks && ContentCheck01 && <div className={styles.warningLabel}>{content.trim().length} - minimum of 5 and maximum of 100 characters, no extra spacing and at least two words.</div>}

        <div className={styles.commentControls}>
          <div>{user.name || user.email}</div>
          <div className={styles.BTNBox}>
            <button type="reset" className={styles.BTN + " " + styles.cancel} style={{ color: text }}>Cancel</button>
            <button type="submit" className={styles.BTN + " " + styles.submit} style={{ color: text }}
              onClick={handleSubmit}>Submit</button>
          </div>
        </div>

      </div>
      {commentQuary?.data?.result === true &&
        commentQuary?.data?.data?.comments.map((ele) => {
          <CommentBlock key={ele._id} />
        })
      //   : <h3>No comments Found</h3>
      }
    </div>
  )
}
