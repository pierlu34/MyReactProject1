import { TabPanel, Tabs } from "../../Tabs/Tabs.jsx";
import ActivityList from "../ActivityList/ActivityList.jsx";
import { useCallback, useEffect, useState } from "react";
import { getActivities } from "./../../services/activityService.js";
import Loader from "../../Loader/Loader.component.jsx";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../../reducers/user.slice.js";
import {
  activitySelector,
  setActivities,
} from "../../../reducers/activity.slice.js";
import { createPortal } from "react-dom";
import AddActivityModal from "../AddActivityModal/AddActivityModal.jsx";

const ActivitiesPage = () => {
  const activities = useSelector(activitySelector);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [addActivityOpen, setAddActivityOpen] = useState(false);
  const user = useSelector(userSelector);
  const status = [
    {
      label: "Aperte",
      value: "open",
    },
    {
      label: "Completate",
      value: "completed",
    },
    {
      label: "Archiviate",
      value: "archived",
    },
  ];
  const filterActivitiesByStatus = (status) => {
    return activities.filter((activity) => activity.status === status);
  };

  const retrieveActivities = useCallback(async () => {
    setIsLoading(true);
    if (user.accessToken) {
      const data = await getActivities(user.accessToken);
      if (data) {
        dispatch(setActivities(data));
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    retrieveActivities().catch((e) => e);
  }, []);


const handleCreateActivity = (newActivity) => {
    // Logica per salvare l’attività
    console.log("Creazione attività:", newActivity);
  };

  const modal = (
    <AddActivityModal
      isOpen={addActivityOpen}
      onClose={() => setAddActivityOpen(false)}
      onSubmit={handleCreateActivity}
    />
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
      <Tabs>
        {status.map((s) => {
          return (
            <TabPanel header={s.label} key={s.value}>
              {!isLoading ? (
                <ActivityList
                  activities={filterActivitiesByStatus(s.value)}
                ></ActivityList>
              ) : (
                <Loader />
              )}
            </TabPanel>
          );
        })}
      </Tabs>
      {createPortal(modal, document.body)}
    </>
  );
};

export default ActivitiesPage;
