import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearErrors } from "../../actions/userActions";

const NewPassword = ({ match }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const { error, success } = useSelector((state) => state.forgotPassword);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Contraseña actualizada correctamente");
      Navigate("/login");
    }
  }, [dispatch, alert, error, success, Navigate]);

  // code to handle login
  const handleSubmit = (e) => {
    e.preventDefault();

    //Variable by save data from register form
    const formData = new FormData();
    formData.set("password", password);
    formData.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(match.params.token, formData));
  };

  return (
    <Fragment>
      <div className="max-w-screen-lg mx-auto px-4 py-12 sm:px-6 lg:py-16 lg:px-8 text-center">
        <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-full before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto mb-10 text-center">
          Nueva Contraseña
        </p>
        <div className="mt-8 bg-white shadow-lg rounded-lg">
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-8">
                <label
                  htmlFor="password_field"
                  className="block text-lg font-medium text-gray-900 mb-2"
                >
                  Escriba su Contraseña
                </label>
                <input
                  type="password"
                  id="password_field"
                  className="w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-8">
                <label
                  htmlFor="confirm_password_field"
                  className="block text-lg font-medium text-gray-900 mb-2"
                >
                  Confirme su Contraseña
                </label>
                <input
                  type="password"
                  id="confirm_password_field"
                  className="w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Confirma tu contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="flex justify-end">
                <button
                  id="new_password_button"
                  type="submit"
                  className="bg-indigo-500 text-white px-4 py-2 rounded-md text-sm focus:outline-none focus:shadow-outline-gray"
                >
                  Cambiar Contraseña
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default NewPassword;
