import React, { useState, useEffect } from "react";
import api from "../service/api"; // axios configuré

export default function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/hotels")
      .then((res) => {
        setHotels(res.data);
      })
      .catch((err) => {
        console.error("Erreur récupération hôtels", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-center mt-5">Chargement des hôtels...</p>;
  }

  return (
    <>
      {/* Header */}
      <div className="container-fluid w-100 p-3 shadow-sm border bg-white">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h3 className="mb-0">Hôtels</h3>
            <small className="text-muted">{hotels.length} résultats</small>
          </div>

          <div className="col-md-6 text-md-end">
            <button className="btn btn-dark">
              + Créer un nouvel hôtel
            </button>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="container p-0 mt-4">
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {hotels.map((hotel) => (
            <div className="col" key={hotel.id}>
              <div className="card h-100 shadow">
                <img
                  src={hotel.image}
                  className="card-img-top"
                  alt={hotel.name}
                  style={{ objectFit: "cover", height: "180px" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{hotel.name}</h5>
                  <p className="card-text text-muted">
                    {hotel.description || "Description de l’hôtel"}
                  </p>
                  <button className="btn btn-sm btn-outline-primary">
                    Voir détails
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
