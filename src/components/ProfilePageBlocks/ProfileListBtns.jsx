import { NavLink } from 'react-router-dom';
import '../../styles/Routing.css';
import { themeDetails } from '../../Hooks/ContextProvider';
import { useContext } from 'react';
import { DarkMode, LiteMode } from '../../theme/themeColors';


export const ProfileListBtns = () => {
    let { theme } = useContext(themeDetails)
    let { text } = theme ? DarkMode : LiteMode;


    return (
        <div className="ProfileListBtns">
            <div className="btsList">
                <NavLink to={"/profile"} className="ProfileRotingBtns" end style={{ color: text }}>Post</NavLink>
                <NavLink to={"likes"} className="ProfileRotingBtns" style={{ color: text }}>Likes</NavLink>
                <NavLink to={"comments"} className="ProfileRotingBtns" style={{ color: text }}>Comments</NavLink>
                <NavLink to={"bookmarks"} className="ProfileRotingBtns" style={{ color: text }}>Bookmarks</NavLink>
                <NavLink to={"following"} className="ProfileRotingBtns" style={{ color: text }}>Following</NavLink>
                <NavLink to={"followers"} className="ProfileRotingBtns" style={{ color: text }}>Followers</NavLink>
            </div>
        </div>
    )
}
