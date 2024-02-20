import './Playlist.css';
import TrackList from '../Tracklist/TrackList';

function Playlist(props) {
    let saveButton;
    if (props.playlistTracks.length > 0 && props.playlistName) {
        saveButton = <button id="Playlist-save" onClick={props.onSave}>Save to Spotify</button>
    }

    return (
        <div className="Playlist-container">
            <input id="Playlist-name" value={props.playlistName} onChange={props.onNameChange} title="Rename playlist"></input>
            <TrackList tracks={props.playlistTracks} onClick={props.removeFromPlaylist} action="remove" />
            {saveButton}
        </div>
    )
}

export default Playlist;