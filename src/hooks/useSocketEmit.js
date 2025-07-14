import { useContext } from 'react';
import { SocketContext } from '../contexts/SocketProvider.jsx';
import config from '../../config.js';

const useSocketEmit = () => {

    const { socket } = useContext(SocketContext);

    const getActivities = (payload) => {
        return new Promise((resolve, reject) => {
            socket.emit(config.socket.actions.GET_ACTIVITIES_BY_SKIP, payload, (response) => {
                if(response.success) {
                    resolve(response.data);
                } else {
                    reject(response.error);
                }
            })
        })
    }

    const getActivity = (id) => {
        return new Promise((resolve, reject) => {
            socket.emit(config.socket.actions.GET_ACTIVITY, {id}, (response) => {
                if(response.success) {
                    resolve(response.data);
                } else {
                    reject(response.error);
                }
            })
        })
    }

    const createActivity = (activity) => {
        return new Promise((resolve, reject) => {
            socket.emit(config.socket.actions.ADD_ACTIVITY, activity, (response) => {
                if(response.success) {
                    resolve(response.data);
                } else {
                    reject(response.error);
                }
            })
        })
    }

    const changeActivityStatus = (id, action) => {
        console.log("Changing activity status:", id, action);
        return new Promise((resolve, reject) => {
            socket.emit(action, {id}, (response) =>{
                if(response.success) {
                    resolve(response.data);
                } else {
                    reject(response.error);
                }
            })
        })
    }

    const editActivity = (activity) => {
        return new Promise((resolve, reject) => {
            socket.emit(config.socket.actions.UPDATE_ACTIVITY, activity, (response) =>{
                if(response.success) {
                    resolve(response.data);
                } else {
                    reject(response.error);
                }
            })
        })
    }

    const deleteActivity = (id) => {
        return new Promise((resolve, reject) => {
            socket.emit(config.socket.actions.DELETE_ACTIVITY, {id}, (response) => {
                if(response.success) {
                    resolve(response.data);
                } else {
                    reject(response.error);
                }
            })
        })
    }

    const getUsers = (payload) => {
        return new Promise((resolve, reject) => {
            socket.emit(config.socket.actions.GET_USERS, {payload}, (response) => {
                if(response.success) {
                    resolve(response.data);
                } else {
                    reject(response.error);
                }
            })
        })
    }

    return {
        getActivities,
        getActivity,
        createActivity,
        changeActivityStatus,
        editActivity,
        deleteActivity,
        getUsers
    }
}

export default useSocketEmit;