import { useEffect, useState } from "react";

function AdminDashboard() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/quotes")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch quotes");
        }

        return response.json();
      })
      .then((data) => {
        setQuotes(data.quotes || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to load quotes");
        setLoading(false);
      });
  }, []);

  return (
    <div style={styles.container}>
      <h1>Filter Group Solar</h1>
      <h2>Admin Dashboard</h2>

      <div style={styles.card}>
        <h3>Total Quote Requests</h3>
        <p style={styles.count}>{quotes.length}</p>
      </div>

      {loading && <p>Loading quotes...</p>}

      {error && <p style={styles.error}>{error}</p>}

      {!loading && !error && (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Phone</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>City</th>
                <th style={styles.th}>System Size</th>
                <th style={styles.th}>Message</th>
                <th style={styles.th}>Date</th>
              </tr>
            </thead>

            <tbody>
              {quotes.length === 0 ? (
                <tr>
                  <td colSpan="7" style={styles.empty}>
                    No quote requests found.
                  </td>
                </tr>
              ) : (
                quotes.map((quote) => (
                  <tr key={quote.id}>
                    <td style={styles.td}>{quote.name}</td>
                    <td style={styles.td}>{quote.phone}</td>
                    <td style={styles.td}>{quote.email || "-"}</td>
                    <td style={styles.td}>{quote.city}</td>
                    <td style={styles.td}>
                      {quote.system_size || "-"}
                    </td>
                    <td style={styles.td}>{quote.message || "-"}</td>
                    <td style={styles.td}>
                      {new Date(quote.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    fontFamily: "Arial, sans-serif",
    background: "#f5f7fa",
    minHeight: "100vh",
  },

  card: {
    background: "white",
    padding: "20px",
    margin: "20px 0",
    borderRadius: "10px",
    width: "250px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },

  count: {
    fontSize: "32px",
    fontWeight: "bold",
  },

  tableContainer: {
    overflowX: "auto",
    background: "white",
    borderRadius: "10px",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    padding: "12px",
    textAlign: "left",
    background: "#eeeeee",
    borderBottom: "1px solid #ddd",
  },

  td: {
    padding: "12px",
    borderBottom: "1px solid #eee",
  },

  empty: {
    padding: "30px",
    textAlign: "center",
  },

  error: {
    color: "red",
  },
};

export default AdminDashboard;