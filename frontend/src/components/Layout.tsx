import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { authAtom } from '../store/auth';

export default function Layout() {
  const [auth, setAuth] = useAtom(authAtom);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({ token: null, user: null });
    navigate('/login');
  };

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="nav-brand">
          <Link to="/">Workshop Buddy</Link>
        </div>
        {auth.isAuthenticated && (
          <>
            <div className="nav-links">
              <Link to="/materials">Materials</Link>
              <Link to="/consumables">Consumables</Link>
              <Link to="/items">Items</Link>
            </div>
            <div className="nav-user">
              <span>Welcome, {auth.user?.username}</span>
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </div>
          </>
        )}
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
