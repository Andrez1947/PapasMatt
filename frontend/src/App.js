import { React, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {
  Header,
  Footer,
  MainContainer,
  CreateContainer,
  MenuContainer,
  CartContainer,
  Shipping,
  ConfirmOrders,
  CheckoutStepsComponent,
  Payment,
  ProductDetails,
  OrdeningComponent,
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
import axios from "axios";

const App = () => {

  const [mercadopagoApiKey, setMercadopagoApiKey] = useState('');

  useEffect(() => {
    store.dispatch(loadUser());

    async function getMercadoPagoApiKey(){
      const {data} = await axios.get('/api/v1/mercadopagoapi');
      setMercadopagoApiKey(data.mercadopagoApiKey)
    }

    getMercadoPagoApiKey();
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
              <Route path="/cart" element={<CartContainer />} /> 
              <Route path="/shipping" element={<Shipping />} /> 
              <Route path="/confirm" element={<ConfirmOrders />} />
              <Route path="/payment" element={<Payment />} />  
              <Route path="/confirm" element={<CheckoutStepsComponent />} /> 
              <Route path="/product/:id" element={<ProductDetails/>} />            
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/me" element={<Profile />} />
              <Route path="/me/update" element={<UpdateProfile />} />
              <Route path="/password/update" element={<UpdatePassword />} />
              <Route path="/password/forgot" element={<ForgotPassword />} />
              <Route path="/password/reset/:token" element={<NewPassword />} />
              <Route path="/order/:id" element={<OrdeningComponent />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AnimatePresence>
    </Router>
  );
};

export default App;
