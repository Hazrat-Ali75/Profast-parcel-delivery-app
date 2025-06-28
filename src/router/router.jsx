import { createBrowserRouter } from 'react-router'
import RootLayout from '../layout/RootLayout'
import Home from '../pages/Home/Home/Home'
import AuthLayout from '../layout/AuthLayout'
import Login from '../pages/Auth/login/Login'
import Register from '../pages/Auth/register/Register'
import Coverage from '../pages/Coverage/Coverage'
import AddParcel from '../pages/pricing/AddPercel'
import PrivateProvider from '../provider/PrivateProvider'
import DashboardLayout from '../layout/DashboardLayout'
import DashboardHome from '../pages/dashboard/DashboardHome'
import MyParcel from '../pages/dashboard/MyParcel'
import Payment from '../pages/dashboard/Payment'
import PaymentHistory from '../pages/dashboard/paymentHistory/PaymentHistory'
import TrackPackage from '../pages/dashboard/trackPackage/TrackPackage'


export const router = createBrowserRouter([
     {
        path : '/',
        Component : RootLayout,
        children : [
            {
                index : true,
                Component : Home
            },
            {
                path : '/coverage',
                loader : ()=> fetch('../../public/warehouses.json'),
                Component : Coverage
            },
            {
                path : '/addPercel',
                loader : ()=> fetch('../../public/warehouses.json'),
                element : <PrivateProvider>
                    <AddParcel></AddParcel>
                </PrivateProvider>
            }
        ]
     },
     {
        path : '/dashboard',
        element : <PrivateProvider>
            <DashboardLayout></DashboardLayout>
        </PrivateProvider>,
        children : [
            {
                index : true,
                element : <PrivateProvider>
                    <DashboardHome></DashboardHome>
                </PrivateProvider>
            },
            {
                path : '/dashboard/myParcels',
                element : <PrivateProvider>
                    <MyParcel></MyParcel>
                </PrivateProvider>
            },
            {
                path : '/dashboard/payment/:parcelId',
                element : <PrivateProvider>
                    <Payment></Payment>
                </PrivateProvider>
            },
            {
                path : '/dashboard/paymentHistory',
                element : <PrivateProvider>
                    <PaymentHistory></PaymentHistory>
                </PrivateProvider>
            },
            {
                path : '/dashboard/trackingPackage',
                element : <PrivateProvider>
                    <TrackPackage></TrackPackage>
                </PrivateProvider>
            }
        ]
     },
     {
        path : '/',
        Component : AuthLayout,
        children : [
            {
                path : '/login',
                Component : Login
            },
            {
                path : '/register',
                Component : Register
            }
        ]
     }
])