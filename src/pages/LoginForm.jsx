
import { useContext, useEffect, useMemo, useState } from 'react';
import styles from '../styles/Login&Register.module.css'
import { DarkMode, LiteMode } from "../theme/themeColors";
import { themeDetails, userDetails } from "../Hooks/ContextProvider";
import { Heading, LoadingComponent } from '../components'
import { AiOutlineEye, AiOutlineUser } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
  const [userInput, setUserInput] = useState({ email: "", password: "", message: "" })
  const [checks, setChecks] = useState(false)
  const [isloading, setIsLoading] = useState(false)

  let { theme } = useContext(themeDetails)
  let { body, text, innershadow, glassBackground } = useMemo(() => theme ? DarkMode : LiteMode, [theme]);
  let { user, setUser, userLoading } = useContext(userDetails);
  let navigator = useNavigate()
  useEffect(() => {
    if (user) {
      navigator("/")
    }
  })
  if (userLoading) {
    return <LoadingComponent />
  }
  const handleToggle = (e) => {
    let element = e.target.closest(".passwordBox").querySelector("#password")
    let att = element.getAttribute("type")
    if (att === "password") {
      element.setAttribute("type", "text")
    } else {
      element.setAttribute("type", "password")

    }
  }
  const handleLogin = async () => {
    setChecks(true)
    let data = { email: userInput.email, password: userInput.password }
    if (!EmailCheck01 && !PasswordCheck01) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
      }
      try {
        setIsLoading(true)
        let responce = await fetch(import.meta.env.VITE_BACKEND_LINK + "/auth", requestOptions)
        let data = await responce.json()
        setUserInput((pre) => ({ ...pre, message: data.message }))
        if (responce.status === 200) {
          setUser(data.user)
        }
      } catch {
        setUserInput((pre) => ({ ...pre, message: "SomeThing Wrong Try Again" }))
      } finally {
        setIsLoading(false)
      }

    }
  }
  const emailPattern = /^(?=.{5,50}$)[A-Za-z0-9._%+-]{3,40}@[A-Za-z0-9.-]+\.[A-Za-z]{2,50}$/
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@&*#$!?])[\w@&*#$!?]{3,20}$/

  let EmailCheck01 = !emailPattern.test(userInput.email);
  let PasswordCheck01 = !passwordPattern.test(userInput.password)

  return (
    <div className={styles.loginFormBox}>
      <div className={styles.loginForm} style={{
        ...glassBackground
      }}>
        <Heading title={"Login"} />
        <div className={styles.inputdiv}>
          <label htmlFor="Email" className={styles.label}> <AiOutlineUser /></label>
          <input id='Email' className={styles.inputBox} type="email"
            placeholder='Email here' value={userInput.email}
            onChange={(e) => setUserInput((pre) => ({ ...pre, email: e.target.value.trim() }))}
            style={{ backgroundColor: body, boxShadow: innershadow, color: text }} />
          {checks && EmailCheck01 && <div className={styles.warningLabel}>{userInput.email.trim().length} - min of 3 and a max of 40 characters @ total 50</div>}

        </div>
        <div className={`${styles.inputdiv} passwordBox`}>
          <label htmlFor="password" className={styles.label}><RiLockPasswordLine /></label>
          <input id='password' className={styles.inputBox} type="password"
            placeholder='Password here' value={userInput.password}
            onChange={(e) => setUserInput((pre) => ({ ...pre, password: e.target.value.trim() }))}
            style={{ backgroundColor: body, boxShadow: innershadow, color: text }} />
          <label htmlFor="password" className={styles.PasswordToggle} onClick={(e) => handleToggle(e)}>
            <AiOutlineEye />
          </label>
          {checks && PasswordCheck01 && <div className={styles.warningLabel}>{userInput.password.trim().length} - no Spacing, atleast contain one captial, small letter, number and one from @, &, *, #, $, !, ? and limit of 3 to 20</div>}

        </div>
        <button className={styles.submitBTN} style={{ color: text }} onClick={handleLogin} disabled={isloading}>Login</button>
        <div id="LoginMessage" className={styles.userMessage}>{userInput.message}</div>
        {isloading && <div className="Loading">Loading</div>}
      </div>
    </div>
  )
}