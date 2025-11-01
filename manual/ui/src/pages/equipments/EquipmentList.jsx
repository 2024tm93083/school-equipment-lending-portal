import { useEffect, useState } from 'react';
import api from '../../services/api';
import EquipmentCard from '../../components/equipment/equipment-card/EquipmentCard';

export default function EquipmentList() {
  const [equipment, setEquipment] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch all equipment
  useEffect(() => {
    api.get('/equipment')
      .then(res => {
        setEquipment(res.data);
        setFiltered(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Filter logic
  useEffect(() => {
    let result = equipment;

    if (search) {
      result = result.filter(i => 
        i.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category) {
      result = result.filter(i => i.category === category);
    }
    setFiltered(result);
  }, [search, category, equipment]);

  // Get unique categories for dropdown
  const categories = [...new Set(equipment.map(i => i.category))];

  if (loading) return <div className="text-center"><div className="spinner-border"></div></div>;

  return (
    <div>
      <h2 className="mb-4">Equipment List</h2>

      {/* Search & Filter */}
      <div className="row mb-4 g-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select className="form-select" value={category} onChange={e => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
          <button className="btn btn-outline-secondary w-100" onClick={() => {setSearch(''); setCategory('');}}>Reset</button>
        </div>
      </div>

      {/* Cards */}
      <div className="row">
        {filtered.length === 0 ? (
          <p className="text-muted">No equipment found.</p>
        ) : (
          filtered.map(item => (
            <EquipmentCard key={item.id} item={item} />
          ))
        )}
      </div>
    </div>
  );
}