import React, { Fragment, useState, useEffect } from "react";
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

    dispatch(register(formData));
  };

  const onChange = e => {
    
      setUser({...user, [e.target.name]: e.target.value})      
    }  

  return (
    <Fragment>
      <div className="container mx-auto p-4 bg-white">
        <div className="w-full md:w-1/2 lg:w-1/3 mx-auto my-12">
          <h1 className="text-lg font-bold">Register</h1>
          <form
            className="flex flex-col mt-4"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <label htmlFor="form-group">Nombre</label>
            <input
              type="name"
              id="name_field"
              className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm form-control"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="¿Cómo quieres que te llamemos?"
            />
            <label htmlFor="form-group">Correo Electrónico</label>
            <input
              type="email"
              id="email_field"
              className="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Correo electrónico"
            />
            <label htmlFor="form-group">Contraseña</label>
            <input
              type="password"
              id="password_field"
              className="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Elige una contraseña"
            />            
            <button
              id="register_button"
              type="submit"
              className="mt-4 px-4 py-3  leading-6 text-base rounded-md border border-transparent text-white focus:outline-none bg-blue-500  hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex items-center w-full justify-center font-medium"
              disabled={ loading ? true : false }
            >
              Registrarse
            </button>
            <div className="flex flex-col items-center mt-5">
              <p className="mt-1 text-xs font-light text-gray-500">
                ¿Ya estás registrado?
                <a href="/" className="ml-1 font-medium text-blue-400">Ingresa Ahora</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
