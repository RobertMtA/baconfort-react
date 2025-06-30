import { useAdmin } from '../context/AdminContext';
import AdminLogin from '../components/Admin/AdminLogin';
import AdminPanel from '../components/Admin/AdminPanel';

function Admin() {
  const { isAuthenticated } = useAdmin();

  return (
    <div className="admin-page">
      {isAuthenticated ? <AdminPanel /> : <AdminLogin />}
    </div>
  );
}

export default Admin;
