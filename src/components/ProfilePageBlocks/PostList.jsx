import styles from '../../styles/Profile.module.css';
import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { themeDetails, userDetails } from '../../Hooks/ContextProvider';
import { DarkMode, LiteMode } from '../../theme/themeColors';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { MdAutoDelete, MdDelete } from 'react-icons/md';
import { FiEdit3 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { getPostOfUser, deletePost } from '../../api/posts'
import { ConfirmationBlock } from '../ConfirmationBlock';
import { useGetTime } from '../../Hooks/useTime';
// import styled from 'styled-components'

export const PostsList = (props) => {
  let { user } = useContext(userDetails);

  const postsListQuery = useQuery({
    queryKey: ['posts', props.type],
    enabled: user !== null,
    queryFn: () => getPostOfUser(user, props.type),
    staleTime: 5 * 60 * 1000
  })
  if (postsListQuery.isLoading) {
    return <p>Loading</p>
  }
  return (
    <div className={styles.ListBlockBox} >
      <div id="NewPostMessage" className={styles.userMessage}>{postsListQuery.data?.message}</div>
      {postsListQuery.isSuccess && postsListQuery.data.result && postsListQuery.data.posts.map((element) => {
        return <PostListBox key={element._id} post={element} type={props.type} />
      })}
    </div>
  )
}

export const PostListBox = (props) => {
  const navigator = useNavigate()
  let { user } = useContext(userDetails);
  const [showConfirmation, setShowConfirmation] = useState(false);
  let { theme } = useContext(themeDetails)
  let { third } = theme ? DarkMode : LiteMode;

  let { post, type } = props;
  const queryClient = useQueryClient()

  const deletePostMutation = useMutation({
    mutationFn: (variables) => deletePost(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    }

  })

  const handleEdit = (e) => {
    e.stopPropagation()

  }
  const handleDelete = (e) => {
    e.stopPropagation()
    setShowConfirmation(true)
  }
  const handlePostNavigation = () => {
    navigator(`/post/${post._id}`)
  }

  return (
    <>
      <div className={styles.ListBlock} style={{ border: `1px solid ${third}` }}>
        <div className={styles.imageBox} onClick={handlePostNavigation}>
          <img src={`${import.meta.env.VITE_BACKEND_LINK}/images/${post.image || 'blog.png'}`} alt="Cover Image" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>
        <div className={styles.listBlockContent}>
          <div className={styles.listBlocktitle} onClick={handlePostNavigation}>
            {post.title}
          </div>
          <div className={styles.listBlockText} onClick={handlePostNavigation}>
            {post.text}
          </div>
          <div className={styles.listBlockDate}>
            Posted on - {useGetTime(post.createdAt)}
          </div>
          <div className={styles.listBlockHead} onClick={(e) => e.stopPropagation()}>
            {type == "/home" &&
              <><button className={styles.editBTN + " " + styles.BTNStyle} onClick={handleEdit} >
                <FiEdit3 />
              </button>
                <button className={styles.deleteBTN + " " + styles.BTNStyle} onClick={(e) => deletePostMutation.status !== 'pending' && handleDelete(e)} >
                  {deletePostMutation.status !== 'pending' ? <MdDelete /> : <MdAutoDelete />}
                </button>
              </>}
          </div>
        </div>
      </div>
      {showConfirmation && <ConfirmationBlock setShowConfirmation={setShowConfirmation} yesFunction={() => deletePostMutation.mutate({ post, user })} />}
    </>
  )
}
PostListBox.propTypes = {
  post: PropTypes.object,
  type: PropTypes.string

}
PostsList.propTypes = {
  type: PropTypes.string
}