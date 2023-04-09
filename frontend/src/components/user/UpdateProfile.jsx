import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProfile,
  loadUser,
  clearErrors,
} from "../../actions/userActions";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const alert = useAlert();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { error, isUpdated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Usuario actualizado con éxito");
      dispatch(loadUser());
      navigate("/me");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, alert, error, navigate, isUpdated]);

  // code to handle login
  const handleSubmit = (e) => {
    e.preventDefault();

    //Variable by save data from register form
    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);

    dispatch(updateProfile(formData));
  };

  return (
    <Fragment>
      <div class="max-w-screen-lg mx-auto px-4 py-12 sm:px-6 lg:py-16 lg:px-8 text-center">
        <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-full before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto mb-10 text-center">
          Mi Perfil
        </p>
        <div class="mt-8 bg-white shadow-lg rounded-lg">
          <div class="p-6">
            <form action="#" method="POST">
              <div class="mb-8">
                <label
                  for="name"
                  class="block text-lg font-medium text-gray-900 mb-2"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  class="w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Ingresa tu nombre"
                  required
                />
              </div>
              <div class="mb-8">
                <label
                  for="email"
                  class="block text-lg font-medium text-gray-900 mb-2"
                >
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  class="w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Ingresa tu correo electrónico"
                  required
                />
              </div>
              <div class="flex justify-end">
                <button
                  type="submit"
                  class="bg-indigo-500 text-white px-4 py-2 rounded-md text-sm focus:outline-none focus:shadow-outline-gray"
                >
                  Actualizar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProfile;
