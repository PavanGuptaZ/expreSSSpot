import { ProfileHead, ProfileListBtns } from "../components"
import { Outlet } from "react-router-dom"

export const ProfilePage = () => {
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
      <ProfileHead />
      <ProfileListBtns />
      <Outlet/>
    </div>
  )
}
