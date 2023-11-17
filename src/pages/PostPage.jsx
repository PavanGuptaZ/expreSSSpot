import { useNavigate, useParams } from "react-router-dom";
import styles from '../styles/PostPage.module.css';
import { themeDetails, userDetails } from '../Hooks/ContextProvider';
import { useContext } from "react";
import { CommentBlock, PostCommentBlock } from "../components";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { bookmarkPost, fetchPost, likePost } from '../api/posts'
import { fetchCommentsByPostId } from '../api/comments'
import { LoginForm } from "./LoginForm";
import { LoadingComponent } from "../components";
import { PagenotFound } from "./index"
import { GetTime } from "../Hooks/useTime";
import { IoBookmarkOutline, IoBookmarkSharp } from 'react-icons/io5'
import { FcLikePlaceholder, FcLike } from 'react-icons/fc'
import { DarkMode, LiteMode } from "../theme/themeColors";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const PostPage = () => {
  let { id } = useParams()
  let { user, fetching } = useContext(userDetails);
  let { theme } = useContext(themeDetails)
  let { text } = theme ? DarkMode : LiteMode;

  const queryClient = useQueryClient()
  const navigator = useNavigate()

  const postQuary = useQuery({
    queryKey: ['post', `post-${id}`],
    queryFn: () => fetchPost(user, id),
    enabled: user !== null,
    staleTime: 5 * 60 * 1000
  })

  const commentQuary = useQuery({
    queryKey: ['comments', `comments-${postQuary?.data?.post?._id}`],
    enabled: postQuary.data?.post?._id !== null && postQuary.data?.post?._id !== undefined,
    queryFn: () => fetchCommentsByPostId(user, postQuary?.data?.post?._id),
    staleTime: 5 * 60 * 1000
  })
  const likePostMutation = useMutation({
    mutationKey: ['likeThePost'],
    mutationFn: (variables) => likePost(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', `post-${id}`] })
      queryClient.invalidateQueries({ queryKey: ['posts', '/likes'] })
    },
  })
  const bookmarkPostMutation = useMutation({
    mutationKey: ['bookmarkThePost'],
    mutationFn: (variables) => bookmarkPost(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
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
      <div className={styles.postAuthor} onClick={() => navigator(`/user/${post.userId}`)}>
        by {post.name}
      </div>
      <div className={styles.postControls}>
        {post?.likedBy.length}
        {likePostMutation.status === 'pending' || postQuary.isFetching ? <div className="loading" ><AiOutlineLoading3Quarters color={text} className="loading-icon" /> </div> :
          <button className={styles.likeBox} disabled={likePostMutation.status === 'pending' || postQuary.isFetching}
            onClick={() => likePostMutation.mutate({ post, user })}>
            {post.likedBy.includes(user._id) ? <FcLike /> : <FcLikePlaceholder />}
          </button>}
        {bookmarkPostMutation.status === 'pending' || fetching ? <div className="loading" ><AiOutlineLoading3Quarters color={text} className="loading-icon" /> </div> :
          <button className={styles.bookmarkBox} disabled={bookmarkPostMutation.status === 'pending' || fetching}
            onClick={() => bookmarkPostMutation.mutate({ post, user })}>
            {user.bookmarks.includes(post._id) ? <IoBookmarkSharp /> : <IoBookmarkOutline color={text} />}
          </button>}
      </div>
      <div className={styles.breakLine}></div>
      <div className={styles.postImage}>
        <img src={`${import.meta.env.VITE_BACKEND_LINK}/images/${post.image || 'blog.png'}`} alt="" style={{ maxWidth: "100%", maxHeight: "100%" }} />
      </div>
      <div className={styles.breakLine}></div>
      <div className={styles.postContent}>
        {post.text.split('\n').map((paragraph, i) => (
          <p key={i} className={styles.paragraph}>{paragraph}</p>
        ))}
      </div>
      <div className={styles.postPostedOn}>
        {GetTime(post.updatedAt)}
      </div>
      <PostCommentBlock post={post} postQuary={postQuary} />
      {commentQuary.data?.result === true ?
        commentQuary.data?.list?.map((eachComment) => {
          return <CommentBlock key={eachComment._id} eachComment={eachComment} />
        })
        : <h3>No comments Found</h3>
      }
    </div>
  )
}
