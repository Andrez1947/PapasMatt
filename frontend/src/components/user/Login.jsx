import React, { Fragment, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
// eslint-disable-next-line no-unused-vars
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Loader";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../../actions/userActions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/menu");
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, isAuthenticated, error, navigate]);

  // code to handle login
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="flex flex-col justify-center items-center min-h-screen w-auto">
            <div className="relative flex flex-col sm:justify-center items-center bg-gray-100 ">
              <div className="relative sm:max-w-sm max-w-2xl w-full">
                <div className="card bg-amber-500 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
                <div className="card bg-gray-800 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
                <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md mx-auto">
                  <label className="block text-xl text-gray-700 text-center font-semibold">
                    Ingreso
                  </label>
                  <form className="mt-10" onSubmit={handleSubmit}>
                    <div>
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className="text-gray-400"
                      />
                      <label htmlFor="email_field"></label>
                      <input
                        id="email"
                        type="email"
                        placeholder="Correo"
                        className="focus:outline-none pl-2.5 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-gray-200 focus:bg-gray-100 focus:ring-0"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="mt-7">
                      <FontAwesomeIcon
                        icon={faLock}
                        className="text-gray-400"
                      />
                      <label htmlFor="password_field"></label>
                      <input
                        id="password"
                        type="Contraseña"
                        placeholder="Password"
                        className="focus:outline-none pl-2.5 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-gray-200 focus:bg-gray-100 focus:ring-0"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>

                    <div className="mt-7 flex">
                      <label className="flex justify-start items-start">
                        <div className="bg-white border-2 rounded border-gray-400 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2">
                          <input
                            type="checkbox"
                            className="opacity-0 absolute"
                          />
                          <svg
                            className="fill-current hidden w-3 h-3 text-blue-500 pointer-events-none"
                            viewBox="0 0 20 20"
                          >
                            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                          </svg>
                        </div>
                        <div className="select-none text-sm mt-0.5">
                          Recuérdame
                        </div>
                      </label>

                      <div className="w-full text-right">
                        <Link
                          className="underline text-sm text-gray-600 hover:text-gray-900"
                          to="/password/forgot"
                        >
                          Olvidó contraseña?
                        </Link>
                      </div>
                    </div>

                    <div className="mt-7">
                      <button
                        id="login_button"
                        type="submit"
                        className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                      >
                        Ingresar
                      </button>
                    </div>

                    <div className="flex mt-7 items-center text-center">
                      <hr className="border-gray-300 border-1 w-full rounded-md" />
                      <label className="block font-medium text-sm text-gray-700 w-full">
                        Ingresar con
                      </label>
                      <hr className="border-gray-300 border-1 w-full rounded-md" />
                    </div>

                    <div className="flex mt-7 justify-center w-full">
                      <button className="mr-5 bg-blue-500 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                        <FontAwesomeIcon icon={faFacebookF} className="mr-2" />
                        Facebook
                      </button>

                      <button className="bg-red-500 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                        <FontAwesomeIcon icon={faGoogle} className="mr-2" />
                        Google
                      </button>
                    </div>

                    <div className="mt-7">
                      <div className="flex justify-center items-center">
                        <label className="text-sm text-gray-600">
                          Aún no registrado?
                        </label>
                        <a
                          href="/register"
                          className=" ml-2 text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                        >
                          Regístrese
                        </a>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;