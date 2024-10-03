import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import Dashboard from '../pages/dashboard';
import { RouteType } from './private-routes';
import { getItem } from '../helpers';





export const nonPrivateRoutes: RouteType[] = [
  {
    path: '*',
    component: <Dashboard />
  },
  {
    path: 'player',
    component: <Dashboard />
  }
  
];

const NonPrivateRoute: FC<{children: any}> = ({ children }) => {
  const token = getItem('token');
  return token ? <Navigate to='/dashboard' replace /> : children;

}

export default NonPrivateRoute;