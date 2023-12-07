import { Navigate, Route, Routes } from 'react-router-dom';
import { PrivateLayout } from '../layout';
import { NotFoundView } from '../views';
import AboutView from '../views/About';
import DevView from '../views/Dev';
import CodeView from '../views/CodeView';

/**
 * List of routes available  for authenticated users
 * Also renders the "Private Layout" composition
 * @routes PrivateRoutes
 */
const PrivateRoutes = () => {

  const ROUTES = ["", "tweens", "hand", "html-element", "events", "effect", "others"];

  const RouteComponents = ROUTES.map((path, index) => (
    <Route key={index} path={`/${path}`} element={<CodeView key={index} type={path} />} />
  ));

  return (
    <PrivateLayout>
      <Routes>
        
        {
          RouteComponents
        }
        
        <Route
          // This fixes other tabs with unfinished auth flow
          path="auth/*"
          element={<Navigate to="/" replace />}
        />
        
        <Route path="about" element={<AboutView />} />
          {process.env.REACT_APP_DEBUG && <Route path="dev" element={<DevView />} />}
        <Route path="*" element={<NotFoundView />} />
        
      </Routes>
    </PrivateLayout>
  );
};

export default PrivateRoutes;
