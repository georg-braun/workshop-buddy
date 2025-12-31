import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Workshop Buddy Dashboard</h1>
      <div className="dashboard-grid">
        <Link to="/materials" className="dashboard-card">
          <h2>Materials</h2>
          <p>Manage workshop materials and track inventory levels</p>
        </Link>
        <Link to="/consumables" className="dashboard-card">
          <h2>Consumables</h2>
          <p>Track consumable items and monitor stock levels</p>
        </Link>
        <Link to="/items" className="dashboard-card">
          <h2>Items</h2>
          <p>Manage items and link required materials</p>
        </Link>
      </div>
    </div>
  );
}
