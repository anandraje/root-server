
import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';



// COLORS constant
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#F759F7', '#39F7F4', '#F73641'];

// Function to get total data aggregated
const getTotalData = (data) => {
  const totalData = {};
  Object.keys(data).forEach(key => {
    Object.keys(data[key]).forEach(category => {
      if (totalData[category]) {
        totalData[category] += data[key][category];
      } else {
        totalData[category] = data[key][category];
      }
    });
  });
  return totalData;
};

// PieChartComponent
const PieChartComponent = ({ dataKey, data }) => {
  const totalData = getTotalData(data);
  const chartData = dataKey
    ? Object.keys(data[dataKey]).map(category => ({
        name: category,
        value: data[dataKey][category]
      }))
    : Object.keys(totalData).map(category => ({
        name: category,
        value: totalData[category]
      }));

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
  }) => {
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
      >
        {`${(percent * 100).toFixed(0)}%`} 
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          labelLine={false}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
      </PieChart>
    </ResponsiveContainer>
  );
};

// App Component
const Pie_Asia = ({ data }) => {
  const [selectedKey, setSelectedKey] = useState('');

  const handleSelectChange = (event) => {
    setSelectedKey(event.target.value);
  };

  return (
    <div className="p-4">
      <div className="mb-4 text-center">
        <label htmlFor="chart-select">Select Root:</label>
        <select
          id="chart-select"
          value={selectedKey}
          onChange={handleSelectChange}
          className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">All</option>
          {Object.keys(data).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-center">
        <div className="w-full lg:w-1/2 p-4 cursor-pointer">
          <h3 className="text-center">
            {selectedKey ? `Roots ${selectedKey}` : 'All Roots'}
          </h3>
          <PieChartComponent dataKey={selectedKey} data={data} />
        </div>
      </div>
    </div>
  );
};

export default Pie_Asia;
