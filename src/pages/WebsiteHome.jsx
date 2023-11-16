import { useContext } from 'react';
import image from '../assets/photo.png';
import image01 from '../assets/photo01.jfif';
import image02 from '../assets/photo02.jfif';
import rohit from '../assets/Rohit-small.png';
import { LoadingComponent } from '../components';
import { userDetails } from '../Hooks/ContextProvider';
import styles from '../styles/WebSiteHome.module.css';

export const WebsiteHome = () => {
  let { userLoading } = useContext(userDetails);


  if (userLoading) {
    return <LoadingComponent />
  }
  return (
    <div className={styles.websiteHomeBox}>
      <section className={styles.basicSection01}>
        <div className={styles.part01}>
          <div className={styles.heading01}>Express your thoughts with the world</div>
          <div className={styles.basicText}>expreSSSpot is a platform where you can express your opinions on trending topics and connect with others</div>
        </div>
        <div className={styles.part02}>
          <img src={image01} alt="" width={"100%"} style={{ borderRadius: "1rem" }} />
        </div>
      </section>
      <section className={styles.basicSection02}>
        <div className={styles.part01}>
          <img src={image} alt="" width={"100%"} />
        </div>
        <div>
          <div className={styles.heading01}>Amplify your voice</div>
          <div className={styles.basicText}>expreSSSpot gives you the opportunity to amplify your voice and share your thoughts with a wide audience.</div>
        </div>
      </section>
      <section className={styles.fullSection}>
        <div className={styles.centerForFull}>
          &#8220; I love how easy it is to share my opinions on expreSSSpot. The platform is user-friendly and the community is supportive. Highly recommended! &#8221;
          <div className={styles.reviewBox}>-
            <div className={styles.imageBox}>
              <img src={rohit} alt="" width={"100%"} />
            </div>
            <div className={styles.reviewername}>
              Rohit Tatavarthy
            </div>
          </div>
        </div>
      </section>
      <section className={styles.joinCommunityBox}>
        <div className={styles.spacing}>
          <div className={styles.joinTitle}>
            Join our community of thought-sharers <span style={{ color: "#FF88C1" }}>.</span>
          </div>
          <div className={styles.joinReview}>
            “expreSSSpot has helped me gain a wider audience for my thoughts and ideas. I&#39;ve connected with amazing individuals and learned so much from their perspectives.” - <b>Satish Singidi</b>
          </div>
          <button to={'register'} className={styles.linkBTN}>Register</button>
        </div>
      </section>
      <section className={styles.basicSection01}>
        <div className={styles.part01}>
          <div className={styles.heading01}>Connect with Different-minded</div>
          <div className={styles.basicText}>Join a community of Different-minded individuals who are passionate about the same topics as you. Engage in meaningful discussions and expand your network.</div>
        </div>
        <div className={styles.part02}>
          <img src={image02} alt="" width={"100%"} style={{ borderRadius: "1rem" }} />
        </div>
      </section>
    </div>
  )
}
