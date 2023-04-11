import { React, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {
  Header,
  Footer,
  MainContainer,
  CreateContainer,
  MenuContainer,
  ProductDetails,
  Login,
  Register,
  Profile,
  UpdateProfile,
  UpdatePassword,
  ForgotPassword,
  NewPassword
} from "./components";
import { AnimatePresence } from "framer-motion";

import { loadUser } from "./actions/userActions";
import store from "./store";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <AnimatePresence exitBeforeEnter>
        <div className="w-screen h-auto flex flex-col bg-primary">
          <Header />
          <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
            <Routes>
              <Route path="/" element={<MainContainer />} />
              <Route path="/createItem" element={<CreateContainer />} />
              <Route path="/menu" element={<MenuContainer />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/me" element={<Profile />} />
              <Route path="/me/update" element={<UpdateProfile />} />
              <Route path="/password/update" element={<UpdatePassword />} />
              <Route path="/password/forgot" element={<ForgotPassword />} />
              <Route path="/password/reset/:token" element={<NewPassword />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AnimatePresence>
    </Router>
  );
};

export default App;
