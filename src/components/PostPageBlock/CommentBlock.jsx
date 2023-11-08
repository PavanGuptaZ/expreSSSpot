import { MdModeEditOutline, MdOutlineDelete } from "react-icons/md";
import styles from '../../styles/PostPage.module.css';
import PropTypes from 'prop-types';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "../../api/comments";
import { useContext } from "react";
import { userDetails } from "../../Hooks/ContextProvider";

export const CommentBlock = (props) => {
  let { eachComment, postQuary } = props
  let { user } = useContext(userDetails);
  const queryClient = useQueryClient()

  const commentDeleteMutation = useMutation({
    mutationFn: (variables) => deleteComment(variables),
    onSuccess: () => {
      queryClient.invalidateQueries([`comments-${postQuary?.data?.post?._id}`])
    }
  })
  const handleEditComment = () => {
    console.log("Edit")
  }
  const handleDeleteComment = () => {
    commentDeleteMutation.mutate({ user, _id: eachComment._id })
  }
  return (
    <div className={styles.commentBox}>
      <div className={styles.commentHead}>
        <div className={styles.profileImg}>
          <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="" width={"100%"} />
        </div>
        <div className={styles.userDetails}>
          <div className={styles.userName}>
            {eachComment.name}
          </div>
          <div className={styles.time}>
            {eachComment.updatedAt}
          </div>
        </div>
      </div>
      <div className={styles.commentText}>
        {eachComment.content}
      </div>
      <div className={styles.commentControls}>
        <button className={styles.BTNStyle + " " + styles.editBTN} onClick={handleEditComment}>
          <MdModeEditOutline />
        </button>
        <button className={styles.BTNStyle + " " + styles.deleteBTN} onClick={handleDeleteComment}>
          <MdOutlineDelete />
        </button>
      </div>
    </div>)
}

CommentBlock.propTypes = {
  eachComment: PropTypes.object.isRequired,
  postQuary: PropTypes.object.isRequired
}