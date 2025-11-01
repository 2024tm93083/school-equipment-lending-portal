export default function EquipmentCard({ item }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text">
            <strong>Category:</strong> {item.category}<br/>
            <strong>Condition:</strong> {item.condition}<br/>
            <strong>Qty:</strong> {item.quantity}<br/>
            <strong>Available:</strong> {item.availability ? 'Yes' : 'No'}
          </p>
        </div>
        <div className="card-footer bg-transparent">
          <button className="btn btn-sm btn-outline-primary w-100" disabled={!item.availability}>
            Request
          </button>
        </div>
      </div>
    </div>
  );
}