import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Avatar from "../../images/avatar.png";
import Loader from "../Loader";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.auth);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="min-h-screen bg-gray-100">
            <div className="max-w-screen-lg mx-auto px-4 py-12 sm:px-6 lg:py-16 lg:px-8 text-center">
              <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-full before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto mb-10 text-center">
                Mi Perfil
              </p>
              <div className="mt-8 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:mt-0 lg:grid-cols-2 lg:gap-x-8">
                <div className="bg-white shadow-lg rounded-lg">
                  <div className="p-6 flex justify-center">
                    <div className="relative">
                      <img
                        className="rounded-full w-32 h-32 mb-8"
                        src={Avatar}
                        alt=""
                      />
                      <div className="absolute bottom-0 right-0 items-center">
                      </div>
                        <Link to='/me/update'>
                        <button className="bg-indigo-500 text-white px-4 py-2 rounded-md text-sm focus:outline-none focus:shadow-outline-gray text-center md:mt-20">
                          Editar Perfil
                        </button>
                        </Link>
                    </div>
                  </div>
                </div>
                <div className="bg-white shadow-lg rounded-lg">
                  <div className="p-6">
                    <div className="mb-8">
                      <h4 className="text-lg font-medium text-gray-900">
                        Nombre
                      </h4>
                      <p className="mt-1 text-gray-600">{user.name}</p>
                    </div>
                    <div className="mb-8">
                      <h4 className="text-lg font-medium text-gray-900">
                        Correo Electrónico
                      </h4>
                      <p className="mt-1 text-gray-600">{user.email}</p>
                      
                    </div>
                    <div className="mb-8">
                      <h4 className="text-lg font-medium text-gray-900">
                        Miembro desde
                      </h4>
                      <p className="mt-1 text-gray-600">{String(user.createdAt).substring(0,10)}</p>
                      
                    </div>
                    <div className="flex flex-col">
                      <Link 
                        to='/orders/me'                        
                        className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-gray"
                      >
                        Mis Pedidos
                      </Link>
                      <Link 
                        to='/password/update'                        
                        className="mt-4 py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:shadow-outline-gray"
                      >
                        Cambiar Contraseña
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
