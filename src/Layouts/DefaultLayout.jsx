import { useContext, useMemo } from 'react';
import { LoginForm, NewPost, PagenotFound, PostPage, ProfilePage, RegisterForm, UserHomePage, WebsiteHome } from '../pages'
import { Routes, Route } from 'react-router-dom'
import { themeDetails, userDetails } from '../Hooks/ContextProvider';
import { DarkMode, LiteMode } from '../theme/themeColors';
import { ProfileList } from '../components';


export const DefaultLayout = () => {
  let { theme } = useContext(themeDetails)
  let { text } = useMemo(() => theme ? DarkMode : LiteMode, [theme]);
  let { user } = useContext(userDetails);

  return (
    <div style={{ maxWidth: "1040px", width: "100%", margin: "0 auto", color: text }}>
      <Routes>
        <Route path='/' element={user ? <UserHomePage /> : <WebsiteHome />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/profile' element={<ProfilePage />} >
          <Route path='' end element={<ProfileList type="/home" />} />
          <Route path='likes' element={<ProfileList type="/likes" />} />
          <Route path='comments' element={<ProfileList type="/comments" />} />
          <Route path='bookmarks' element={<ProfileList type="/bookmarks" />} />
        </Route>
        <Route path='/new' element={<NewPost />} />
        <Route path='/post/:id' element={<PostPage />} />
        <Route path='*' element={<PagenotFound />} />
      </Routes>
    </div>
  )
}
