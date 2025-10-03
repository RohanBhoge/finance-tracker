import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const SavingsPieChart = ({ income, expenses }) => {
  const savings = income - expenses;
  const data = [
    { name: "Expenses", value: expenses },
    { name: "Savings", value: Math.max(0, savings) },
  ];
  const isNegative = savings < 0;

  return (
    <div>
      <h3 className="text-lg font-semibold text-center mb-2">
        Savings Breakdown
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            nameKey="name"
          >
            <Cell fill="#FF8042" />
            <Cell fill="#00C49F" />
          </Pie>
          <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
        </PieChart>
      </ResponsiveContainer>
      <div className="text-center mt-[-180px] mb-[100px]">
        <p
          className="text-3xl font-bold"
          style={{ color: isNegative ? "#FF8042" : "#00C49F" }}
        >
          {isNegative ? "Overspent" : "Saved"}
        </p>
        <p className="text-xl">{((savings / income) * 100 || 0).toFixed(1)}%</p>
      </div>
    </div>
  );
};

export default SavingsPieChart;
