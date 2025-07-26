import {
  FaEdit,
  FaSignOutAlt,
  FaTrash,
  FaEye,
  FaMapPin,
} from "react-icons/fa";

export const getNoteActions = ({ onPin, onView, onEdit, onUpdate, onDelete }) => [
  {
    key: "1",
    label: (
      <div
        onClick={onPin}
        className="flex items-center gap-3 px-2 py-3 cursor-pointer text-gray-800 text-sm"
      >
        <FaMapPin className="text-gray-500 rotate-45" />
        Pin
      </div>
    ),
  },
  {
    key: "2",
    label: (
      <div
        onClick={onView}
        className="flex items-center gap-3 px-2 py-3 cursor-pointer text-gray-800 text-sm"
      >
        <FaEye className="text-gray-500" />
        View
      </div>
    ),
  },
  {
    key: "3",
    label: (
      <div
        onClick={onEdit}
        className="flex items-center gap-3 px-2 py-3 cursor-pointer text-gray-800 text-sm"
      >
        <FaEdit className="text-gray-500" />
        Edit
      </div>
    ),
  },
  {
    key: "4",
    label: (
      <div
        onClick={onDelete}
        className="flex items-center gap-3 px-2 py-2 cursor-pointer text-red-600 text-sm"
      >
        <FaTrash className="text-red-500" />
        Delete
      </div>
    ),
  },
];