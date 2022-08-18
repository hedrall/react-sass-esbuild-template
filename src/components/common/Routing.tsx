import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '@frontend/settings/routes';

const routes = Object.values(ROUTES);

export const RoutingContent: React.FC = () => {
  return (
    <div>
      <Routes>
        {routes.map(({ PATH, COMPONENT }) => (
          <Route path={PATH} element={<COMPONENT />} key={PATH} />
        ))}
        <Route path="*" element={<Navigate to={'/error'} />} />
      </Routes>
    </div>
  );
};
