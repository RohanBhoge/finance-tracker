import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { CATEGORY_COLORS } from "../../utils/color.js";
const SpendingPieChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
        >
          {data.map((entry) => (
            <Cell
              key={`cell-${entry.name}`}
              fill={CATEGORY_COLORS[entry.name] || CATEGORY_COLORS["Other"]}
            />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default SpendingPieChart;
