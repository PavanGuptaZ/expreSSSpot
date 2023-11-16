
import { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { themeDetails } from '../../Hooks/ContextProvider';
import { DarkMode, LiteMode } from '../../theme/themeColors';
import styles from '../../styles/userHomePage.module.css';
import { useNavigate } from 'react-router-dom';

export const PostBlock02 = (props) => {
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
      <div className={styles.head02} onClick={handleClick}>{props.data.title}</div>
      <div className={styles.content02} onClick={handleClick}> {props.data.text.slice(0, 75)}{props.data.text.length > 75 && "..."} </div>
      <div className='V-flexJustifyEnd' style={{ fontSize: "0.75rem" }}>
        <div className={styles.author} onClick={handleClickUser} style={{ maxWidth: "100px" }}> {props.data.userName}</div>
      </div>
    </div>
  )
}
PostBlock02.propTypes = {
  typeBlock: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired
}