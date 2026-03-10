// import { useEffect, useState } from "react";
// import API from "./api";

// export default function Dashboard() {
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const fetchEmployees = async () => {
//     try {
//       const res = await API.get("employees/");
//       setEmployees(res.data);
//       setError("");
//     } catch {
//       setError("Failed to fetch employees");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   return (
//     <div>
//       <h1>Dashboard</h1>

//       {error && <div style={{ color: "red", marginBottom: "15px" }}>{error}</div>}

//       <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
//         <div style={styles.card}>
//           <h3>Total Employees</h3>
//           <p style={{ fontSize: "24px", fontWeight: "bold" }}>{employees.length}</p>
//         </div>
//         {/* Agar Attendance data hai to wahan bhi card bana sakte ho */}
//       </div>

//       <h2>Employee List</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : employees.length === 0 ? (
//         <p>No employees found.</p>
//       ) : (
//         <table style={styles.table}>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Department</th>
//             </tr>
//           </thead>
//           <tbody>
//             {employees.map((emp) => (
//               <tr key={emp.id}>
//                 <td>{emp.employee_id}</td>
//                 <td>{emp.full_name}</td>
//                 <td>{emp.email}</td>
//                 <td>{emp.department}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// const styles = {
//   card: {
//     background: "#ffffff",
//     padding: "20px",
//     borderRadius: "8px",
//     boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
//     flex: 1,
//     textAlign: "center",
//   },
//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//     background: "#fff",
//   },
// };

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import API from "./api";

export default function Dashboard() {
  const location = useLocation();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch employees
  const fetchEmployees = async () => {
    try {
      const res = await API.get("employees/");
      setEmployees(res.data);
      setError("");
    } catch {
      setError("Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Department-wise count
  const deptCount = employees.reduce((acc, emp) => {
    acc[emp.department] = (acc[emp.department] || 0) + 1;
    return acc;
  }, {});

  return (
    <div style={styles.container}>
      {/* Navbar */}
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

      <h1 style={styles.pageTitle}>Dashboard</h1>

      {error && <div style={styles.error}>{error}</div>}

      {/* Stats Cards */}
      <div style={styles.cardsContainer}>
        <div style={styles.card}>
          <h3>Total Employees</h3>
          <p style={styles.stat}>{employees.length}</p>
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

      {/* Employee Table */}
      <h2>Employee List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.employee_id}</td>
                <td>{emp.full_name}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  container: { maxWidth: "900px", margin: "40px auto", fontFamily: "Arial, sans-serif" },
  pageTitle: { fontSize: "28px", marginBottom: "30px", color: "#1f2937", textAlign: "center" },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    background: "#1f2937",
    color: "white",
    borderRadius: "7px",
    marginBottom: "30px",
  },
  logo: { margin: 0 },
  link: { marginLeft: "20px", textDecoration: "none", color: "#d1d5db", fontWeight: "500" },
  active: { color: "white", borderBottom: "2px solid #3b82f6", paddingBottom: "3px" },
  cardsContainer: { display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap", marginBottom: "30px" },
  card: { background: "#ffffff", padding: "25px", borderRadius: "8px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)", minWidth: "200px", textAlign: "center" },
  stat: { fontSize: "24px", fontWeight: "bold", marginTop: "10px" },
  table: { width: "100%", borderCollapse: "collapse", background: "#fff" },
  error: { background: "#fee2e2", color: "#991b1b", padding: "10px", borderRadius: "6px", marginBottom: "15px" },
};