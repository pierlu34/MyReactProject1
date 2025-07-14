const IconButton = ({icon, onClick, className}) => {
    return (
        <button onClick={onClick} className={className}>
            {icon}
        </button>
    )
}

export default IconButton;