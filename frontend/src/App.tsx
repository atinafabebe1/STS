import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import { generateRoute } from "./routes";
import {  useUserContext } from "./context/userContext"; 
import LoginPage from "./pages/login/LoginPage";
import appRoutes from "./routes/appRoutes";

function App() {
  const { user ,initialLoading} = useUserContext();
  const routes = generateRoute(appRoutes,user?.role || "")
  if(initialLoading){
    return <div>...loading</div>
  }
  return (
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={user?.username ? <MainLayout /> : <LoginPage />}
          >
            {routes}
          </Route>
        </Routes>
      </BrowserRouter>
  );
}



export default App;
