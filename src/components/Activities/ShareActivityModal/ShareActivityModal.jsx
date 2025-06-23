import Modal from '../../Modal/Modal.jsx';
import { getUsers } from './../../services/share.service.js';
import { useEffect, useState } from 'react';

const ShareActivityModal = ({isOpen, onClose}) => {
    const [users, setUsers] = useState([]);
    const [checkStatus, setCheckStatus] = useState(false);
    const loadUsers = async () => {
        const data = await getUsers()
        data.sort((a, b) => a.displayName.localeCompare(b.displayName))
        if(data) {
            setUsers(data)
        }
    }

    
    const atLeastOneSelected = () => {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        return Array.from(checkboxes).some(checkbox => checkbox.checked);
    }
    
    useEffect(() => {
        loadUsers()
    }, [])

    return <Modal isOpen={isOpen} onClose={onClose} header="Condividi attività">
        <div>
            <ul>
                {users.map((user) => {
                    return <li key={user.id}>
                        <input id={`checkbox-${user.id}`} type="checkbox" checked={checkStatus} onChange={() => setCheckStatus(checkStatus ? false : true)}/>
                        <label aria-label="checkbox" htmlFor={`checkbox-${user.id}`}>{user.displayName}</label>
                        </li>
                })}
            </ul>
        </div>
        <button aria-label="share-with" disabled={!atLeastOneSelected()}>Condividi</button>
    </Modal>
}

export default ShareActivityModal;