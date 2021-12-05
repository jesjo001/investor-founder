import React, { useState } from 'react';
import { Button } from 'reactstrap';

const SearchBox = ({ onClickBtn, onChange, value }) => {
  const [searched, setSearched] = useState('');

  return (
    <div className="form-inline">
      <input
        id="search"
        type="text"
        className="form-control mr-sm-1 searchbox"
        value={value}
        onChange={onChange}
        placeholder="Search"
      />
      <Button onClick={onClickBtn} id="searchBtn" className="d-none d-sm-block search-btn">
        <i className="fa fa-search" />
      </Button>
    </div>
  );
};

export default SearchBox;
