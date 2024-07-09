import { AuthRoutes } from './authRoute';
import { AccountRoutes } from './accountRoute';
import { Route } from 'react-router-dom';
import Login from '../pages/auth/Login';
export const AppRoutes = (
    <>
        {/* <Route path="/error" element={<ErrorPage />}/> */}
        <Route path="/" element={<Login />}/>
        <Route path="/home" element={<div>Home</div>}/>
        { AuthRoutes }
        { AccountRoutes }
    </>
)