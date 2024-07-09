// PieChartComponent.jsx

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#F759F7', '#39F7F4', '#F73641'];

const getTotalData = (data, checkedLabels = []) => {
  const totalData = {};
  Object.keys(data).forEach((key) => {
    if (checkedLabels.length === 0 || checkedLabels.includes(key)) {
      Object.keys(data[key]).forEach((category) => {
        if (totalData[category]) {
          totalData[category] += data[key][category];
        } else {
          totalData[category] = data[key][category];
        }
      });
    }
  });
  return totalData;
};

const PieChartComponent = ({ dataKey, data, checkedLabels }) => {
  const totalData = React.useMemo(() => getTotalData(data, checkedLabels), [data, checkedLabels]);
  const chartData = dataKey
    ? Object.keys(data[dataKey]).map((category) => ({
        name: category,
        value: data[dataKey][category],
      }))
    : Object.keys(totalData).map((category) => ({
        name: category,
        value: totalData[category],
      }));

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = outerRadius + 10;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={12}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          data={chartData}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;
