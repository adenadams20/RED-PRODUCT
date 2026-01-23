import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Sidebar({ isOpen }) {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) =>
    location.pathname === path
      ? "bg-secondary text-white rounded"
      : "text-white";

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/Connexion");
  };

  return (
    <aside
      className={`bg-dark text-white vh-100 position-fixed top-0 start-0 p-3 d-flex flex-column
      ${isOpen ? "d-block" : "d-none d-md-block"}`}
      style={{ width: "250px" }}
    >
      {/* LOGO */}
      <div className="mb-4">
        <h4 className="fw-bold mb-0">RED PRODUCT</h4>
        <small className="text-muted">Admin panel</small>
      </div>

      {/* MENU */}
      <ul className="nav flex-column gap-2 flex-grow-1">
        <li className="nav-item">
          <Link
            to="/dashboard"
            className={`nav-link ${isActive("/dashboard")}`}
          >
            <i className="bi bi-grid me-2"></i>
            Dashboard
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to="/hotels"
            className={`nav-link ${isActive("/hotels")}`}
          >
            <i className="bi bi-building me-2"></i>
            Liste des hôtels
          </Link>
        </li>
      </ul>

      {/* USER */}
      <div className="border-top pt-3">
        <div className="d-flex align-items-center gap-2 mb-3">
          <img
            src="https://i.pravatar.cc/40"
            alt="avatar"
            className="rounded-circle"
            width="36"
            height="36"
          />
          <div>
            <div className="fw-bold small">Mouhamet Badiane</div>
            <small className="text-success">● en ligne</small>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="btn btn-outline-light btn-sm w-100"
        >
          <i className="bi bi-box-arrow-right me-2"></i>
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
