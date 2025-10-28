import db from "../db/database.js";

/**
 * GET /api/equipment
 */
export const getAllEquipment = (req, res) => {
  const sql = "SELECT * FROM equipment ORDER BY id ASC";
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error("getAllEquipment err:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(rows);
  });
};

/**
 * GET /api/equipment/:id
 */
export const getEquipmentById = (req, res) => {
  const id = Number(req.params.id);
  const sql = "SELECT * FROM equipment WHERE id = ?";
  db.get(sql, [id], (err, row) => {
    if (err) {
      console.error("getEquipmentById err:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (!row) return res.status(404).json({ error: "Not found" });
    res.json(row);
  });
};

/**
 * POST /api/equipment
 */
export const createEquipment = (req, res) => {
  const {
    name,
    category = null,
    condition = "Good",
    quantity = 0,
    available = 0,
  } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });

  const sql = `INSERT INTO equipment (name, category, condition, quantity, available)
               VALUES (?, ?, ?, ?, ?)`;
  const params = [
    name,
    category,
    condition,
    Number(quantity),
    Number(available) ? 1 : 0,
  ];

  db.run(sql, params, function (err) {
    if (err) {
      console.error("createEquipment err:", err);
      return res.status(500).json({ error: "Database error" });
    }
    const newId = this.lastID;
    db.get("SELECT * FROM equipment WHERE id = ?", [newId], (err2, row) => {
      if (err2) {
        console.error("createEquipment fetch err:", err2);
        return res.status(201).json({ id: newId });
      }
      res.status(201).json(row);
    });
  });
};

/**
 * PUT /api/equipment/:id
 */
export const updateEquipment = (req, res) => {
  const id = Number(req.params.id);
  const allowed = ["name", "category", "condition", "quantity", "available"];
  const updates = [];
  const params = [];

  for (const key of allowed) {
    if (Object.prototype.hasOwnProperty.call(req.body, key)) {
      updates.push(`${key} = ?`);
      if (key === "available") params.push(req.body[key] ? 1 : 0);
      else if (key === "quantity") params.push(Number(req.body[key]) || 0);
      else params.push(req.body[key]);
    }
  }

  if (updates.length === 0)
    return res.status(400).json({ error: "No updatable fields provided" });

  const sql = `UPDATE equipment SET ${updates.join(", ")} WHERE id = ?`;
  params.push(id);

  db.run(sql, params, function (err) {
    if (err) {
      console.error("updateEquipment err:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (this.changes === 0) return res.status(404).json({ error: "Not found" });
    db.get("SELECT * FROM equipment WHERE id = ?", [id], (err2, row) => {
      if (err2) {
        console.error("updateEquipment fetch err:", err2);
        return res.status(200).json({ id });
      }
      res.json(row);
    });
  });
};

/**
 * DELETE /api/equipment/:id
 */
export const deleteEquipment = (req, res) => {
  const id = Number(req.params.id);
  const sql = "DELETE FROM equipment WHERE id = ?";
  db.run(sql, [id], function (err) {
    if (err) {
      console.error("deleteEquipment err:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (this.changes === 0) return res.status(404).json({ error: "Not found" });
    res.status(204).send();
  });
};
