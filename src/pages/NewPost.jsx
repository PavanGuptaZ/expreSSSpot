import { useContext, useMemo, useState } from 'react';
import { ControlBtns, Heading } from '../components';
import styles from '../styles/NewPost.module.css';
import { themeDetails, userDetails } from '../Hooks/ContextProvider';
import { DarkMode, LiteMode } from '../theme/themeColors';
import { LoginForm } from './LoginForm';
import { useNavigate } from 'react-router-dom';


export const NewPost = () => {
  const [postData, setPostData] = useState({ title: "", content: "", image: null, message: "", imageCheck: false })
  const [checks, setChecks] = useState(false)
  const [isloading, setIsLoading] = useState(false)
  const navigator = useNavigate()
  let { theme } = useContext(themeDetails)
  let { text, secondry, third } = useMemo(() => theme ? DarkMode : LiteMode, [theme]);
  let { user } = useContext(userDetails);


  if (!user) {
    return <LoginForm />
  }
  const titlePattern = /^(?=\S)(?=\S*\s\S)(?=.{5,100}$).+$/
  const ContentPattern = /^(?=\S)(?=(?:\S+\s+){4}\S+).{50,}[\s\S]*$/

  let TitleCheck01 = !titlePattern.test(postData.title.trim());
  let ContentCheck01 = !ContentPattern.test(postData.content.trim())

  const handleImageUpload = async (e) => {
    // console.log(e.target.files[0].type === "image/png", e.target.files[0].type === "image/jpeg", e.target.files[0].type === "image/jpg")
    setPostData((pre) => ({ ...pre, image: e.target.files[0] }))

    if (e.target.files[0].size > 2000000) {
      setPostData((pre) => ({ ...pre, imageCheck: "Image Size Should be less than 2MB" }))
      console.log("false02")
      return
    }
    if (e.target.files[0].type === "image/png" || e.target.files[0].type === "image/jpeg" || e.target.files[0].type === "image/jpg") {
      setPostData((pre) => ({ ...pre, imageCheck: true }))
      console.log(postData.image)
      return
    } else {
      console.log("false01")
      setPostData((pre) => ({ ...pre, imageCheck: "Only .png,.jpg,.jpeg accept" }))

    }
    // if (postData.image?.size > 2000000) {
    //   console.log("error");
    //   console.log(postData.image.size)
    // }
  }
  // console.log(postData.image)
  const handleSubmit = async () => {
    setChecks(true)
    console.log(!TitleCheck01, !ContentCheck01, postData.imageCheck === true)

    if (!TitleCheck01 && !ContentCheck01 && postData.imageCheck === true) {

      let data = {
        email: user.email,
        name: "Pavan",
        userId: user._id,
        title: postData.title.trim(),
        text: postData.content.trim(),
        image: postData.image
      }
      let formData = new FormData();
      for (let key in data) {
        formData.append(key, data[key]);
      }
      console.log(data)
      const requestOptions = {
        method: 'POST',
        headers: { authorization: `Bearer ${user.accessToken}` },
        body: formData,
        credentials: 'include',
      }
      try {
        setIsLoading(true)
        let responce = await fetch(import.meta.env.VITE_BACKEND_LINK + "/posts", requestOptions)
        let dataReceived = await responce.json()

        if (responce.status === 200) {
          console.log(dataReceived)
          navigator(`/post/${dataReceived.post._id}`)
        } else {
          setPostData((pre) => ({ ...pre, message: dataReceived.message }))
        }

      } catch (err) {
        setPostData((pre) => ({ ...pre, message: "SomeThing Wrong Try Again" }))
        console.log(err)
      } finally {
        setIsLoading(false)
        console.log("fineshg")
      }
    } else {
      setPostData((pre) => ({ ...pre, message: "All Field should Required" }))
    }
  }

  return (
    <div className={styles.newPostBox}>
      <Heading dash={false} title={"Title"} />
      <div className={styles.titleHead}>
        <input type="text" className={styles.titleInput} placeholder='Title here'
          style={{ backgroundColor: third, color: text, border: `1px solid ${secondry}` }}
          value={postData.title} onChange={(e) => setPostData((pre) => ({ ...pre, title: e.target.value }))} />
        {checks && TitleCheck01 && <div className={styles.warningLabel}>{postData.title.trim().length} - minimum of 5 and maximum of 100 characters, no extra spacing and at least two words.</div>}
      </div>

      <Heading dash={false} title={"Content"} />
      <div className={styles.contentHead}>
        <textarea type="text" className={styles.contentInput} placeholder='Content here'
          style={{ backgroundColor: third, color: text, border: `1px solid ${secondry}` }}
          value={postData.content} onChange={(e) => setPostData((pre) => ({ ...pre, content: e.target.value }))} />
        {checks && ContentCheck01 && <div className={styles.warningLabel}>{postData.content.trim().length} - minimum of 5 words and a minimum of 50 characters.</div>}
      </div>

      <Heading dash={false} title={"Upload Cover Image"} textSize={"1.5rem"} />
      <div className={styles.uploadImageHead}>
        <input type="file" accept='.png,.jpg,.jpeg' onChange={handleImageUpload} />
      </div>
      <div id="NewPostMessage" className={styles.userMessage}>{postData.imageCheck}</div>
      <div id="NewPostMessage" className={styles.userMessage}>{postData.message}</div>
      {isloading && <div>Loading</div>}
      <div className={styles.NewPostContols}>
        <div className={styles.btnBox}>
          <ControlBtns text={"Save"} onClick={handleSubmit} />
          <ControlBtns text={"Cancel"} onClick={() => navigator(-1)} />
        </div>
      </div>
    </div>
  )
}
