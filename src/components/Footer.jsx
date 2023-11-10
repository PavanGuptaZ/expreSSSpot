import { useContext, useMemo } from "react";
import { themeDetails } from '../Hooks/ContextProvider';
import { LiteMode, DarkMode } from '../theme/themeColors';
import logo from '../assets/ExpressSpot.png';
import { useNavigate } from "react-router-dom";
import { AiFillFacebook, AiFillLinkedin, AiOutlineTwitter } from 'react-icons/ai'


export const Footer = () => {
  let { theme } = useContext(themeDetails)
  const Navigate = useNavigate()
  let { text } = useMemo(() => theme ? DarkMode : LiteMode, [theme]);



  return (
    <div className="footerBox" style={{ color: text }}>
      <div className='logoBox V-flex' onClick={() => Navigate("/")}>
        <img src={logo} alt="" className='logo' />
        <span className='title' style={{ color: text }}>
          expreSSSpot
        </span>
      </div>

      <div className="socialLinksBox">
        <div className="linkdiv" style={{ color: text }}><AiFillFacebook /></div>
        <div className="linkdiv" style={{ color: text }}><AiOutlineTwitter /></div>
        <div className="linkdiv" style={{ color: text }}><AiFillLinkedin /></div>
      </div>
    </div>
  )
}
