import { useNavigate } from "react-router";
import { FaRegStickyNote } from "react-icons/fa";
import { generateAvatar } from "../utils/helper";
import ProfileDropdown from "./Dropdown/ProfileDropdown";
import { getProfileActions } from "../data/ProfileActions";
import { useDispatch } from "react-redux";
import { signInStart, signInSuccess, signOutFailure } from "../redux/user/userSlice";
import axios from "axios";

const Navbar = ({userInfo}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogout = async () => {
    try {
      dispatch(signInStart());
      const res = await axios.get("https://noteplus-backend.vercel.app/api/auth/signout",{
        withCredentials: true,
      })
      if (res.data.success === false) {
        dispatch(signOutFailure(res.data.message))
        return
      }
      dispatch(signInSuccess())
      navigate('/signin')
    } catch (error) {
      dispatch(signOutFailure(error.message))
    }
  };
  return (
    <div className="flex justify-between px-12 py-4 bg-white">
      <h2 className="flex items-center gap-1 text-2xl font-semibold text-gray-800">
        <FaRegStickyNote className="text-blue-600 text-2xl" />
        <span className="text-blue-600 font-bold">Note</span> Plus
      </h2>

      <ProfileDropdown
        userInfo={userInfo}
        data={getProfileActions(onLogout)}
      />
    </div>
  );
};

export default Navbar;
