import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className="logo">
        <h2>Item Manager</h2>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/" end>
              View Items
            </NavLink>
          </li>
          <li>
            <NavLink to="/add">
              Add Item
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header; 