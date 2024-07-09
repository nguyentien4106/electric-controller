import React, { lazy } from "react";
import Login from "../pages/auth/Login";
// import Register from "../pages/auth/Register";
// import ConfirmEmail from "../pages/auth/ConfirmEmail";
// import ResetPassword from "../pages/auth/ResetPassword"
// import ForgotPassword from "../pages/auth/ForgotPassword"
import { Route } from "react-router-dom";

export const AuthRoutes = (
    <>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register />} /> */}
        {/* <Route path="/confirm-email" element={<ConfirmEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} /> */}
    </>
)