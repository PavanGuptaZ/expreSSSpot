import { useContext, useMemo } from "react";
import { themeDetails, userDetails } from '../Hooks/ContextProvider';
import { LiteMode, DarkMode } from '../theme/themeColors';
import logo from '../assets/ExpressSpot.png';
import { Link, useNavigate } from "react-router-dom";
import { AiFillFacebook, AiFillLinkedin, AiOutlineTwitter } from 'react-icons/ai'


export const Footer = () => {
  let { theme } = useContext(themeDetails)
  let { user, setUser } = useContext(userDetails)
  const Navigate = useNavigate()
  let { text } = useMemo(() => theme ? DarkMode : LiteMode, [theme]);

  const handleLogout = () => {
    setUser(pre => !pre)
    navigator("/")
  }

  const Style01 = {
    border: `0px solid ${text}`,
    color: text
  }
  return (
    <div className="footerBox" style={{ color: text }}>
      <div className='logoBox V-flex' onClick={() => Navigate("/")}>
        <img src={logo} alt="" className='logo' />
        <span className='title' style={{ color: text }}>
          expreSSSpot
        </span>
      </div>
      <div className="footerLinkBox">
        {
          user == true ?
            <>
              <Link to="/profile" className='Link' style={Style01} >Profile</Link>
              <Link to="new" className='Link' style={Style01} >NewPost</Link>
              <Link className='Link' style={Style01} onClick={handleLogout}>Logout</Link>
            </>
            :
            <>
              <Link to="/login" className='Link' style={Style01} >Login</Link>
              <Link to="register" className='Link' style={Style01} >Register</Link>
            </>
        }
      </div>
      <div className="socialLinksBox">
        <div className="linkdiv" style={{color:text}}><AiFillFacebook /></div>
        <div className="linkdiv" style={{color:text}}><AiOutlineTwitter /></div>
        <div className="linkdiv" style={{color:text}}><AiFillLinkedin /></div>
      </div>
    </div>
  )
}
