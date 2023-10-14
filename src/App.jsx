import { useContext } from 'react';
import { DefaultLayout, UserLayout } from './Layouts'
import { themeDetails, userDetails } from './Hooks/ContextProvider'
import { NavBar } from './components'
import { DarkMode, LiteMode } from './theme/themeColors';

export default function App() {
  let { user } = useContext(userDetails);
  let { theme } = useContext(themeDetails)
  let { body } = theme ? DarkMode : LiteMode;
  return (
    <div className='fullBody' style={{ backgroundColor: body }}>
      <div className='elementsOrder'>
        {!user && <DefaultLayout />}
        {user && <UserLayout />}
        <NavBar />
      </div>
    </div>
  )
}
