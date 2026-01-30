import React, { useState, useEffect } from "react";
import HotelService from "../service/HotelService";
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export default function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingHotel, setEditingHotel] = useState(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    price: "",
    currency: "XOF",
    image: null,
    preview: null,
  });

  const fetchHotels = async () => {
    try {
      const data = await HotelService.getHotels();
      setHotels(data);
    } catch {
      alert("Erreur lors du chargement des hôtels");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm((prev) => ({
      ...prev,
      image: file,
      preview: URL.createObjectURL(file),
    }));
  };

  const resetForm = () => {
    setModalOpen(false);
    setEditingHotel(null);
    setForm({
      name: "",
      address: "",
      email: "",
      phone: "",
      price: "",
      currency: "XOF",
      image: null,
      preview: null,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  // Créer FormData pour upload image
  const formData = new FormData();
  formData.append("name", form.name || "");
  formData.append("address", form.address || "");
  formData.append("email", form.email || "");
  formData.append("phone", form.phone || "");
  formData.append("price", form.price ? Number(form.price) : 0);
  formData.append("currency", form.currency || "XOF");
  if (form.image) formData.append("image", form.image);

  try {
    setSaving(true);
    let savedHotel;

    if (editingHotel) {
      savedHotel = await HotelService.updateHotel(editingHotel.id, formData);
      setHotels((prev) =>
        prev.map((h) => (h.id === savedHotel.id ? savedHotel : h))
      );
    } else {
      savedHotel = await HotelService.createHotel(formData);
      setHotels((prev) => [savedHotel, ...prev]);
    }

    resetForm();
  } catch (err) {
    console.error(err);
    const msg =
      err.response?.data
        ? Object.values(err.response.data).flat().join("\n")
        : "Erreur inconnue";
    alert("Erreur lors de l'enregistrement :\n" + msg);
  } finally {
    setSaving(false);
  }
};


  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cet hôtel ?")) return;
    await HotelService.deleteHotel(id);
    setHotels((prev) => prev.filter((h) => h.id !== id));
  };

  if (loading) return <p className="text-center mt-5">Chargement...</p>;

  return (
    <>
      <div className="container-fluid p-3 bg-white border shadow-sm">
        <div className="d-flex justify-content-between align-items-center">
          <h4>Hôtels</h4>
          <button className="btn btn-dark" onClick={() => setModalOpen(true)}>+ Créer</button>
        </div>
      </div>

      <div className="container mt-4">
        <div className="row g-4">
          {hotels.map((hotel) => (
            <div className="col-md-3" key={hotel.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={hotel.image_url || "/fallback.jpg"}
                  className="card-img-top"
                  style={{ height: 180, objectFit: "cover" }}
                  alt={hotel.name}
                />
                <div className="card-body">
                  <h6>{hotel.name}</h6>
                  <small className="text-muted">{hotel.address}</small>
                  <div className="mt-2">
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => {
                        setEditingHotel(hotel);
                        setForm({
                          name: hotel.name,
                          address: hotel.address,
                          email: hotel.email,
                          phone: hotel.phone,
                          price: hotel.price,
                          currency: hotel.currency,
                          image: null,
                          preview: hotel.image_url,
                        });
                        setModalOpen(true);
                      }}
                    >
                      Modifier
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(hotel.id)}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalOpen && (
        <div className="modal fade show d-block modal-bg">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">{editingHotel ? "Modifier" : "Créer"} un hôtel</h5>
                  <button type="button" className="btn-close" onClick={resetForm}></button>
                </div>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Nom de l'hôtel</label>
                      <input className="form-control" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required/>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Adresse</label>
                      <input className="form-control" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })}/>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Email</label>
                      <input type="email" className="form-control" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}/>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Téléphone</label>
                      <input className="form-control" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}/>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Prix par nuit</label>
                      <input type="number" className="form-control" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })}/>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Devise</label>
                      <select className="form-select" value={form.currency} onChange={e => setForm({ ...form, currency: e.target.value })}>
                        <option value="XOF">XOF</option>
                        <option value="EUR">EUR</option>
                        <option value="USD">USD</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label">Photo</label>
                      <input type="file" accept="image/*" onChange={handleImageChange}/>
                      {form.preview && <img src={form.preview} className="img-preview mt-2" alt="preview"/>}
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-dark" disabled={saving}>{saving ? "Enregistrement..." : "Enregistrer"}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
