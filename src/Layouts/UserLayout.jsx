import { useContext, useMemo } from 'react';
import { NewPost, PagenotFound, PostPage, ProfilePage, UserHomePage } from '../pages'
import { Routes, Route } from 'react-router-dom'
import { themeDetails } from '../Hooks/ContextProvider';
import { DarkMode, LiteMode } from '../theme/themeColors';
import { ProfileList } from '../components';

export const UserLayout = () => {
  let { theme } = useContext(themeDetails)
  let { text } = useMemo(() => theme ? DarkMode : LiteMode, [theme]);

  return (
    <div style={{ maxWidth: "1040px", width: "100%", margin: "0 auto", color: text }}>
      <Routes>
        <Route path='/' element={<UserHomePage />} />
        <Route path='/profile' element={<ProfilePage />} >
          <Route path='' end element={<ProfileList type="/home" />} />
          <Route path='likes' element={<ProfileList type="likes" />} />
          <Route path='comments' element={<ProfileList type="Comments" />} />
          <Route path='bookmarks' element={<ProfileList type="Bookmark" />} />
        </Route>
        <Route path='/new' element={<NewPost />} />
        <Route path='/post/:id' element={<PostPage />} />
        <Route path='*' element={<PagenotFound />} />
      </Routes>
    </div>
  )
}
