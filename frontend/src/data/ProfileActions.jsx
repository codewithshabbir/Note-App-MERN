import {
  FaUser,
  FaEdit,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink } from "react-router";

export const getProfileActions = (onLogout) => [
  {
    key: "1",
    label: (
      <NavLink
        to="/"
        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer text-gray-800 text-sm"
      >
        <FaUser className="text-gray-500" />
        My Profile
      </NavLink>
    ),
  },
  {
    key: "2",
    label: (
      <NavLink
        to="/"
        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer text-gray-800 text-sm"
      >
        <FaEdit className="text-gray-500" />
        Edit Profile
      </NavLink>
    ),
  },
  {
    key: "3",
    label: (
      <NavLink
        to="/"
        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer text-gray-800 text-sm"
      >
        <FaCog className="text-gray-500" />
        Account Settings
      </NavLink>
    ),
  },
  {
    key: "4",
    label: (
      <div
        onClick={onLogout}
        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer text-gray-800 text-sm"
      >
        <FaSignOutAlt className="text-red-500" />
        Logout
      </div>
    ),
  },
];