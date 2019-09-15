import React from 'react';
import Layout from 'components/Layout';
import Article from './article';
import './style.scss';
import {Link} from "react-router-dom";
import Dropdown from 'components/Dropdown'

export default function () {
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
            <li className="navbar-item">
              <div className="field has-addons">
                <input className="input nav__search-input" type="text" placeholder="Find a post"/>
              </div>
            </li>
          </ul>
          <ul className="navbar-end">
            <li className="navbar-item has-text-grey-light"><a className="has-text-black" href="/">Експерти</a></li>
            <li className="navbar-item"><a className="has-text-black" href="/">Питання</a></li>
            <li className="navbar-item"><a className="has-text-black" href="/">Про нас</a></li>
            <li className="navbar-item"><a className="has-text-black" href="/">Створити запит</a></li>
          </ul>
          <Dropdown/>
        </nav>
      </header>
      <div className="dashboard has-background-grey-lighter">
        <div className="container">
          <div className="columns">
            <div className="column">
              <div className="box">
                <Article/>
                <Article/>
                <Article/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};
