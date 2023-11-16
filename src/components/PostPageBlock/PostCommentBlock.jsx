import { useContext, useMemo, useState } from 'react';
import styles from '../../styles/PostPage.module.css';
import { themeDetails, userDetails } from '../../Hooks/ContextProvider';
import { DarkMode, LiteMode } from '../../theme/themeColors';
import { postComment } from '../../api/comments';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PropTypes } from 'prop-types';

export const PostCommentBlock = (props) => {
    let { post, postQuary } = props
    let { user } = useContext(userDetails);
    let { theme } = useContext(themeDetails)
    let { text, body } = useMemo(() => theme ? DarkMode : LiteMode, [theme]);
    const queryClient = useQueryClient()

    const [content, setContent] = useState("")
    const [checks, setChecks] = useState(false)

    const titlePattern = /^(?=\S)(?=\S*\s\S)(?=.{5,100}$).+$/

    let ContentCheck01 = !titlePattern.test(content.trim());

    const commentDeleteMutation = useMutation({
        mutationFn: (variables) => postComment(variables),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments', `comments-${postQuary?.data?.post?._id}`] })
            queryClient.invalidateQueries({ queryKey: ['post', `post-${postQuary?.data?.post?._id}`] })
            queryClient.invalidateQueries({ queryKey: ['posts', '/comments'] })
            setContent("")
            setChecks(false)
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        setChecks(true)
        if (ContentCheck01) {
            return
        }
        commentDeleteMutation.mutate({ user, post, content })

    }
    const handleCancel = () => {
        setChecks(false)
        setContent("")
    }

    return (
        <div className={styles.addCommentBox}>
            <textarea name="" id="" placeholder="Write your Comment" className={styles.commenttextarea}
                style={{ backgroundColor: body, color: text }}
                value={content} onChange={(e) => setContent(e.target.value)}></textarea>
            {checks && ContentCheck01 && <div className={styles.warningLabel}>{content.trim().length} - minimum of 5 and maximum of 100 characters, no extra spacing and at least two words.</div>}
            <div> {commentDeleteMutation.isSuccess && commentDeleteMutation.data?.list?.message}</div>
            <div className={styles.commentControls}>
                <div>{user.name || user.email}</div>
                <div className={styles.BTNBox}>
                    <button type="reset" className={styles.BTN + " " + styles.cancel} style={{ color: text }}
                        onClick={handleCancel}>Cancel</button>
                    <button type="submit" className={styles.BTN + " " + styles.submit} style={{ color: text }}
                        onClick={handleSubmit} disabled={commentDeleteMutation.isPending}>Submit</button>
                </div>
            </div>
        </div>)
}

PostCommentBlock.propTypes = {
    post: PropTypes.object.isRequired,
    postQuary: PropTypes.object.isRequired
}