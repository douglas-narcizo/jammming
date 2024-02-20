import './Track.css';

function Track (props) {
    let actionButton;
    const addTrack = () => {props.onClick(props.track)}
    if (props.action === "add") {
        actionButton = <button onClick={addTrack} title="Add to playlist">+</button>
    } else {
        actionButton = <button onClick={addTrack} title="Remove from playlist">-</button>
    }
    return (
        <li className="Track-item">
            <div className="Track-icon">
                <img src={props.track.image} alt=""></img>
            </div>
            <div className="Track-description">
                <h3>
                    {props.track.name}
                </h3>
                <h4>
                    {props.track.artist} - {props.track.album}
                </h4>
            </div>
            {actionButton}
        </li>
    );
}

export default Track;