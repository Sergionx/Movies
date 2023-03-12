import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./contexts/AuthProvider";
import ProtectedLayout from "./layouts/ProtectedLayout";
import UserLayout from "./layouts/UserLayout";
import Error404 from "./pages/Error404";
import Detail from "./pages/movies/Detail";
import Home from "./pages/movies/Home";
import Searcher from "./pages/Searcher";
import Login from "./pages/users/Login";
import Register from "./pages/users/Register";
import "react-toastify/dist/ReactToastify.css";

function App() {
   return (
      <AuthProvider>
         <BrowserRouter>
            <Routes>
               <Route path="/" element={<UserLayout />}>
                  <Route index element={<Searcher />} />
               </Route>

               <Route path="/users" element={<UserLayout />}>
                  <Route index element={<Navigate to="login" />} />
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                  <Route path="*" element={<Error404 />} />
               </Route>

               <Route path="/movies" element={<ProtectedLayout />}>
                  <Route index element={<Home />} />
                  <Route path=":id" element={<Detail />} />
                  <Route path="*" element={<Error404 />} />
               </Route>

               <Route path="*" element={<Error404 />} />
            </Routes>
         </BrowserRouter>
         <ToastContainer />
      </AuthProvider>
   );
}

export default App;
