const Notification = props => {
    if (props.message === null) {
        return <div></div>;
    }

    if (props.type === 'error') {
        return (
            <div className="error">
                <p>{props.message}</p>
            </div>
        )
    }

    return (
        <div className="success">
            <p>{props.message}</p>
        </div>
    )
}

export default Notification;