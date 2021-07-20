import React from 'react';
import { withRouter } from 'react-router-dom';

const Layout = props => {
    return <div>{props.children}</div>;
};

export default withRouter(Layout);
