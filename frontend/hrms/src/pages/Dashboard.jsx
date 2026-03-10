import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import API from "../api"; // <--- correct path

export default function Dashboard() {
  const location = useLocation();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("employees/")
      .then((res) => setEmployees(res.data))
      .catch(() => setError("Failed to fetch employees"))
      .finally(() => setLoading(false));
  }, []);

  const deptCount = employees.reduce((acc, emp) => {
    acc[emp.department] = (acc[emp.department] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <nav style={styles.nav}>
        <h2 style={styles.logo}>HRMS</h2>
        <div>
          <Link
            to="/"
            style={{
              ...styles.link,
              ...(location.pathname === "/" ? styles.active : {}),
            }}
          >
            Dashboard
          </Link>
          <Link
            to="/employees"
            style={{
              ...styles.link,
              ...(location.pathname === "/employees" ? styles.active : {}),
            }}
          >
            Employees
          </Link>
          <Link
            to="/attendance"
            style={{
              ...styles.link,
              ...(location.pathname === "/attendance" ? styles.active : {}),
            }}
          >
            Attendance
          </Link>
        </div>
      </nav>

      <h1>Dashboard</h1>

      {error && <div style={{ color: "red" }}>{error}</div>}

      <div style={{ display: "flex", gap: "20px" }}>
        <div style={styles.card}>
          <h3>Total Employees</h3>
          <p>{employees.length}</p>
        </div>
        <div style={styles.card}>
          <h3>Departments</h3>
          {Object.keys(deptCount).length === 0 ? (
            <p>No data</p>
          ) : (
            <ul>
              {Object.entries(deptCount).map(([dep, count]) => (
                <li key={dep}>
                  {dep}: {count}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 40px",
    background: "#1f2937",
    color: "white",
  },
  logo: { margin: 0 },
  link: { marginLeft: "20px", color: "#d1d5db", textDecoration: "none" },
  active: { color: "#fff", borderBottom: "2px solid #3b82f6" },
  card: { background: "#fff", padding: "20px", borderRadius: "8px" },
};