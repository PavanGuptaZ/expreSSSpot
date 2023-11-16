
import { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { themeDetails } from '../../Hooks/ContextProvider';
import { DarkMode, LiteMode } from '../../theme/themeColors';
import styles from '../../styles/userHomePage.module.css';
import { useNavigate } from 'react-router-dom';
import { useGetTime } from '../../Hooks/useTime';

export const PostBlock = (props) => {
  let { theme } = useContext(themeDetails)
  let { secondry, third } = useMemo(() => theme ? DarkMode : LiteMode, [theme]);
  let navigator = useNavigate()

  const handleClick = () => {
    navigator(`post/${props.data._id}`)
  }
  const handleClickUser = () => {
    navigator(`user/${props.data.userId}`)
  }

  return (
    <div className={styles[props.typeBlock]} style={{ background: secondry }}>
      <div className={styles.newsImage} style={{ backgroundColor: third }} onClick={handleClick}>
        <img src={`${import.meta.env.VITE_BACKEND_LINK}/images/${props.data.image || 'blog.png'}`} alt="" style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center" }} />
      </div>
      <div className={styles.head} onClick={handleClick}>{props.data.title}</div>
      <div className={styles.content} onClick={handleClick}> {props.data.text}{props.data.text.length > 100 && "..."} </div>
      <div className='V-flexJustify'>
        <div>{useGetTime(props.data.createdAt)}</div>
        <div className={styles.author} onClick={handleClickUser}>{props.data.userName}</div>
      </div>
    </div>
  )
}
PostBlock.propTypes = {
  typeBlock: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired
}