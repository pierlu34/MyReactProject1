import { useState } from "react";
import styles from "./Tabs.module.scss";

export const Tabs = ({ children, onTabChange }) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (index, props) => {
        setActiveTab(index);
        onTabChange?.(props); // con optional chaining, in caso onTabChange sia undefined
    };

    const tabHeaders = children.map((child, index) => (
        <button
            key={index}
            className={`${styles['tab-button']} ${activeTab === index ? styles.active : ""}`}
            onClick={() => handleTabChange(index, child.props)}
        >
            {child.props.header}
        </button>
    ));

    return (
        <section className={styles['tabs-container']}>
            <div className={styles['tabs-header']}>{tabHeaders}</div>
            <div className={styles['tab-content']}>
                {children[activeTab]}
            </div>
        </section>
    );
};

export const TabPanel = ({ header, children }) => {
    return <div>{children}</div>;
};