import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {CurrentUserContext} from 'components/App';
import Dropdown from 'components/Dropdown';
import './style.scss';

export default function () {
  const {state: currentUser} = useContext(CurrentUserContext);

  return (
    <>
      <header>
        <nav className="navbar nav">
          <ul className="navbar-menu">
            <li className="navbar-brand navbar-item">
              <Link className="subtitle is-5 nav__logo" to="/">
                <strong>Avrora</strong>
              </Link>
            </li>
            <li className="navbar-brand navbar-item">
              <Link className="subtitle" to="/registration">
                Реєстрація
              </Link>
            </li>
            {/*<li className="navbar-item">*/}
            {/*  <div className="field has-addons">*/}
            {/*    <input className="input nav__search-input" type="text" placeholder="Find a post"/>*/}
            {/*  </div>*/}
            {/*</li>*/}
          </ul>
          <ul className="navbar-end">
            <li className="navbar-item has-text-grey-light"><a className="has-text-black" href="/">Експерти</a></li>
            <li className="navbar-item"><Link className="has-text-black" to="/question">Питання</Link></li>
            <li className="navbar-item"><a className="has-text-black" href="/">Про нас</a></li>
            {/*<li className="navbar-item"><a className="has-text-black" href="/">Створити запит</a></li>*/}
          </ul>
          {/*<Dropdown/>*/}
        </nav>
      </header>
    </>
  )
}
