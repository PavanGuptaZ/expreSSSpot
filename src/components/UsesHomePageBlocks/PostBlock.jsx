
import { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { themeDetails } from '../../Hooks/ContextProvider';
import { post } from '../../assets/post';
import { DarkMode, LiteMode } from '../../theme/themeColors';
import styles from '../../styles/userHomePage.module.css';
import { useNavigate } from 'react-router-dom';

export const PostBlock = (props) => {
  let { theme } = useContext(themeDetails)
  let { secondry } = useMemo(() => theme ? DarkMode : LiteMode, [theme]);
  let navigator = useNavigate()

  const handleClick=()=>{
    navigator("post/5446541")
  }
  return (
    <div className={styles[props.typeBlock]} style={{background: secondry }} onClick={handleClick}>
      <div className={styles.newsImage}>
        <img src="https://source.unsplash.com/WYd_PkCa1BY" alt="" style={{maxWidth:"100%"}} />
      </div>
      <div className={styles.head}>{post.head}</div>
      <div className={styles.content}> {post.content.slice(0, 100)}{post.content.length > 100 && "..."} </div>
      <div className='V-flexJustify'>
        <div>{post.postedOn}</div>
        <div className={styles.author}>{post.author}</div>
      </div>
    </div>
  )
}
PostBlock.propTypes = {
  typeBlock : PropTypes.string.isRequired
}