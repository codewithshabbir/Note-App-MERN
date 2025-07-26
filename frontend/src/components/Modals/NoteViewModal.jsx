import { Modal } from "antd";

const NoteViewModal = ({ show, onClose, note }) => {
  return (
    <Modal title="View Note" open={show} onCancel={onClose} footer={null}>
      <h2 className="font-bold text-lg">{note?.title}</h2>
      <p className="mt-2">{note?.content}</p>
    </Modal>
  );
};

export default NoteViewModal;