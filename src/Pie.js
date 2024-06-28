import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = {
  "A": { "Europe": 21, "North_America": 31, "Asia": 7 },
  "B": { "Europe": 1, "North_America": 3, "South_America": 1, "Asia": 1 },
  "C": { "Europe": 4, "North_America": 5, "South_America": 1, "Asia": 2 },
  "D": { "Africa": 44, "Europe": 51, "Asia": 46, "South_America": 12, "North_America": 62, "Australia": 5 },
  "E": { "Africa": 57, "Australia": 14, "Europe": 77, "South_America": 26, "North_America": 105, "Asia": 76 },
  "F": { "Africa": 35, "Australia": 17, "Asia": 178, "North_America": 107, "South_America": 78, "Europe": 86 },
  "G": { "North_America": 3, "Europe": 2, "Asia": 1 },
  "H": { "North_America": 4, "Asia": 3, "Europe": 2, "Africa": 1, "South_America": 1, "Australia": 1 },
  "I": { "Europe": 35, "Asia": 25, "North_America": 16, "South_America": 10, "Africa": 4, "Australia": 3 },
  "J": { "Europe": 54, "North_America": 46, "Asia": 28, "Australia": 5, "South_America": 9, "Africa": 8 },
  "K": { "Asia": 45, "Europe": 55, "North_America": 20, "Australia": 2, "South_America": 6, "Africa": 2 },
  "L": { "Africa": 31, "Australia": 28, "Asia": 79, "North_America": 41, "Europe": 64, "South_America": 32 },
  "M": { "Asia": 18, "Australia": 2, "Europe": 2, "North_America": 2, "South_America": 1 }
};

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
        {chartData[index].name} ({`${(percent * 100).toFixed(0)}%`})
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
const App = ({ data }) => {
  const [selectedKey, setSelectedKey] = useState('');

  const handleSelectChange = (event) => {
    setSelectedKey(event.target.value);
  };

  return (
    <div>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <label htmlFor="chart-select">Select Root: </label>
        <select id="chart-select" value={selectedKey} onChange={handleSelectChange}>
          <option value="">All</option>
          {Object.keys(data).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '50%', padding: '10px', cursor: 'pointer' }}>
          <h3 style={{ textAlign: 'center' }}>{selectedKey ? `Roots ${selectedKey}` : 'All Roots'}</h3>
          <PieChartComponent dataKey={selectedKey} data={data} />
        </div>
        </div>
    </div>
  );
};

export default App;
