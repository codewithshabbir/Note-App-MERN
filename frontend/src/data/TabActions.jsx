import React from "react";
import {
  FileTextOutlined,
  PushpinOutlined,
  FileUnknownOutlined,
} from "@ant-design/icons";
import NoteCards from "./../components/Cards/NoteCards";
import { RiUnpinLine } from "react-icons/ri";

const TabActions = ({ allNotes, getAllNotes, loading, activeTab }) => {
  const pinnedNotes = allNotes?.filter((note) => note.isPinned);
  const unPinnedNotes = allNotes?.filter((note) => !note.isPinned);

  const tabs = [
    {
      key: "1",
      label: "All Notes",
      icon: <FileTextOutlined />,
      children: (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p className="col-span-full text-center">Loading...</p>
          ) : allNotes && allNotes.length > 0 ? (
            allNotes.map((note) => (
              <NoteCards
                key={note._id}
                noteData={note}
                getAllNotes={getAllNotes}
                activeTab={activeTab}
              />
            ))
          ) : (
            <p className="col-span-full text-center">No notes available</p>
          )}
        </div>
      ),
    },
    {
      key: "2",
      label: "Pinned Notes",
      icon: <PushpinOutlined />,
      children: (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p className="col-span-full text-center">Loading...</p>
          ) : pinnedNotes && pinnedNotes.length > 0 ? (
            pinnedNotes.map((note) => (
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
      ),
    },
    {
      key: "3",
      label: (
        <div className="flex items-center gap-2">
          <RiUnpinLine />
          <span>Un Pinned Notes</span>
        </div>
      ),
      children: (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p className="col-span-full text-center">Loading...</p>
          ) : unPinnedNotes && unPinnedNotes.length > 0 ? (
            unPinnedNotes.map((note) => (
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
      ),
    },
  ];

  return tabs;
};

export default TabActions;
