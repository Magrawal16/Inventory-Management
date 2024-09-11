import React, { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Analytics from "./pages/Analytics";
import Products from "./pages/Products";
import Sidenav from "./components/Sidenav";
import Categories from "./pages/Categories";
import Suppliers from "./pages/Suppliers";
import Users from "./pages/Users";
import Orders from "./pages/Orders";
import RawMaterials from "./pages/RawMaterials";
import Customers from "./pages/Customers";
import Permissions from "./pages/Permissions";
import Profile from "./pages/Profile"; // Import the Profile component

export default function App() {
  const [user, setUser] = useState({
    username: null,
    password: null,
  });

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={user.username ? <Home /> : <Login setUser={setUser} />}
          />
          <Route
            path="/home"
            element={user.username ? <Home /> : <Login setUser={setUser} />}
          />
          <Route
            path="/settings"
            element={user.username ? <Settings /> : <Login setUser={setUser} />}
          />
          <Route
            path="/analytics"
            element={
              user.username ? <Analytics /> : <Login setUser={setUser} />
            }
          />
          <Route
            path="/products"
            element={user.username ? <Products /> : <Login setUser={setUser} />}
          />
          <Route
            path="/categories"
            element={
              user.username ? <Categories /> : <Login setUser={setUser} />
            }
          />
          <Route
            path="/supplier"
            element={
              user.username ? <Suppliers /> : <Login setUser={setUser} />
            }
          />
          <Route
            path="/users"
            element={user.username ? <Users /> : <Login setUser={setUser} />}
          />
          <Route
            path="/orders"
            element={user.username ? <Orders /> : <Login setUser={setUser} />}
          />
          <Route
            path="/rawmaterials"
            element={
              user.username ? <RawMaterials /> : <Login setUser={setUser} />
            }
          />
          <Route
            path="/customers"
            element={
              user.username ? <Customers /> : <Login setUser={setUser} />
            }
          />
          <Route
            path="/profile"
            element={user.username ? <Profile  user={user} /> : <Login setUser={setUser} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
