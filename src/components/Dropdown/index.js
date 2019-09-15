import React, { useState, useContext } from 'react';
import Cookie from "js-cookie";
import { CurrentUserContext } from 'components/App';
import { Link } from "react-router-dom";

import './style.scss';

export default function() {
  const { dispatch } = useContext(CurrentUserContext);
  const [dropDownShown, setDropDownShown] = useState(false);

  function handleDropDownClick() {
    setDropDownShown(!dropDownShown)
  }

  function handleLogout() {
    Cookie.remove('token');
    dispatch({type: 'CLEAR_CURRENT_USER'})
  }

  return (
    <div className={dropDownShown ? 'dropdown is-right is-active' : 'dropdown is-right '}>
      <div className="dropdown-trigger">
        <button onClick={handleDropDownClick} className="profile-btn" aria-haspopup="true" aria-controls="dropdown-menu">
          <img src="https://picsum.photos/45/45" alt="User Avatar"/>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          <Link className="dropdown-item" to="/profile/">Edit profile</Link>
          <button className="dropdown-item button" onClick={handleLogout}>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  )
};
