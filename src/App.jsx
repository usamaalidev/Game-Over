import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Registration from "./Components/Registration/Registration";
import Signin from "./Components/Signin/Signin";
import Games from "./Components/Games/Games";
import GameDetails from "./Components/GameDetails/GameDetails";
import CollectionOfGames from "./Components/CollectionOfGames/CollectionOfGames";
import ErrorPage from "./Components/ErrorPage/ErrorPage";
import jwtDecode from "jwt-decode";
import { useState } from "react";
import axios from "axios";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { Provider } from "react-redux";
import { store } from "./Store/store.js";

function App() {
  const [userData, setUserData] = useState(localStorage.getItem("token"));

  function decodeUserData() {
    const endocedToken = localStorage.getItem("token");
    const decodedToken = jwtDecode(endocedToken);
    setUserData(decodedToken);
  }

  async function getGames(endPoint, params) {
    const options = {
      headers: {
        "X-RapidAPI-Key": "387f75efe7mshf0c69a02bb7eed2p1f750djsn5f15ae4755f1",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
    const currentOptions = { ...options, ...params };
    console.log(currentOptions);
    let { data } = await axios.get(
      `https://free-to-play-games-database.p.rapidapi.com/api/${endPoint}`,
      currentOptions
    );
    console.log(data);
    return data;
  }

  const routers = createBrowserRouter([
    {
      path: "/",
      element: <Layout userData={userData} setUserData={setUserData} />,
      children: [
        { path: "signup", element: <Registration /> },
        { index: true, element: <Signin decodeUserData={decodeUserData} /> },
        {
          path: "home",
          element: (
            <ProtectedRoute userData={userData} setUserData={setUserData}>
              <Home getGames={getGames} />
            </ProtectedRoute>
          ),
        },
        {
          path: "/games",
          element: (
            <ProtectedRoute userData={userData} setUserData={setUserData}>
              <Games getGames={getGames} />
            </ProtectedRoute>
          ),
        },
        {
          path: "/collectionOfGames/:key/:value",
          element: (
            <ProtectedRoute userData={userData} setUserData={setUserData}>
              <CollectionOfGames getGames={getGames} />
            </ProtectedRoute>
          ),
        },
        {
          path: "/gameDetails/:gameId",
          element: (
            <ProtectedRoute userData={userData} setUserData={setUserData}>
              <GameDetails getGames={getGames} />
            </ProtectedRoute>
          ),
        },

        { path: "*", element: <ErrorPage /> },
      ],
    },
  ]);

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={routers} />
      </Provider>
    </>
  );
}

export default App;
