import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { MdClose } from "react-icons/md";
import TagInput from "../../components/Input/TagInput ";
import axios from "axios";
import { toast } from "react-toastify";

const AddEditNotes = ({ onClose, noteData, type, getAllNotes }) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);

  // Edit Note
  const editNote = async () => {
    const noteId = noteData._id;
    console.log(noteId);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/note/edit/" + noteId,
        { title, content, tags },
        { withCredentials: true }
      );

      console.log(res.data);

      if (res.data.success === false) {
        console.log(res.data.message);
        setError(res.data.message);
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);
      getAllNotes();
      onClose();
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
      setError(error.message);
    }
  };

  // Add Note
  const addNewNote = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/note/add",
        { title, content, tags },
        { withCredentials: true }
      );

      if (res.data.success === false) {
        console.log(res.data.message);
        setError(res.data.message);
        toast.error(res.data.message);

        return;
      }

      toast.success(res.data.message);
      getAllNotes();
      onClose();
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
      setError(error.message);
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Vui lòng nhập tiêu đề!");
      return;
    }

    if (!content) {
      setError("Vui lòng nhập nội dung!");
      return;
    }

    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className="relative">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-400" />
      </button>
      <div className="flex flex-col gap-2">
        <label className="input-label text-red-400 uppercase">Tiêu đề</label>

        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="Nhập tiêu đề tại đây."
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label text-red-400 uppercase">Nội dung</label>

        <textarea
          type="text"
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder="Nội dung..."
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>

      <div className="mt-3">
        <label className="input-label text-red-400 uppercase">Thẻ</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      <button
        className="btn-primary font-medium mt-5 p-3"
        onClick={handleAddNote}
      >
        {type === "edit" ? "Cập nhật" : "Thêm"}
      </button>
    </div>
  );
};

// Add prop types validation
AddEditNotes.propTypes = {
  onClose: PropTypes.func.isRequired,
  noteData: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    _id: PropTypes.string,
  }),
  type: PropTypes.oneOf(["add", "edit"]).isRequired,
  getAllNotes: PropTypes.func.isRequired,
};

// Define default props
AddEditNotes.defaultProps = {
  noteData: { title: "", content: "", tags: [] }, // Default values for optional note data
};

export default AddEditNotes;
