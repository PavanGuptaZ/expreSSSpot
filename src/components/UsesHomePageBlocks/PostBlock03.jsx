
import { useContext, useMemo } from 'react';
import { themeDetails } from '../../Hooks/ContextProvider';
import { DarkMode, LiteMode } from '../../theme/themeColors';
import styles from '../../styles/userHomePage.module.css';
import { useNavigate } from 'react-router-dom';
import PropTypes from "prop-types"

export const PostBlock03 = (props) => {
  let { theme } = useContext(themeDetails)
  let { text, secondry, main, third } = useMemo(() => theme ? DarkMode : LiteMode, [theme]);
  let navigator = useNavigate()

  const handleClick = () => {
    navigator(`/posts/${props.link}`)
  }

  return (
    <div className={styles["PostBlock04"]} style={{ background: secondry, padding: "1rem" }} >
      <div style={{ backgroundColor: third, height: "100%", width: "100%", display: "grid", placeContent: "center", padding: "0.5rem" }}>
        <button className={styles.ViewMoreBTN} onClick={handleClick} style={{ backgroundColor: main, color: text }}> View More </button>
      </div>
    </div>
  )
}
PostBlock03.propTypes = {
  link: PropTypes.string.isRequired
}