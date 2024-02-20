import './TrackList.css';
import Track from '../Track/Track';

function TrackList (props) {
    let trackList = [];
    trackList = props.tracks.map((track) => {
        return (<Track track={track} key={track.id} onClick={props.onClick} action={props.action} />);
    });
    return (
        <div className="Track-list-container">
            <ul className="Track-list">
                {trackList}
            </ul>
        </div>
    );
}

export default TrackList;