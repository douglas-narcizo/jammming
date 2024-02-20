import './MyPlaylists.css';
import PlaylistsCell from '../PlaylistsCell/PlaylistsCell';

function MyPlaylists(props) {
    let playlists = [];
    if (props.playlistsList.length > 0) {
        playlists = props.playlistsList.map((item) => {
            return (<PlaylistsCell key={item.id} name={item.name} image={item.images[0].url} selectTargetPlaylist={props.selectTargetPlaylist} />);
        });
    }
    return (
        <div className="MyPlaylists">
            <h2>My Playlists</h2>
            <div className="MyPlaylists-container">
                <ul className="MyPlaylists-list">
                    {playlists}
                </ul>
            </div>
        </div>
    );
}

export default MyPlaylists;