import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import { routes } from "./routes";
import {  useUserContext } from "./context/userContext"; 
import LoginPage from "./pages/login/LoginPage";

function App() {
  const { user ,initialLoading} = useUserContext();
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
