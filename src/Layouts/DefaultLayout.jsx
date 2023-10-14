import { useContext, useMemo } from 'react';
import { LoginForm, PagenotFound, RegisterForm, WebsiteHome } from '../pages'
import { Routes, Route } from 'react-router-dom'
import { themeDetails } from '../Hooks/ContextProvider';
import { DarkMode, LiteMode } from '../theme/themeColors';


export const DefaultLayout = () => {
  let { theme } = useContext(themeDetails)
  let { text } = useMemo(() => theme ? DarkMode : LiteMode, [theme]);

  return (
    <div style={{ maxWidth: "1040px", width: "100%", margin: "0 auto", color: text }}>
      <Routes>
        <Route path='/' element={<WebsiteHome/>}/>
        <Route path='/login' element={<LoginForm/>}/>
        <Route path='/register' element={<RegisterForm/>}/>
        <Route path='*' element={<PagenotFound/>}/>
      </Routes>
    </div>
  )
}
