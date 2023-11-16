import { useContext, useMemo } from "react";
import { themeDetails } from '../Hooks/ContextProvider';
import { LiteMode, DarkMode } from '../theme/themeColors';
import logo from '../assets/ExpressSpot.png';
import { Link, useNavigate } from "react-router-dom";


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
      <Link to={'/about'} style={{ color: text }}>About Project</Link>
    </div>
  )
}
