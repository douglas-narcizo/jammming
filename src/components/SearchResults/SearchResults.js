import './SearchResults.css';
import TrackList from '../Tracklist/TrackList';

// <TrackList tracks={props.tracks} onClick={props.addToPlaylist} action="add" />
function SearchResults(props) {
    return (
        <div className="Search-results">
            <h2>Search Results</h2>
            <TrackList tracks={props.searchResults} onClick={props.addToPlaylist} action="add" />
        </div>
    );
}

export default SearchResults;