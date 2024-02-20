import React, { useState, useCallback } from 'react';
import './SearchBar.css';

function SearchBar(props) {
    const [term, setTerm] = useState('');

    const handleTermChange = useCallback((e) => {
      setTerm(e.target.value);
    }, []);
  
    const search = useCallback(() => {
      props.onSearch(term);
    }, [props.onSearch, term]);

    const searchOnEnter = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('SearchButton').click();
      }
    }

    return (
        <div className="Search-bar">
            <input id="Search-field" placeholder="Search by song title…" onChange={handleTermChange} onKeyDown={searchOnEnter} />
            <button id="SearchButton" onClick={search}>
                SEARCH
            </button>
        </div>
    );
}

export default SearchBar;