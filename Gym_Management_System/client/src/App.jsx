import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import OnlyisStoreMangerPrivateRoute from "./components/OnlyisStoreMangerPrivateRoute";

import CreatePost from "./pages/ItmeCreate";
import ItemDetails from "./pages/ItemDetails";
import Order from "./pages/Order";
import Updateitem from "./pages/Updateitem";
import ViewItems from "./pages/ViewItems";
import Profil from "./components/Profile";
import Form from "./pages/Form";


export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/item/:itemId" element={<ItemDetails />} />

        <Route element={<PrivateRoute />}>
          
          <Route path="/order" element={<Order />} />
          

        </Route>

        <Route element={<OnlyisStoreMangerPrivateRoute />}>
          <Route path="/create-post" element={<CreatePost />} /> 
          <Route path="/view" element={<ViewItems />} />
          <Route path="/update/:itemId" element={<Updateitem />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/addForm" element={<Form />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
