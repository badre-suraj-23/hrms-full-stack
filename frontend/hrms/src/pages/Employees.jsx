import { useEffect, useState } from "react";
import API from "../api";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });

  const DEPARTMENT_CHOICES = [
    "IT",
    "Computer Science",
    "Data Science",
    "HR",
    "Python Developer",
    "Java Developer",
  ];

  const fetchEmployees = async () => {
    try {
      setLoading(true);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await API.put(`employees/${editingId}/`, form);
      } else {
        await API.post("employees/", form);
      }
      setForm({ employee_id: "", full_name: "", email: "", department: "" });
      setEditingId(null);
      fetchEmployees();
    } catch (err) {
      if (err.response?.data) {
        const data = err.response.data;
        const firstError =
          data.employee_id?.[0] ||
          data.email?.[0] ||
          data.full_name?.[0] ||
          data.department?.[0] ||
          "Operation failed";
        setError(firstError);
      } else {
        setError("Server error");
      }
    }
  };

  const handleEdit = (emp) => {
    setEditingId(emp.id);
    setForm({
      employee_id: emp.employee_id,
      full_name: emp.full_name,
      email: emp.email,
      department: emp.department,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await API.delete(`employees/${id}/`);
      fetchEmployees();
    } catch {
      setError("Error deleting employee");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>HRMS Lite - Employee Management</h1>

      <div style={styles.card}>
        <h2 style={styles.heading}>
          {editingId ? "Edit Employee" : "Add New Employee"}
        </h2>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            required
            placeholder="Employee ID"
            value={form.employee_id}
            onChange={(e) =>
              setForm({ ...form, employee_id: e.target.value })
            }
            style={styles.input}
          />
          <input
            required
            placeholder="Full Name"
            value={form.full_name}
            onChange={(e) =>
              setForm({ ...form, full_name: e.target.value })
            }
            style={styles.input}
          />
          <input
            required
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={styles.input}
          />
          <select
            required
            value={form.department}
            onChange={(e) =>
              setForm({ ...form, department: e.target.value })
            }
            style={styles.input}
          >
            <option value="">Select Department</option>
            {DEPARTMENT_CHOICES.map((dep) => (
              <option key={dep} value={dep}>
                {dep}
              </option>
            ))}
          </select>

          <div style={styles.buttonRow}>
            <button type="submit" style={styles.primaryBtn}>
              {editingId ? "Update Employee" : "Add Employee"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setForm({
                    employee_id: "",
                    full_name: "",
                    email: "",
                    department: "",
                  });
                }}
                style={styles.cancelBtn}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div style={styles.card}>
        <h2 style={styles.heading}>Employee List</h2>

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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, idx) => (
                <tr
                  key={emp.id}
                  style={{
                    backgroundColor: idx % 2 === 0 ? "#f9fafb" : "#ffffff",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#e0f2fe")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      idx % 2 === 0 ? "#f9fafb" : "#ffffff")
                  }
                >
                  <td>{emp.employee_id}</td>
                  <td>{emp.full_name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.department}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(emp)}
                      style={styles.editBtn}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(emp.id)}
                      style={styles.deleteBtn}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "40px auto",
    fontFamily: "Arial, sans-serif",
  },
  pageTitle: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#1f2937",
  },
  card: {
    background: "#ffffff",
    padding: "25px",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    marginBottom: "30px",
  },
  heading: {
    marginBottom: "20px",
    color: "#111827",
  },
  form: {
    display: "grid",
    gap: "12px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
  },
  buttonRow: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },
  primaryBtn: {
    padding: "10px 15px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  cancelBtn: {
    padding: "10px 15px",
    background: "#6b7280",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  editBtn: {
    padding: "6px 10px",
    background: "#f59e0b",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    marginRight: "5px",
    cursor: "pointer",
  },
  deleteBtn: {
    padding: "6px 10px",
    background: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
  error: {
    background: "#fee2e2",
    color: "#991b1b",
    padding: "10px",
    borderRadius: "6px",
    marginBottom: "15px",
  },
};