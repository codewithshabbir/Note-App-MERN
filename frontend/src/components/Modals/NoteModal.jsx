import { useEffect, useState } from "react";
import { Modal, Input } from "antd";
import axios from "axios";

const NoteModal = ({ showModal, onClose, type, getAllNotes, noteData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    setIsModalOpen(showModal);
    if (noteData) {
      setTitle(noteData.title || "");
      setContent(noteData.content || "");
    }
  }, [showModal, noteData]);

  const handleOk = async () => {
    if (type === "Add") {
      console.log("add");
      
      try {
        const res = await axios.post(
          "http://localhost:3000/api/note/add",
          { title, content },
          { withCredentials: true }
        );
        
        if (res.data.success === false) {
          return res.data.message;
        }
        setTitle("");
        setContent("");
        getAllNotes();
        onClose();
        setIsModalOpen(false);
      } catch (error) {
        console.log(error.message);
      }
    }else if (type === "Edit") {
      console.log("edit");

      try {
        const res = await axios.post(
          `http://localhost:3000/api/note/edit/${noteData._id}`,
          { title, content },
          { withCredentials: true }
        );
        
        if (res.data.success === false) {
          return res.data.message;
        }

        getAllNotes();
        onClose();
        setIsModalOpen(false);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    onClose();
  };

  return (
    <>
      {type == "View" ? (
        <Modal
          title="View Note"
          open={isModalOpen}
          onCancel={onClose}
          footer={null}
        >
          <h2 className="font-bold text-lg">{noteData?.title}</h2>
          <p className="mt-2">{noteData?.content}</p>
        </Modal>
      ) : type == "Edit" ? (
        <Modal
          title="Edit Note"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div className="flex flex-col gap-4">
            <Input
              placeholder="Note Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input.TextArea
              placeholder="Note Content"
              value={content}
              rows={4}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </Modal>
      ) : (
        <Modal
          title="Add Note"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div className="flex flex-col gap-4">
            <Input
              placeholder="Note Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input.TextArea
              placeholder="Note Content"
              value={content}
              rows={4}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default NoteModal;
