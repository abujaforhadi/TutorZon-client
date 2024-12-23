import { Navigate, useLocation } from 'react-router';
import Loading from '../Components/Loading';
import { useContext } from 'react';
import { AuthContext } from '../Auth/AuthProvider';

const PrivateRouter = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (user && user?.email) {
    return children; 
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRouter;