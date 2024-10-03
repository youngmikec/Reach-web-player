import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { getItem } from '../helpers';

export interface RouteType {
  path: string;
  component: ReactNode
}

export const privateRoutes: RouteType[] = [
  
];

const PrivateRoute: FC<{children: any}> = ({ children }) => {
  const token = getItem('token');
  return token ? children : <Navigate to='/' replace />;

}

export default PrivateRoute;