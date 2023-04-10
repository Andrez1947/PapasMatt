import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, clearErrors } from "../../actions/userActions";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, loading, message } = useSelector((state) => state.forgotPassword);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      alert.success(message);
    }
  }, [dispatch, alert, error, loading, message]);

  // code to handle login
  const handleSubmit = (e) => {
    e.preventDefault();

    //Variable by save data from register form
    const formData = new FormData();
    formData.set("email", email);

    dispatch(forgotPassword(formData));
  };

  return (
    <Fragment>
      <div className="max-w-screen-lg mx-auto px-4 py-12 sm:px-6 lg:py-16 lg:px-8 text-center">
        <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-full before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto mb-10 text-center">
          Recuperar Contraseña
        </p>
        <div className="mt-8 bg-white shadow-lg rounded-lg">
          <div className="p-6">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="mb-8">
                <label
                  htmlFor="old_password_field"
                  className="block text-lg font-medium text-gray-900 mb-2"
                >
                  Ingresar correo electrónico
                </label>                
                <input
                  type="email"
                  id="email_field"
                  className="w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Ingresa tu nueva contraseña"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-indigo-500 text-white px-4 py-2 rounded-md text-sm focus:outline-none focus:shadow-outline-gray"
                  disabled={loading ? true : false}
                >
                  Enviar correo de recuperación
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;
