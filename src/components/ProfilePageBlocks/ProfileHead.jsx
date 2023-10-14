import { useContext } from 'react';
import styles from '../../styles/Profile.module.css';
import { themeDetails } from '../../Hooks/ContextProvider';
import { DarkMode, LiteMode } from '../../theme/themeColors';


export const ProfileHead = () => {
    let { theme } = useContext(themeDetails)
    let { third } = theme ? DarkMode : LiteMode;
  
    return (
        <div className={styles.profileHeadBox} style={{borderBottom:`1px solid ${third}`}}>
            <div className={styles.coverImageBox}>
                <div className={styles.coverImage}>
                    <img src="https://source.unsplash.com/9lTUAlNB87M" alt="Cover Image" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div className={styles.profileImage}>
                    <img src="https://source.unsplash.com/rDEOVtE7vOs" alt="Cover Image" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
            </div>
            <div className={styles.userDetails}>
                <div className={styles.userName}>
                    Pavan Gupta
                </div>
                <div className={styles.userId}>
                    5419841629849
                </div>
                <div className={styles.userdescription}>
                    CRYPTOCURRENCY and NFT
                </div>
            </div>
        </div>
    )
}
