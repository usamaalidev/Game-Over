import React from "react";
import Signin from "../Signin/Signin";

export default function ProtectedRoute({ userData, setUserData, children }) {
  if (userData) {
    return children;
  } else {
    return <Signin setUserData={setUserData} />;
  }
}
