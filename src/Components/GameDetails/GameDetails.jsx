import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import GameDetailsStyle from "./GameDetails.module.scss";

function GameDetails({ getGames }) {
  let { gameId } = useParams();
  const [requirements, setRequirements] = useState([]);
  const [games, setGames] = useState([]);

  useEffect(() => {
    (async function fetchGames() {
      let gamesHome = await getGames("game", { params: { id: gameId } });
      console.log(gamesHome);
      setGames(gamesHome);
    })();
  }, []);

  useEffect(() => {
    if (games.length === 0) return;
    const requireResponce = games.minimum_system_requirements;
    const requirementsArr = Object.keys(requireResponce).map((key) => [
      key,
      requireResponce[key],
    ]);
    setRequirements(requirementsArr);
  }, [games]);

  {
    return games.length === 0 ? (
      <Loading />
    ) : (
      <section id="gameDetails" className={`${GameDetailsStyle.gameDetails}`}>
        <div className="container">
          <div className="row">
            <div className="col-lg-4 pb-lg-0 pb-3">
              <div className="game-image">
                <img
                  src={games.thumbnail}
                  className="w-100"
                  alt={`${games.title} image`}
                />
              </div>
              <div className="d-flex mt-2 gap-2">
                <span className="btn btn-secondary text-uppercase">free</span>
                <button className="btn btn-main flex-grow-1">
                  <a href={games.freetogame_profile_url} className="fw-bold">
                    Play Now
                    <i className="ms-2 fa-solid fa-up-right-from-square"></i>
                  </a>
                </button>
              </div>
            </div>
            <div className="col-lg-8 d-flex flex-column gap-3 pb-5">
              <h1>{games.title}</h1>
              <div className="about">
                <h3 className="h4">{`About ${games.title}`}</h3>
                <p>{games.description}</p>
              </div>
              {games.minimum_system_requirements ? (
                <div className="requirements">
                  <h3 className="h4">{`Minimum System Requirements`}</h3>
                  <ul className="list-unstyled">
                    {requirements.map((require, index) => (
                      <li key={index} className="text-capitalize">
                        <span className="fw-bold me-2">{require[0]} :</span>
                        {require[1]}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                ""
              )}

              <div className="screenshots">
                {games.screenshots?.length > 0 ? (
                  <>
                    <h3 className="py-2">{games.title} Screenshots</h3>
                    <div
                      id="carouselExampleSlidesOnly"
                      className="carousel slide"
                      data-bs-ride="carousel"
                    >
                      <div className="carousel-inner">
                        <div className="carousel-item active">
                          <img
                            src={games.screenshots[0].image}
                            className="d-block w-100"
                            alt={`Screenshot of ${games.title}`}
                          />
                        </div>
                        <div className="carousel-item ">
                          <img
                            src={games.screenshots[1].image}
                            className="d-block w-100"
                            alt={`Screenshot of ${games.title}`}
                          />
                        </div>
                        <div className="carousel-item ">
                          <img
                            src={games.screenshots[2].image}
                            className="d-block w-100"
                            alt={`Screenshot of ${games.title}`}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
              <div className="additionalInfo">
                <h3>Additional Information</h3>
                <div className="container pt-4">
                  <div className="row gy-4">
                    <div className="col-md-4 d-flex justify-content-center align-items-center">
                      <div className={`${GameDetailsStyle.infoContainer}`}>
                        <h4>Title</h4>
                        <h4>{games.title}</h4>
                      </div>
                    </div>
                    <div className="col-md-4 d-flex justify-content-center align-items-center">
                      <div className={`${GameDetailsStyle.infoContainer}`}>
                        <h4>Developer</h4>
                        <h4>{games.developer}</h4>
                      </div>
                    </div>
                    <div className="col-md-4 d-flex justify-content-center align-items-center">
                      <div className={`${GameDetailsStyle.infoContainer}`}>
                        <h4>Publisher</h4>
                        <h4>{games.publisher}</h4>
                      </div>
                    </div>
                    <div className="col-md-4 d-flex justify-content-center align-items-center">
                      <div className={`${GameDetailsStyle.infoContainer}`}>
                        <h4>Release Date</h4>
                        <h4>{games.release_date}</h4>
                      </div>
                    </div>
                    <div className="col-md-4 d-flex justify-content-center align-items-center">
                      <div className={`${GameDetailsStyle.infoContainer}`}>
                        <h4>Genre</h4>
                        <h4>{games.genre}</h4>
                      </div>
                    </div>
                    <div className="col-md-4 d-flex justify-content-center align-items-center">
                      <div className={`${GameDetailsStyle.infoContainer}`}>
                        <h4>Platform</h4>
                        <h4>{games.platform}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default GameDetails;
