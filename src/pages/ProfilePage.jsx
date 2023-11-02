import { useContext } from "react";
import { ProfileHead, ProfileListBtns } from "../components"
import { Outlet } from "react-router-dom"
import { userDetails } from "../Hooks/ContextProvider";
import { LoginForm } from "./LoginForm";

export const ProfilePage = () => {
  let { user } = useContext(userDetails);
  if (!user) {
    return <LoginForm />
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <ProfileHead />
      <ProfileListBtns />
      <Outlet />
    </div>
  )
}
