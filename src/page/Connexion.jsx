import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import img from "../assets/img/bg-img.jpeg";
import AuthService from "../service/authService";

export default function Connexion() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [motdepasse, setMotdepasse] = useState("");
  const [garderConnecte, setGarderConnecte] = useState(false);
  const [erreur, setErreur] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur("");
    setLoading(true);

    try {
      await AuthService.login(email, motdepasse, garderConnecte);
      navigate("/dashboard");
    } catch (err) {
      setErreur(err.message || "Email ou mot de passe incorrect");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white shadow rounded p-4 px-5 w-100" style={{ maxWidth: 400 }}>
        <h4 className="text-center fw-bold mb-4">Connexion Admin</h4>

        {erreur && <div className="alert alert-danger text-center">{erreur}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Mot de passe</label>
            <input
              type="password"
              className="form-control"
              value={motdepasse}
              onChange={(e) => setMotdepasse(e.target.value)}
              required
            />
          </div>

          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              checked={garderConnecte}
              onChange={(e) => setGarderConnecte(e.target.checked)}
              id="remember"
            />
            <label className="form-check-label" htmlFor="remember">
              Garder-moi connecté
            </label>
          </div>

          <button type="submit" className="btn btn-dark w-100" disabled={loading}>
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Vous n'avez pas de compte ?{" "}
          <Link to="/Inscriptions" className="text-warning fw-semibold">
            S'inscrire
          </Link>
        </p>
        <p className="text-center mt-2 mb-0">
          <Link to="/MotDePasseOublie" className="text-warning fw-semibold">
            Mot de passe oublié ?
          </Link>
        </p>
      </div>
    </div>
  );
}
