import styles from '../../styles/Profile.module.css';
import PropTypes from "prop-types"
import { useContext } from "react";
import { themeDetails, userDetails } from "../../Hooks/ContextProvider";
import { useQuery } from "@tanstack/react-query";
import { allFollowingUsers } from "../../api/userApi";
import { useNavigate } from 'react-router-dom';
import { DarkMode, LiteMode } from '../../theme/themeColors';

export const ProfilesList = (props) => {
    let { user } = useContext(userDetails);
    let { type } = props

    const usersListQuery = useQuery({
        queryKey: [`${type}-${user._id}`],
        enabled: user !== null,
        queryFn: () => allFollowingUsers(user, type)
    })

    if (usersListQuery.isLoading) {
        return <p>Loading</p>
    }
    return (
        <div className={styles.ListBlockBox} >
            <div id="NewPostMessage" className={styles.userMessage}>{usersListQuery.data?.data.message}</div>
            {usersListQuery.isSuccess && usersListQuery.data.result && usersListQuery.data.data.map((element) => {
                return <UserListBox key={element._id} userslice={element} />
            })}
        </div>)
}
export const UserListBox = (props) => {
    const navigator = useNavigate()

    let { theme } = useContext(themeDetails)
    let { third } = theme ? DarkMode : LiteMode;

    let { userslice } = props;

    const handleUserNavigation = () => {
        navigator(`/user/${userslice._id}`)
    }

    return (
        <div className={styles.ListBlock} style={{ border: `1px solid ${third}` }}>
            <div className={styles.imageBox}>
                <img src={import.meta.env.VITE_BACKEND_LINK + '/images/profile/' + (userslice.profilePic.startsWith('profile') ? 'profile_pic.png' : userslice.profilePic)} alt="Cover Image"
                    onClick={handleUserNavigation} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div className={styles.listBlockContent}>
                <div className={styles.listBlocktitle} onClick={handleUserNavigation}>
                    {userslice.name}
                </div>
                <div className={styles.listBlockText} onClick={handleUserNavigation}>
                    {userslice.description}
                </div>
                <div className={styles.listBlockDate}>
                    Joined on - {userslice.createdAt}
                </div>
            </div>
        </div>
    )
}
UserListBox.propTypes = {
    userslice: PropTypes.object
}

ProfilesList.propTypes = {
    type: PropTypes.string.isRequired
}