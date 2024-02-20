import './PlaylistsCell.css';

function PlaylistsCell(props) {
    return (
        <li className="Playlists-cell" onClick={props.selectTargetPlaylist} title="Edit playlist">
            <img src={props.image} alt=""/>
            <h3>{props.name}</h3>
        </li>
    );
}

export default PlaylistsCell;