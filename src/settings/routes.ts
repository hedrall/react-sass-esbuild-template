import { ValueOf } from 'type-fest';
import { Top } from '@frontend/components/pages/Top';
import { Error } from '@frontend/components/pages/Error';

export const ROUTES = {
  TOP: {
    PATH: '/',
    NAME: 'top',
    COMPONENT: Top,
  },
  ERROR: {
    PATH: '/error',
    NAME: 'top',
    COMPONENT: Error,
  },
} as const;

export type RouteItem = ValueOf<typeof ROUTES>;
export type RoutePath = RouteItem['PATH'];
