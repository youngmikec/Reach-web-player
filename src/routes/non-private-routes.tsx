import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import Dashboard from '../pages/dashboard';
import { RouteType } from './private-routes';
import { getItem } from '../helpers';
import VimeoPlayerPage from '../pages/video-player/vimeo-player-page';





export const nonPrivateRoutes: RouteType[] = [
  {
    path: '*',
    component: <Dashboard />
  },
  {
    path: 'player',
    component: <Dashboard />
  },
  {
    path: 'video-player/vimeo',
    component: <VimeoPlayerPage />
  }
  
];

const NonPrivateRoute: FC<{children: any}> = ({ children }) => {
  const token = getItem('token');
  return token ? <Navigate to='/dashboard' replace /> : children;

}

export default NonPrivateRoute;