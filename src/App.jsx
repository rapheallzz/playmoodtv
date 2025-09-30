import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import MoviePage from './pages/MoviePage';
import Channels from './pages/Channels';
import Privacy from './pages/Privacy';
import Cookies from './pages/Cookies';
import Login from './pages/LoginPage';
import Register from './pages/Registrationpage';
import Dashboardpage from './pages/Dashboardpage';
import AdminDashboard from './pages/Adminpage';
import PageNotFound from './pages/NotFound';
import NewPlaymood from './pages/NewPlaymood';
import Recommended from './pages/Recommended';
import Spaces from './pages/Spaces';
import Diaries from './pages/Diaries';
import Stories from './pages/Stories';
import Interviews from './pages/Interviews';
import Fashion from './pages/Fashion';
import Documentaries from './pages/Documentaries';
import Cameras from './pages/Cameras';
import SoonPlaymood from './pages/Soonplaymood';
import TEEN from './pages/Teen';
import BestFashion from './pages/Bestfashion';
import OnlyPlaymood from './pages/Onlyplaymood';
import Watchlist from './pages/Watchlistt';
import Creator from './pages/Creators';
import CreatorChannel from './pages/CreatorChannel';
import CreatorPage from './pages/CreatorPage';
import EmailVerification from './pages/EmailVerification';
import PrivateRoute from './features/PrivateRoute';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import AuthCallback from './pages/AuthCallback';
import UploadProgressIndicator from './components/misc/UploadProgressIndicator';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  {
    element: <PrivateRoute requiredRole="admin" />,
    children: [{ path: '/admin', element: <AdminDashboard /> }],
  },
  {
    element: <PrivateRoute />,
    children: [{ path: '/dashboard', element: <Dashboardpage /> }],
  },
  {
    element: <PrivateRoute requiredRole="creator" />,
    children: [{ path: '/creatorpage', element: <CreatorPage /> }],
  },
  { path: '/creator', element: <CreatorChannel /> },
  { path: '/schedule', element: <Schedule /> },
  { path: '/movie/:slug', element: <MoviePage /> },
  { path: '/channels', element: <Channels /> },
  { path: '/spaces', element: <Spaces /> },
  { path: '/diaries', element: <Diaries /> },
  { path: '/stories', element: <Stories /> },
  { path: '/newplaymood', element: <NewPlaymood /> },
  { path: '/creator/:id', element: <Creator /> },
  { path: '/interviews', element: <Interviews /> },
  { path: '/fashion', element: <Fashion /> },
  { path: '/documentaries', element: <Documentaries /> },
  { path: '/cameras', element: <Cameras /> },
  { path: '/soon', element: <SoonPlaymood /> },
  { path: '/teen', element: <TEEN /> },
  { path: '/bestfashion', element: <BestFashion /> },
  { path: '/onlyplaymood', element: <OnlyPlaymood /> },
  { path: '/watchlist', element: <Watchlist /> },
  { path: '/recommended', element: <Recommended /> },
  { path: '/privacy-policy', element: <Privacy /> },
  { path: '/cookies', element: <Cookies /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/auth/callback', element: <AuthCallback /> },
  { path: '/emailverify', element: <EmailVerification /> },
  { path: '/forgot-password', element: <ForgotPasswordPage /> },
  { path: '/reset-password/:token', element: <ResetPasswordPage /> },
  { path: '*', element: <PageNotFound /> },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
      <UploadProgressIndicator />
    </>
  );
}

export default App;
