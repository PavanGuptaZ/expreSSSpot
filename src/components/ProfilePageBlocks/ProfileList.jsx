import styles from '../../styles/Profile.module.css';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { themeDetails, userDetails } from '../../Hooks/ContextProvider';
import { DarkMode, LiteMode } from '../../theme/themeColors';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { MdDelete } from 'react-icons/md';
import { FiEdit3 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { getPostByUserName, deletePost } from '../../api/posts'

export const ProfileList = (props) => {
  let { user } = useContext(userDetails);

  const postsQuery = useQuery({
    queryKey: ['posts', props.type],
    enabled: user !== null,
    queryFn: () => getPostByUserName(user, props.type)
  })
  if (!postsQuery.isFetched) {
    <h1>Loading</h1>
  }
  return (
    <div className={styles.ListBlockBox} >
      <div id="NewPostMessage" className={styles.userMessage}>{postsQuery.data?.message}</div>
      {postsQuery.isSuccess && postsQuery.data.result && postsQuery.data.posts.map((element) => {
        return <ProfileListBox key={element._id} post={element} />
      })}
    </div>
  )
}

export const ProfileListBox = (props) => {
  const navigator = useNavigate()
  let { user } = useContext(userDetails);

  let { theme } = useContext(themeDetails)
  let { third } = theme ? DarkMode : LiteMode;

  let { post } = props;
  const queryClient = useQueryClient()

  const deletePostMutation = useMutation({
    mutationFn: (variables) => deletePost(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    }

  })

  const handleEdit = (e) => {
    e.stopPropagation()
    console.log("first")
  }
  const handleDelete = (e) => {
    e.stopPropagation()
    deletePostMutation.mutate({ post, user })

    console.log("first2")
  }
  return (
    <div className={styles.ListBlock} style={{ border: `1px solid ${third}` }} onClick={() => navigator(`/post/${post._id}`)}>
      <div className={styles.imageBox}>
        <img src={`${import.meta.env.VITE_BACKEND_LINK}/images/${post.image || 'blog.png'}`} alt="Cover Image" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div className={styles.listBlockContent}>

        <div className={styles.listBlocktitle}>
          {post.title}
        </div>
        <div className={styles.listBlockText}>
          {post.text}
        </div>
        <div className={styles.listBlockDate}>
          Posted on - {post.createdAt}
        </div>
        <div className={styles.listBlockHead}>
          <button className={styles.editBTN + " " + styles.BTNStyle} onClick={handleEdit}>
            <FiEdit3 />
          </button>
          <button className={styles.deleteBTN + " " + styles.BTNStyle} onClick={(e) => deletePostMutation.status !== 'pending' && handleDelete(e)}>
            <MdDelete />
          </button>
          {/* <MdAutoDelete /> */}

        </div>
      </div>
    </div>
  )
}
ProfileListBox.propTypes = {
  post: PropTypes.object
}
ProfileList.propTypes = {
  type: PropTypes.string
}