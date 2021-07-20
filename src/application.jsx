import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import routes from './config/routes';
import { Provider } from 'react-redux';
import store from './store';
import Layout from './layout';

const getRoutes = () =>
    routes.map((route, index) => {
        return (
            <Route
                key={index}
                path={route.path}
                exact={route.exact}
                render={props => <route.component name={route.name} {...props} {...route.props} />}
            />
        );
    });

const Application = props => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <Layout name='layout'>
                            <Redirect from='/' to='/register' />
                            {getRoutes()}
                        </Layout>
                    </Switch>
                </Suspense>
            </BrowserRouter>
        </Provider>
    );
};

export default Application;
