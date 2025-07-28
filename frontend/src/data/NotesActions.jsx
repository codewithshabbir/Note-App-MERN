import {
  FaEdit,
  FaTrash,
  FaEye,
} from "react-icons/fa";
import { MdOutlinePushPin } from "react-icons/md";
import { RiUnpinLine } from "react-icons/ri";


export const getNoteActions = ({ onPin, onView, onEdit, onDelete, isPinned }) => [
  {
    key: "1",
    label: (
      <div
        onClick={onPin}
        className="flex items-center gap-3 px-2 py-3 cursor-pointer text-gray-800 text-sm"
      >
        {console.log(isPinned)}
         {isPinned ? (
        <RiUnpinLine className="text-gray-500" />
      ) : (
        <MdOutlinePushPin className="text-gray-500 rotate-45" />
      )}
      {isPinned ? "Unpin" : "Pin"}
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