
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import PrivateRoute, { RouteType, privateRoutes } from "./private-routes";
import NonPrivateRoute, { nonPrivateRoutes } from "./non-private-routes";

const AppRoutes = () => {
  const getRoutes = (routes: RouteType[]) => routes.map((route: RouteType, idx: number) => {
    const Component = route.component;
    return <Route key={idx} path={route.path} element={
      <NonPrivateRoute>
        { Component }
      </NonPrivateRoute>
    } />
  })

  const getPrivateRoutes = (routes: RouteType[]) => routes.map((route: RouteType, idx: number) => {
    const Component = route.component;
    return <Route key={idx} path={route.path} element={
      <PrivateRoute>
        { Component }
      </PrivateRoute>
    } />
  })
  return (
    <Router>
      <Routes>
        {getRoutes(nonPrivateRoutes)}
        {getPrivateRoutes(privateRoutes)}
      </Routes>
    </Router>
  )
}

export default AppRoutes;