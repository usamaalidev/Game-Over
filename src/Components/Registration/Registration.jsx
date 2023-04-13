import React, { useEffect, useState } from "react";
import { json, Link, useNavigate } from "react-router-dom";
import RegistrationStyle from "./Registration.module.scss";
import registerationImage from "../../Assets/Images/registeration.svg";
import axios from "axios";
import Joi from "joi";

const { registration, container } = RegistrationStyle;

export default function Registration() {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    age: 0,
    email: "",
    password: "",
  });

  const [isLoading, setLoading] = useState(false);
  const [validateErrors, setValidateErrors] = useState([]);
  const [serverErrors, setServerErrors] = useState([]);
  const navigate = useNavigate();

  function getUserData(event) {
    const userData = { ...user };
    const currentInput = event.target;
    userData[currentInput.id] = currentInput.value;
    setUser(userData);
  }

  async function sendUserDataToRegister() {
    setLoading(true);
    let { data } = await axios.post(
      "https://sticky-note-fe.vercel.app/signup",
      user
    );
    if (data.errors) {
      setLoading(false);
      console.log(data.errors);
      setServerErrors(data.errors);
    } else {
      setLoading(false);
      navigate("/");
    }
  }

  function validate() {
    const scheme = Joi.object({
      first_name: Joi.string()
        .pattern(/^[A-Z][a-z]{2,}$/)
        .required(),
      last_name: Joi.string()
        .pattern(/^[A-Z][a-z]{2,}$/)
        .required(),
      age: Joi.number().min(12).max(50),
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
      setValidateErrors(currentValidateResult.error.details);
      console.log(currentValidateResult.error.details);
    } else {
      sendUserDataToRegister();
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
    const emailInput = document.getElementById("email");
    const emailErrorMessage =
      emailInput.parentElement.querySelector(".error-alert");
    if (emailErrorMessage) {
      emailErrorMessage.textContent = serverErrors.email.message;
    } else {
      const emailErrorElement = document.createElement("p");
      emailErrorElement.classList.add("error-alert");
      emailErrorElement.textContent = serverErrors.email.message;
      emailInput.parentElement.appendChild(emailErrorElement);
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
      <section className={`${registration} registration`}>
        <div className={`container ${container}`}>
          <div className={`${RegistrationStyle["form-container"]}`}>
            <h3>Register Now</h3>
            <h2>Sign up for free</h2>
            <p>
              Already have accound ? <Link to="/">Sign In.</Link>
            </p>
            <form onSubmit={submitData}>
              <div className="first-name">
                <label htmlFor="first_name">First Name</label>
                <input
                  type="text"
                  onChange={getUserData}
                  spellCheck="false"
                  className={`form-input`}
                  id="first_name"
                />
              </div>
              <div className="last-name">
                <label htmlFor="last_name">Last Name</label>
                <input
                  type="text"
                  onChange={getUserData}
                  spellCheck="false"
                  className={`form-input`}
                  id="last_name"
                />
              </div>
              <div className="age">
                <label htmlFor="age">Your Age</label>
                <input
                  type="number"
                  onChange={getUserData}
                  spellCheck="false"
                  className={`form-input`}
                  id="age"
                />
              </div>
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
                  "Sign Up"
                )}
              </button>
              <p>
                by clicking the sign up button, you therefore agree to the
                privacy policy. for more information read about privacy policy
                here
              </p>
            </form>
          </div>
          <div className={`${RegistrationStyle["image-container"]}`}>
            <img src={registerationImage} alt="registeration image" />
          </div>
        </div>
      </section>
    </>
  );
}
