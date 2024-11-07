import { useEffect, useState, useRef } from "react";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd, MdChevronLeft, MdChevronRight } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import EmptyCard from "../../components/EmptyCard/EmptyCard";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  const initialUserCheck = useRef(false);

  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const [isAddEditVisible, setIsAddEditVisible] = useState(false);
  const [addEditType, setAddEditType] = useState("add");
  const [noteData, setNoteData] = useState(null);

  useEffect(() => {
    if (!initialUserCheck.current) {
      initialUserCheck.current = true;
      if (!currentUser) {
        navigate("/");
      } else {
        setUserInfo(currentUser.rest);
        getAllNotes();
      }
    }
  }, [currentUser, navigate]);

  const getAllNotes = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/note/all", {
        withCredentials: true,
      });

      if (!res.data.success) return;
      setAllNotes(res.data.notes);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (noteDetails) => {
    setAddEditType("edit");
    setNoteData(noteDetails);
    setIsAddEditVisible(true);
  };

  const deleteNote = async (data) => {
    const noteId = data._id;

    try {
      const res = await axios.delete(
        `http://localhost:3000/api/note/delete/${noteId}`,
        { withCredentials: true }
      );

      if (!res.data.success) {
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);
      getAllNotes();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSearchNote = async (query) => {
    try {
      const res = await axios.get("http://localhost:3000/api/note/search", {
        params: { query },
        withCredentials: true,
      });

      if (!res.data.success) {
        toast.error(res.data.message);
        return;
      }

      setIsSearch(true);
      setAllNotes(res.data.notes);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;

    try {
      const res = await axios.put(
        `http://localhost:3000/api/note/update-note-pinned/${noteId}`,
        { isPinned: !noteData.isPinned },
        { withCredentials: true }
      );

      if (!res.data.success) {
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);
      getAllNotes();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleAddNoteSuccess = () => {
    getAllNotes();
  };

  const rightSidebarWidth = isRightSidebarOpen ? "20%" : "4rem";

  return (
    <>
      <Navbar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
      />

      <div className="flex h-screen" style={{ overflow: "hidden" }}>
        {/* Left Sidebar */}
        <aside className={`transition-all duration-300 ${isSidebarOpen ? "w-1/5" : "w-16"} h-full bg-bgBody p-4 relative shadow-md`}>
          {isSidebarOpen ? (
            <>
              <h2 className="text-xl font-semibold mb-6 text-center">Ghi chú của bạn</h2>
              <button
                className="w-full h-12 flex items-center justify-center rounded-md bg-[#2B85FF] hover:bg-blue-600 mb-2"
                onClick={() => {
                  setAddEditType("add");
                  setNoteData(null);
                  setIsAddEditVisible(true);
                }}
              >
                <MdAdd className="text-[24px] text-white" />
                <span className="ml-2 text-white">Thêm ghi chú</span>
              </button>
              <div className="mt-4 overflow-y-auto max-h-[calc(100vh-100px)]">
                {isSearch && allNotes.length === 0 ? (
                  <p className="text-center text-gray-500 mt-4">Oops! Không tìm thấy ghi chú nào phù hợp với tìm kiếm của bạn</p>
                ) : (
                  allNotes.map((note) => (
                    <NoteCard
                      key={note._id}
                      title={note.title}
                      date={note.createdAt}
                      content={note.content}
                      tags={note.tags}
                      isPinned={note.isPinned}
                      onEdit={() => handleEdit(note)}
                      onDelete={() => deleteNote(note)}
                      onPinNote={() => updateIsPinned(note)}
                    />
                  ))
                )}
                {allNotes.length === 0 && !isSearch && (
                  <p className="text-center text-gray-500 mt-4">Không có ghi chú nào</p>
                )}
              </div>
            </>
          ) : null}

          <button
            className="w-full h-12 flex items-center justify-center rounded-md bg-[#2B85FF] hover:bg-blue-600"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? (
              <MdChevronLeft className="text-[24px] text-white" />
            ) : (
              <MdChevronRight className="text-[24px] text-white" />
            )}
          </button>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 p-5 overflow-y-auto h-full transition-all duration-300 ${isSidebarOpen ? "ml-0" : "ml-16"}`} style={{ margin: "auto", marginRight: rightSidebarWidth }}>
          {isAddEditVisible ? (
            <AddEditNotes
              onClose={() => {
                setIsAddEditVisible(false);
                setNoteData(null);
                handleAddNoteSuccess();
              }}
              noteData={noteData}
              type={addEditType}
              getAllNotes={getAllNotes}
            />
          ) : (
            <EmptyCard
              message={(
                <>
                  Chọn một ghi chú có sẵn hoặc{" "}
                  <span
                    className="underline cursor-pointer text-blue-600"
                    onClick={() => {
                      setAddEditType("add");
                      setNoteData(null);
                      setIsAddEditVisible(true);
                    }}
                  >
                    tạo
                  </span>{" "}
                  ghi chú mới
                </>
              )}
            />
          )}
        </main>

        {/* Right Sidebar */}
        <aside className={`transition-all duration-300 ${isRightSidebarOpen ? "w-1/5" : "w-16"} h-full bg-gray-100 p-4 relative shadow-md`} style={{ position: "absolute", right: 0 }}>
          {isRightSidebarOpen ? (
            <>
              <h2 className="text-xl font-semibold mb-6 text-center">Chào bạn blabla</h2>
              <textarea
                className="w-full h-24 p-2 border rounded-md mb-4"
                placeholder="Nhập văn bản hoặc thêm tài liệu của bạn."
              ></textarea>
              <button className="w-full h-12 bg-[#2B85FF] hover:bg-blue-600 text-white rounded-md mb-2">Tải lên tệp</button>
            </>
          ) : null}

          <button
            className="w-full h-12 flex items-center justify-center rounded-md bg-[#2B85FF] hover:bg-blue-600"
            onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
          >
            {isRightSidebarOpen ? (
              <MdChevronLeft className="text-[24px] text-white" />
            ) : (
              <MdChevronRight className="text-[24px] text-white" />
            )}
          </button>
        </aside>
      </div>

      <style>{`
        html,
        body {
          height: 100%;
          margin: 0;
        }

        #root {
          height: 100%;
        }

        .flex {
          display: flex;
        }
      `}</style>
    </>
  );
};

export default Home;
