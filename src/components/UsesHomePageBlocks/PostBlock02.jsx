
import { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { themeDetails } from '../../Hooks/ContextProvider';
import { post } from '../../assets/post';
import { DarkMode, LiteMode } from '../../theme/themeColors';
import styles from '../../styles/userHomePage.module.css';

export const PostBlock02 = (props) => {
  let { theme } = useContext(themeDetails)
  let { secondry } = useMemo(() => theme ? DarkMode : LiteMode, [theme]);
  return (
    <div className={styles[props.typeBlock]} style={{background: secondry }}>
      <div className={styles.newsImage}>
        <img src="https://source.unsplash.com/WYd_PkCa1BY" alt="" style={{maxWidth:"100%"}} />
      </div>
      <div className={styles.head02}>{post.head.slice(0, 50)}{post.head.length > 50 && "..."}</div>
      <div className={styles.content02}> {post.content.slice(0, 50)}{post.content.length > 50 && "..."} </div>
      <div className='V-flexJustifyEnd' style={{fontSize:"0.75rem"}}>
        <div className={styles.author}> {post.author}</div>
      </div>
    </div>
  )
}
PostBlock02.propTypes = {
  typeBlock : PropTypes.string.isRequired
}