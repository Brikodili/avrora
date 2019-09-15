import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {CurrentUserContext} from 'components/App';
import Dropdown from 'components/Dropdown';
import './style.scss';

export default function () {
  const {state: currentUser} = useContext(CurrentUserContext);

  return (
    <header>
      {currentUser ? (
        <>
          <nav className="navbar nav">
            <ul className="navbar-menu">
              <li className="navbar-brand navbar-item">
                <Link className="subtitle is-5 nav__logo" to="/">
                  <strong>Exprts</strong>
                </Link>
              </li>
              <li className="navbar-item">
                <div className="field has-addons">
                  <input className="input nav__search-input" type="text" placeholder="Find a post"/>
                </div>
              </li>
            </ul>
            <ul className="navbar-end">
              <li className="navbar-item has-text-grey-light">Эксперты</li>
              <li className="navbar-item"><a className="has-text-black" href="/">Вопросы</a></li>
              <li className="navbar-item"><a className="has-text-black" href="/">О нас</a></li>
              <li className="navbar-item"><a className="has-text-black" href="/">Создать проект</a></li>
            </ul>
            <Dropdown/>
          </nav>
        </>
      ) : (
        <nav>
          <ul className="navbar">
            <li className="navbar-brand navbar-item">
              <Link className="" to="/">Home</Link>
            </li>
            <li className="navbar-item">
              <Link className="" to="/registration/">Registration</Link>
            </li>
            <li className="navbar-item">
              <Link className="" to="/login/">Login</Link>
            </li>
            <li className="navbar-item">
              <Link className="" to="/dashboard/">Dashboard</Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
