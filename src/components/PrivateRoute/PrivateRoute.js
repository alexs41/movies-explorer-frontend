import React, { useContext } from 'react';
import { useLocation, Navigate } from "react-router-dom";

// function PrivateRoute({ loggedIn, path, children }) {
//     return loggedIn ? children : <Navigate to="/" />;
// }

function PrivateRoute({ loggedIn, children }) {
    const location = useLocation();
    return loggedIn ? children : <Navigate to="/" state={{from: location}}/>;
}

export default PrivateRoute;