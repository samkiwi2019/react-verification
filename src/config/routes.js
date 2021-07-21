import { lazy } from 'react';

const HomePage = lazy(() => import('../pages/Home'));
const Register = lazy(() => import('../pages/Register'));

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage,
        exact: true,
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        exact: true,
    },
];

export default routes;
