import { useContext, useMemo, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/ExpressSpot.png';
import { VscColorMode } from 'react-icons/vsc';
import { MdOutlineLightMode } from 'react-icons/md';
import { TbLayoutNavbarCollapseFilled, TbLayoutNavbarExpandFilled } from 'react-icons/tb';
import { themeDetails, userDetails } from '../Hooks/ContextProvider';
import { LiteMode, DarkMode } from '../theme/themeColors';

export const NavBar = () => {
  let { theme, setTheme } = useContext(themeDetails)
  let { user, setUser } = useContext(userDetails)
  let { body, text, main } = useMemo(() => theme ? DarkMode : LiteMode, [theme]);
  const [displayNav, setDisplayNav] = useState(false);
  const Navigate = useNavigate()
  const toggleMode = () => {
    setDisplayNav(pre => !pre)
  }
  const Border = {
    border: `1px solid ${text}`
  }
  const handleLogout = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    }
    try {
      const responce = await fetch(import.meta.env.VITE_BACKEND_LINK + '/auth/logout', requestOptions)
      const data = await responce.json()
      console.log(data.message)
    } catch (err) {
      console.log(err)
    }
    finally {
      setUser(null)
      Navigate("/")
    }
  }
  return (
    <nav style={{ backgroundColor: body }}>
      <div className='logoBox V-flex' onClick={() => Navigate("/")}>
        <img src={logo} alt="" className='logo' />
        <span className='title' style={{ color: text }}>
          expreSSSpot
        </span>
      </div>
      <div className={`navLinkBox ${displayNav ? "active" : ""}`} style={{ color: text }}>
        {
          user !== null ?
            <>
              <NavLink to="/profile" className='navlink' style={Border} onClick={() => setDisplayNav(false)}>Profile</NavLink>
              <NavLink to="new" className='navlink' style={Border} onClick={() => setDisplayNav(false)}>NewPost</NavLink>
              <Link className='navlink' style={Border} onClick={handleLogout}>Logout</Link>
            </>
            :
            <>
              <NavLink to="/login" className='navlink' style={Border} onClick={() => setDisplayNav(false)}>Login</NavLink>
              <NavLink to="register" className='navlink' style={Border} onClick={() => setDisplayNav(false)}>Register</NavLink>
            </>
        }
        <TbLayoutNavbarCollapseFilled className='displayNavBtn' style={{ color: text }} onClick={toggleMode} />
      </div>
      <div className='V-flex'>
        <TbLayoutNavbarExpandFilled className='displayNavBtn' style={{ color: text }} onClick={toggleMode} />
        <button className='modeButton' onClick={() => setTheme(!theme)}
          style={{ border: `1px solid ${text}`, background: main }}>
          {theme ? <MdOutlineLightMode className='iconMode' /> : <VscColorMode className='iconMode' />}
        </button>
      </div>
    </nav>
  )
}
