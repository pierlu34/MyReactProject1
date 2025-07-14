import config from "../../../../config.js";
import { SocketContext } from "../../../contexts/SocketProvider.jsx";
//hooks
import { useEffect, useState, useContext } from "react";
import useSocketEmit from "../../../hooks/useSocketEmit.js";
//redux e reducers
import { useSelector, useDispatch } from "react-redux";
import { userSelector } from "../../../reducers/user.slice.js";
import {
    activitySelector,
    setActivities,
    addActivity,
    clearActivities,
} from "../../../reducers/activity.slice.js";
//componenti
import ActivityList from "../ActivityList/ActivityList.jsx";
import Toast from "../../Toast/Toast.jsx";
import { TabPanel, Tabs } from "../../Tabs/Tabs.jsx";
import Loader from "../../Loader/Loader.component.jsx";
import Modal from "../../Modal/Modal.jsx";
import AddEditActivity from "../AddEditActivity/AddEditActivity.jsx";
import ShareActivityModal from "../ShareActivityModal/ShareActivityModal.jsx";
//import AddActivityModal from '../AddActivityModal/AddActivityModal.jsx';
//altro/misc
import { createPortal } from "react-dom";

const ActivitiesPage = () => {
  const activities = useSelector(activitySelector);
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const { socket, socketReady } = useContext(SocketContext);
  const [isLoading, setIsLoading] = useState(false);
  const [addActivityOpen, setAddActivityOpen] = useState(false);
    const [shareActivityOpen, setShareActivityOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { getActivities, createActivity } = useSocketEmit();
  const [lazyState, setLazyState] = useState({
        skip:0,
        limit:5,
        status: [config.status.OPEN.value]
    })
  const [noMoreActivities, setNoMoreActivities] = useState(false);
  

  const retrieveActivities = async () => {
    setIsLoading(true);
    const data = await getActivities(lazyState).catch((e) => {
      if (e.status === 404) {
        setNoMoreActivities(true); // se non ci sono più attività, imposta noMoreActivities a true
      } else {
        console.error(e);
      }
    });

    if (data) {
        setNoMoreActivities(false);
        if(lazyState.skip === 0){      // se lo skip è 0, carica solo le prime 5 attività (quelle che arrivano dall'emit del socket)
            dispatch(setActivities(data.activities))  // come se stessi caricando le attività per la prima volta
        } else {
            dispatch(setActivities([...activities, ...data.activities])) //altrimenti, aggiungi le attività appena caricate a quelle già presenti
        }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (socketReady && socket) {
      retrieveActivities([config.status.OPEN.value]).catch((e) => e); // Se socket esiste e socketReady è true, recupera le attività con status 'open'
    }
  }, [socketReady, socket, lazyState]);

  const handleStatusChange = (props) => {
    dispatch(clearActivities()); // Pulisce le attività esistenti quando si cambia lo stato, cioè quando clicchiamo su un'altra tab
    setLazyState({...lazyState, skip:0, status: [props.status] });
  };

  const handleLoadMoreActivities = () => {
    setLazyState({...lazyState, skip: lazyState.skip + lazyState.limit }); // Incrementa lo skip per caricare più attività
  }

  const handleCreateActivity = async (activity) => {
    if (selectedUsers.length > 0) {
      activity.userIds = selectedUsers.map((u) => u._id);
    }

    const data = await createActivity(activity).catch((e) => {
      console.error(e);
    });

    if (data) {
      dispatch(addActivity(data));
      closeAddActivityModal();
    } else {
      setToastMessage(`Ricordati di compilare tutti i campi!-${Date.now()}`);
    }
  };

  const closeAddActivityModal = () => {
    setSelectedUsers([])
    setAddActivityOpen(false);
  }

  const AddActivityModal = (
    <Modal
      isOpen={addActivityOpen}
      onClose={closeAddActivityModal}
      header="Aggiungi attività"
    >

      <AddEditActivity onSubmit={handleCreateActivity} />
      <p>
        Attività condivisa con: {selectedUsers.map((u) => u.email).join(", ")}
      </p>
        <button type="button" className="share-button" onClick={() => setShareActivityOpen(true)}>Condividi con altri utenti</button>
        <div className="modal__buttons">
            <button type="submit" form="add-edit-activity" className="button">
          Salva attivit&agrave;
            </button>
        </div>

    </Modal>
  );

  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <button
          type="button"
          className="button"
          onClick={() => setAddActivityOpen(true)}
        >
          Aggiungi elemento
        </button>
      </div>
      <Tabs onTabChange={handleStatusChange}>
        {Object.values(config.status).map((s) => {
          return (
            <TabPanel header={s.label} key={s.value} status={s.value}>
              {!isLoading ? (
                <ActivityList activities={activities} onLoadMore={handleLoadMoreActivities} hideButton={noMoreActivities}></ActivityList> //se non ci sono più attività, non mostra il pulsante "Vedi altre attività"
              ) : (
                <Loader />
              )}
            </TabPanel>
          );
        })}
      </Tabs>
      {createPortal(AddActivityModal, document.body)}
      {toastMessage && (
        <Toast key={toastMessage} message={toastMessage.split("-")[0]} />
      )}
      {createPortal(
        shareActivityOpen && <ShareActivityModal
          isOpen={shareActivityOpen}
          onClose={() => setShareActivityOpen(false)}
          selectedUsers={selectedUsers}
          onConfirm={users => setSelectedUsers(users)}
        />,
        document.body
      )}
    </>
  );
};

export default ActivitiesPage;