import { useContext, useMemo } from 'react';
import { LoginForm, NewPost, PagenotFound, PostPage, ProfilePage, RegisterForm, UserHomePage, UserProfilePage, WebsiteHome } from '../pages'
import { Routes, Route } from 'react-router-dom'
import { themeDetails, userDetails } from '../Hooks/ContextProvider';
import { DarkMode, LiteMode } from '../theme/themeColors';
import { PostsList, ProfilesList } from '../components';


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
          <Route path='' end element={<PostsList type="/home" />} />
          <Route path='likes' element={<PostsList type="/likes" />} />
          <Route path='comments' element={<PostsList type="/comments" />} />
          <Route path='bookmarks' element={<PostsList type="/bookmarks" />} />
          <Route path='following' element={<ProfilesList type="/following" />} />
          <Route path='followers' element={<ProfilesList type="/followers" />} />
        </Route>
        <Route path='/new' element={<NewPost />} />
        <Route path='/post/:id' element={<PostPage />} />
        <Route path='/user/:id' element={<UserProfilePage />} />
        <Route path='*' element={<PagenotFound />} />
      </Routes>
    </div>
  )
}
