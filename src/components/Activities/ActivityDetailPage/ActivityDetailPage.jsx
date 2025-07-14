//config e store
import config from "../../../../config.js";
//hooks
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import useSocketEmit from "../../../hooks/useSocketEmit.js";
import { useSocketContext } from "../../../contexts/SocketProvider.jsx";

import { format } from "date-fns";
import styles from "./ActivityDetailPage.module.scss";

const ActivityDetailPage = () => {
  const [activity, setActivity] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const { getActivity, changeActivityStatus } = useSocketEmit();
  const { socketReady } = useSocketContext();
  const buttonProps = {
    open: {
      label: "Completa Attività",
      action: config.socket.actions.COMPLETE_ACTIVITY,
      style: styles.completeButton,
    },
    completed: {
      label: "Riapri Attività",
      action: config.socket.actions.REOPEN_ACTIVITY,
      style: styles.reopenButton,
    },
  };

  useEffect(() => {
    if (params.id && socketReady) {
      setIsLoading(true);
      getActivity(params.id)
        .then((data) => {
          setActivity(data);
        })
        .catch((e) => console.error(e));
      setIsLoading(false);
    }
  }, [params, socketReady]);

    if (isLoading) {
        return <div>Carico attività...</div>
    }

  const handleStatusChange = async (newStatus) => {
    try {
      const updatedActivity = await changeActivityStatus(
        activity.id,
        newStatus,
      );
      setActivity(updatedActivity);
    } catch (error) {
      console.error(
        `Errore nel cambiamento di status a ${newStatus}:`,
        error
      );
    }
  };

  const renderActionButton = () => {
    if (activity.status === "open" || activity.status === "completed") {
      return (
        <button
          onClick={() =>
            handleStatusChange(buttonProps[activity.status].action)
          }
          className={buttonProps[activity.status].style}
        >
          {buttonProps[activity.status].label}
        </button>
      );
    }
  };

  return (
    <>
      {activity && (
        <div className="card">
          <div className={styles.info__element}>
            <label>Data di scadenza:</label>
            <span>{format(new Date(activity.dueDate), "dd/MM/yyyy")}</span>
          </div>
          <div className={styles.info__element}>
            <label>Nome attivit&agrave;:</label>
            <span>{activity.name}</span>
          </div>
          <div className={styles.info__element}>
            <label>Stato attivit&agrave;:</label>
            <span>{activity.status}</span>
          </div>
          <div className={styles.info__element}>
            <label>Descrizione:</label>
            <span>{activity.description}</span>
          </div>
          {renderActionButton()}
        </div>
      )}
    </>
  );
};

export default ActivityDetailPage;