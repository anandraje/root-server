import React from 'react';

const IndiaTable = ({ data }) => {
  // Filter markers for India
  const indiaMarkers = data.filter(marker => marker.country === 'IN');

  // Create a mapping of unique cities and aggregate their instances
  const cityMap = indiaMarkers.reduce((acc, marker) => {
    if (acc[marker.name]) {
      acc[marker.name].instances += marker.Instances;
      acc[marker.name].sites += 1; // Assuming each marker represents a site
    } else {
      acc[marker.name] = {
        name: marker.name,
        instances: marker.Instances,
        sites: 1 // Assuming each marker represents a site
      };
    }
    return acc;
  }, {});

  // Convert the city map to an array
  const uniqueCities = Object.values(cityMap);

  return (
    <div>
      <h3 className="text-center">Cities in India</h3>
      <table className="beautiful-table">
        <thead>
          <tr className="text-center">
            <th className="bg-slate-100">City</th>
            <th className="bg-slate-100">Sites</th>
            <th className="bg-slate-100">Instances</th>
          </tr>
        </thead>
        <tbody>
          {uniqueCities.map((city, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-slate-200' : 'bg-slate-100'}>
              <td className="w-[50vw] text-center">{city.name}</td>
              <td className="w-[50vw] text-center">{city.sites}</td>
              <td className="w-[50vw] text-center">{city.instances}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IndiaTable;
