import React, { useRef, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthLoginButton from "../../components/Auth-LoginButton";
import { useDispatch } from "react-redux";
import googleIcon from "../../assets/google_icon.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { signInWithGoogle } from "../../config/firebase";
import { auth } from "../../config/firebase";

library.add(fas);
library.add(fab);
library.add(far);

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LoginEmail = ({
  setrenderPassword,
  setrenderEmail,
  userAuth,
  setUserAuth,
  usersEmail,
  setrenderLoader,
  emailError,
  setEmailError
}) => {
  const [errorOutline, setErrorOutline] = useState({});
  const dispatch = useDispatch();
  let focus = useRef(null);

  const handleFocusing = () => {
    focus.current.focus();
  };

  const checkEmailExists = () => {
    setrenderLoader(true);
    setrenderEmail(false);
    setrenderPassword(false);

    setTimeout(function () {
      let matchFound = false;
      usersEmail.forEach((element) => {
        if (element.email === userAuth.email) {
          setrenderLoader(false);
          setrenderEmail(false);
          setrenderPassword(true);
          matchFound = true;
          return; // exit from forEach loop
        }
      });
      if (!matchFound) {
        setrenderLoader(false);
        setrenderEmail(true);
        setrenderPassword(false);
        setEmailError({})
      }
    }, 1000);
  };

  const googleSignButton = (
    <div onClick={(e) => {
      e.preventDefault()
      signInWithGoogle()
      
    }} className="flex items-center justify-center">
      <img src={googleIcon} alt="" className="h-8 flex w-8" />
      Sign in with Google
    </div>
  );
  const appleSignButton = (
    <>
      <FontAwesomeIcon icon="fa-brands fa-apple" className="apple-in-login" />
      <span className="pl-1 ">Sign in with Apple</span>
    </>
  );
  const nextButton = "Next";
  const forgotpass = "Forgot password?";
  const location = useLocation();

  function handlemail(e) {
    let currentData = userAuth;
    currentData.email = e;
    setUserAuth(currentData);
    console.log(userAuth);
  }

  return (
    <div className="login-info">
      <p className="text-center mt-7 text-3xl font-bold">Sign in to Tweeter</p>
      <div className="auth-prov-option pb-5 gap-5 flex items-center justify-center m-auto relative flex-col mt-8 text-black">
        <AuthLoginButton
          logo={googleSignButton}
          classes={"rounded-full google-butt-login"}
        />
        <AuthLoginButton
          logo={appleSignButton}
          classes={
            "rounded-full font-semibold flex items-center justify-center apple-butt-login"
          }
        />
        <div className="or-in-login flex items-center justify-center absolute">
          or
        </div>
      </div>

      <div className="sign-in-box flex pt-5 flex-col items-center justify-center ">
        <div className="relative">
          <input
            type="text"
            className=" login-sign-in-box bg-black  flex justify-center items-center rounded-md"
            placeholder=" "
            ref={focus}
            onChange={(e) => {
              handlemail(e.target.value);
            }}
            style={errorOutline}
          />
          <label
            onClick={handleFocusing}
            htmlFor="email"
            className="absolute top-4 left-2 phemus-label"
          >
            Phone, email, or username
          </label>
          <p className="f text-sm text-red-600" style={emailError}>Sorry, we could not find your account.</p>
        </div>
        <div
          onClick={(e) => {
            e.preventDefault();

            if (emailRegex.test(userAuth.email)) {
              checkEmailExists();
            } else {
              setErrorOutline({ borderColor: "red" });
            }
          }}
        >
          <AuthLoginButton
            logo={nextButton}
            classes={
              "rounded-full google-butt-login text-black mt-5 mb-5 font-semibold next-signup-button"
            }
          />
        </div>
        <AuthLoginButton
          logo={forgotpass}
          classes={"rounded-full bg-black forgot-pass-siginin mb-10"}
        />
        <p className="signin-dont-have">
          Don't have an account?{" "}
          <Link
            to={
              location.pathname === "/auth/Login"
                ? "/auth/Signup"
                : "/Home/Explore/Signup"
            }
            className="signup-link"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginEmail;
