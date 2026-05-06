import React, { useEffect, useState } from "react";

const BASE = "https://vanessawambui.alwaysdata.net";

export default function MyActivity() {
  const [activeTab, setActiveTab] = useState("tickets");
  const [tickets, setTickets]     = useState([]);
  const [orders, setOrders]       = useState([]);
  const [loading, setLoading]     = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) { setLoading(false); return; }

    Promise.all([
      fetch(`${BASE}/api/my_tickets?user_id=${user.user_id}`).then(r => r.json()),
      fetch(`${BASE}/api/my_orders?user_id=${user.user_id}`).then(r => r.json()),
    ]).then(([t, o]) => {
      setTickets(t);
      setOrders(o);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const formatDate = (str) => {
    if (!str) return "—";
    return new Date(str).toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" });
  };

  const styles = {
    container:  { padding: "20px", maxWidth: "700px", margin: "0 auto", fontFamily: "sans-serif" },
    tabBar:     { display: "flex", gap: "8px", marginBottom: "24px" },
    tab:        (active) => ({
      flex: 1, padding: "10px", border: active ? "2px solid #1D9E75" : "1px solid #ddd",
      borderRadius: "8px", background: active ? "#E1F5EE" : "#f9f9f9",
      color: active ? "#0F6E56" : "#555", fontWeight: active ? "600" : "400",
      cursor: "pointer", fontSize: "14px",
    }),
    summary:    { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" },
    metric:     { background: "#f5f5f5", borderRadius: "8px", padding: "14px" },
    metricLabel: { fontSize: "12px", color: "#888", marginBottom: "4px" },
    metricValue: { fontSize: "22px", fontWeight: "600", color: "#222" },
    card:       { border: "1px solid #eee", borderRadius: "12px", padding: "16px 20px", marginBottom: "12px", background: "#fff" },
    cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" },
    cardTitle:  { fontSize: "15px", fontWeight: "600", margin: 0, color: "#222" },
    badgeTicket:{ fontSize: "11px", padding: "3px 10px", borderRadius: "6px", background: "#E1F5EE", color: "#0F6E56" },
    badgeOrder: { fontSize: "11px", padding: "3px 10px", borderRadius: "6px", background: "#E6F1FB", color: "#185FA5" },
    row:        { display: "flex", justifyContent: "space-between", fontSize: "13px", padding: "6px 0", borderBottom: "1px solid #f0f0f0" },
    rowLabel:   { color: "#888" },
    rowValue:   { fontWeight: "500", color: "#222" },
    empty:      { textAlign: "center", padding: "40px", color: "#aaa", fontSize: "14px" },
  };

  if (!user) return <div style={styles.empty}>Please log in to view your tickets and orders.</div>;
  if (loading) return <div style={styles.empty}>Loading...</div>;

  const ticketTotal = tickets.reduce((s, t) => s + Number(t.amount_paid || 0), 0);
  const ticketQty   = tickets.reduce((s, t) => s + Number(t.quantity || 1), 0);
  const orderTotal  = orders.reduce((s, o) => s + Number(o.item_cost || 0) * Number(o.quantity || 1), 0);
  const orderQty    = orders.reduce((s, o) => s + Number(o.quantity || 1), 0);

  return (
    <div style={styles.container}>

      {/* ── Tab Bar ── */}
      <div style={styles.tabBar}>
        <button style={styles.tab(activeTab === "tickets")} onClick={() => setActiveTab("tickets")}>
          🎫 My Tickets
        </button>
        <button style={styles.tab(activeTab === "orders")} onClick={() => setActiveTab("orders")}>
          🛍️ My Orders
        </button>
      </div>

      {/* ── TICKETS ── */}
      {activeTab === "tickets" && (
        <>
          <div style={styles.summary}>
            <div style={styles.metric}>
              <div style={styles.metricLabel}>Total tickets</div>
              <div style={styles.metricValue}>{ticketQty}</div>
            </div>
            <div style={styles.metric}>
              <div style={styles.metricLabel}>Total spent</div>
              <div style={styles.metricValue}>KES {ticketTotal.toLocaleString()}</div>
            </div>
          </div>

          {tickets.length === 0 ? (
            <div style={styles.empty}>You have no tickets yet.</div>
          ) : (
            tickets.map((t) => (
              <div key={t.ticket_id} style={styles.card}>
                <div style={styles.cardHeader}>
                  <p style={styles.cardTitle}>{t.product_name}</p>
                  <span style={styles.badgeTicket}>Confirmed</span>
                </div>
        
                <div style={styles.row}><span style={styles.rowLabel}>🔢 Quantity</span><span style={styles.rowValue}>{t.quantity} ticket(s)</span></div>
                <div style={styles.row}><span style={styles.rowLabel}>💰 Amount paid</span><span style={styles.rowValue}>KES {Number(t.amount_paid).toLocaleString()}</span></div>
                <div style={styles.row}><span style={styles.rowLabel}>📱 Phone</span><span style={styles.rowValue}>{t.phone}</span></div>
                <div style={{ ...styles.row, borderBottom: "none" }}><span style={styles.rowLabel}>🕐 Booked on</span><span style={styles.rowValue}>{formatDate(t.created_at)}</span></div>
              </div>
            ))
          )}
        </>
      )}

      {/* ── ORDERS ── */}
      {activeTab === "orders" && (
        <>
          <div style={styles.summary}>
            <div style={styles.metric}>
              <div style={styles.metricLabel}>Total orders</div>
              <div style={styles.metricValue}>{orderQty}</div>
            </div>
            <div style={styles.metric}>
              <div style={styles.metricLabel}>Total spent</div>
              <div style={styles.metricValue}>KES {orderTotal.toLocaleString()}</div>
            </div>
          </div>

          {orders.length === 0 ? (
            <div style={styles.empty}>You have no orders yet.</div>
          ) : (
            orders.map((o) => (
              <div key={o.order_id} style={styles.card}>
                <div style={styles.cardHeader}>
                  <p style={styles.cardTitle}>{o.item_name}</p>
                  <span style={styles.badgeOrder}>Ordered</span>
                </div>
                <div style={styles.row}><span style={styles.rowLabel}>🔢 Quantity</span><span style={styles.rowValue}>{o.quantity} item(s)</span></div>
                <div style={styles.row}><span style={styles.rowLabel}>💰 Item cost</span><span style={styles.rowValue}>KES {Number(o.item_cost).toLocaleString()}</span></div>
                <div style={styles.row}><span style={styles.rowLabel}>🧾 Total</span><span style={styles.rowValue}>KES {(Number(o.item_cost) * Number(o.quantity)).toLocaleString()}</span></div>
                <div style={styles.row}><span style={styles.rowLabel}>📱 Phone</span><span style={styles.rowValue}>{o.phone}</span></div>
                <div style={{ ...styles.row, borderBottom: "none" }}><span style={styles.rowLabel}>🕐 Ordered on</span><span style={styles.rowValue}>{formatDate(o.created_at)}</span></div>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
}