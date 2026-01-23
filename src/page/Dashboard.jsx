import React from "react";
import {
  BsFileEarmarkCheck,
  BsChatDots,
  BsPeopleFill,
  BsEnvelope,
  BsBuilding,
  BsGrid3X3Gap,
} from "react-icons/bs";

const stats = [
  {
    value: 125,
    title: "Formulaires",
    description: "Total des formulaires soumis",
    icon: <BsFileEarmarkCheck size={22} />,
    color: "primary",
  },
  {
    value: 40,
    title: "Messages",
    description: "Messages reçus",
    icon: <BsChatDots size={22} />,
    color: "success",
  },
  {
    value: 600,
    title: "Utilisateurs",
    description: "Utilisateurs inscrits",
    icon: <BsPeopleFill size={22} />,
    color: "info",
  },
  {
    value: 25,
    title: "E-mails",
    description: "Total des e-mails envoyés",
    icon: <BsEnvelope size={22} />,
    color: "warning",
  },
  {
    value: 40,
    title: "Hôtels",
    description: "Hôtels enregistrés",
    icon: <BsBuilding size={22} />,
    color: "danger",
  },
  {
    value: 2,
    title: "Entités",
    description: "Entités disponibles",
    icon: <BsGrid3X3Gap size={22} />,
    color: "secondary",
  },
];

export default function Dashboard() {
  return (
    <div className="p-3">
      {/* HEADER */}
      <div className="mb-4">
        <h1 className="fs-4 fw-bold mb-1">Dashboard</h1>
        <p className="text-muted mb-0">
          Bienvenue sur <strong>RED Product</strong> – Vue d’ensemble
        </p>
      </div>

      {/* STATS */}
      <div className="row g-4">
        {stats.map((item, index) => (
          <div className="col-xl-4 col-md-6" key={index}>
            <div className="card shadow-sm h-100 border-0">
              <div className="card-body d-flex align-items-center gap-3">
                {/* ICON */}
                <div
                  className={`bg-${item.color} bg-opacity-10 text-${item.color}
                  rounded-circle d-flex align-items-center justify-content-center`}
                  style={{ width: 48, height: 48 }}
                >
                  {item.icon}
                </div>

                {/* TEXT */}
                <div>
                  <h4 className="fw-bold mb-0">{item.value}</h4>
                  <small className="text-muted">{item.title}</small>
                  <p className="mb-0 mt-1 text-muted small">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
