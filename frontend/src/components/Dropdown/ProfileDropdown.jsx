import { Dropdown, Space } from "antd";
import { generateAvatar } from "../../utils/helper";

const ProfileDropdown = ({ data, userInfo, text }) => {
  return (
    <Dropdown
      menu={{ items: data }}
      placement="bottomRight"
      arrow={{ pointAtCenter: true }}
    >
      <div className={`flex items-center ${userInfo?.username ? "gap-3" : "gap-0"} cursor-pointer py-1 rounded-md`}>
        {/* Avatar Circle */}
        <span className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold hover:ring-2 hover:ring-blue-300 transition">
          {text || generateAvatar(userInfo?.username)}
        </span>

        {/* Username Text */}
        <span className="text-sm font-medium text-gray-800">
          {userInfo?.username}
        </span>
      </div>
    </Dropdown>
  );
};

export default ProfileDropdown;