import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const CollectionOfGames = ({ getGames }) => {
  const { key, value } = useParams();

  const [games, setGames] = useState([]);

  useEffect(() => {
    (async function fetchGames() {
      const params = { params: {} };
      params.params[key] = value;
      let gamesHome = await getGames("games", params);
      console.log(gamesHome);
      setGames(gamesHome);
    })();
  }, [value]);

  {
    return games.length === 0 ? (
      <Loading />
    ) : (
      <div className="container py-5">
        <div className="row gy-4">
          {games.map((game, index) => (
            <div
              key={index}
              className="col-xl-3 col-lg-4 col-md-6 h-100"
              title={
                game.platform == "PC (Windows)"
                  ? `Avilable on Windows`
                  : `Avilable on Browser`
              }
            >
              <Link to={`/gameDetails/${game.id}`}>
                <div className={`game-container h-100`}>
                  <div>
                    <img src={game.thumbnail} className="w-100" />
                  </div>
                  <div className="px-3 py-3">
                    <div className="d-flex justify-content-between align-items-center pb-1">
                      <h2 className="h5">{game.title}</h2>
                      <span className="h6">Free</span>
                    </div>
                    <p className="text-muted">
                      {game.short_description.split(" ").slice(0, 3).join(" ")}
                      ..........
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <i className="fa-solid fa-square-plus"></i>
                      <div>
                        <span>{game.genre}</span>
                        {game.platform == "PC (Windows)" ? (
                          <i className="ms-2 fa-brands fa-windows"></i>
                        ) : (
                          <i className="ms-2 fa-solid fa-window-maximize"></i>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default CollectionOfGames;
