import React from "react";
import { Link } from "react-router-dom";
import NavbarStyle from "./Navbar.module.scss";

const { container, logo, logout } = NavbarStyle;

export default function Navbar({ userData, logOut }) {
  return (
    <>
      <nav>
        <div className={`${container} d-flex align-items-center`}>
          <div className={`${logo}`}>
            <Link to="/">
              <img src={require("../../Assets/Images/logo.png")} alt="" />
            </Link>
          </div>
          {userData ? (
            <ul className={`${NavbarStyle["navigation-links"]} mb-2 mb-lg-0 `}>
              <li className="nav-item">
                <Link className="nav-link mx-1" to="home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mx-1" to="/games">
                  All
                </Link>
              </li>
              <li className="nav-item dropdown">
                <span
                  className="nav-link mx-1 dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Platforms
                </span>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/collectionOfGames/platform/pc"
                    >
                      PC
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/collectionOfGames/platform/browser"
                    >
                      Browser
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <span
                  className="nav-link mx-1 dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Sort by
                </span>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/collectionOfGames/sort-by/release-date"
                    >
                      Relese date
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/collectionOfGames/sort-by/popularity"
                    >
                      Popularity
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/collectionOfGames/sort-by/alphabetical"
                    >
                      Alphabetical
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/collectionOfGames/sort-by/relevance"
                    >
                      Relevance
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <span
                  className="nav-link mx-1 dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categories
                </span>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/collectionOfGames/category/racing"
                    >
                      Racing
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/collectionOfGames/category/sports"
                    >
                      Sports
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/collectionOfGames/category/social"
                    >
                      Social
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/collectionOfGames/category/shooter"
                    >
                      Shooter
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/collectionOfGames/category/open-world"
                    >
                      Open World
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/collectionOfGames/category/zombie"
                    >
                      Zombie
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/collectionOfGames/category/fantasy"
                    >
                      Fantasy
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/collectionOfGames/category/action-rpg"
                    >
                      Action rpg
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/collectionOfGames/category/action"
                    >
                      Action
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/collectionOfGames/category/flight"
                    >
                      Flight
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/collectionOfGames/category/battle-royale"
                    >
                      Battle Royale
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          ) : (
            ""
          )}

          <ul className={`${NavbarStyle["sign-status"]} ms-auto`}>
            {!userData ? (
              <>
                <li>
                  <Link to="signup">Register</Link>
                </li>
                <li>
                  <Link to="/">Login</Link>
                </li>
              </>
            ) : (
              <li>
                <span onClick={logOut} className={`${logout}`}>
                  Logout
                </span>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}
