import React from "react";
import "./App.css";
import AdminLayout from "./pages/AdminLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ContextProvider from "./context/Context";
import Home from "./pages/Home";
import Resorts from "./pages/Resorts";
import About from "./pages/About";
import ResortInfo from "./pages/ResortInfo";
import NotFound from "./pages/NotFound";
import UsersSubPage from "./components/UsersSubPage";
import RequestsSubPage from "./components/RequestsSubPage";
import ResortsSubPage from "./components/ResortsSubPage";
import EditUser from "./pages/EditUser";
import EditResort from "./pages/EditResort";
import Request from "./pages/Request";
import EditRequest from "./pages/EditRequest";
import PreviewRequest from "./pages/PreviewRequest";

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resorts" element={<Resorts />} />
          <Route path="/resorts/:id" element={<ResortInfo />} />
          <Route path="/request" element={<Request />} />
          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="/admin/users" element={<UsersSubPage />} />
            <Route path="/admin/requests" element={<RequestsSubPage />} />
            <Route path="/admin/request/edit/:id" element={<EditRequest />} />
            <Route
              path="/admin/request/preview/:id"
              element={<PreviewRequest />}
            />
            <Route path="/admin/resorts" element={<ResortsSubPage />} />
            <Route path="/admin/resorts/edit/:id" element={<EditResort />} />
            <Route path="/admin/edit-user/:id" element={<EditUser />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
