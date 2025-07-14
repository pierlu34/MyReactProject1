import config from ".././../../config.js";

export const getActivities = async (token) => {
  try {
    const response = await fetch(
      `${config.api.baseUrl}/${config.api.paths.activity}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();

    if (response.ok) {
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const createActivity = async (activity, token) => {
  console.log("📦 Attività da inviare:", activity);
  try {
    const response = await fetch(
      `${config.api.baseUrl}/${config.api.paths.activity}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(activity),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      console.error("❌ Errore nel POST delle attività:", data);
      throw new Error(data.message || "Errore sconosciuto dal server");
    }
    return data;
  } catch (error) {
    console.error("❗Errore nella richiesta createActivity:", error);
    throw error;
  }
};

export const editActivity = async (activity, activityId, token) => {
  try {
    const response = await fetch(
      `${config.api.baseUrl}/${config.api.paths.activity}/${activityId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(activity),
      }
    );

    const data = await response.json();
    if (response.ok) {
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const changeActivityStatus = async (id, status, token) => {
  try {
    const response = await fetch(
      `${config.api.baseUrl}/${config.api.paths.activity}/${id}/${status}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteActivityService = async (id, token) => {
  try {
    const response = await fetch(
      `${config.api.baseUrl}/${config.api.paths.activity}/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );


    if (!response.ok) {
      throw new Error('Errore nella cancellazione della task');
    }
 
  }
  catch (error) {
    console.error("❗Errore nella richiesta deleteActivity:", error);
    throw error;
  }
}