import React, { useState } from "react";
import img from "../assets/img/bg-img.jpeg";
import api from "../service/api";
import { Link } from "react-router-dom";

export default function MotDePasseOublie() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [erreur, setErreur] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur("");
    setMessage("");

    try {
      setLoading(true);

      const res = await api.post("/auth/forgot-password", {
        email: email,
      });

      // Assurez-vous de vérifier le statut de la réponse avant de tenter de lire le corps
      if (!res.ok) {
        // Si la réponse n'est pas un succès, afficher le message d'erreur approprié
        const data = await res.json();
        throw new Error(data.message || "Une erreur s'est produite.");
      }

      setMessage(
        "Un lien de réinitialisation a été envoyé à votre adresse email."
      );
      setEmail(""); // Réinitialiser l'email après l'envoi

    } catch (err) {
      // Gestion d'erreur avec des détails spécifiques
      if (err.response) {
        // Si le serveur renvoie une erreur, extraire les détails
        setErreur(
          err.response.data?.message ||
            "Impossible d'envoyer le lien de réinitialisation"
        );
      } else {
        // Si une erreur générale ou de réseau se produit
        setErreur(err.message || "Une erreur inconnue s'est produite.");
      }
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
      <div
        className="bg-white shadow rounded p-4 px-5 w-100"
        style={{ maxWidth: 400 }}
      >
        <h4 className="text-center fw-bold mb-3">
          Mot de passe oublié
        </h4>

        <p className="text-center text-muted mb-4">
          Entrez votre email pour recevoir un lien de réinitialisation
        </p>

        {erreur && (
          <div className="alert alert-danger text-center">
            {erreur}
          </div>
        )}

        {message && (
          <div className="alert alert-success text-center">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Adresse email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-dark w-100"
            disabled={loading}
          >
            {loading ? "Envoi..." : "Envoyer le lien"}
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          <Link to="/Connexion" className="text-warning fw-semibold">
            Retour à la connexion
          </Link>
        </p>
      </div>
    </div>
  );
}
