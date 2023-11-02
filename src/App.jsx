import { useContext } from 'react';
import { DefaultLayout } from './Layouts'
import { themeDetails } from './Hooks/ContextProvider'
import { Footer, NavBar } from './components'
import { DarkMode, LiteMode } from './theme/themeColors';

export default function App() {
  let { theme } = useContext(themeDetails)
  let { body } = theme ? DarkMode : LiteMode;
  return (
    <div className='fullBody' style={{ backgroundColor: body }}>
      <div className='elementsOrder'>
        <Footer />
        <DefaultLayout />
        <NavBar />
      </div>
    </div>
  )
}
