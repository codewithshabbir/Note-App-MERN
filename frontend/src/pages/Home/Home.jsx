import { useEffect, useState } from "react";
import NoteCards from "../../components/Cards/NoteCards";
import { FiPlus } from "react-icons/fi";
import NoteModal from "../../components/Modals/NoteModal";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);

  const { currentUser, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/signin");
    } else {
      setUserInfo(currentUser.rest);
      getAllNotes();
    }
  }, [currentUser]);

  // Get all notes from API
  const getAllNotes = async () => {
    try {
      const res = await axios.get(`${apiUrl}/note/all`, {
        withCredentials: true,
      });

      if (res.data.success === false) {
        console.error(res.data.message);
        return;
      }

      setAllNotes(res.data.notes);
    } catch (error) {
      console.error("Error fetching notes:", error.message);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Add Note Modal */}
      <NoteModal
        showModal={isModalOpen}
        getAllNotes={getAllNotes}
        onClose={() => setIsModalOpen(false)}
        type="Add"
      />

      {/* Notes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10 px-12">
        {loading ? (
          <p className="col-span-full text-center">Loading...</p>
        ) : allNotes && allNotes.length > 0 ? (
          allNotes.map((note) => (
            <NoteCards
              key={note._id}
              noteData={note}
              getAllNotes={getAllNotes}
            />
          ))
        ) : (
          <p className="col-span-full text-center">No notes available</p>
        )}
      </div>

      {/* Floating Add Button */}
      <button
        className="bg-blue-600 hover:bg-blue-700 transition duration-200 cursor-pointer flex justify-center items-center fixed right-10 bottom-10 rounded-full text-white w-14 h-14 shadow-lg"
        onClick={() => setIsModalOpen(true)}
      >
        <FiPlus className="size-8" />
      </button>
    </div>
  );
};

export default Home;