import config from "../../../../config.js";
import styles from "./ActivityItem.module.scss";
import { format } from "date-fns";
import {
  FaArchive,
  FaArrowLeft,
  FaCheck,
  FaEdit,
  FaEye,
  FaTrash,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router";
import { userSelector } from "../../../reducers/user.slice.js";
import useSocketEmit from "../../../hooks/useSocketEmit.js";
import {
  updateStatus,
  updateActivity,
  removeActivity,
} from "../../../reducers/activity.slice.js";
import { createPortal } from "react-dom";
import Modal from "../../Modal/Modal.jsx";
import AddEditActivity from "../AddEditActivity/AddEditActivity.jsx";
import ShareActivityModal from "../ShareActivityModal/ShareActivityModal.jsx";
import IconButton from "../../IconButton/IconButton.jsx";

const ActivityItem = ({ activity }) => {
  const dispatch = useDispatch();
  const [editActivityOpen, setEditActivityOpen] = useState(false);
  const [shareActivityOpen, setShareActivityOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const navigate = useNavigate();
  const { editActivity, deleteActivity, changeActivityStatus } =
    useSocketEmit();

  const changeStatus = async (action) => {
    const data = await changeActivityStatus(activity.id, action);
    if (data) {
      dispatch(removeActivity(data.id)); // rimuove l'attività dalla tab corrente (verrà mostrata in quella giusta al prossime re-render grazie a retrieveActivities)
    }
  };

  const delActivity = async () => {
    await deleteActivity(activity.id)
      .then(() => {
        dispatch(removeActivity(activity.id));
      })
      .catch((e) => console.error(e));
  };

  const handleEditActivity = async (updatedActivity) => {
    const data = await editActivity(updatedActivity);

    if (data) {
      dispatch(updateActivity(data));
      setEditActivityOpen(false);
    }
  };

  const EditActivityModal = (
    <Modal
      isOpen={editActivityOpen}
      onClose={() => setEditActivityOpen(false)}
      header="Modifica attività"
    >
      <AddEditActivity activity={activity} onSubmit={handleEditActivity} />
      <button type="button" className="share-button" onClick={() => setShareActivityOpen(true)}>Condividi con altri utenti</button>
      <div className="modal__buttons">
        <button type="submit" form="add-edit-activity" className="button">
          Modifica attivit&agrave;
        </button>
      </div>
    </Modal>
  );

  const goToDetail = () => {
    navigate(`/activity/${activity.id}`);
  };

  return (
    <div className={styles.todoItem}>
      <div className={styles.todoDate}>
        Da completare entro: {format(new Date(activity.dueDate), "dd/MM/yyyy")}
      </div>
      <div className={styles.todoContent}>
        <div className={styles.todoInfo}>
          <div className={styles.todoTitle}>{activity.name}</div>
          <div>{activity.description}</div>
        </div>
        <div className={styles.buttons}>
          <IconButton onClick={goToDetail} icon={<FaEye />} />
          {activity.status === "open" && (
            <>
              <IconButton
                onClick={() =>
                  changeStatus(config.socket.actions.COMPLETE_ACTIVITY)
                }
                icon={<FaCheck />}
              />
            </>
          )}
          {activity.status === "completed" && (
            <>
              <IconButton
                onClick={() =>
                  changeStatus(config.socket.actions.REOPEN_ACTIVITY)
                }
                icon={<FaArrowLeft />}
              />
              <IconButton
                onClick={() =>
                  changeStatus(config.socket.actions.ARCHIVE_ACTIVITY)
                }
                icon={<FaArchive />}
              />
            </>
          )}
          <IconButton
            onClick={() => setEditActivityOpen(true)}
            icon={<FaEdit />}
          />
          <IconButton
            onClick={delActivity}
            icon={<FaTrash />}
            className={styles.delete__button}
          />
        </div>
      </div>
      {createPortal(EditActivityModal, document.body)}
      {createPortal(
        <ShareActivityModal
          isOpen={shareActivityOpen}
          onClose={() => setShareActivityOpen(false)}
          selectedUsers={selectedUsers}
          onConfirm={() => null}
        />,
        document.body
      )}
    </div>
  );
};

export default ActivityItem;
