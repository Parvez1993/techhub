import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../redux/actions/userActions";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
function Login() {
  //search locations

  const { search } = useLocation();
  const redirectURL = new URLSearchParams(search).get("redirect");
  let redirect = redirectURL ? redirectURL : "/";

  console.log(redirect);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isMember, setIsMember] = useState(true);

  //redux
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = user;

  const navigate = useNavigate();

  console.log(userInfo);

  useEffect(() => {
    if (userInfo) {
      navigate(`/${redirectURL}`);
    }
  }, [navigate, redirectURL, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isMember) {
      if (!email || !password) {
        return toast("Fill out all the forms");
      } else {
        dispatch(loginUser(email, password));
      }
    } else {
      dispatch(registerUser(name, email, password));
      // if (userInfo) {
      //   navigate(`/${redirectURL}`);
      // } else {
      //   navigate(`/`);
      // }
    }
  };

  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="login">
        <div className="w-50 mx-auto border rounded">
          <form className="p-3">
            <h3 className="text-center my-3">
              {isMember ? "Sign in" : "Register"}
            </h3>

            {error ? <Alert>{error}</Alert> : ""}

            {!isMember ? (
              <div className="form-group">
                <label>Name</label>
                <input
                  type="name"
                  className="form-control"
                  placeholder="Enter name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            ) : (
              ""
            )}
            <div className="form-group my-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group my-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              className="btn btn-dark btn-md w-100 btn-block my-3"
              onClick={handleSubmit}
            >
              {!isMember ? "Register" : "Sign in"}
            </button>
            <p className="text-right" onClick={() => setIsMember(!isMember)}>
              {isMember
                ? "Don't have an account? Click here"
                : "Already have an account click here"}
              {/* <a href={`/signup?redirect=${redirect}`}>password?</a> */}
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
