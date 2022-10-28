import React from "react";

import { Link } from "react-router-dom";

/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

function Menu() {
  return (
    <nav className="navbar navbar-dark align-items-start p-0">
      <div className="container-fluid d-flex flex-column p-0">
        <Link
          className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0"
          to="/"
        >
          <div className="sidebar-brand-text mx-3">
            <h3>Periodic Tables</h3>
          </div>
        </Link>
        <hr className="sidebar-divider my-0" />
        <ul className="nav navbar-nav text-light" id="accordionSidebar">
          <li className="row">
            <li className="nav-item">
              <Link className="nav-link mr-2" to="/dashboard">
                <span className="oi oi-dashboard" />
                &nbsp;Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link ml-5" to="/search">
                <span className="oi oi-magnifying-glass" />
                &nbsp;Search
              </Link>
            </li>
          </li>
          
          <li className="row">
            <li className="nav-item">
              <Link className="nav-link" to="/reservations/new">
                <span className="oi oi-plus" />
                &nbsp;New Reservation
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link ml-3" to="/tables/new">
                <span className="oi oi-layers" />
                &nbsp;New Table
              </Link>
            </li>
          </li>
        </ul>
        <div className="text-center d-none d-md-inline">
          <button
            className="btn rounded-circle border-0"
            id="sidebarToggle"
            type="button"
          />
        </div>
      </div>
    </nav>
  );
}

export default Menu;
