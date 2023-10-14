
import { useContext, useMemo } from 'react';
import styles from '../styles/Login&Register.module.css'
import { DarkMode, LiteMode } from "../theme/themeColors";
import { themeDetails, userDetails } from "../Hooks/ContextProvider";
import { Heading } from '../components'
import { AiOutlineEye, AiOutlineUser } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
  let { theme } = useContext(themeDetails)
  let { body, text, innershadow, glassBackground } = useMemo(() => theme ? DarkMode : LiteMode, [theme]);
  let { setUser } = useContext(userDetails);
  let navigator = useNavigate()

  const handleToggle = (e) => {
    let element = e.target.closest(".passwordBox").querySelector("#password")
    let att = element.getAttribute("type")
    if (att === "password") {
      element.setAttribute("type", "text")
    } else {
      element.setAttribute("type", "password")

    }
  }
  const handleLogin = () => {
    console.log("done");
    setUser(pre => !pre)
    navigator("/")
  }
  return (
    <div className={styles.loginFormBox}>
      <div className={styles.loginForm} style={{
        ...glassBackground
      }}>
        <Heading title={"Login"} />
        <div className={styles.inputdiv}>
          <label htmlFor="Email" className={styles.label}> <AiOutlineUser /></label>
          <input id='Email' className={styles.inputBox} type="email"
            placeholder='Email here'
            style={{ backgroundColor: body, boxShadow: innershadow, color: text }} />
        </div>
        <div className={`${styles.inputdiv} passwordBox`}>
          <label htmlFor="password" className={styles.label}><RiLockPasswordLine /></label>
          <input id='password' className={styles.inputBox} type="password"
            placeholder='Password here'
            style={{ backgroundColor: body, boxShadow: innershadow, color: text }} />
          <label htmlFor="password" className={styles.PasswordToggle} onClick={(e) => handleToggle(e)}>
            <AiOutlineEye />
          </label>
        </div>
        <button className={styles.submitBTN} style={{ color: text }} onClick={handleLogin}>Login</button>
      </div>
    </div>
  )
}