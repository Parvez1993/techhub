import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../redux/actions/userActions";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import axios from "axios";
function Login() {
  //search locations

  const { search } = useLocation();
  const redirectURL = new URLSearchParams(search).get("redirect");
  let redirect = redirectURL ? redirectURL : "";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isMember, setIsMember] = useState(true);

  //redux
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = user;

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate(`/${redirect}`);
    }
  }, [redirectURL, userInfo]);

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

      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card">
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    {!isMember ? (
                      <img
                        src="https://img.freepik.com/free-photo/fulllengt-portrait-young-girl-listening-music-headphones-posing-isolated-blue-studio-background_155003-45951.jpg?t=st=1654005771~exp=1654006371~hmac=3d9f625b31d42075155e95d82b945fef49a288b82b3dd504da51623dbb2f7a2a&w=740"
                        alt="login form"
                        className="img-fluid"
                      />
                    ) : (
                      <img
                        src="https://img.freepik.com/free-photo/vertical-shot-happy-smiling-young-woman-points-index-finger-overhead-listens-music-via-headphoes-dressed-knitted-sweater-isolated-purple-background-with-blank-space-place-text_273609-58585.jpg?t=st=1654005771~exp=1654006371~hmac=13ab331922c9f865cb02c308afd88b77203e86033c41a0807385e56c78f1e057&w=740"
                        alt="login form"
                        className="img-fluid"
                      />
                    )}
                  </div>

                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      {error ? <Alert>{error}</Alert> : ""}
                      <form>
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <span className="h1 fw-bold mb-0">Techno Hub</span>
                        </div>

                        <h5 className="fw-normal mb-3 pb-3">
                          {!isMember
                            ? "Register and buy the best"
                            : " Sign into your account"}
                        </h5>

                        {!isMember ? (
                          <div className="form-outline mb-4">
                            <input
                              type="text"
                              id="form2Example17"
                              className="form-control form-control-lg"
                              onChange={(e) => setName(e.target.value)}
                            />
                            <label className="form-label" for="form2Example17">
                              Name
                            </label>
                          </div>
                        ) : (
                          ""
                        )}

                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            id="form2Example17"
                            className="form-control form-control-lg"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <label className="form-label" for="form2Example17">
                            Email address
                          </label>
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="form2Example27"
                            className="form-control form-control-lg"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <label className="form-label" for="form2Example27">
                            Password
                          </label>
                        </div>

                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-dark btn-lg btn-block"
                            type="button"
                            onClick={handleSubmit}
                          >
                            {!isMember ? "Register" : "Sign in"}
                          </button>
                        </div>

                        <p
                          className="text-right"
                          onClick={() => setIsMember(!isMember)}
                        >
                          {isMember
                            ? "Don't have an account? Click here"
                            : "Already have an account click here"}
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
