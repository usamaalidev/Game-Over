import React, { useEffect, useState } from "react";
import { json, Link, useNavigate } from "react-router-dom";
import loginStyle from "./Signin.module.scss";
import registerationImage from "../../Assets/Images/registeration.svg";
import axios from "axios";
import Joi from "joi";

export default function Signin({ decodeUserData }) {
  const { login, container } = loginStyle;

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setLoading] = useState(false);
  const [validateErrors, setValidateErrors] = useState([]);
  const [serverErrors, setServerErrors] = useState("");
  const navigate = useNavigate();

  function getUserData(event) {
    const userData = { ...user };
    const currentInput = event.target;
    userData[currentInput.id] = currentInput.value;
    setUser(userData);
  }

  async function sendUserDataToLogin() {
    console.log();
    setLoading(true);
    let { data } = await axios.post(
      "https://route-egypt-api.herokuapp.com/signin",
      user
    );
    if (data.message == "success") {
      console.log(data);
      setLoading(false);
      localStorage.setItem("token", data.token);
      decodeUserData();
      navigate("home");
    } else {
      setLoading(false);
      setServerErrors(data.message);
    }
  }

  function validate() {
    const scheme = Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{3,30}$/)
        .min(8)
        .required(),
    });
    return scheme.validate(user, { abortEarly: false });
  }

  function submitData(event) {
    event.preventDefault();
    const currentValidateResult = validate();
    if (currentValidateResult.error) {
      setLoading(false);
      setValidateErrors(currentValidateResult.error.details);
    } else {
      sendUserDataToLogin();
    }
  }

  const inputs = Array.from(document.querySelectorAll("form input"));

  function showValidationErrors() {
    const existedErrorsIDs = validateErrors.map((error) => error.context.label);

    inputs.map((input) => {
      const errorMessage = input.parentElement.querySelector(".error-alert");
      if (errorMessage) {
        input.parentElement.removeChild(errorMessage);
      }
    });

    inputs
      .filter((input) => existedErrorsIDs.includes(input.id))
      .map((input) => {
        const errorMessage = validateErrors.filter(
          (error) => error.context.label == input.id
        )[0].message;

        const errorMessageElement =
          input.parentElement.querySelector(".error-alert");

        if (errorMessageElement) {
          errorMessageElement.textContent = errorMessage;
        } else {
          const errorElement = document.createElement("p");
          errorElement.classList.add("error-alert");
          errorElement.textContent = errorMessage;
          input.parentElement.appendChild(errorElement);
        }
      });
  }

  function showServerErrors() {
    inputs.map((input) => {
      const errorMessage = input.parentElement.querySelector(".error-alert");
      if (errorMessage) {
        input.parentElement.removeChild(errorMessage);
      }
    });

    if (serverErrors.split(" ").includes("email")) {
      const emailInput = document.getElementById("email");
      const emailErrorMessage =
        emailInput.parentElement.querySelector(".error-alert");

      if (emailErrorMessage) {
        emailErrorMessage.textContent = serverErrors;
      } else {
        const emailErrorElement = document.createElement("p");
        emailErrorElement.classList.add("error-alert");
        emailErrorElement.textContent = serverErrors;
        emailInput.parentElement.appendChild(emailErrorElement);
      }
    } else if (serverErrors.split(" ").includes("password")) {
      const passwordInput = document.getElementById("password");
      const passwordErrorMessage =
        passwordInput.parentElement.querySelector(".error-alert");

      if (passwordErrorMessage) {
        passwordErrorMessage.textContent = serverErrors;
      } else {
        const passwordErrorElement = document.createElement("p");
        passwordErrorElement.classList.add("error-alert");
        passwordErrorElement.textContent = serverErrors;
        passwordInput.parentElement.appendChild(passwordErrorElement);
      }
    }
  }

  useEffect(() => {
    if (validateErrors.length === 0) return;
    showValidationErrors();
  }, [validateErrors]);

  useEffect(() => {
    if (serverErrors.length === 0) return;
    showServerErrors();
  }, [serverErrors]);

  return (
    <>
      <section className={`${login} login`}>
        <div className={`container ${container}`}>
          <div className={`${loginStyle["form-container"]}`}>
            <h3>Signin Now</h3>
            <h2>Log in to GameOver</h2>
            <p>
              If you don't have account <Link to="signup">Sign Up.</Link>
            </p>
            <form onSubmit={submitData}>
              <div className="email">
                <label htmlFor="email">E-Mail</label>
                <input
                  type="email"
                  onChange={getUserData}
                  spellCheck="false"
                  className={`form-input`}
                  id="email"
                />
              </div>
              <div className="password">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  onChange={getUserData}
                  spellCheck="false"
                  className={`form-input`}
                  id="password"
                />
              </div>
              <button type="submit" className={`btn`}>
                {isLoading ? (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                ) : (
                  "Login"
                )}
              </button>
            </form>
          </div>
          <div className={`${loginStyle["image-container"]}`}>
            <img src={registerationImage} alt="registeration image" />
          </div>
        </div>
      </section>
    </>
  );
}
