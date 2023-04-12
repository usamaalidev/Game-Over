import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import HomeStyle from "./Home.module.scss";

export default function Home({ getGames }) {
  const [games, setGames] = useState([]);

  useEffect(() => {
    (async function fetchGames() {
      let gamesHome = await getGames("games");
      setGames(gamesHome);
    })();
  }, []);

  return (
    <>
      {games.length > 0 ? (
        <>
          <header className={`${HomeStyle["home-header"]} py-5`}>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <h1 className={`${HomeStyle["main-header"]}`}>
                Find and track the best free-to-play games!
              </h1>
              <p className="text-muted">
                Track what you've played and search for what to play next! Plus
                get free premium loot!
              </p>
              <button className="btn btn-main">
                <Link to="/games">Browse Games</Link>
              </button>
            </div>
          </header>
          <section>
            <div className="container py-5">
              <h3 className="h2">Personalized Recommendations</h3>
              <div className="row gy-4 py-5">
                {games.slice(0, 3).map((game, index) => (
                  <div key={index} className="col-lg-4 col-md-6">
                    <Link to={`/gameDetails/${game.id}`}>
                      <div className={`game-container`}>
                        <div>
                          <img src={game.thumbnail} className="w-100" />
                        </div>
                        <div className="d-flex justify-content-between align-items-center px-3 py-3">
                          <h2 className="h4">{game.title}</h2>
                          <span>Free</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
