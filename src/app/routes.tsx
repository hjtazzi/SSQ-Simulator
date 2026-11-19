import { createHashRouter, createRoutesFromElements, Route } from 'react-router-dom';

import App from '../App';
import { AppPaths } from './constants';
import * as pages from './initAppRoutes';

import WithSuspense from '../components/shared/ComponentWithSuspense';
import NotFoundFallback from '../components/shared/NotFoundFallback';
import ErrorFallback from '../components/shared/ErrorFallback';


const routes = createHashRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route index element={<WithSuspense component={<pages.HomePage />} />} />
      <Route path={AppPaths.Home.replaceAll('/', '')} element={<WithSuspense component={<pages.HomePage />} />} />

      <Route path={AppPaths.ContactMe.replaceAll('/', '')} element={<WithSuspense component={<pages.ContactMe />} />} />

      <Route path="500" element={<ErrorFallback />} />
      <Route path="404" element={<NotFoundFallback />} />
      <Route path="*" element={<NotFoundFallback />} />
    </Route>
  )
);

export default routes;
