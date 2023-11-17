import { useContext, useState } from 'react';
import styles from '../../styles/Profile.module.css';
import { themeDetails, userDetails } from '../../Hooks/ContextProvider';
import { DarkMode, LiteMode } from '../../theme/themeColors';
import { AiOutlineEdit } from 'react-icons/ai';
import { EditDescriptionDetails, EditNameDetails } from '../EditDetails';
import { Link } from 'react-router-dom';
import { ProfilePicUploadBlock } from './ProfilePicUploadBlock';
import coverImage from "../../assets/coverImage.jpg"


export const ProfileHead = () => {
    let { theme } = useContext(themeDetails)
    let { third, text } = theme ? DarkMode : LiteMode;
    let { user } = useContext(userDetails)
    const [editDetails, setEditDetails] = useState({ name: false, description: false, profilePic: false })

    let profilePicSRC = import.meta.env.VITE_BACKEND_LINK + '/images/profile/' + (user.profilePic.startsWith('profile') ? 'profile_pic.png' : user.profilePic);
    return (
        <div className={styles.profileHeadBox} style={{ borderBottom: `1px solid ${third}` }}>
            <div className={styles.coverImageBox}>
                <div className={styles.coverImage}>
                    <img src={coverImage} alt="Cover Image" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div className={styles.profileImage}>
                    <img src={profilePicSRC} alt="Cover Image" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div className={styles.addProfilePicCover}> <AiOutlineEdit className={styles.editIcon}
                        onClick={() => setEditDetails((pre) => ({ ...pre, profilePic: true }))} /></div>
                </div>
            </div>
            {editDetails.profilePic && <ProfilePicUploadBlock setEditDetails={setEditDetails} />}
            <div className={styles.userDetails}>
                <div className={styles.userName}>
                    {editDetails.name ? <EditNameDetails setEditDetails={setEditDetails} />
                        :
                        <>
                            <span> {user.name} </span>
                            <span onClick={() => setEditDetails((pre) => ({ ...pre, name: true }))} className={styles.nameEditIcon + " " + styles.editIcons}><AiOutlineEdit /></span>
                        </>
                    }
                </div>
                <div className={styles.userId}>
                    {user._id}
                </div>
                <div className={styles.userdescription}>
                    {editDetails.description ? <EditDescriptionDetails setEditDetails={setEditDetails} />
                        : <>
                            <span> {user.description} </span>
                            <span onClick={() => setEditDetails((pre) => ({ ...pre, description: true }))} className={styles.descriptionEditIcon + " " + styles.editIcons}><AiOutlineEdit /></span>
                        </>
                    }
                </div>
                <div className={styles.userStatistics}>
                    <Link to={"following"} className={styles.FollowingCount} style={{ color: text }}>
                        Following: {user.following.length}
                    </Link>
                    <Link to={"followers"} className={styles.FollowingByCount} style={{ color: text }}>
                        Followers: {user.followingBy.length}
                    </Link>
                </div>
            </div>
        </div>
    )
}
