
import { useContext, useMemo, useState } from 'react';
import styles from '../styles/Login&Register.module.css'
import { DarkMode, LiteMode } from "../theme/themeColors";
import { themeDetails } from "../Hooks/ContextProvider";
import { Heading } from '../components'
import { AiOutlineEye, AiOutlineUser } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
// import { useNavigate } from 'react-router-dom';


export const RegisterForm = () => {
  const [userInput, setUserInput] = useState({ email: "", password1: "", password2: "", message: "" })
  const [checks, setChecks] = useState(false)
  let { theme } = useContext(themeDetails)
  let { body, text, innershadow, glassBackground } = useMemo(() => theme ? DarkMode : LiteMode, [theme]);
  const [isloading, setIsLoading] = useState(false)

  // let navigator = useNavigate()
  const handleToggle = (e) => {
    let element = e.target.closest(".passwordBox").querySelector(".password")
    element.focus()
    let att = element.getAttribute("type")
    if (att === "password") {
      element.setAttribute("type", "text")
    } else {
      element.setAttribute("type", "password")

    }
  }
  const handleRegister = async () => {
    setChecks(true)
    let data = { email: userInput.email, password: userInput.password1 }
    if (!EmailCheck01 && !PasswordCheck01 && !PasswordCheck02) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }
      try {
        setIsLoading(true)
        await fetch(import.meta.env.VITE_BACKEND_LINK + "/register", requestOptions)
          .then((res) => res.json())
          .then((data) => {
            setUserInput((pre) => ({ ...pre, message: data.message }))
            if (data.email === userInput.email) {
              setUserInput({ email: "", password1: "", password2: "", message: "Account Created" })
              setChecks(false)
            }
          })
      } catch {
        setUserInput((pre) => ({ ...pre, message: "SomeThing Wrong Try Again" }))
      } finally {
        setIsLoading(false)
      }

    }
    // setUser(pre => !pre)
    // navigator("/")
  }
  const emailPattern = /^(?=.{5,50}$)[A-Za-z0-9._%+-]{3,40}@[A-Za-z0-9.-]+\.[A-Za-z]{2,50}$/
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@&*#$!?])[\w@&*#$!?]{3,20}$/

  let EmailCheck01 = !emailPattern.test(userInput.email);
  let PasswordCheck01 = !passwordPattern.test(userInput.password1)
  let PasswordCheck02 = userInput.password1 !== userInput.password2

  return (
    <div className={styles.submitFormBox}>
      <div className={styles.submitForm} style={{
        ...glassBackground
      }}>
        <Heading title={"Submit"} />
        <div className={styles.inputdiv}>
          <label htmlFor="Email" className={styles.label}> <AiOutlineUser /></label>
          <input id='Email' className={styles.inputBox} type="email"
            placeholder='Email here' value={userInput.email}
            onChange={(e) => setUserInput((pre) => ({ ...pre, email: (e.target.value.trim()) }))}
            style={{ backgroundColor: body, boxShadow: innershadow, color: text }} />
          {checks && EmailCheck01 && <div className={styles.warningLabel}>{userInput.email.trim().length} - min of 3 and a max of 40 characters @ total 50</div>}
        </div>
        <div className={`${styles.inputdiv} passwordBox`}>
          <label htmlFor="password" className={styles.label}><RiLockPasswordLine /></label>
          <input id='password' className={styles.inputBox + " password"} type="password"
            placeholder='Password here' value={userInput.password1}
            onChange={(e) => setUserInput((pre) => ({ ...pre, password1: e.target.value }))}
            style={{ backgroundColor: body, boxShadow: innershadow, color: text }} />
          <label htmlFor="password" className={styles.PasswordToggle} onClick={(e) => handleToggle(e)}>
            <AiOutlineEye />
          </label>
          {checks && PasswordCheck01 && <div className={styles.warningLabel}>{userInput.password1.trim().length} - no Spacing, atleast contain one captial, small letter, number and one from @, &, *, #, $, !, ? and limit of 3 to 20</div>}

        </div>
        <div className={`${styles.inputdiv} passwordBox`}>
          <label htmlFor="password02" className={styles.label}><RiLockPasswordLine /></label>
          <input id='password02' className={styles.inputBox + " password"} type="password"
            placeholder='Password here' value={userInput.password2}
            onChange={(e) => setUserInput((pre) => ({ ...pre, password2: e.target.value }))}
            style={{ backgroundColor: body, boxShadow: innershadow, color: text }} />
          <label htmlFor="password" className={styles.PasswordToggle} onClick={(e) => handleToggle(e)}>
            <AiOutlineEye />
          </label>
          {checks && PasswordCheck02 && <div className={styles.warningLabel}>Password should be same</div>}

        </div>
        <button className={styles.submitBTN} style={{ color: text }} onClick={handleRegister} disabled={isloading}>Submit</button>
        <div id="ResisterMessage">{userInput.message}</div>
        {isloading && <div className="Loading">Loading</div>}
      </div>
    </div>
  )
}
