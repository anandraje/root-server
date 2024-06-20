
import React, { useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';

import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import axios from 'axios';
import { useEffect } from 'react';
import Legend from './Legend';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from "react-dropdown-select";
const jsonFiles = ['A', 'B','C','D','E','F','G','H','I','J','K','L','M'];
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const colorMapping = {
  A: "#FF0000",    // Red
  B: "#0000FF",    // Blue
  C: "#013220",    // Green
  D: "#FFA500",    // Orange
  E: "#800080",    // Purple
  F: "#FFD000",    // Yellow
  G: "#CC0066",    // Pink
  H: "#00FFFF",    // Cyan
  I: "#A52A2A",    // Brown
  J: "#00FF00",    // Lime
  K: "#EE82EE",    // Violet
  L: "#808080",    // Gray
  M: "#000000"     // Black
};

const createCustomIcon = (color, instanceName) => {
  const svgIcon = `
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64" xml:space="preserve">
    <style type="text/css">
      .st0{fill:${color};}
      .st1{fill:#FFFFFF; font-size:25px; font-family:Arial, sans-serif;}
    </style>
    <path class="st0" d="M32,1C15.4,1,2,14.4,2,31s30,62,30,62s30-36.4,30-62S48.6,1,32,1z"/>
    <text x="32" y="40" text-anchor="middle" class="st1">${instanceName}</text>
    </svg>`;

  return new L.Icon({
    iconUrl: "data:image/svg+xml;base64," + btoa(svgIcon),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: markerShadow,
    shadowSize: [41, 41],
    shadowAnchor: [12, 41]
  });
};

const App = () => {
  
  const [selectedContinent, setSelectedContinent] = useState('All');
  const mapRef = useRef(null);

  const [selectedCountry, setSelectedCountry] = useState('');
  const [checkedLabels, setCheckedLabels] = useState([]);

  const [combinedData, setCombinedData] = useState([]);
  const [values, setvalues] = useState([]);


  const continentToCountries = {
    Asia: [
      { code: 'AE', name: 'United Arab Emirates' },
      { code: 'AF', name: 'Afghanistan' },
      { code: 'AM', name: 'Armenia' },
      { code: 'AZ', name: 'Azerbaijan' },
      { code: 'BD', name: 'Bangladesh' },
      { code: 'BH', name: 'Bahrain' },
      { code: 'BN', name: 'Brunei' },
      { code: 'BT', name: 'Bhutan' },
      { code: 'CN', name: 'China' },
      { code: 'GE', name: 'Georgia' },
      { code: 'HK', name: 'Hong Kong' },
      { code: 'ID', name: 'Indonesia' },
      { code: 'IL', name: 'Israel' },
      { code: 'IN', name: 'India' },
      { code: 'IQ', name: 'Iraq' },
      { code: 'IR', name: 'Iran' },
      { code: 'JO', name: 'Jordan' },
      { code: 'JP', name: 'Japan' },
      { code: 'KG', name: 'Kyrgyzstan' },
      { code: 'KH', name: 'Cambodia' },
      { code: 'KW', name: 'Kuwait' },
      { code: 'KZ', name: 'Kazakhstan' },
      { code: 'LA', name: 'Laos' },
      { code: 'LB', name: 'Lebanon' },
      { code: 'LK', name: 'Sri Lanka' },
      { code: 'MM', name: 'Myanmar' },
      { code: 'MN', name: 'Mongolia' },
      { code: 'MO', name: 'Macao' },
      { code: 'MV', name: 'Maldives' },
      { code: 'MY', name: 'Malaysia' },
      { code: 'NP', name: 'Nepal' },
      { code: 'OM', name: 'Oman' },
      { code: 'PH', name: 'Philippines' },
      { code: 'PK', name: 'Pakistan' },
      { code: 'QA', name: 'Qatar' },
      { code: 'SA', name: 'Saudi Arabia' },
      { code: 'SG', name: 'Singapore' },
      { code: 'SY', name: 'Syria' },
      { code: 'TH', name: 'Thailand' },
      { code: 'TJ', name: 'Tajikistan' },
      { code: 'TM', name: 'Turkmenistan' },
      { code: 'TR', name: 'Turkey' },
      { code: 'TW', name: 'Taiwan' },
      { code: 'UZ', name: 'Uzbekistan' },
      { code: 'VN', name: 'Vietnam' },
      { code: 'YE', name: 'Yemen' },
    ],
    Europe: [
      { code: 'AL', name: 'Albania' },
      { code: 'AT', name: 'Austria' },
      { code: 'BA', name: 'Bosnia and Herzegovina' },
      { code: 'BE', name: 'Belgium' },
      { code: 'BG', name: 'Bulgaria' },
      { code: 'BY', name: 'Belarus' },
      { code: 'CH', name: 'Switzerland' },
      { code: 'CY', name: 'Cyprus' },
      { code: 'CZ', name: 'Czech Republic' },
      { code: 'DE', name: 'Germany' },
      { code: 'DK', name: 'Denmark' },
      { code: 'EE', name: 'Estonia' },
      { code: 'ES', name: 'Spain' },
      { code: 'FI', name: 'Finland' },
      { code: 'FO', name: 'Faroe Islands' },
      { code: 'FR', name: 'France' },
      { code: 'GB', name: 'United Kingdom' },
      { code: 'GR', name: 'Greece' },
      { code: 'HR', name: 'Croatia' },
      { code: 'HU', name: 'Hungary' },
      { code: 'IE', name: 'Ireland' },
      { code: 'IS', name: 'Iceland' },
      { code: 'IT', name: 'Italy' },
      { code: 'LT', name: 'Lithuania' },
      { code: 'LU', name: 'Luxembourg' },
      { code: 'LV', name: 'Latvia' },
      { code: 'MD', name: 'Moldova' },
      { code: 'ME', name: 'Montenegro' },
      { code: 'MK', name: 'North Macedonia' },
      { code: 'NL', name: 'Netherlands' },
      { code: 'NO', name: 'Norway' },
      { code: 'PL', name: 'Poland' },
      { code: 'PT', name: 'Portugal' },
      { code: 'RO', name: 'Romania' },
      { code: 'RS', name: 'Serbia' },
      { code: 'RU', name: 'Russia' },
      { code: 'SE', name: 'Sweden' },
      { code: 'SI', name: 'Slovenia' },
      { code: 'SK', name: 'Slovakia' },
      { code: 'UA', name: 'Ukraine' },
    ],
    Africa: [
      { code: 'AO', name: 'Angola' },
      { code: 'BF', name: 'Burkina Faso' },
      { code: 'BI', name: 'Burundi' },
      { code: 'BJ', name: 'Benin' },
      { code: 'BW', name: 'Botswana' },
      { code: 'CD', name: 'Democratic Republic of the Congo' },
      { code: 'CG', name: 'Republic of the Congo' },
      { code: 'CI', name: 'Ivory Coast' },
      { code: 'CM', name: 'Cameroon' },
      { code: 'DJ', name: 'Djibouti' },
      { code: 'DZ', name: 'Algeria' },
      { code: 'EG', name: 'Egypt' },
      { code: 'ET', name: 'Ethiopia' },
      { code: 'GA', name: 'Gabon' },
      { code: 'GH', name: 'Ghana' },
      { code: 'GM', name: 'Gambia' },
      { code: 'GN', name: 'Guinea' },
      { code: 'KE', name: 'Kenya' },
      { code: 'LS', name: 'Lesotho' },
      { code: 'LR', name: 'Liberia' },
      { code: 'LY', name: 'Libya' },
      { code: 'MG', name: 'Madagascar' },
      { code: 'ML', name: 'Mali' },
      { code: 'MR', name: 'Mauritania' },
      { code: 'MU', name: 'Mauritius' },
      { code: 'MW', name: 'Malawi' },
      { code: 'MZ', name: 'Mozambique' },
      { code: 'NA', name: 'Namibia' },
      { code: 'NE', name: 'Niger' },
      { code: 'NG', name: 'Nigeria' },
      { code: 'RW', name: 'Rwanda' },
      { code: 'SC', name: 'Seychelles' },
      { code: 'SD', name: 'Sudan' },
      { code: 'SL', name: 'Sierra Leone' },
      { code: 'SN', name: 'Senegal' },
      { code: 'SO', name: 'Somalia' },
      { code: 'SS', name: 'South Sudan' },
      { code: 'SZ', name: 'Eswatini' },
      { code: 'TD', name: 'Chad' },
      { code: 'TG', name: 'Togo' },
      { code: 'TN', name: 'Tunisia' },
      { code: 'TZ', name: 'Tanzania' },
      { code: 'UG', name: 'Uganda' },
      { code: 'ZA', name: 'South Africa' },
      { code: 'ZM', name: 'Zambia' },
      { code: 'ZW', name: 'Zimbabwe' },
    ],
    North_America : [
      { code: 'CA', name: 'Canada' },
      { code: 'US', name: 'United States' },
      { code: 'MX', name: 'Mexico' },
      { code: 'CR', name: 'Costa Rica' },
      { code: 'PA', name: 'Panama' },
      { code: 'CU', name: 'Cuba' },
      { code: 'DO', name: 'Dominican Republic' },
      { code: 'GT', name: 'Guatemala' },
      { code: 'HT', name: 'Haiti' },
      { code: 'HN', name: 'Honduras' },
      { code: 'NI', name: 'Nicaragua' },
      { code: 'BS', name: 'Bahamas' },
      { code: 'BZ', name: 'Belize' },
      { code: 'JM', name: 'Jamaica' },
      { code: 'TT', name: 'Trinidad and Tobago' },
      { code: 'BB', name: 'Barbados' },
      { code: 'AG', name: 'Antigua and Barbuda' },
      { code: 'DM', name: 'Dominica' },
      { code: 'GD', name: 'Grenada' },
      { code: 'KN', name: 'Saint Kitts and Nevis' },
      { code: 'LC', name: 'Saint Lucia' },
      { code: 'VC', name: 'Saint Vincent and the Grenadines' },
      { code: 'BS', name: 'The Bahamas' },
      { code: 'CW', name: 'Curaçao' },
      { code: 'SX', name: 'Sint Maarten' },
      { code: 'AW', name: 'Aruba' },
      { code: 'AI', name: 'Anguilla' },
      { code: 'BM', name: 'Bermuda' },
      { code: 'KY', name: 'Cayman Islands' },
      { code: 'VG', name: 'British Virgin Islands' },
      { code: 'TC', name: 'Turks and Caicos Islands' },
      { code: 'GL', name: 'Greenland' },
      { code: 'MQ', name: 'Martinique' },
      { code: 'GP', name: 'Guadeloupe' },
      { code: 'BL', name: 'Saint Barthélemy' },
      { code: 'MF', name: 'Saint Martin' },
      { code: 'PM', name: 'Saint Pierre and Miquelon' },
      { code: 'MS', name: 'Montserrat' }
    ],
   South_America:[
      { code: 'AR', name: 'Argentina' },
      { code: 'BR', name: 'Brazil' },
      { code: 'CL', name: 'Chile' },
      { code: 'CO', name: 'Colombia' },
      { code: 'EC', name: 'Ecuador' },
      { code: 'VE', name: 'Venezuela' },
      { code: 'BO', name: 'Bolivia' },
      { code: 'PE', name: 'Peru' },
      { code: 'PY', name: 'Paraguay' },
      { code: 'UY', name: 'Uruguay' },
      { code: 'GY', name: 'Guyana' },
      { code: 'SR', name: 'Suriname' },
      { code: 'GF', name: 'French Guiana' }
    ],
   Australia: [
      { code: 'AU', name: 'Australia' },
      { code: 'NZ', name: 'New Zealand' },
      { code: 'FJ', name: 'Fiji' },
      { code: 'PG', name: 'Papua New Guinea' },
      { code: 'SB', name: 'Solomon Islands' },
      { code: 'VU', name: 'Vanuatu' },
      { code: 'NC', name: 'New Caledonia' },
      { code: 'WF', name: 'Wallis and Futuna' },
      { code: 'FM', name: 'Federated States of Micronesia' },
      { code: 'MH', name: 'Marshall Islands' },
      { code: 'TO', name: 'Tonga' },
      { code: 'WS', name: 'Samoa' },
      { code: 'KI', name: 'Kiribati' },
      { code: 'TV', name: 'Tuvalu' },
      { code: 'NR', name: 'Nauru' },
      { code: 'PW', name: 'Palau' }
    ]};
    
    const findCountryNameByCode = (code) => {
      for (const region in continentToCountries) {
        const countries = continentToCountries[region];
        const country = countries.find(country => country.code === code);
        if (country) {
          return country.name;
        }
      }
      return null; // Return null if code is not found
    };
    


  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await Promise.all(
          jsonFiles.map(async (fileName) => {
            const response = await axios.get(`http://localhost:5001/api/${fileName}`); // Adjust URL as per your API endpoint
            return response.data;
          })
        );
        setCombinedData(fetchedData.flat()); // Assuming each JSON is an array of objects
     
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); 
  const markers = combinedData.flatMap((data, index) =>
  data.Sites.map((site) => ({
    rootInstanceName: jsonFiles[index].split('.')[0], // Get the root name from the JSON filename without extension
    name: site.Town,
    country: site.Country,
    Latitude: site.Latitude,
    Longitude: site.Longitude,
    ID: Math.random(),
    ipv6:site.IPv6,
    IPv4: data.IPv4,
    type:site.Type,
    Operator:data.Operator,
    IPv6: data.IPv6,
    ASN: data.ASN,
    Instances: site.Instances,
  }))
);

  const handleCountrySelection = (countryCode) => {
    setSelectedCountry(countryCode);
  };
  const handleContinentSelection=(continent)=>{
    setSelectedContinent(continent);
  }

  const handleCheckedLabels = (checkedLabels) => {
    if (checkedLabels.includes("All")) {
      setCheckedLabels(Object.keys(colorMapping));
    } else {
      setCheckedLabels(checkedLabels);
    }
  };
 

  const bounds = [
    [-90, -180],
    [90, 180]
  ];
  const filteredMarkers = selectedContinent === 'All'
  ? markers
  : continentToCountries[selectedContinent]
    ? markers.filter(marker =>
        continentToCountries[selectedContinent].some(country => country.code === marker.country)
      )
    : [];


  const getCountByRootInstance = () => {
    const filteredMarker = filteredMarkers.filter(marker =>
      (marker.country === selectedCountry || !selectedCountry || selectedCountry==="All") &&
      (checkedLabels.length === 0 || checkedLabels.includes(marker.rootInstanceName))
    );
    const counts = filteredMarker.reduce((acc, marker) => {
      acc[marker.rootInstanceName] = (acc[marker.rootInstanceName] || 0) + 1;
      return acc;
    }, {});
    return counts;
   
  };


  const downloadCSV = () => {
    const csvRows = [
      ["Root Instance", "Count"],
      ...Object.keys(colorMapping).map(label => [label, counts[label] || 0])
    ];

    const csvContent = csvRows.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "table_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const counts = getCountByRootInstance();
  const totalCount = Object.values(counts).reduce((acc, count) => acc + count, 0);
console.log(markers);
const filteredMarkersForTable = values.length === 0 ? markers : markers.filter(marker =>
  values.includes(marker.rootInstanceName)
);
const markerTable2 = {};
filteredMarkersForTable.forEach(marker => {
  if (!markerTable2[marker.country]) {
    markerTable2[marker.country] = marker;
  }
});
const uniqueCountryMarkers = Object.values(markerTable2);

const getCountByCountry = () => {
  const count = filteredMarkersForTable.reduce((acc, marker) => {
    const { country, Instances } = marker;
    if (!acc[country]) {
      acc[country] = {
        count: 0,
        instances: 0,
      };
    }
    acc[country].count++;
    acc[country].instances += Instances;
    return acc;
  }, {});

  return count;
};

getCountByCountry();
console.log("hii",filteredMarkersForTable);
const options = [
  { value: 'A', label: 'A' },
  { value: 'B', label: 'B' },
  { value: 'C', label: 'C' },
  { value: 'D', label: 'D' },
  { value: 'E', label: 'E' },
  { value: 'F', label: 'F' },
  { value: 'G', label: 'G' },
  { value: 'H', label: 'H' },
  { value: 'I', label: 'I' },
  { value: 'J', label: 'J' },
  { value: 'K', label: 'K' },
  { value: 'L', label: 'L' },
  { value: 'M', label: 'M' },
];
const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const maxPageNumbersToShow = 5;

  // Calculate the indexes of the first and last items on the current page
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItems = filteredMarkersForTable.slice(indexOfFirstItem, indexOfLastItem);

  // Get total pages
  const totalPages = Math.ceil(filteredMarkersForTable.length / rowsPerPage);

  // Calculate the range of page numbers to show
  const startPage = Math.max(1, currentPage - Math.floor(maxPageNumbersToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [currentPage_2, setCurrentPage_2] = useState(1);
  const rowsPerPage_2 = 5;
  const maxPageNumbersToShow_2 = 5;

  // Calculate the indexes of the first and last items on the current page
  const indexOfLastItem_2 = currentPage_2 * rowsPerPage_2;
  const indexOfFirstItem_2 = indexOfLastItem_2 - rowsPerPage_2;
  const currentItems_2 = uniqueCountryMarkers.slice(indexOfFirstItem_2, indexOfLastItem_2);

  // Get total pages
  const totalPages_2 = Math.ceil(uniqueCountryMarkers.length / rowsPerPage_2);

  // Calculate the range of page numbers to show_2
  const startPage_2 = Math.max(1, currentPage_2 - Math.floor(maxPageNumbersToShow_2 / 2));
  const endPage_2 = Math.min(totalPages_2, startPage_2 + maxPageNumbersToShow_2 - 1);

  const paginate_2 = (pageNumber) => setCurrentPage_2(pageNumber);

  return (
    <div className='flex flex-col items-center'>
      <div className='flex p-[20px] h-[full] w-[1140px] bg-[#DCDCDC] flex-col'>
        <MapContainer center={[51.505, -0.09]} zoom={2} style={{ height: "500px", width: "1100px" }} className='relative' ref={mapRef} minZoom={2} maxZoom={10} worldCopyJump={true} maxBounds={bounds} maxBoundsViscosity={1.0} >
          <TileLayer url="https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=gAqMvillSWIbJwin1cPn" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
          <MarkerClusterGroup showCoverageOnHover={false} zoomToBoundsOnClick={true} spiderfyOnMaxZoom={true}>
          {filteredMarkers.map(marker => (
              (!selectedCountry || marker.country === selectedCountry || selectedCountry==='All')  &&
              (checkedLabels.length === 0 || checkedLabels.includes(marker.rootInstanceName)) && (
                <Marker key={marker.ID} position={[marker.Latitude, marker.Longitude]} icon={createCustomIcon(colorMapping[marker.rootInstanceName], marker.rootInstanceName)}>
                  <Popup>
                    <div className='border-[0.005rem] border-slate-300'>
                  <div className='flex  gap-5   '>
                    
                    
                    <div className='text-xl font-extrabold bg-slate-100 w-full py-4 px-2'>{marker.name}, {marker.country}</div>
                    
                    
                  </div>
                    <div className='flex  gap-5 items-center p-2'>
                    
                    
                      <div className=' font-extrabold w-[3.5rem] '>Operator</div>
                      <div className='font-light text-sm'>{marker.Operator}</div>
                      
                    </div>
                    <div className='flex  gap-5 bg-slate-100 w-full items-center p-2'>
                    
                    <div className='w-[3.5rem] font-extrabold  '>IPv4</div>
                    <div>{marker.IPv4}</div>
                    
                  </div>
                  <div className='flex  gap-5 items-center p-2'>
                    
                    <div className='w-[3.5rem] font-extrabold '>IPv6</div>
                    <div>{marker.IPv6}</div>
                    
                  </div>
                  <div className='flex  gap-5 bg-slate-100 items-center p-2 '>
                    
                    <div className='w-[3.5rem] font-extrabold '>ASN</div>
                    <div>{marker.ASN}</div>
                    
                  </div>
                 
                  {(marker.Instances !== 1) && (
          <div className='flex  gap-5 items-center p-2 '>
                    
          <div className=' font-extrabold w-[3.5rem]'>Instances</div>
          <div>{marker.Instances}</div>
          
        </div>
      )}
      </div>
                  </Popup>
                </Marker>
              )
            ))}
          </MarkerClusterGroup>
        </MapContainer>
        <div className='flex gap-[20px]'>
          <Legend countrycode={handleCountrySelection} sendCheckedLabels={handleCheckedLabels} continentselected={handleContinentSelection} />
          <div>
            <table className="beautiful-table">
              <thead>
                <tr className='text-center'>
                  <th className='bg-slate-100'>Root Instance</th>
                  <th className='bg-slate-100'>Count</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(colorMapping).map((label, index) => (
                  <tr key={label} className={index % 2 === 0 ? 'bg-slate-200' : 'bg-slate-100'}>
                    <td className='w-[50vw] text-center'>{label}</td>
                    <td className='w-[50vw] text-center'>{counts[label] || 0}</td>
                  </tr>
                ))}
                <tr className='bg-slate-100'>
                <td className='w-[50vw] text-center'>Total</td>
                <td className='w-[50vw] text-center'>{totalCount}</td>
                </tr>
               
              </tbody>
            </table>
            <button onClick={downloadCSV} className="mt-4 p-2 bg-blue-500 text-white rounded">Download CSV</button>
          </div>
        </div>
        <div className='py-5'>
        <Select
            options={options}
            labelField="label"
            valueField="value"
            onChange={(values) => {
              setvalues(values.map(v => v.value));
              setCurrentPage(1); // Reset pagination for table 1
              setCurrentPage_2(1); // Reset pagination for table 2
            }}
            style={{ width: "80px", backgroundColor: "white", color: "black" }}
            searchable={false}
            placeholder={"Roots"}
            dropdownGap={0}
            
          />
          <div className='py-3'>
          <table className="beautiful-table">
        <thead>
          <tr className='text-center'>
            <th className='bg-slate-100'>City</th>
            <th className='bg-slate-100'>Country</th>
            <th className='bg-slate-100'>Type</th>
            <th className='bg-slate-100'>IPv6 Enabled</th>
            <th className='bg-slate-100'>Instances</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((marker, index) => (
            <tr key={marker.ID} className={index % 2 === 0 ? 'bg-slate-200' : 'bg-slate-100'}>
              <td className='w-[50vw] text-center'>{marker.name}</td>
              <td className='w-[50vw] text-center'>{findCountryNameByCode(marker.country)}</td>
              <td className='w-[50vw] text-center'>{marker.type}</td>
              <td className='w-[50vw] text-center'>{marker.ipv6 ? 'Yes' : 'No'}</td>
              <td className='w-[50vw] text-center'>{marker.Instances}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav className='py-2'>
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 && 'disabled'} hover:cursor-pointer`}>
            <li className="page-link"  aria-label="Previous" onClick={() => paginate(currentPage - 1)}>
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </li>
          </li>
          {[...Array(endPage - startPage + 1).keys()].map(i => (
            <li key={i + startPage} className={`page-item ${currentPage === i + startPage ? 'active' : ''} hover:cursor-pointer`}>
              <li onClick={() => paginate(i + startPage)} className="page-link" >
                {i + startPage}
              </li>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages && 'disabled'} hover:cursor-pointer`}>
            <li className="page-link"  aria-label="Next" onClick={() => paginate(currentPage + 1)}>
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </li>
          </li>
        </ul>
      </nav>
    </div>
 
<div className='py-3'>
<table className="beautiful-table">
        <thead>
          <tr className='text-center'>
            <th className='bg-slate-100'>Country</th>
            <th className='bg-slate-100'>Sites</th>
        
            <th className='bg-slate-100'>Instances</th>
          </tr>
        </thead>
        <tbody>
          {currentItems_2.map((marker, index) => (
            <tr key={marker.ID} className={index % 2 === 0 ? 'bg-slate-200' : 'bg-slate-100'}>
              <td className='w-[50vw] text-center'>{findCountryNameByCode(marker.country)}</td>
            
               <td data-tip="hii" className='w-[50vw] text-center'>{getCountByCountry()[marker.country]?.count}</td>
            
              <td className='w-[50vw] text-center'>{getCountByCountry()[marker.country]?.instances || 0}</td>
            </tr>
          ))}
          
        </tbody>
       
      </table>
      <nav className='py-2'>
        <ul className="pagination">
          <li className={`page-item ${currentPage_2 === 1 && 'disabled'} hover:cursor-pointer`}>
            <li className="page-link"  aria-label="Previous" onClick={() => paginate_2(currentPage_2 - 1)}>
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </li>
          </li>
          {[...Array(endPage_2 - startPage_2 + 1).keys()].map(i => (
            <li key={i + startPage_2} className={`page-item ${currentPage_2 === i + startPage_2 ? 'active' : ''} hover:cursor-pointer`}>
              <li onClick={() => paginate_2(i + startPage_2)} className="page-link" >
                {i + startPage_2}
              </li>
            </li>
          ))}
          <li className={`page-item ${currentPage_2 === totalPages_2 && 'disabled'} hover:cursor-pointer`}>
            <li className="page-link"  aria-label="Next" onClick={() => paginate_2(currentPage_2 + 1)}>
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </li>
          </li>
        </ul>
      </nav>
    
</div>
        </div>
      </div>
    </div>
  );
};

export default App;

// import React, { useRef } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import MarkerClusterGroup from 'react-leaflet-cluster';
// import 'leaflet/dist/leaflet.css';
// import { useState } from 'react';
// import L from 'leaflet';
// import markerIcon from 'leaflet/dist/images/marker-icon.png';
// import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
// import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// import { useEffect } from 'react';
// import Legend from './Legend';
// import { B } from './B';
// import { C } from './C';
// import { A } from './A';
// import { D } from './D';
// import { E } from './E';
// import { F } from './F';
// import { G } from './G';
// import { H } from './H';
// import { I } from './I';
// import { J } from './J';
// import { K } from './K';
// import { l } from './L';
// import { M } from './M';

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: markerIcon2x,
//   iconUrl: markerIcon,
//   shadowUrl: markerShadow,
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowSize: [41, 41]
// });

// const colorMapping = {
//   A: "#FF0000",    // Red
//   B: "#0000FF",    // Blue
//   C: "#013220",    // Green
//   D: "#FFA500",    // Orange
//   E: "#800080",    // Purple
//   F: "#FFD000",    // Yellow
//   G: "#CC0066",    // Pink
//   H: "#00FFFF",    // Cyan
//   I: "#A52A2A",    // Brown
//   J: "#00FF00",    // Lime
//   K: "#EE82EE",    // Violet
//   L: "#808080",    // Gray
//   M: "#000000"     // Black
// };

// const createCustomIcon = (color, instanceName) => {
//   const svgIcon = `
//     <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64" xml:space="preserve">
//     <style type="text/css">
//       .st0{fill:${color};}
//       .st1{fill:#FFFFFF; font-size:25px; font-family:Arial, sans-serif;}
//     </style>
//     <path class="st0" d="M32,1C15.4,1,2,14.4,2,31s30,62,30,62s30-36.4,30-62S48.6,1,32,1z"/>
//     <text x="32" y="40" text-anchor="middle" class="st1">${instanceName}</text>
//     </svg>`;

//   return new L.Icon({
//     iconUrl: "data:image/svg+xml;base64," + btoa(svgIcon),
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowUrl: markerShadow,
//     shadowSize: [41, 41],
//     shadowAnchor: [12, 41]
//   });
// };

// const App = () => {
//   const [selectedContinent, setSelectedContinent] = useState('All');
//   const mapRef = useRef(null);

//   const [selectedCountry, setSelectedCountry] = useState('');
//   const [checkedLabels, setCheckedLabels] = useState([]);

//   const combinedData = [...A, ...B, ...C ,...D,...E,...F,...G,...H,...I,...J,...K,...l,...M];
//   const continentToCountries = {
//     Asia: [
//       { code: 'AE', name: 'United Arab Emirates' },
//       { code: 'AF', name: 'Afghanistan' },
//       { code: 'AM', name: 'Armenia' },
//       { code: 'AZ', name: 'Azerbaijan' },
//       { code: 'BD', name: 'Bangladesh' },
//       { code: 'BH', name: 'Bahrain' },
//       { code: 'BN', name: 'Brunei' },
//       { code: 'BT', name: 'Bhutan' },
//       { code: 'CN', name: 'China' },
//       { code: 'GE', name: 'Georgia' },
//       { code: 'HK', name: 'Hong Kong' },
//       { code: 'ID', name: 'Indonesia' },
//       { code: 'IL', name: 'Israel' },
//       { code: 'IN', name: 'India' },
//       { code: 'IQ', name: 'Iraq' },
//       { code: 'IR', name: 'Iran' },
//       { code: 'JO', name: 'Jordan' },
//       { code: 'JP', name: 'Japan' },
//       { code: 'KG', name: 'Kyrgyzstan' },
//       { code: 'KH', name: 'Cambodia' },
//       { code: 'KW', name: 'Kuwait' },
//       { code: 'KZ', name: 'Kazakhstan' },
//       { code: 'LA', name: 'Laos' },
//       { code: 'LB', name: 'Lebanon' },
//       { code: 'LK', name: 'Sri Lanka' },
//       { code: 'MM', name: 'Myanmar' },
//       { code: 'MN', name: 'Mongolia' },
//       { code: 'MO', name: 'Macao' },
//       { code: 'MV', name: 'Maldives' },
//       { code: 'MY', name: 'Malaysia' },
//       { code: 'NP', name: 'Nepal' },
//       { code: 'OM', name: 'Oman' },
//       { code: 'PH', name: 'Philippines' },
//       { code: 'PK', name: 'Pakistan' },
//       { code: 'QA', name: 'Qatar' },
//       { code: 'SA', name: 'Saudi Arabia' },
//       { code: 'SG', name: 'Singapore' },
//       { code: 'SY', name: 'Syria' },
//       { code: 'TH', name: 'Thailand' },
//       { code: 'TJ', name: 'Tajikistan' },
//       { code: 'TM', name: 'Turkmenistan' },
//       { code: 'TR', name: 'Turkey' },
//       { code: 'TW', name: 'Taiwan' },
//       { code: 'UZ', name: 'Uzbekistan' },
//       { code: 'VN', name: 'Vietnam' },
//       { code: 'YE', name: 'Yemen' },
//     ],
//     Europe: [
//       { code: 'AL', name: 'Albania' },
//       { code: 'AT', name: 'Austria' },
//       { code: 'BA', name: 'Bosnia and Herzegovina' },
//       { code: 'BE', name: 'Belgium' },
//       { code: 'BG', name: 'Bulgaria' },
//       { code: 'BY', name: 'Belarus' },
//       { code: 'CH', name: 'Switzerland' },
//       { code: 'CY', name: 'Cyprus' },
//       { code: 'CZ', name: 'Czech Republic' },
//       { code: 'DE', name: 'Germany' },
//       { code: 'DK', name: 'Denmark' },
//       { code: 'EE', name: 'Estonia' },
//       { code: 'ES', name: 'Spain' },
//       { code: 'FI', name: 'Finland' },
//       { code: 'FO', name: 'Faroe Islands' },
//       { code: 'FR', name: 'France' },
//       { code: 'GB', name: 'United Kingdom' },
//       { code: 'GR', name: 'Greece' },
//       { code: 'HR', name: 'Croatia' },
//       { code: 'HU', name: 'Hungary' },
//       { code: 'IE', name: 'Ireland' },
//       { code: 'IS', name: 'Iceland' },
//       { code: 'IT', name: 'Italy' },
//       { code: 'LT', name: 'Lithuania' },
//       { code: 'LU', name: 'Luxembourg' },
//       { code: 'LV', name: 'Latvia' },
//       { code: 'MD', name: 'Moldova' },
//       { code: 'ME', name: 'Montenegro' },
//       { code: 'MK', name: 'North Macedonia' },
//       { code: 'NL', name: 'Netherlands' },
//       { code: 'NO', name: 'Norway' },
//       { code: 'PL', name: 'Poland' },
//       { code: 'PT', name: 'Portugal' },
//       { code: 'RO', name: 'Romania' },
//       { code: 'RS', name: 'Serbia' },
//       { code: 'RU', name: 'Russia' },
//       { code: 'SE', name: 'Sweden' },
//       { code: 'SI', name: 'Slovenia' },
//       { code: 'SK', name: 'Slovakia' },
//       { code: 'UA', name: 'Ukraine' },
//     ],
//     Africa: [
//       { code: 'AO', name: 'Angola' },
//       { code: 'BF', name: 'Burkina Faso' },
//       { code: 'BI', name: 'Burundi' },
//       { code: 'BJ', name: 'Benin' },
//       { code: 'BW', name: 'Botswana' },
//       { code: 'CD', name: 'Democratic Republic of the Congo' },
//       { code: 'CG', name: 'Republic of the Congo' },
//       { code: 'CI', name: 'Ivory Coast' },
//       { code: 'CM', name: 'Cameroon' },
//       { code: 'DJ', name: 'Djibouti' },
//       { code: 'DZ', name: 'Algeria' },
//       { code: 'EG', name: 'Egypt' },
//       { code: 'ET', name: 'Ethiopia' },
//       { code: 'GA', name: 'Gabon' },
//       { code: 'GH', name: 'Ghana' },
//       { code: 'GM', name: 'Gambia' },
//       { code: 'GN', name: 'Guinea' },
//       { code: 'KE', name: 'Kenya' },
//       { code: 'LS', name: 'Lesotho' },
//       { code: 'LR', name: 'Liberia' },
//       { code: 'LY', name: 'Libya' },
//       { code: 'MG', name: 'Madagascar' },
//       { code: 'ML', name: 'Mali' },
//       { code: 'MR', name: 'Mauritania' },
//       { code: 'MU', name: 'Mauritius' },
//       { code: 'MW', name: 'Malawi' },
//       { code: 'MZ', name: 'Mozambique' },
//       { code: 'NA', name: 'Namibia' },
//       { code: 'NE', name: 'Niger' },
//       { code: 'NG', name: 'Nigeria' },
//       { code: 'RW', name: 'Rwanda' },
//       { code: 'SC', name: 'Seychelles' },
//       { code: 'SD', name: 'Sudan' },
//       { code: 'SL', name: 'Sierra Leone' },
//       { code: 'SN', name: 'Senegal' },
//       { code: 'SO', name: 'Somalia' },
//       { code: 'SS', name: 'South Sudan' },
//       { code: 'SZ', name: 'Eswatini' },
//       { code: 'TD', name: 'Chad' },
//       { code: 'TG', name: 'Togo' },
//       { code: 'TN', name: 'Tunisia' },
//       { code: 'TZ', name: 'Tanzania' },
//       { code: 'UG', name: 'Uganda' },
//       { code: 'ZA', name: 'South Africa' },
//       { code: 'ZM', name: 'Zambia' },
//       { code: 'ZW', name: 'Zimbabwe' },
//     ],
//     North_America : [
//       { code: 'CA', name: 'Canada' },
//       { code: 'US', name: 'United States' },
//       { code: 'MX', name: 'Mexico' },
//       { code: 'CR', name: 'Costa Rica' },
//       { code: 'PA', name: 'Panama' },
//       { code: 'CU', name: 'Cuba' },
//       { code: 'DO', name: 'Dominican Republic' },
//       { code: 'GT', name: 'Guatemala' },
//       { code: 'HT', name: 'Haiti' },
//       { code: 'HN', name: 'Honduras' },
//       { code: 'NI', name: 'Nicaragua' },
//       { code: 'BS', name: 'Bahamas' },
//       { code: 'BZ', name: 'Belize' },
//       { code: 'JM', name: 'Jamaica' },
//       { code: 'TT', name: 'Trinidad and Tobago' },
//       { code: 'BB', name: 'Barbados' },
//       { code: 'AG', name: 'Antigua and Barbuda' },
//       { code: 'DM', name: 'Dominica' },
//       { code: 'GD', name: 'Grenada' },
//       { code: 'KN', name: 'Saint Kitts and Nevis' },
//       { code: 'LC', name: 'Saint Lucia' },
//       { code: 'VC', name: 'Saint Vincent and the Grenadines' },
//       { code: 'BS', name: 'The Bahamas' },
//       { code: 'CW', name: 'Curaçao' },
//       { code: 'SX', name: 'Sint Maarten' },
//       { code: 'AW', name: 'Aruba' },
//       { code: 'AI', name: 'Anguilla' },
//       { code: 'BM', name: 'Bermuda' },
//       { code: 'KY', name: 'Cayman Islands' },
//       { code: 'VG', name: 'British Virgin Islands' },
//       { code: 'TC', name: 'Turks and Caicos Islands' },
//       { code: 'GL', name: 'Greenland' },
//       { code: 'MQ', name: 'Martinique' },
//       { code: 'GP', name: 'Guadeloupe' },
//       { code: 'BL', name: 'Saint Barthélemy' },
//       { code: 'MF', name: 'Saint Martin' },
//       { code: 'PM', name: 'Saint Pierre and Miquelon' },
//       { code: 'MS', name: 'Montserrat' }
//     ],
//    South_America:[
//       { code: 'AR', name: 'Argentina' },
//       { code: 'BR', name: 'Brazil' },
//       { code: 'CL', name: 'Chile' },
//       { code: 'CO', name: 'Colombia' },
//       { code: 'EC', name: 'Ecuador' },
//       { code: 'VE', name: 'Venezuela' },
//       { code: 'BO', name: 'Bolivia' },
//       { code: 'PE', name: 'Peru' },
//       { code: 'PY', name: 'Paraguay' },
//       { code: 'UY', name: 'Uruguay' },
//       { code: 'GY', name: 'Guyana' },
//       { code: 'SR', name: 'Suriname' },
//       { code: 'GF', name: 'French Guiana' }
//     ],
//    Australia: [
//       { code: 'AU', name: 'Australia' },
//       { code: 'NZ', name: 'New Zealand' },
//       { code: 'FJ', name: 'Fiji' },
//       { code: 'PG', name: 'Papua New Guinea' },
//       { code: 'SB', name: 'Solomon Islands' },
//       { code: 'VU', name: 'Vanuatu' },
//       { code: 'NC', name: 'New Caledonia' },
//       { code: 'WF', name: 'Wallis and Futuna' },
//       { code: 'FM', name: 'Federated States of Micronesia' },
//       { code: 'MH', name: 'Marshall Islands' },
//       { code: 'TO', name: 'Tonga' },
//       { code: 'WS', name: 'Samoa' },
//       { code: 'KI', name: 'Kiribati' },
//       { code: 'TV', name: 'Tuvalu' },
//       { code: 'NR', name: 'Nauru' },
//       { code: 'PW', name: 'Palau' }
//     ]};
    
    
    

  
//   // Flatten the data structure to create markers
//   const markers = combinedData.flatMap(data =>
//     data.Sites.map(site => ({
//       rootInstanceName: data.ROOT,
//       name: site.Town,
//       country: site.Country,
      
//       Latitude: site.Latitude,
//       Longitude: site.Longitude,
//       ID: Math.random(),
//       instanceNames: site.Identifiers,
//       IPv4: data.IPv4,
//       IPv6: data.IPv6,
//       ASN: data.ASN,
//       Instances: site.Instances,
//     }))
//   );

//   const handleCountrySelection = (countryCode) => {
//     setSelectedCountry(countryCode);
//   };
//   const handleContinentSelection=(continent)=>{
//     setSelectedContinent(continent);
//   }

//   const handleCheckedLabels = (checkedLabels) => {
//     if (checkedLabels.includes("All")) {
//       setCheckedLabels(Object.keys(colorMapping));
//     } else {
//       setCheckedLabels(checkedLabels);
//     }
//   };
 

//   const bounds = [
//     [-90, -180],
//     [90, 180]
//   ];
//   const filteredMarkers = selectedContinent === 'All'
//   ? markers
//   : continentToCountries[selectedContinent]
//     ? markers.filter(marker =>
//         continentToCountries[selectedContinent].some(country => country.code === marker.country)
//       )
//     : [];


//   const getCountByRootInstance = () => {
//     const filteredMarker = filteredMarkers.filter(marker =>
//       (marker.country === selectedCountry || !selectedCountry || selectedCountry==="All") &&
//       (checkedLabels.length === 0 || checkedLabels.includes(marker.rootInstanceName))
//     );
//     const counts = filteredMarker.reduce((acc, marker) => {
//       acc[marker.rootInstanceName] = (acc[marker.rootInstanceName] || 0) + 1;
//       return acc;
//     }, {});
//     return counts;
   
//   };
//   const downloadCSV = () => {
//     const csvRows = [
//       ["Root Instance", "Count"],
//       ...Object.keys(colorMapping).map(label => [label, counts[label] || 0])
//     ];

//     const csvContent = csvRows.map(row => row.join(",")).join("\n");
//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.setAttribute("href", url);
//     link.setAttribute("download", "table_data.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };
//   const counts = getCountByRootInstance();
//   const totalCount = Object.values(counts).reduce((acc, count) => acc + count, 0);
//   return (
//     <div className='flex flex-col items-center'>
//       <div className='flex p-[20px] h-[1000px] w-[1140px] bg-[#DCDCDC] flex-col'>
//         <MapContainer center={[51.505, -0.09]} zoom={2} style={{ height: "500px", width: "1100px" }} className='relative' ref={mapRef} minZoom={2} maxZoom={10} worldCopyJump={true} maxBounds={bounds} maxBoundsViscosity={1.0} >
//           <TileLayer url="https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=gAqMvillSWIbJwin1cPn" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
//           <MarkerClusterGroup showCoverageOnHover={false} zoomToBoundsOnClick={true} spiderfyOnMaxZoom={true}>
//           {filteredMarkers.map(marker => (
//               (!selectedCountry || marker.country === selectedCountry || selectedCountry==='All')  &&
//               (checkedLabels.length === 0 || checkedLabels.includes(marker.rootInstanceName)) && (
//                 <Marker key={marker.ID} position={[marker.Latitude, marker.Longitude]} icon={createCustomIcon(colorMapping[marker.rootInstanceName], marker.rootInstanceName)}>
//                   <Popup>
//                     <div>Name: {marker.name}</div>
            
//                     <div>Country: {marker.country}</div>
       
//                     <div>IPv4: {marker.IPv4}</div>
//                     <div>IPv6: {marker.IPv6}</div>
//                     <div>ASN: {marker.ASN}</div>
//                     <div>Instance: {marker.Instances}</div>
//                   </Popup>
//                 </Marker>
//               )
//             ))}
//           </MarkerClusterGroup>
//         </MapContainer>
//         <div className='flex gap-[20px]'>
//           <Legend countrycode={handleCountrySelection} sendCheckedLabels={handleCheckedLabels} continentselected={handleContinentSelection} />
//           <div>
//             <table className="beautiful-table">
//               <thead>
//                 <tr>
//                   <th>Root Instance</th>
//                   <th>Count</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {Object.keys(colorMapping).map((label, index) => (
//                   <tr key={label} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-300'}>
//                     <td className='w-[50vw] text-center'>{label}</td>
//                     <td className='w-[50vw] text-center'>{counts[label] || 0}</td>
//                   </tr>
//                 ))}
//                 <tr className='bg-slate-300'>
//                 <td className='w-[50vw] text-center'>Total</td>
//                 <td className='w-[50vw] text-center'>{totalCount}</td>
//                 </tr>
               
//               </tbody>
//             </table>
//             <button onClick={downloadCSV} className="mt-4 p-2 bg-blue-500 text-white rounded">Download CSV</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;