import { Navigate, Route, Routes } from 'react-router-dom';
import { PrivateLayout } from '../layout';
import { NotFoundView } from '../views';
import AboutView from '../views/About';
import DevView from '../views/Dev';
import Home from '../views/Home';

/**
 * List of routes available  for authenticated users
 * Also renders the "Private Layout" composition
 * @routes PrivateRoutes
 */
const PrivateRoutes = () => {
  return (
    <PrivateLayout>
      <Routes>
        <Route path="/" element={<Home />} />
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
