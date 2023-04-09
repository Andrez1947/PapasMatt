import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword, clearErrors } from "../../actions/userActions";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const alert = useAlert();
  const dispatch = useDispatch();
  
  const { error, isUpdated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Contraseña actualizada con éxito");
      navigate("/me");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, alert, error, navigate, isUpdated]);

  // code to handle login
  const handleSubmit = (e) => {
    e.preventDefault();

    //Variable by save data from register form
    const formData = new FormData();
    formData.set("oldPassword", oldPassword);
    formData.set("password", password);

    dispatch(updatePassword(formData));
  };

  return (
    <Fragment>
      <div className="max-w-screen-lg mx-auto px-4 py-12 sm:px-6 lg:py-16 lg:px-8 text-center">
        <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-full before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto mb-10 text-center">
          Actualizar Contraseña
        </p>
        <div className="mt-8 bg-white shadow-lg rounded-lg">
          <div className="p-6">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="mb-8">
                <label
                  htmlFor="old_password_field"
                  className="block text-lg font-medium text-gray-900 mb-2"
                >
                  Contraseña Actual
                </label>
                <input
                  type="password"
                  id="old_password_field"                 
                  className="w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 form-control"
                  placeholder="Ingresa tu cntraseña actual"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div className="mb-8">
                <label
                  htmlFor="new_password_field"
                  className="block text-lg font-medium text-gray-900 mb-2"
                >
                  Nueva Contraseña
                </label>
                <input
                  type="password"
                  id="new_password_field"                 
                  className="w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Ingresa tu nueva contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-indigo-500 text-white px-4 py-2 rounded-md text-sm focus:outline-none focus:shadow-outline-gray"
                  disabled={loading ? true : false}
                >
                  Actualizar Contraseña
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdatePassword;
