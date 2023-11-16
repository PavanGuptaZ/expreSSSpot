import { MdModeEditOutline, MdOutlineDelete } from "react-icons/md";
import styles from '../../styles/PostPage.module.css';
import PropTypes from 'prop-types';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "../../api/comments";
import { useContext, useState } from "react";
import { userDetails } from "../../Hooks/ContextProvider";
import { useGetTime } from "../../Hooks/useTime";
import { ConfirmationBlock } from "../ConfirmationBlock";



export const CommentBlock = (props) => {
  let { eachComment } = props
  let { user } = useContext(userDetails);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const queryClient = useQueryClient()

  const commentDeleteMutation = useMutation({
    mutationFn: (variables) => deleteComment(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', `comments-${eachComment.commentPostId}`], exact: true })
      queryClient.invalidateQueries({ queryKey: ['post', `post-${eachComment.commentPostId}`] })
      queryClient.invalidateQueries({ queryKey: ['posts', '/comments'] })
    }
  })
  const handleEditComment = () => {
    console.log("Edit")
  }
  const handleDeleteComment = () => {
    setShowConfirmation(true)
  }
  return (
    <div className={styles.commentBox}>
      <div className={styles.commentHead}>
        <div className={styles.profileImg}>
          <img src={import.meta.env.VITE_BACKEND_LINK + '/images/profile/' + (eachComment.profilePic.startsWith('profile') ? 'profile_pic.png' : eachComment.profilePic)}
            alt="Profile Pic" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div className={styles.userDetails}>
          <div className={styles.userName}>
            {eachComment.name}
          </div>
          <div className={styles.time}>
            {useGetTime(eachComment.updatedAt)}
          </div>
        </div>
      </div>
      <div className={styles.commentText}>
        {eachComment.content}
      </div>
      <div className={styles.commentControls}>
        {eachComment.commentUserId == user._id && <button className={styles.BTNStyle + " " + styles.editBTN} onClick={handleEditComment}>
          <MdModeEditOutline />
        </button>}
        {(eachComment.commentUserId == user._id || eachComment.commentOwner == user._id) && <button className={styles.BTNStyle + " " + styles.deleteBTN} onClick={handleDeleteComment}>
          <MdOutlineDelete />
        </button>}
      </div>
      {showConfirmation && <ConfirmationBlock setShowConfirmation={setShowConfirmation} yesFunction={() => commentDeleteMutation.mutate({ user, _id: eachComment._id })} />}

    </div>)
}

CommentBlock.propTypes = {
  eachComment: PropTypes.object.isRequired,
}