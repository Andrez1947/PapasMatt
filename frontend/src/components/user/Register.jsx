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

  const onChange = e => {
    if(e.target.name === 'avatar') {

      const reader = new FileReader();

      reader.onload = () => {

      }

      reader.readAsDataURL(e.target.files[0])

    } else {
      
    }
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
              placeholder="??C??mo quieres que te llamemos?"
            />
            <label htmlFor="form-group">Correo Electr??nico</label>
            <input
              type="email"
              id="email_field"
              className="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Correo electr??nico"
            />
            <label htmlFor="form-group">Contrase??a</label>
            <input
              type="password"
              id="password_field"
              className="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Elige una contrase??a"
            />
            <div className="form-group">
              <label for="avatar_upload">Avatar</label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <img 
                    src={avatarPreview} 
                    className="rounded-circle" 
                    alt="Avatar Preview"                    
                    />
                  </figure>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    name="avatar"
                    className="custom-file-input"
                    id="customFile"
                    accept="images/*"
                    onChange={onChange}
                  />
                  <label className="custom-file-label" for="customFile">
                    Choose Avatar
                  </label>
                </div>
              </div>
            </div>
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
                ??Ya est??s registrado?
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
