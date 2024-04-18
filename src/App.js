import React, { useState } from "react";
import Head from "./Components/Head/Head";
import { Container } from "react-bootstrap";
import SideBar from "./Components/Side Bar/SideBar";
import HomeScreen from "./Screens/Home Screen/HomeScreen";
// import LoginScreen from "./Screens/LoginScreen";
import {
  HashRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import "./App.css";
import WatchScreen from "./Screens/Watch Screen/WatchScreen";
import SearchScreen from "./Screens/Home Screen/Search Screen/SearchScreen";

const Layout = ({ children }) => {
  const [sideBar, toggleSideBar] = useState(false);

  const handleToggleBar = () => {
    toggleSideBar((value) => !value);
  };
  return (
    <>
      <Head handleToggleBar={handleToggleBar} />
      <div className="app-Container d-flex">
        <SideBar sideBar={sideBar} handleToggleBar={handleToggleBar} />
        <Container fluid className="app-main ">
          {children}
        </Container>
      </div>
    </>
  );
};
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Outlet />
            </Layout>
          }
        >
          <Route path="/watch/:id" element={<WatchScreen />} />
          <Route path="/search/:query" element={<SearchScreen />} />

          <Route index element={<HomeScreen />} />
          <Route path="search" element={<h2>search me</h2>} />
        </Route>
        {/* <Route path="auth" element={<LoginScreen />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
