import styles from './ActivityList.module.scss'
import ActivityItem from "../ActivityItem/ActivityItem.jsx"

const ActivityList = ({activities, onLoadMore, hideButton}) => {
       const loadMoreHandler = () => {
        onLoadMore();
    }

    return(
        <>
            {activities?.length > 0 ?
               activities.map(activity => (
               <ActivityItem key={activity.id} activity={activity}/>
            )) : <div>Nessun elemento in lista</div>}
            <div className={styles.load_more_wrapper}>
                {!hideButton && <button className="text" onClick={loadMoreHandler}>Vedi altre attivit&agrave;</button>}
            </div>
        </>
    )
}

export default ActivityList