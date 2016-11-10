import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

if (process.env.BROWSER ) {
    require ("../style/menu.scss");
}

const App = (props) => {
  return (
    <div className="app-container">
        <div className="menu">
            <img className="menu__logo" src="/images/sc_logo.png" />
            <div className="menu__title">
                Service Connect
            </div>
            <ul className="menu__row">
                <li className="menu__item">
                    <IndexLink className="menu__link menu__link--active" to="/"  href="/">Dashboard</IndexLink>
                </li>
                <li className="menu__item">
                    <IndexLink className="menu__link" to="/endpoints" href="/endpoints">Endpoints</IndexLink>
                </li>
                <li className="menu__item">
                    <IndexLink className="menu__link" to="/audit" href="/audit">Messages</IndexLink>
                </li>
                <li className="menu__item">
                    <IndexLink className="menu__link" to="/errors" href="/errors">Errors</IndexLink>
                </li>
                <li className="menu__item">
                    <IndexLink className="menu__link" to="/" href="/">Settings</IndexLink>
                </li>
            </ul>
        </div>
        <div className="page-content">

        </div>
      {props.children}
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element
};

export default App;
