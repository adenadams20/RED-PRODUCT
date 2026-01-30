import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import img from "../assets/img/bg-img.jpeg";
import AuthService from "../service/authService"; // Utilisation correcte du service

export default function Inscriptions() {
  const navigate = useNavigate();

  const [nom, setNom] = useState(localStorage.getItem("name") || "");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [motdepasse, setMotdepasse] = useState("");
  const [motdepasseConfirm, setMotdepasseConfirm] = useState("");
  const [terme, setTerme] = useState(false);
  const [garderConnecte, setGarderConnecte] = useState(
    localStorage.getItem("garderConnecte") === "true"
  );
  const [erreur, setErreur] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur("");

    if (!terme) {
      setErreur("Vous devez accepter les termes et conditions");
      return;
    }

    if (motdepasse !== motdepasseConfirm) {
      setErreur("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      setLoading(true);

      // Appel à AuthService pour l'inscription
      const data = await AuthService.register(nom, email, motdepasse);

      // Stockage du token si succès
      if (data.token) localStorage.setItem("token", data.token);

      // Garder connecté
      if (garderConnecte) {
        localStorage.setItem("name", nom);
        localStorage.setItem("email", email);
        localStorage.setItem("garderConnecte", "true");
      } else {
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("garderConnecte");
      }

      alert("Inscription réussie !");
      navigate("/Connexion");
    } catch (err) {
      setErreur(
        err.message || "Erreur lors de l'inscription"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="bg-white rounded shadow p-4 px-5 w-100"
        style={{ maxWidth: 420 }}
      >
        <h4 className="text-center mb-4 fw-bold">
          Inscrivez-vous en tant que Admin
        </h4>

        {erreur && <div className="alert alert-danger">{erreur}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nom</label>
            <input
              type="text"
              className="form-control"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
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
              disabled={loading}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirmer le mot de passe</label>
            <input
              type="password"
              className="form-control"
              value={motdepasseConfirm}
              onChange={(e) => setMotdepasseConfirm(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              checked={garderConnecte}
              onChange={(e) => setGarderConnecte(e.target.checked)}
              id="garderConnecte"
              disabled={loading}
            />
            <label className="form-check-label" htmlFor="garderConnecte">
              Garder-moi connecté
            </label>
          </div>

          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              checked={terme}
              onChange={(e) => setTerme(e.target.checked)}
              id="termes"
              disabled={loading}
            />
            <label className="form-check-label" htmlFor="termes">
              J'accepte les termes et conditions
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-dark w-100"
            disabled={loading}
          >
            {loading ? "Inscription..." : "S'inscrire"}
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Vous avez déjà un compte ?{" "}
          <Link to="/Connexion" className="text-warning fw-semibold">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
