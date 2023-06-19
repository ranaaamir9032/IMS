import React from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

export default function MyChart(props) {
  const superAdminData = props.data?.map(({ month, count }) => ({
    month: new Date(2022, month).toLocaleString("default", { month: "short" }),
    count,
  }));

const AdminData = props.adminData?.map(({ month, count, assigned, unassigned }) => ({
      month: new Date(2022, month).toLocaleString("default", { month: "short" }),
      count,
      assigned,
      unassigned
    })) || [];

    const ComplaintData = props.complaintData?.map(({ month, count, pending, resolved }) => ({
      month: new Date(2022, month).toLocaleString("default", { month: "short" }),
      count,
      pending,
      resolved
    })) || [];


  return (
    <div>
      {props.superAdmin && (
        <ResponsiveContainer width="100%" height={500}>
          <BarChart data={superAdminData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip wrapperStyle={{ width: 100, backgroundColor: "#ccc" }} />
            <Bar dataKey="count" fill="#4583F5 " barSize={60} />
          </BarChart>
        </ResponsiveContainer>
      )}

      {props.admin && props.adminData && (
        <ResponsiveContainer width="100%" height={500}>
          <BarChart data={AdminData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Legend />
            <Tooltip wrapperStyle={{ width: 100, backgroundColor: "#ccc" }} />
            <Bar dataKey="assigned" fill="#4583F5 " barSize={60} />
            <Bar dataKey="unassigned"  fill="seagreen" barSize={60} />
          </BarChart>
        </ResponsiveContainer>
      )}
      {props.admin && props.complaintData && (
        <ResponsiveContainer width="100%" height={500}>
          <BarChart data={ComplaintData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Legend />
            <Tooltip wrapperStyle={{ width: 100, backgroundColor: "#ccc" }} />
            <Bar dataKey='pending' fill="#4583F5 " barSize={60} />
            <Bar dataKey="resolved" fill="seagreen" barSize={60} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
