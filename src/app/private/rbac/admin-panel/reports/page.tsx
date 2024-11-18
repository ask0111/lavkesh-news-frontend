"use client";
import React, { useState } from "react";
import { FiChevronDown, FiChevronUp, FiDownload, FiSearch } from "react-icons/fi";
import { CSVLink } from "react-csv"; // CSV export functionality
import ControlPage from "../admin-control/page";

// Define the types for report data
interface Report {
  id: number;
  name: string;
  role: string;
  clicks: number;
  status: "Active" | "Inactive" | "Blocked";
  date: string;
}

const AdminReportPage: React.FC = () => {
  // Sample report data
  const [reports, setReports] = useState<Report[]>([
    { id: 1, name: "John Doe", role: "Player", clicks: 150, status: "Active", date: "2024-11-01" },
    { id: 2, name: "Jane Smith", role: "Admin", clicks: 200, status: "Inactive", date: "2024-11-03" },
    { id: 3, name: "Alice Johnson", role: "Player", clicks: 120, status: "Active", date: "2024-11-04" },
    { id: 4, name: "Bob Brown", role: "Player", clicks: 170, status: "Blocked", date: "2024-11-05" },
  ]);

  const [search, setSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  // Filtered reports
  const filteredReports = reports.filter((report) => {
    const matchesSearch = report.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || report.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // CSV headers
  const csvHeaders = [
    { label: "ID", key: "id" },
    { label: "Name", key: "name" },
    { label: "Role", key: "role" },
    { label: "Clicks", key: "clicks" },
    { label: "Status", key: "status" },
    { label: "Date", key: "date" },
  ];

  const [expandedRows, setExpandedRows] = useState<number[]>([]); // Track expanded rows by user ID

  // Toggle row expansion
  const toggleRow = (id: number) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Admin Report Page</h1>

      {/* Search and Filter */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center bg-white rounded shadow p-2">
          <FiSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="outline-none text-sm text-gray-700"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-white p-2 rounded shadow text-sm text-gray-700 mr-4"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Blocked">Blocked</option>
        </select>
        <CSVLink
          data={filteredReports}
          headers={csvHeaders}
          filename="admin-reports.csv"
          className="flex items-center bg-purple-600 text-white px-4 py-2 rounded shadow text-sm"
        >
          <FiDownload className="mr-2" />
          Export CSV
        </CSVLink>
      </div>

      {/* Reports Table */}
      <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Admin Report Page</h1>

      {/* Table */}
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="table-auto w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200 text-sm">
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Role</th>
              <th className="p-3">Clicks</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <React.Fragment key={report.id}>
                {/* Main Row */}
                <tr className="text-sm border-b">
                  <td className="p-3">{report.id}</td>
                  <td className="p-3">{report.name}</td>
                  <td className="p-3">{report.role}</td>
                  <td className="p-3">{report.clicks}</td>
                  <td className={`p-3 ${getStatusStyle(report.status)}`}>
                    {report.status}
                  </td>
                  <td className="p-3">{report.date}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => toggleRow(report.id)}
                      className="text-blue-600 flex items-center justify-center"
                    >
                      {expandedRows.includes(report.id) ? (
                        <FiChevronUp className="text-lg" />
                      ) : (
                        <FiChevronDown className="text-lg" />
                      )}
                    </button>
                  </td>
                </tr>

                {/* Expandable Row */}
                {expandedRows.includes(report.id) && (
                  <tr>
                    <td colSpan={7} className="p-4 bg-gray-100">
                      <h4 className="font-bold mb-2">Permissions</h4>
                      <ul className="list-disc pl-6">
                        <ControlPage />
                        {/* {report.permissions?.map((permission, index) => (
                          <li key={index} className="text-gray-700 text-sm">
                            {permission}
                          </li>
                        ))} */}
                      </ul>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        {reports.length === 0 && (
          <p className="p-3 text-center text-gray-500">No reports found.</p>
        )}
      </div>
    </div>
    </div>
  );
};

// Helper function for status styles
const getStatusStyle = (status: "Active" | "Inactive" | "Blocked"): string => {
  switch (status) {
    case "Active":
      return "text-green-600";
    case "Inactive":
      return "text-gray-600";
    case "Blocked":
      return "text-red-600";
    default:
      return "";
  }
};

export default AdminReportPage;
