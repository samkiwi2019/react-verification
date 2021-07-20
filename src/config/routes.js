import { lazy } from 'react';

const HomePage = lazy(() => import('../views/Home'));
const Register = lazy(() => import('../views/Register'));

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
