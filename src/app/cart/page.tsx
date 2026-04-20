"use client";
import { useState } from "react";

const initialItems = [
  {
    id: 1,
    name: "Premium Wavy Clip-In Hair Extensions",
    variant: "Black, 55 CM, Wavy",
    price: 3432,
    originalPrice: 4739,
    qty: 1,
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=120&h=120&fit=crop",
  },
  {
    id: 2,
    name: "Premium Keratin Bond Extensions",
    variant: "Dark Brown, 75 CM, Straight",
    price: 5100,
    originalPrice: 6200,
    qty: 1,
    image: "https://images.unsplash.com/photo-1560869713-da86a9ec0744?w=120&h=120&fit=crop",
  },
];

export default function CartPage() {
  const [items, setItems] = useState(initialItems);
  const [promoCode, setPromoCode] = useState("");
  const [instructions, setInstructions] = useState(false);
  const [instructionText, setInstructionText] = useState("");

  const updateQty = (id: number, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => item.id === id ? { ...item, qty: item.qty + delta } : item)
        .filter((item) => item.qty > 0)
    );
  };

  const removeItem = (id: number) => setItems((prev) => prev.filter((i) => i.id !== id));

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const fmt = (n: number) => `R$ ${n.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif", minHeight: "100vh", background: "#faf9f7" }}>
      {/* Top Banner */}
      <div style={{ background: "#1a1a1a", color: "#fff", textAlign: "center", padding: "10px", fontSize: "12px", letterSpacing: "1.5px", fontFamily: "sans-serif" }}>
        FREE SHIPPING ON ORDERS OVER R$ 5,000 &nbsp;|&nbsp; RETURNS ACCEPTED WITHIN 30 DAYS
      </div>

      {/* Navbar */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #e8e4df", padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "70px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "22px" }}>🌿</span>
          <span style={{ fontWeight: "700", fontSize: "18px", letterSpacing: "1px", fontFamily: "sans-serif" }}>ONE LOVE HAIR</span>
        </div>
        <div style={{ display: "flex", gap: "32px", fontFamily: "sans-serif", fontSize: "13px", letterSpacing: "0.5px" }}>
          {["Home", "Premium Hair Extensions", "Clip-In", "Keratin Bond"].map((nav) => (
            <a key={nav} href="#" style={{ textDecoration: "none", color: "#333", fontWeight: nav === "Home" ? "600" : "400" }}>{nav}</a>
          ))}
        </div>
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <span style={{ cursor: "pointer", fontSize: "18px" }}>🔍</span>
          <span style={{ position: "relative", cursor: "pointer", fontSize: "18px" }}>
            🛒
            <span style={{ position: "absolute", top: "-6px", right: "-8px", background: "#1a1a1a", color: "#fff", borderRadius: "50%", width: "16px", height: "16px", fontSize: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif" }}>
              {items.reduce((s, i) => s + i.qty, 0)}
            </span>
          </span>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "50px 24px", display: "grid", gridTemplateColumns: "1fr 380px", gap: "40px" }}>

        {/* Left: Cart Items */}
        <div>
          <h1 style={{ fontSize: "32px", fontWeight: "400", marginBottom: "6px", color: "#1a1a1a" }}>Your Cart</h1>
          <p style={{ fontSize: "13px", color: "#888", marginBottom: "32px", fontFamily: "sans-serif" }}>
            {items.reduce((s, i) => s + i.qty, 0)} item{items.reduce((s, i) => s + i.qty, 0) !== 1 ? "s" : ""} in your cart
          </p>

          {items.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "#999", fontFamily: "sans-serif" }}>
              <p style={{ fontSize: "18px", marginBottom: "16px" }}>Your cart is empty</p>
              <a href="#" style={{ color: "#1a1a1a", fontSize: "13px", letterSpacing: "1px" }}>CONTINUE SHOPPING →</a>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {items.map((item) => (
                <div key={item.id} style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e8e4df", padding: "20px", display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <img src={item.image} alt={item.name} style={{ width: "90px", height: "90px", objectFit: "cover", borderRadius: "8px", flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <p style={{ margin: "0 0 4px", fontWeight: "600", fontSize: "15px", color: "#1a1a1a", fontFamily: "sans-serif" }}>{item.name}</p>
                        <p style={{ margin: "0 0 16px", fontSize: "12px", color: "#888", fontFamily: "sans-serif" }}>{item.variant}</p>
                      </div>
                      <button onClick={() => removeItem(item.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#bbb", fontSize: "18px", lineHeight: 1, padding: "0 0 0 12px" }}>✕</button>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      {/* Qty Controls */}
                      <div style={{ display: "flex", alignItems: "center", border: "1px solid #e0dbd5", borderRadius: "6px", overflow: "hidden" }}>
                        <button onClick={() => updateQty(item.id, -1)} style={{ width: "32px", height: "32px", background: "none", border: "none", cursor: "pointer", fontSize: "16px", color: "#555", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                        <span style={{ width: "32px", textAlign: "center", fontSize: "13px", fontFamily: "sans-serif", fontWeight: "500" }}>{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} style={{ width: "32px", height: "32px", background: "none", border: "none", cursor: "pointer", fontSize: "16px", color: "#555", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                      </div>
                      {/* Price */}
                      <div style={{ textAlign: "right" }}>
                        <p style={{ margin: "0", textDecoration: "line-through", color: "#bbb", fontSize: "12px", fontFamily: "sans-serif" }}>{fmt(item.originalPrice)}</p>
                        <p style={{ margin: "0", fontWeight: "600", fontSize: "16px", fontFamily: "sans-serif", color: "#1a1a1a" }}>{fmt(item.price * item.qty)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Special Instructions */}
          <div style={{ marginTop: "16px", border: "1px solid #e8e4df", borderRadius: "12px", background: "#fff", overflow: "hidden" }}>
            <button
              onClick={() => setInstructions(!instructions)}
              style={{ width: "100%", padding: "16px 20px", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px", fontFamily: "sans-serif", color: "#555" }}
            >
              Add special instructions
              <span style={{ transform: instructions ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▾</span>
            </button>
            {instructions && (
              <textarea
                value={instructionText}
                onChange={(e) => setInstructionText(e.target.value)}
                placeholder="Add your note here..."
                style={{ width: "100%", padding: "12px 20px", border: "none", borderTop: "1px solid #e8e4df", resize: "none", fontSize: "13px", fontFamily: "sans-serif", minHeight: "80px", outline: "none", boxSizing: "border-box" }}
              />
            )}
          </div>

          {/* WhatsApp Help */}
          <div style={{ marginTop: "16px", background: "#fff8f0", border: "1px solid #f0e6d3", borderRadius: "12px", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "13px", color: "#b87333", fontFamily: "sans-serif" }}>Need help choosing the right length or texture?</span>
            <a href="https://wa.me/41765395386" target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: "6px", color: "#25d366", textDecoration: "none", fontSize: "13px", fontFamily: "sans-serif", fontWeight: "600" }}>
              💬 Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div>
          <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e8e4df", padding: "28px", position: "sticky", top: "24px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "500", marginBottom: "24px", color: "#1a1a1a" }}>Order Summary</h2>

            {/* Promo Code */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
              <input
                type="text"
                placeholder="Promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                style={{ flex: 1, border: "1px solid #ddd", borderRadius: "8px", padding: "10px 14px", fontSize: "13px", fontFamily: "sans-serif", outline: "none" }}
              />
              <button style={{ background: "#1a1a1a", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 18px", fontSize: "13px", fontFamily: "sans-serif", cursor: "pointer", fontWeight: "500" }}>Apply</button>
            </div>

            {/* Totals */}
            <div style={{ borderTop: "1px solid #f0ece8", paddingTop: "16px", marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontSize: "14px", fontFamily: "sans-serif" }}>
                <span style={{ color: "#666" }}>Subtotal</span>
                <span style={{ fontWeight: "500" }}>{fmt(subtotal)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontSize: "14px", fontFamily: "sans-serif" }}>
                <span style={{ color: "#666" }}>Shipping</span>
                <span style={{ color: "#3b6d11", fontWeight: "500" }}>{subtotal >= 5000 ? "Free" : fmt(250)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "12px", borderTop: "1px solid #f0ece8", fontSize: "16px", fontFamily: "sans-serif", fontWeight: "600" }}>
                <span>Total</span>
                <span>{fmt(subtotal >= 5000 ? subtotal : subtotal + 250)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button style={{ width: "100%", background: "#1a1a1a", color: "#fff", border: "none", borderRadius: "10px", padding: "16px", fontSize: "15px", fontFamily: "sans-serif", fontWeight: "600", cursor: "pointer", marginBottom: "14px", letterSpacing: "0.3px" }}>
              🔒 Checkout · {fmt(subtotal >= 5000 ? subtotal : subtotal + 250)}
            </button>

            {/* Payment Icons */}
            <div style={{ display: "flex", gap: "6px", justifyContent: "center", flexWrap: "wrap", marginBottom: "16px" }}>
              {["VISA", "MC", "Apple Pay", "Klarna", "PayPal", "G Pay"].map((p) => (
                <span key={p} style={{ border: "1px solid #e0dbd5", borderRadius: "4px", padding: "4px 8px", fontSize: "10px", fontFamily: "sans-serif", color: "#555", background: "#fafafa" }}>{p}</span>
              ))}
            </div>

            {/* Shop Pay */}
            <button style={{ width: "100%", background: "#5a31f4", color: "#fff", border: "none", borderRadius: "10px", padding: "14px", fontSize: "14px", fontFamily: "sans-serif", fontWeight: "700", cursor: "pointer", marginBottom: "10px", letterSpacing: "1px" }}>
              shop
            </button>

            {/* PayPal */}
            <button style={{ width: "100%", background: "#ffc439", color: "#003087", border: "none", borderRadius: "10px", padding: "14px", fontSize: "15px", fontFamily: "sans-serif", fontWeight: "700", cursor: "pointer", marginBottom: "16px" }}>
              PayPal
            </button>

            {/* Trust Badges */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", borderTop: "1px solid #f0ece8", paddingTop: "16px" }}>
              {[["🔒", "Secure Checkout"], ["🇨🇭", "Swiss Company"], ["📋", "Pay by Invoice & Klarna"], ["✨", "Premium Quality Hair"]].map(([icon, label]) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", fontFamily: "sans-serif", color: "#666" }}>
                  <span style={{ fontSize: "14px" }}>{icon}</span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}