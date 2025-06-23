import { FaShareNodes } from "react-icons/fa6";
import Modal from "../../Modal/Modal.jsx";
import AddEditActivity from "../AddEditActivity/AddEditActivity.jsx";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../../reducers/user.slice.js";
import { addActivity } from "../../../reducers/activity.slice.js";
import { createActivity } from "./../../services/activityService.js";

const AddActivityModal = ({ isOpen, onClose }) => {
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const handleCreateActivity = async (activity) => {
    const data = await createActivity(activity, user.accessToken);

    if (data) {
      dispatch(addActivity(data));
      onClose();
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} header="Aggiungi Attività">
      <AddEditActivity onSubmit={handleCreateActivity} />
      <div className="modalbuttons">
        <button aria-label="sharing-activity" className="confirmbutton">
          {" "}
          <FaShareNodes />{" "}
        </button>
        <button
          aria-label="save-activity"
          type="submit"
          form="add-edit-activity"
          className="button"
        >
          Salva attivit&agrave;
        </button>
      </div>
      
     
    </Modal>
  );
};

export default AddActivityModal;
