import { useEffect, useState } from "react";
import { Modal, Input } from "antd";
import axios from "axios";
import { showError, showSuccess } from "../../utils/toast";

const apiUrl = import.meta.env.VITE_API_URL;

const NoteModal = ({ showModal, onClose, type, getAllNotes, noteData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsModalOpen(showModal);
    if (noteData) {
      setTitle(noteData.title || "");
      setContent(noteData.content || "");
    }
  }, [showModal, noteData]);

  const handleOk = async () => {
    if (!title.trim() || !content.trim()) {
      return showError("Title and content are required.");
    }
    setLoading(true);
    try {
      const payload = { title, content };
      let res;

      if (type === "Add") {
        res = await axios.post(`${apiUrl}/note/add`, payload, {
          withCredentials: true,
        });
      } else if (type === "Edit") {
        res = await axios.post(`${apiUrl}/note/edit/${noteData._id}`, payload, {
          withCredentials: true,
        });
      }

      if (res.data.success === false) {
        return showError(res.data.message);
      }

      showSuccess(`Note ${type === "Add" ? "Added" : "Updated"} successfully.`);

      setTitle("");
      setContent("");
      getAllNotes();
      onClose();
      setIsModalOpen(false);
    } catch (error) {
      showError(error.message);
    } finally {
      setLoading(false);
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
          confirmLoading={loading}
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
          confirmLoading={loading}
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
