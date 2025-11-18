// src/pages/Inventory.jsx
import React, { useEffect, useState } from "react";
import '../styles/inventory.css'


export default function Inventory() {
  // Default items (keeps your UI same before API responds)
  const defaultItems = [
    {
      id: 1,
      name: "Basmati Rice",
      category: "Grains",
      qty: 450,
      unit: "kg",
      value: 38250,
      original: 450, // used to compute percent and critical threshold
      progress: 80,
    },
    {
      id: 2,
      name: "Onions",
      category: "Vegetables",
      qty: 25,
      unit: "kg",
      value: 750,
      original: 25,
      progress: 10,
    },
    {
      id: 3,
      name: "Milk",
      category: "Dairy",
      qty: 80,
      unit: "liters",
      value: 4400,
      original: 80,
      progress: 70,
    },
    {
      id: 4,
      name: "Turmeric Powder",
      category: "Spices",
      qty: 5,
      unit: "kg",
      value: 900,
      original: 5,
      progress: 5,
    },
  ];

  const [items, setItems] = useState(defaultItems);
  const [loading, setLoading] = useState(true);

  // Fetch inventory from API and replace default items if successful
  useEffect(() => {
    let mounted = true;
    fetch("http://localhost:4000/api/inventory")
      .then((r) => {
        if (!r.ok) throw new Error("Network response not ok");
        return r.json();
      })
      .then((data) => {
        if (!mounted) return;
        // normalize server objects to match UI fields we expect
        const normalized = data.map((it) => ({
          id: it.id ?? Math.random(),
          name: it.name ?? it.itemName ?? "Item",
          category: it.category ?? "Misc",
          qty: typeof it.qty === "number" ? it.qty : Number(it.qty) || 0,
          unit: it.unit ?? (String(it.qty || "").toLowerCase().includes("lit") ? "liters" : "kg"),
          value: it.value ?? 0,
          original: typeof it.qty === "number" ? it.qty : Number(it.qty) || 1,
          progress: it.progress ?? 0,
        }));

        // if server provided no progress, compute from qty/original (100% default)
        normalized.forEach((it) => {
          if (!it.progress) {
            // avoid division by zero
            const orig = it.original && it.original > 0 ? it.original : it.qty || 1;
            it.progress = Math.min(100, Math.round((it.qty / orig) * 100));
          }
        });

        if (normalized.length) {
          setItems(normalized);
        }
      })
      .catch((err) => {
        console.warn("Could not fetch inventory from API (using defaults):", err);
        // keep defaults
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  // Update quantity (updates UI and tries to persist to API)
  function updateQty(id, newQty) {
    setItems((prev) =>
      prev.map((it) => {
        if (it.id !== id) return it;
        const original = it.original && it.original > 0 ? it.original : it.qty || 1;
        const percent = Math.min(100, Math.round((newQty / original) * 100));
        const status = newQty <= original * 0.2 ? "critical" : "good";
        return {
          ...it,
          qty: newQty,
          progress: percent,
          status,
        };
      })
    );

    // Try to persist to server (best-effort)
    fetch(`http://localhost:4000/api/inventory/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ qty: newQty }),
    })
      .then((r) => {
        if (!r.ok) throw new Error("Failed to update on server");
        return r.json();
      })
      .then((updated) => {
        // If server responded with updated object, sync original/progress if provided
        setItems((prev) =>
          prev.map((it) =>
            it.id === id
              ? {
                  ...it,
                  qty: typeof updated.qty === "number" ? updated.qty : it.qty,
                  value: typeof updated.value === "number" ? updated.value : it.value,
                }
              : it
          )
        );
      })
      .catch((err) => {
        console.warn("Could not persist inventory change to server:", err);
      });
  }

  return (
    <div className="inventory-page">
      <header>
        <h1>
          <i className="fa-solid fa-box"></i> Inventory Control
        </h1>
        <button>
          <i className="fa-solid fa-plus"></i> Add Item
        </button>
      </header>

      <div className="container">
        <div className="summary">
          <div className="card">
            <div className="card-text">
              <p>Total Items</p>
              <h2 style={{ color: "#4a6cf7" }}>{items.length}</h2>
            </div>
            <i className="fa-solid fa-box blue"></i>
          </div>

          <div className="card">
            <div className="card-text">
              <p>Low Stock Items</p>
              <h2 style={{ color: "#e1a910" }}>
                {items.filter((it) => it.qty <= (it.original || it.qty) * 0.2).length}
              </h2>
            </div>
            <i className="fa-solid fa-triangle-exclamation yellow"></i>
          </div>

          <div className="card">
            <div className="card-text">
              <p>Total Value</p>
              <h2 style={{ color: "#1e9b4f" }}>
                ₹{items.reduce((s, it) => s + (it.value || 0), 0).toLocaleString()}
              </h2>
            </div>
            <i className="fa-solid fa-arrow-trend-up green"></i>
          </div>

          <div className="card">
            <div className="card-text">
              <p>Stock Level</p>
              <h2 style={{ color: "#7b4df7" }}>
                {/* rough % = average of progress */}
                {Math.round(items.reduce((s, it) => s + (it.progress || 0), 0) / (items.length || 1))}%
              </h2>
            </div>
            <i className="fa-solid fa-circle-check purple"></i>
          </div>
        </div>

        <div className="tabs">
          <a href="#">
            <i className="fa-solid fa-cubes"></i> Inventory Items
          </a>
          <a href="#">
            <i className="fa-solid fa-truck"></i> Suppliers
          </a>
        </div>

        <div className="filter">
          <select
            onChange={(e) => {
              // optional: filter UI client-side; for now keep simple (no-op)
            }}
          >
            <option>All Categories</option>
            <option>Grains</option>
            <option>Vegetables</option>
            <option>Dairy</option>
            <option>Spices</option>
          </select>
        </div>

        <section className="inventory-list">
          {loading && <p style={{ margin: 30 }}>Loading inventory...</p>}

          {items.map((it) => {
            const statusClass = it.status === "critical" || it.qty <= (it.original || it.qty) * 0.2 ? "critical" : "good";
            return (
              <div className="item" key={it.id}>
                <div className="item-name">
                  <strong>{it.name}</strong>{" "}
                  <span className={`item-status ${statusClass}`.trim()}>
                    {statusClass === "critical" ? "CRITICAL" : "GOOD"}
                  </span>
                  <span className="item-category">{it.category}</span>
                </div>

                <div className="progress">
                  <div className="progress-bar" style={{ width: `${it.progress}%` }}></div>
                </div>

                <div className="item-stock">
                  Current Stock
                  <br />
                  <b>
                    {it.qty} {it.unit}
                  </b>
                </div>

                <div className="item-value">
                  Value
                  <br />
                  <b>₹{(it.value || 0).toLocaleString()}</b>
                </div>

                <div className="item-value">
                  update stock
                  <br />
                  <b>
                    <input
                      type="number"
                      name="quantity"
                      min="0"
                      max="1000000"
                      step="1"
                      value={it.qty}
                      onChange={(e) => {
                        const v = parseInt(e.target.value, 10);
                        updateQty(it.id, isNaN(v) ? 0 : v);
                      }}
                      style={{ backgroundColor: "#f0f0f0" }}
                    />
                  </b>
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}
