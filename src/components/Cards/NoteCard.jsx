import { MdCreate, MdDelete, MdOutlinePushPin } from "react-icons/md";
import moment from "moment";
import PropTypes from "prop-types";

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onPinNote,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-sm font-medium">{title}</h6>
          <span className="text-xs text-green-700">
            {moment(date).format("DD/MM/YYYY")}
          </span>
        </div>

        <MdOutlinePushPin
          className={`icon-btn ${isPinned ? "text-[#2B85FF] " : "text-slate-300"
            }`}
          onClick={onPinNote}
        />
      </div>

      <p className="text-xs text-slate-600 mt-2">{content.slice(0, 60)}</p>

      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-slate-500">
          {tags.map((item) => `#${item} `)}
        </div>

        <div className="flex items-center gap-2">
          <MdCreate
            className="icon-btn hover:text-green-600"
            onClick={onEdit}
          />

          <MdDelete
            className="icon-btn hover:text-red-500"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

// Add prop types validation
NoteCard.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  content: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  isPinned: PropTypes.bool.isRequired,
  onPinNote: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

// Define default props
NoteCard.defaultProps = {
  content: "", // Default empty string if no content provided
  tags: [],    // Default empty array if no tags provided
};

export default NoteCard;
