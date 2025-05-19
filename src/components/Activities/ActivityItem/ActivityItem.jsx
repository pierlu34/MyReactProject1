import styles from './ActivityItem.module.scss';
import { format } from "date-fns";
import { FaArchive, FaArrowLeft, FaCheck, FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { changeActivityStatus, deleteActivity, editActivity } from "../../services/activityService.js";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../../reducers/user.slice.js";
import config from "@/components/config.js";
import { removeActivity, updateStatus, updateActivity } from "../../../reducers/activity.slice.js";
import { createPortal } from "react-dom";
import Modal from "../../Modal/Modal.jsx";
import AddEditActivity from "../AddEditActivity/AddEditActivity.jsx";
import { useState } from "react";

const ActivityItem = ({ activity }) => {
    const user = useSelector(userSelector);
    const dispatch = useDispatch();

    const [editActivityOpen, setEditActivityOpen] = useState(false);

    const changeStatus = async (action) => {
        const data = await changeActivityStatus(activity["_id"], action, user.accessToken);
        console.log(data);
        if (data) {
            dispatch(updateStatus(data));
        }
    };

    const delActivity = async () => {
        deleteActivity(activity["_id"], user.accessToken)
            .then(() => {
                dispatch(removeActivity(activity["_id"]));
            })
            .catch((e) => console.error(e));
    };

    const handleEditActivity = async (updatedActivity) => {
        const data = await editActivity(updatedActivity, activity["_id"], user.accessToken);

        if (data) {
            dispatch(updateActivity(data));
            setEditActivityOpen(false);
        }
    };

    const EditActivityModal = (
        <Modal isOpen={editActivityOpen} onClose={() => setEditActivityOpen(false)} header="Aggiungi Attività">
            <AddEditActivity activity={activity} onSubmit={handleEditActivity} />
            <div className="modal__buttons">
                <button type="submit" form="add-edit-activity" className="button">
                    Aggiorna attivit&agrave;
                </button>
            </div>
        </Modal>
    );

    return (
        <div className={styles.todoItem}>
            <div className={styles.todoDate}>
                Da fare entro: {format(new Date(activity.dueDate), 'dd/MM/yyyy')}
            </div>
            <div className={styles.todoContent}>
                <div className={styles.todoInfo}>
                    <div className={styles.todoTitle}>{activity.name}</div>
                    <div>{activity.description}</div>
                </div>
                <div className={styles.buttons}>
                    <button>
                        <FaEye />
                    </button>
                    {activity.status === 'open' && (
                        <>
                            <button onClick={() => changeStatus(config.actions.complete)}>
                                <FaCheck />
                            </button>
                        </>
                    )}
                    {activity.status === 'completed' && (
                        <>
                            <button onClick={() => changeStatus(config.actions.uncomplete)}>
                                <FaArrowLeft />
                            </button>
                            <button onClick={() => changeStatus(config.actions.archive)}>
                                <FaArchive />
                            </button>
                        </>
                    )}
                    <button onClick={() => setEditActivityOpen(true)}>
                        <FaEdit />
                    </button>
                    <button className="delete__button" onClick={delActivity}>
                        <FaTrash />
                    </button>
                </div>
            </div>
            {createPortal(EditActivityModal, document.body)}
        </div>
    );
};

export default ActivityItem;