import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";
import ProfileDropdown from "../Dropdown/ProfileDropdown";
import { getNoteActions } from "../../data/NotesActions";
import NoteModal from "../Modals/NoteModal";
import { dateFormat } from "../../utils/helper";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;


const NoteCard = ({noteData, getAllNotes}) => {
  const {title, content, createdAt} = noteData;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noteType, setNoteType] = useState(null);

  const sampleNote = {
    tags: ["#task"],
    date: "12 Jan 2021",
  };

  // Action handlers
  const onPin = () => console.log("Pin clicked");
  const onView = () => {
    setIsModalOpen(true);
    setNoteType("View");    
  };
  const onEdit = () => {
    setIsModalOpen(true);
    setNoteType("Edit")
  };
  const onDelete = async () => {
    const res = await axios.delete(`${apiUrl}/note/delete/${noteData._id}`,
      { withCredentials: true }
    );

    if (res.data.success === false) {
      return res.data.message;
    }
    getAllNotes();
    console.log(noteData);
  };

  return (
    <>
      <NoteModal
        showModal={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        note={sampleNote}
        type={noteType}
        noteData={noteData}
        getAllNotes={getAllNotes}
      />

      <div className="bg-white shadow-2xl rounded-lg p-6 space-y-4 border-b-2">
        <div className="flex justify-between">
          <h2>{title}</h2>
          <ProfileDropdown
            text={<BsThreeDots size={20} />}
            data={getNoteActions({
              onPin,
              onView,
              onEdit,
              onDelete,
            })}
          />
        </div>

        <p>{content}</p>

        <div className="flex justify-between">
          <div>
            {sampleNote.tags.map((tag, index) => (
              <span key={index}>{tag} </span>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <SlCalender />
            <span>{dateFormat(createdAt)}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteCard;
