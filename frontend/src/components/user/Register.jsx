import React, { Fragment, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { register, clearErrors } from "../../actions/userActions";

const Register = ({ history }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("../images/avatar.png");

  const alert = useAlert();
  const dispatch = useDispatch();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, isAuthenticated, error, history]);

  // code to handle login
  const handleSubmit = (e) => {
    e.preventDefault();

    //Variable by save data from register form
    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("avatar", avatar);

    dispatch(register(formData));
  };

  return (
    <div class="container mx-auto p-4 bg-white">
      <div class="w-full md:w-1/2 lg:w-1/3 mx-auto my-12">
        <h1 class="text-lg font-bold">Register</h1>
        <form class="flex flex-col mt-4">
          <input
            type="text"
            name="full-name"
            class="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            placeholder="Full Name"
          />
          <input
            type="email"
            name="email"
            class="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            placeholder="Email address"
          />
          <input
            type="password"
            name="password"
            class="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            placeholder="Password"
          />
          <input
            type="password"
            name="repeat-password"
            class="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            placeholder="Repeat Password"
          />
          <button
            type="submit"
            class="mt-4 px-4 py-3  leading-6 text-base rounded-md border border-transparent text-white focus:outline-none bg-blue-500  hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex items-center w-full justify-center font-medium"
          >
            Register
          </button>
          <div class="flex flex-col items-center mt-5">
            <p class="mt-1 text-xs font-light text-gray-500">
              Register already?
              <a class="ml-1 font-medium text-blue-400">Sign in now</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
