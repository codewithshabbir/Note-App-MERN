import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { Outlet, useNavigate } from "react-router";
import { useSelector } from "react-redux";

const MainLayout = () => {
  const [userInfo, setUserInfo] = useState(null);

  const { currentUser, loading, errorDispatch } = useSelector(
    (state) => state.user
  );
  
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser === null) {
      navigate("/signin");
    } else {
      setUserInfo(currentUser?.userData);
    }
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo}/>
      <Outlet />
    </>
  );
};

export default MainLayout;
