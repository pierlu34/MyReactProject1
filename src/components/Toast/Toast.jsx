import styles from './Toast.module.scss';
import {useState, useEffect} from 'react';

const Toast = ({message}) => {
    const [display, setDisplay] = useState(false);
    
    useEffect(() => {
        setDisplay(true);
        
        const timer = setTimeout(() => {
            setDisplay(false);
        }, 5000);

        return () => clearTimeout(timer); // Pulisce il timeout quando il componente viene smontato
    }, [message]);

    return (
        <div className={ display ? styles["toast"] : styles["no_toast"]}>
            <div>{message}</div>
        </div>
    );
}

export default Toast;