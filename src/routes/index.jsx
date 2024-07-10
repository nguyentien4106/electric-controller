import { AuthRoutes } from './authRoute';
import { AccountRoutes } from './accountRoute';
import { Route } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Home from '../pages/home/Home'

export const AppRoutes = (
    <>
        {/* <Route path="/error" element={<ErrorPage />}/> */}
        <Route path="/" element={<Login />}/>
        <Route path="/home" element={ <Home />}/>
        { AuthRoutes }
        { AccountRoutes }
    </>
)