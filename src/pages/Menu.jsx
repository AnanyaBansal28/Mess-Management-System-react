import React, { useState } from "react";
import "../styles/Menu.css";

const Menu = () => {
  const [active, setActive] = useState("breakfast");

  const [menus, setMenus] = useState({
    breakfast: [
      { name: "Poha", price: 15, type: "Veg" },
      { name: "Sambhar", price: 10, type: "Veg" },
    ],
    lunch: [
      { name: "Dal Tadka", price: 20, type: "Veg" },
      { name: "Rice", price: 15, type: "Veg" },
    ],
    dinner: [
      { name: "Shahi Paneer", price: 25, type: "Veg" },
      { name: "Chapati", price: 10, type: "Veg" },
    ],
  });

  const [showForm, setShowForm] = useState({
    breakfast: false,
    lunch: false,
    dinner: false,
  });

  const [formData, setFormData] = useState({
    breakfast: { name: "", price: "", type: "Veg" },
    lunch: { name: "", price: "", type: "Veg" },
    dinner: { name: "", price: "", type: "Veg" },
  });

  const handleAdd = (meal) => {
    const data = formData[meal];
    if (!data.name || !data.price) {
      alert("Enter item name & price");
      return;
    }

    setMenus((m) => ({
      ...m,
      [meal]: [...m[meal], { ...data }],
    }));

    setFormData((f) => ({
      ...f,
      [meal]: { name: "", price: "", type: "Veg" },
    }));

    setShowForm((f) => ({ ...f, [meal]: false }));
  };

  const handleDelete = (meal, index) => {
    setMenus((m) => {
      const newList = [...m[meal]];
      newList.splice(index, 1);
      return { ...m, [meal]: newList };
    });
  };

  return (
    <div className="menu-page"> 

      <header>
        <div className="left">
          <a href="/admin-dashboard" className="back-icon">
            <i className="fa-solid fa-arrow-left"></i>
          </a>
          <h2><i className="fa-solid fa-utensils" style={{ color: "#ff4500" }}></i> Menu Management</h2>
        </div>
      </header>

      <div className="wrapper">

        <div className="container">

          <div className="sidebar">
            <h3><i className="fa-solid fa-utensils" style={{ color: "#ff4500" }}></i> Today's Menus</h3>

            {["breakfast", "lunch", "dinner"].map((meal) => (
              <div
                key={meal}
                className="menu-card"
                onClick={() => setActive(meal)}
              >
                <span>{meal.charAt(0).toUpperCase() + meal.slice(1)}</span>
                <span>₹{meal === "breakfast" ? 25 : meal === "lunch" ? 60 : 80}</span>
              </div>
            ))}
          </div>

          <div className="content">
            {["breakfast", "lunch", "dinner"].map((meal) => (
              <div
                key={meal}
                className={`panel ${active === meal ? "active" : ""}`}
              >
                <h3>{meal.toUpperCase()}</h3>
                <p>
                  {meal === "breakfast"
                    ? "7:00–10:00 AM"
                    : meal === "lunch"
                    ? "12:00–3:00 PM"
                    : "7:00–10:00 PM"}{" "}
                  · {menus[meal].length} items
                </p>

                <div className="items">
                  {menus[meal].map((item, i) => (
                    <div className="item-card" key={i}>
                      <div>
                        {item.name} <span className="badge">{item.type}</span>
                        <br />
                        <small>₹{item.price}</small>
                      </div>
                      <div>
                        <i
                          className="fa-solid fa-trash"
                          style={{ color: "red", cursor: "pointer" }}
                          onClick={() => handleDelete(meal, i)}
                        ></i>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="add-btn" onClick={() =>
                  setShowForm((f) => ({ ...f, [meal]: !f[meal] }))
                }>
                  + Add Item
                </div>

                {showForm[meal] && (
                  <div className="form">
                    <input
                      type="text"
                      placeholder="Item Name"
                      value={formData[meal].name}
                      onChange={(e) =>
                        setFormData((f) => ({
                          ...f,
                          [meal]: { ...f[meal], name: e.target.value },
                        }))
                      }
                    />
                    <input
                      type="number"
                      placeholder="Price (₹)"
                      value={formData[meal].price}
                      onChange={(e) =>
                        setFormData((f) => ({
                          ...f,
                          [meal]: { ...f[meal], price: e.target.value },
                        }))
                      }
                    />
                    <select
                      value={formData[meal].type}
                      onChange={(e) =>
                        setFormData((f) => ({
                          ...f,
                          [meal]: { ...f[meal], type: e.target.value },
                        }))
                      }
                    >
                      <option>Veg</option>
                      <option>Non-Veg</option>
                    </select>
                    <button onClick={() => handleAdd(meal)}>Add Item</button>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
};

export default Menu;
