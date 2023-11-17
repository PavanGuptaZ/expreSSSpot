import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { themeDetails, userDetails } from "../Hooks/ContextProvider";
import { LoginForm } from "./LoginForm";
import styles from '../styles/Profile.module.css';
import { DarkMode, LiteMode } from "../theme/themeColors";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { followTheUser, getAUserProfile, getUserProfilePosts, unfollowTheUser } from "../api/userApi";
import { PagenotFound } from "./PagenotFound";
import { LoadingComponent } from "../components";
import PropTypes from 'prop-types';
import { useGetTime } from "../Hooks/useTime";
import coverImage from "../assets/coverImage.jpg"


export const UserProfilePage = () => {
  let { user } = useContext(userDetails);
  let { theme } = useContext(themeDetails)
  let { body, third, text, button } = theme ? DarkMode : LiteMode;
  let { id } = useParams()
  const queryClient = useQueryClient()

  const userProfileQuery = useQuery({
    queryKey: [`userProfile - ${id}`],
    queryFn: () => getAUserProfile(user, id),
    enabled: user !== null,
  })

  const userProfilePostsQuery = useQuery({
    queryKey: [`userProfilePosts - ${id}`],
    enabled: userProfileQuery?.data?.result == true,
    queryFn: () => getUserProfilePosts(user, userProfileQuery.data.data._id)
  })
  const followingMutation = useMutation({
    mutationFn: (variables) => followTheUser(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`userProfile - ${id}`] })
    }
  })

  const unfollowingMutation = useMutation({
    mutationFn: (variables) => unfollowTheUser(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`userProfile - ${id}`] })
    }
  })
  if (!user) {
    return <LoginForm />
  }

  if (userProfileQuery.isLoading) {
    return <LoadingComponent />
  }
  if (!userProfileQuery.data?.result) {
    return <PagenotFound />
  }
  const handleFollow = () => {
    if (userProfileQuery.data.data.followingBy.includes(user._id)) {
      unfollowingMutation.mutate({ user, id: userProfileQuery.data.data._id })
    } else {
      followingMutation.mutate({ user, id: userProfileQuery.data.data._id })
    }
  }

  let profilePicSRC = import.meta.env.VITE_BACKEND_LINK + '/images/profile/' + (userProfileQuery.data.data.profilePic.startsWith('profile') ? 'profile_pic.png' : userProfileQuery.data.data.profilePic);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div className={styles.profileHeadBox} style={{ borderBottom: `1px solid ${third}` }}>
        <div className={styles.coverImageBox}>
          <div className={styles.coverImage}>
            <img src={coverImage} alt="Cover Image" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div className={styles.profileImage}>
            <img src={profilePicSRC} alt="Cover Image" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
        <div className={styles.userDetails}>
          <div className={styles.userName}>
            <span> {userProfileQuery.data.data.name} </span>
          </div>
          <div className={styles.userId}>
            {userProfileQuery.data.data._id}
          </div>
          <div className={styles.userdescription}>
            <span> {userProfileQuery.data.data.description} </span>
          </div>
          <div className={styles.userStatistics}>
            <div className={styles.FollowingLink}>
              Followers: {userProfileQuery.data.data.followingBy.length}
            </div>
            {id != user._id && <button className={styles.followLink} disabled={userProfileQuery.isFetching || followingMutation.isPending}
              onClick={handleFollow} style={{ backgroundColor: button, color: body }}>
              {(userProfileQuery.isFetching || followingMutation.isPending)
                ? "loading" : userProfileQuery.data.data.followingBy.includes(user._id) ? "unfollow" : "Follow"}
            </button>
            }
          </div>
        </div>
      </div>
      <div className="ProfileListBtns">
        <div className="btsList">
          <a className="ProfileRotingBtns active" style={{ color: text }}>Post</a>
        </div>
      </div>
      <div className={styles.ListBlockBox} >
        <div id="NewPostMessage" className={styles.userMessage}>{userProfilePostsQuery.data?.data.message}</div>
        {userProfilePostsQuery.isSuccess && userProfilePostsQuery.data.result && userProfilePostsQuery.data.data.map((element) => {
          return <ProfileListBox key={element._id} post={element} />
        })}
      </div>
    </div>
  )
}
export const ProfileListBox = (props) => {
  const navigator = useNavigate()
  let { theme } = useContext(themeDetails)
  let { third } = theme ? DarkMode : LiteMode;

  let { post } = props;

  return (
    <div className={styles.ListBlock} style={{ border: `1px solid ${third}` }} onClick={() => navigator(`/post/${post._id}`)}>
      <div className={styles.imageBox}>
        <img src={`${import.meta.env.VITE_BACKEND_LINK}/images/${post.image || 'blog.png'}`} alt="Cover Image" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </div>
      <div className={styles.listBlockContent}>

        <div className={styles.listBlocktitle}>
          {post.title}
        </div>
        <div className={styles.listBlockText}>
          {post.text}
        </div>
        <div className={styles.listBlockDate}>
          Posted on - {useGetTime(post.createdAt)}
        </div>
      </div>
    </div>
  )
}
ProfileListBox.propTypes = {
  post: PropTypes.object
}
