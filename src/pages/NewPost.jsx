import { useContext, useMemo } from 'react';
import { ControlBtns, Heading } from '../components';
import styles from '../styles/NewPost.module.css';
import { themeDetails } from '../Hooks/ContextProvider';
import { DarkMode, LiteMode } from '../theme/themeColors';


export const NewPost = () => {
  let { theme } = useContext(themeDetails)
  let { text, secondry, third } = useMemo(() => theme ? DarkMode : LiteMode, [theme]);

  return (
    <div className={styles.newPostBox}>
      {/* <Heading dash={false} title={"New post"} /> */}

      <Heading dash={false} title={"Title"} />
      <div className={styles.titleHead}>
        <input type="text" className={styles.titleInput} placeholder='Title here'
          style={{ backgroundColor: third, color: text, border: `1px solid ${secondry}` }} />
      </div>

      <Heading dash={false} title={"Content"} />
      <div className={styles.contentHead}>
        <textarea type="text" className={styles.contentInput} placeholder='Content here'
          style={{ backgroundColor: third, color: text, border: `1px solid ${secondry}` }} />
      </div>

      <Heading dash={false} title={"Upload Cover Image"} textSize={"1.5rem"} />
      <div className={styles.uploadImageHead}>
        <input type="file" accept='.png,.jpg,.jpeg' />
      </div>
      <div className={styles.NewPostContols}>
        <div className={styles.btnBox}>
          <ControlBtns text={"Save"} />
          <ControlBtns text={"Cancel"} />
        </div>
      </div>
    </div>
  )
}
