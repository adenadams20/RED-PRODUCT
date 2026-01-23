import { useNavigate } from "react-router-dom";

export default function Navbar({ toggleSidebar, title = "Dashboard" }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/Connexion");
  };

  return (
    <nav className="navbar navbar-light bg-white shadow-sm px-3">
      <div className="d-flex align-items-center gap-3">
        {/* Toggle sidebar (mobile) */}
        <button
          className="btn btn-outline-dark d-md-none"
          onClick={toggleSidebar}
        >
          <i className="bi bi-list"></i>
        </button>

        {/* Page title */}
        <h5 className="mb-0 fw-bold">{title}</h5>
      </div>

      {/* Right actions */}
      <div className="d-flex align-items-center gap-3">
        {/* Notifications */}
        <button className="btn btn-light position-relative">
          <i className="bi bi-bell"></i>
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            3
          </span>
        </button>

        {/* User dropdown */}
        <div className="dropdown">
          <button
            className="btn btn-light dropdown-toggle d-flex align-items-center gap-2"
            data-bs-toggle="dropdown"
          >
            <img
              src="https://i.pravatar.cc/40"
              alt="avatar"
              className="rounded-circle"
              width="32"
              height="32"
            />
            <span className="fw-semibold d-none d-md-inline">
              Mouhamet
            </span>
          </button>

          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <button className="dropdown-item">
                <i className="bi bi-person me-2"></i>
                Profil
              </button>
            </li>
            <li>
              <button className="dropdown-item">
                <i className="bi bi-gear me-2"></i>
                Paramètres
              </button>
            </li>
            <li><hr className="dropdown-divider" /></li>
            <li>
              <button
                className="dropdown-item text-danger"
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-right me-2"></i>
                Déconnexion
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
