
import { useMemo } from "react";
import React, { useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import Pie_Asia from "./PieAsia.js";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import axios from "axios";
import { useEffect } from "react";
import Legend from "./Legend";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from "react-dropdown-select";
import Piechart from "./Pie.js";
import regions from "./Regions.js";

const jsonFiles = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
];
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const colorMapping = {
  A: "#FF0000", // Red
  B: "#0000FF", // Blue
  C: "#013220", // Green
  D: "#FFA500", // Orange
  E: "#800080", // Purple
  F: "#FFD000", // Yellow
  G: "#CC0066", // Pink
  H: "#00FFFF", // Cyan
  I: "#A52A2A", // Brown
  J: "#00FF00", // Lime
  K: "#EE82EE", // Violet
  L: "#808080", // Gray
  M: "#000000", // Black
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
    shadowAnchor: [12, 41],
  });
};

const App = () => {
  const [selectedContinent, setSelectedContinent] = useState("All");
  const mapRef = useRef(null);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCountry2, setSelectedCountry2] = useState("");
  const [checkedLabels, setCheckedLabels] = useState([]);

  const [combinedData, setCombinedData] = useState([]);
  const [values, setvalues] = useState([]);

  const continentToCountries = {
    Asia: [
      { code: "AE", name: "United Arab Emirates" },
      { code: "AF", name: "Afghanistan" },
      { code: "AM", name: "Armenia" },
      { code: "AZ", name: "Azerbaijan" },
      { code: "BD", name: "Bangladesh" },
      { code: "BH", name: "Bahrain" },
      { code: "BN", name: "Brunei" },
      { code: "BT", name: "Bhutan" },
      { code: "CN", name: "China" },
      { code: "GE", name: "Georgia" },
      { code: "HK", name: "Hong Kong" },
      { code: "ID", name: "Indonesia" },
      { code: "IL", name: "Israel" },
      { code: "KR", name: "South Korea" },
      { code: "IN", name: "India" },
      { code: "IQ", name: "Iraq" },
      { code: "IR", name: "Iran" },
      { code: "JO", name: "Jordan" },
      { code: "JP", name: "Japan" },
      { code: "KG", name: "Kyrgyzstan" },
      { code: "KH", name: "Cambodia" },
      { code: "KW", name: "Kuwait" },
      { code: "PS", name: "Palestine" },
      { code: "KZ", name: "Kazakhstan" },
      { code: "LA", name: "Laos" },

      { code: "LB", name: "Lebanon" },
      { code: "LK", name: "Sri Lanka" },
      { code: "MM", name: "Myanmar" },
      { code: "MN", name: "Mongolia" },
      { code: "MO", name: "Macao" },
      { code: "MV", name: "Maldives" },
      { code: "MY", name: "Malaysia" },
      { code: "NP", name: "Nepal" },
      { code: "OM", name: "Oman" },
      { code: "PH", name: "Philippines" },
      { code: "PK", name: "Pakistan" },
      { code: "QA", name: "Qatar" },
      { code: "SA", name: "Saudi Arabia" },
      { code: "SG", name: "Singapore" },
      { code: "SY", name: "Syria" },
      { code: "TH", name: "Thailand" },
      { code: "TJ", name: "Tajikistan" },
      { code: "TM", name: "Turkmenistan" },
      { code: "TR", name: "Turkey" },
      { code: "TW", name: "Taiwan" },
      { code: "UZ", name: "Uzbekistan" },
      { code: "VN", name: "Vietnam" },
      { code: "YE", name: "Yemen" },
    ],
    Europe: [
      { code: "AL", name: "Albania" },
      { code: "AT", name: "Austria" },
      { code: "BA", name: "Bosnia and Herzegovina" },
      { code: "BE", name: "Belgium" },
      { code: "BG", name: "Bulgaria" },
      { code: "BY", name: "Belarus" },
      { code: "CH", name: "Switzerland" },
      { code: "CY", name: "Cyprus" },
      { code: "CZ", name: "Czech Republic" },
      { code: "DE", name: "Germany" },
      { code: "DK", name: "Denmark" },
      { code: "EE", name: "Estonia" },
      { code: "ES", name: "Spain" },
      { code: "FI", name: "Finland" },
      { code: "FO", name: "Faroe Islands" },
      { code: "FR", name: "France" },
      { code: "GB", name: "United Kingdom" },
      { code: "GR", name: "Greece" },
      { code: "HR", name: "Croatia" },
      { code: "HU", name: "Hungary" },
      { code: "IE", name: "Ireland" },
      { code: "IS", name: "Iceland" },
      { code: "IT", name: "Italy" },
      { code: "LT", name: "Lithuania" },
      { code: "LU", name: "Luxembourg" },
      { code: "LV", name: "Latvia" },
      { code: "MD", name: "Moldova" },
      { code: "ME", name: "Montenegro" },
      { code: "MK", name: "North Macedonia" },
      { code: "NL", name: "Netherlands" },
      { code: "NO", name: "Norway" },
      { code: "PL", name: "Poland" },
      { code: "PT", name: "Portugal" },
      { code: "RO", name: "Romania" },
      { code: "RS", name: "Serbia" },
      { code: "RU", name: "Russia" },
      { code: "SE", name: "Sweden" },
      { code: "SI", name: "Slovenia" },
      { code: "SK", name: "Slovakia" },
      { code: "UA", name: "Ukraine" },
    ],
    Africa: [
      { code: "AO", name: "Angola" },
      { code: "RE", name: "Réunion" },
      { code: "BF", name: "Burkina Faso" },
      { code: "KM", name: "Comoros" },
      { code: "MA", name: "Morocco" },
      { code: "BI", name: "Burundi" },
      { code: "BJ", name: "Benin" },
      { code: "BW", name: "Botswana" },
      { code: "CD", name: "Democratic Republic of the Congo" },
      { code: "CG", name: "Republic of the Congo" },
      { code: "CI", name: "Ivory Coast" },
      { code: "CM", name: "Cameroon" },
      { code: "DJ", name: "Djibouti" },
      { code: "DZ", name: "Algeria" },
      { code: "EG", name: "Egypt" },
      { code: "ET", name: "Ethiopia" },
      { code: "GA", name: "Gabon" },
      { code: "GH", name: "Ghana" },
      { code: "GM", name: "Gambia" },
      { code: "GN", name: "Guinea" },
      { code: "KE", name: "Kenya" },
      { code: "LS", name: "Lesotho" },
      { code: "LR", name: "Liberia" },
      { code: "LY", name: "Libya" },
      { code: "MG", name: "Madagascar" },
      { code: "ML", name: "Mali" },
      { code: "MR", name: "Mauritania" },
      { code: "MU", name: "Mauritius" },
      { code: "MW", name: "Malawi" },
      { code: "MZ", name: "Mozambique" },
      { code: "NA", name: "Namibia" },
      { code: "NE", name: "Niger" },
      { code: "NG", name: "Nigeria" },
      { code: "RW", name: "Rwanda" },
      { code: "SC", name: "Seychelles" },
      { code: "SD", name: "Sudan" },
      { code: "SL", name: "Sierra Leone" },
      { code: "SN", name: "Senegal" },
      { code: "SO", name: "Somalia" },
      { code: "SS", name: "South Sudan" },
      { code: "SZ", name: "Eswatini" },
      { code: "TD", name: "Chad" },
      { code: "TG", name: "Togo" },
      { code: "TN", name: "Tunisia" },
      { code: "TZ", name: "Tanzania" },
      { code: "UG", name: "Uganda" },
      { code: "ZA", name: "South Africa" },
      { code: "ZM", name: "Zambia" },
      { code: "ZW", name: "Zimbabwe" },
    ],
    North_America: [
      { code: "CA", name: "Canada" },
      { code: "SV", name: "El Salvador" },
      { code: "US", name: "United States" },
      { code: "MX", name: "Mexico" },
      { code: "CR", name: "Costa Rica" },
      { code: "PA", name: "Panama" },
      { code: "CU", name: "Cuba" },
      { code: "DO", name: "Dominican Republic" },
      { code: "GT", name: "Guatemala" },
      { code: "HT", name: "Haiti" },
      { code: "HN", name: "Honduras" },
      { code: "NI", name: "Nicaragua" },
      { code: "BS", name: "Bahamas" },
      { code: "BZ", name: "Belize" },
      { code: "JM", name: "Jamaica" },
      { code: "TT", name: "Trinidad and Tobago" },
      { code: "BB", name: "Barbados" },
      { code: "AG", name: "Antigua and Barbuda" },
      { code: "DM", name: "Dominica" },
      { code: "GD", name: "Grenada" },
      { code: "KN", name: "Saint Kitts and Nevis" },
      { code: "LC", name: "Saint Lucia" },
      { code: "VC", name: "Saint Vincent and the Grenadines" },
      { code: "BS", name: "The Bahamas" },
      { code: "CW", name: "Curaçao" },
      { code: "SX", name: "Sint Maarten" },
      { code: "AW", name: "Aruba" },
      { code: "PR", name: "Puerto Rica" },
      { code: "AI", name: "Anguilla" },
      { code: "BM", name: "Bermuda" },
      { code: "KY", name: "Cayman Islands" },
      { code: "VG", name: "British Virgin Islands" },
      { code: "TC", name: "Turks and Caicos Islands" },
      { code: "GL", name: "Greenland" },
      { code: "MQ", name: "Martinique" },
      { code: "GP", name: "Guadeloupe" },
      { code: "BL", name: "Saint Barthélemy" },
      { code: "MF", name: "Saint Martin" },
      { code: "PM", name: "Saint Pierre and Miquelon" },
      { code: "MS", name: "Montserrat" },
    ],
    South_America: [
      { code: "AR", name: "Argentina" },
      { code: "BR", name: "Brazil" },
      { code: "CL", name: "Chile" },
      { code: "CO", name: "Colombia" },
      { code: "EC", name: "Ecuador" },
      { code: "VE", name: "Venezuela" },
      { code: "BO", name: "Bolivia" },
      { code: "PE", name: "Peru" },
      { code: "PY", name: "Paraguay" },
      { code: "UY", name: "Uruguay" },
      { code: "GY", name: "Guyana" },
      { code: "SR", name: "Suriname" },
      { code: "GF", name: "French Guiana" },
    ],
    Australia: [
      { code: "AU", name: "Australia" },
      { code: "NZ", name: "New Zealand" },
      { code: "FJ", name: "Fiji" },
      { code: "CK", name: "Cook Islands" },
      { code: "PG", name: "Papua New Guinea" },
      { code: "SB", name: "Solomon Islands" },
      { code: "PF", name: "French Polynesia" },
      { code: "VU", name: "Vanuatu" },
      { code: "NC", name: "New Caledonia" },
      { code: "WF", name: "Wallis and Futuna" },
      { code: "FM", name: "Federated States of Micronesia" },
      { code: "MH", name: "Marshall Islands" },
      { code: "TO", name: "Tonga" },
      { code: "GU", name: "Guam" },
      { code: "WS", name: "Samoa" },
      { code: "KI", name: "Kiribati" },
      { code: "TV", name: "Tuvalu" },
      { code: "NR", name: "Nauru" },
      { code: "PW", name: "Palau" },
    ],
  };

  const findCountryNameByCode = (code) => {
    for (const region in continentToCountries) {
      const countries = continentToCountries[region];
      const country = countries.find((country) => country.code === code);
      if (country) {
        return country.name;
      }
    }
    return null; // Return null if code is not found
  };
  const findRegionNameByCode = (countryCode) => {
    return regions[countryCode];
  };
  const findContinentNameByCode = (code) => {
    for (const region in continentToCountries) {
      const countries = continentToCountries[region];
      const country = countries.find((country) => country.code === code);
      if (country) {
        return region;
      }
    }
    return null; // Return null if code is not found
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await Promise.all(
          jsonFiles.map(async (fileName) => {
            // const response = await axios.get(`https://root-servers.org/root/${fileName}/json/`);
            const response = await axios.get(`${process.env.PUBLIC_URL}/data/${fileName}.json`);
            return response.data;
          })
        );
        setCombinedData(fetchedData.flat()); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    

    fetchData();
  }, []);
  const markers = combinedData.flatMap((data, index) =>
    data.Sites.map((site) => ({
      rootInstanceName: jsonFiles[index],
      name: site.Town,
      country: site.Country,
      Country: findCountryNameByCode(site.Country),
      Latitude: site.Latitude,
      continent: findContinentNameByCode(site.Country),
      Longitude: site.Longitude,
      ID: Math.random(),
      region: findRegionNameByCode(site.Country),
      ipv6: site.IPv6,
      IPv4: data.IPv4,
      type: site.Type,
      Operator: data.Operator,
      IPv6: data.IPv6,
      ASN: data.ASN,
      Instances: site.Instances,
    }))
  );
  console.log("markers", markers);
   const aggregateDataByContinent = (data) => {
    const result = {};
    data.forEach((item) => {
      if (!result[item.rootInstanceName]) {
        result[item.rootInstanceName] = {};
      }
      if (!result[item.rootInstanceName][item.continent]) {
        result[item.rootInstanceName][item.continent] = 0;
      }
      result[item.rootInstanceName][item.continent] += item.Instances;
    });
    return result;
  };
  const aggregateDataByRegion = (data) => {
    const result = {};
    data.forEach((item) => {
      if (item.region) {
        if (!result[item.rootInstanceName]) {
          result[item.rootInstanceName] = {};
        }
        if (!result[item.rootInstanceName][item.region]) {
          result[item.rootInstanceName][item.region] = 0;
        }

        result[item.rootInstanceName][item.region] += item.Instances;
      }
    });
    return result;
  };
  const aggregatedDataAsia = aggregateDataByRegion(markers);
  console.log(aggregatedDataAsia);

  const aggregatedData = aggregateDataByContinent(markers);
  console.log(markers);
  console.log("yyy", aggregatedData);
  const handleCountrySelection = (countryCode) => {
    setSelectedCountry(countryCode);
  };
  const handleContinentSelection = (continent) => {
    setSelectedContinent(continent);
    console.log("XYZ",continent)
  };
  const handleCheckedLabels = (checkedLabels) => {
    if (checkedLabels.includes('All')) {
      setCheckedLabels(Object.keys(colorMapping));
    } else {
      setCheckedLabels(checkedLabels);
    }
  };
  const bounds = [
    [-90, -180],
    [90, 180],
  ];
  const filteredMarkers =
    selectedContinent === "All"
      ? markers
      : continentToCountries[selectedContinent]
      ? markers.filter((marker) =>
          continentToCountries[selectedContinent].some(
            (country) => country.code === marker.country
          )
        )
      : [];
      const getSiteCountsByRootInstance = () => {
        const filteredMarker = filteredMarkers.filter(
          (marker) =>
            (marker.country === selectedCountry ||
              !selectedCountry ||
              selectedCountry === "All") &&
            (checkedLabels.length === 0 ||
              checkedLabels.includes(marker.rootInstanceName))
        );
        const siteCounts = filteredMarker.reduce((acc, marker) => {
          acc[marker.rootInstanceName] = (acc[marker.rootInstanceName] || 0) + 1;
          return acc;
        }, {});
      
        return siteCounts;
      };
      
      // Call this function to get the site counts
      const siteCounts = getSiteCountsByRootInstance();
      
  const getCountByRootInstance = () => {
    const filteredMarker = filteredMarkers.filter(
      (marker) =>
        (marker.country === selectedCountry ||
          !selectedCountry ||
          selectedCountry === "All") &&
        (checkedLabels.length === 0 ||
          checkedLabels.includes(marker.rootInstanceName))
    );
    const counts = filteredMarker.reduce((acc, marker) => {
      acc[marker.rootInstanceName] =
        (acc[marker.rootInstanceName] || 0) + marker.Instances;
      return acc;
    }, {});

    return counts;
  };

  const downloadCSV = () => {
    // Prepare CSV content
    const header = 'Root Instance,Sites,Instances\n';
    const rows = Object.keys(colorMapping).map(label => `${label},${siteCounts[label] || 0},${counts[label] || 0}`).join('\n');
    const csvContent = `${header}${rows}\nTotal,${totalCount_site},${totalCount}`;

    // Create a Blob containing the CSV data
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    // Create a link element and trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'table_data.csv';
    document.body.appendChild(a);
    a.click();

    // Cleanup
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  const counts = getCountByRootInstance();
  const totalCount = Object.values(counts).reduce(
    (acc, count) => acc + count,
    0
  );
  const totalInstances = markers.reduce((acc, marker) => acc + marker.Instances, 0);
  const totalCount_site = Object.values(siteCounts).reduce(
    (acc, count) => acc + count,
    0
  );
  console.log(markers);
  const filteredMarkersForTable =
  values.length === 0 || values.includes("All")
    ? markers.filter(marker => selectedCountry2 === "" || marker.country === selectedCountry2)
    : markers.filter(
        marker =>
          values.includes(marker.rootInstanceName) &&
          (selectedCountry2 === "" || marker.country === selectedCountry2)
      );



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
  const countryOptions = [
    { value: '', label: 'All Countries' },
    { value: 'AF', label: 'Afghanistan' },
    { value: 'AL', label: 'Albania' },
    { value: 'DZ', label: 'Algeria' },
    { value: 'AD', label: 'Andorra' },
    { value: 'AO', label: 'Angola' },
    { value: 'AG', label: 'Antigua and Barbuda' },
    { value: 'AR', label: 'Argentina' },
    { value: 'AM', label: 'Armenia' },
    { value: 'AU', label: 'Australia' },
    { value: 'AT', label: 'Austria' },
    { value: 'AZ', label: 'Azerbaijan' },
    { value: 'BS', label: 'Bahamas' },
    { value: 'BH', label: 'Bahrain' },
    { value: 'BD', label: 'Bangladesh' },
    { value: 'BB', label: 'Barbados' },
    { value: 'BY', label: 'Belarus' },
    { value: 'BE', label: 'Belgium' },
    { value: 'BZ', label: 'Belize' },
    { value: 'BJ', label: 'Benin' },
    { value: 'BT', label: 'Bhutan' },
    { value: 'BO', label: 'Bolivia' },
    { value: 'BA', label: 'Bosnia and Herzegovina' },
    { value: 'BW', label: 'Botswana' },
    { value: 'BR', label: 'Brazil' },
    { value: 'BN', label: 'Brunei' },
    { value: 'BG', label: 'Bulgaria' },
    { value: 'BF', label: 'Burkina Faso' },
    { value: 'BI', label: 'Burundi' },
    { value: 'CV', label: 'Cabo Verde' },
    { value: 'KH', label: 'Cambodia' },
    { value: 'CM', label: 'Cameroon' },
    { value: 'CA', label: 'Canada' },
    { value: 'CF', label: 'Central African Republic' },
    { value: 'TD', label: 'Chad' },
    { value: 'CL', label: 'Chile' },
    { value: 'CN', label: 'China' },
    { value: 'CO', label: 'Colombia' },
    { value: 'KM', label: 'Comoros' },
    { value: 'CG', label: 'Congo' },
    { value: 'CD', label: 'Congo (Democratic Republic)' },
    { value: 'CR', label: 'Costa Rica' },
    { value: 'HR', label: 'Croatia' },
    { value: 'CU', label: 'Cuba' },
    { value: 'CY', label: 'Cyprus' },
    { value: 'CZ', label: 'Czech Republic' },
    { value: 'DK', label: 'Denmark' },
    { value: 'DJ', label: 'Djibouti' },
    { value: 'DM', label: 'Dominica' },
    { value: 'DO', label: 'Dominican Republic' },
    { value: 'EC', label: 'Ecuador' },
    { value: 'EG', label: 'Egypt' },
    { value: 'SV', label: 'El Salvador' },
    { value: 'GQ', label: 'Equatorial Guinea' },
    { value: 'ER', label: 'Eritrea' },
    { value: 'EE', label: 'Estonia' },
    { value: 'SZ', label: 'Eswatini' },
    { value: 'ET', label: 'Ethiopia' },
    { value: 'FJ', label: 'Fiji' },
    { value: 'FI', label: 'Finland' },
    { value: 'FR', label: 'France' },
    { value: 'GA', label: 'Gabon' },
    { value: 'GM', label: 'Gambia' },
    { value: 'GE', label: 'Georgia' },
    { value: 'DE', label: 'Germany' },
    { value: 'GH', label: 'Ghana' },
    { value: 'GR', label: 'Greece' },
    { value: 'GD', label: 'Grenada' },
    { value: 'GT', label: 'Guatemala' },
    { value: 'GN', label: 'Guinea' },
    { value: 'GW', label: 'Guinea-Bissau' },
    { value: 'GY', label: 'Guyana' },
    { value: 'HT', label: 'Haiti' },
    { value: 'HN', label: 'Honduras' },
    { value: 'HU', label: 'Hungary' },
    { value: 'IS', label: 'Iceland' },
    { value: 'IN', label: 'India' },
    { value: 'ID', label: 'Indonesia' },
    { value: 'IR', label: 'Iran' },
    { value: 'IQ', label: 'Iraq' },
    { value: 'IE', label: 'Ireland' },
    { value: 'IL', label: 'Israel' },
    { value: 'IT', label: 'Italy' },
    { value: 'JM', label: 'Jamaica' },
    { value: 'JP', label: 'Japan' },
    { value: 'JO', label: 'Jordan' },
    { value: 'KZ', label: 'Kazakhstan' },
    { value: 'KE', label: 'Kenya' },
    { value: 'KI', label: 'Kiribati' },
    { value: 'KP', label: 'Korea (North)' },
    { value: 'KR', label: 'Korea (South)' },
    { value: 'KW', label: 'Kuwait' },
    { value: 'KG', label: 'Kyrgyzstan' },
    { value: 'LA', label: 'Laos' },
    { value: 'LV', label: 'Latvia' },
    { value: 'LB', label: 'Lebanon' },
    { value: 'LS', label: 'Lesotho' },
    { value: 'LR', label: 'Liberia' },
    { value: 'LY', label: 'Libya' },
    { value: 'LI', label: 'Liechtenstein' },
    { value: 'LT', label: 'Lithuania' },
    { value: 'LU', label: 'Luxembourg' },
    { value: 'MG', label: 'Madagascar' },
    { value: 'MW', label: 'Malawi' },
    { value: 'MY', label: 'Malaysia' },
    { value: 'MV', label: 'Maldives' },
    { value: 'ML', label: 'Mali' },
    { value: 'MT', label: 'Malta' },
    { value: 'MH', label: 'Marshall Islands' },
    { value: 'MR', label: 'Mauritania' },
    { value: 'MU', label: 'Mauritius' },
    { value: 'MX', label: 'Mexico' },
    { value: 'FM', label: 'Micronesia' },
    { value: 'MD', label: 'Moldova' },
    { value: 'MC', label: 'Monaco' },
    { value: 'MN', label: 'Mongolia' },
    { value: 'ME', label: 'Montenegro' },
    { value: 'MA', label: 'Morocco' },
    { value: 'MZ', label: 'Mozambique' },
    { value: 'MM', label: 'Myanmar' },
    { value: 'NA', label: 'Namibia' },
    { value: 'NR', label: 'Nauru' },
    { value: 'NP', label: 'Nepal' },
    { value: 'NL', label: 'Netherlands' },
    { value: 'NZ', label: 'New Zealand' },
    { value: 'NI', label: 'Nicaragua' },
    { value: 'NE', label: 'Niger' },
    { value: 'NG', label: 'Nigeria' },
    { value: 'MK', label: 'North Macedonia' },
    { value: 'NO', label: 'Norway' },
    { value: 'OM', label: 'Oman' },
    { value: 'PK', label: 'Pakistan' },
    { value: 'PW', label: 'Palau' },
    { value: 'PS', label: 'Palestine' },
    { value: 'PA', label: 'Panama' },
    { value: 'PG', label: 'Papua New Guinea' },
    { value: 'PY', label: 'Paraguay' },
    { value: 'PE', label: 'Peru' },
    { value: 'PH', label: 'Philippines' },
    { value: 'PL', label: 'Poland' },
    { value: 'PT', label: 'Portugal' },
    { value: 'QA', label: 'Qatar' },
    { value: 'RO', label: 'Romania' },
    { value: 'RU', label: 'Russia' },
    { value: 'RW', label: 'Rwanda' },
    { value: 'KN', label: 'Saint Kitts and Nevis' },
    { value: 'LC', label: 'Saint Lucia' },
    { value: 'VC', label: 'Saint Vincent and the Grenadines' },
    { value: 'WS', label: 'Samoa' },
    { value: 'SM', label: 'San Marino' },
    { value: 'ST', label: 'Sao Tome and Principe' },
    { value: 'SA', label: 'Saudi Arabia' },
    { value: 'SN', label: 'Senegal' },
    { value: 'RS', label: 'Serbia' },
    { value: 'SC', label: 'Seychelles' },
    { value: 'SL', label: 'Sierra Leone' },
    { value: 'SG', label: 'Singapore' },
    { value: 'SK', label: 'Slovakia' },
    { value: 'SI', label: 'Slovenia' },
    { value: 'SB', label: 'Solomon Islands' },
    { value: 'SO', label: 'Somalia' },
    { value: 'ZA', label: 'South Africa' },
    { value: 'SS', label: 'South Sudan' },
    { value: 'ES', label: 'Spain' },
    { value: 'LK', label: 'Sri Lanka' },
    { value: 'SD', label: 'Sudan' },
    { value: 'SR', label: 'Suriname' },
    { value: 'SE', label: 'Sweden' },
    { value: 'CH', label: 'Switzerland' },
    { value: 'SY', label: 'Syria' },
    { value: 'TW', label: 'Taiwan' },
    { value: 'TJ', label: 'Tajikistan' },
    { value: 'TZ', label: 'Tanzania' },
    { value: 'TH', label: 'Thailand' },
    { value: 'TL', label: 'Timor-Leste' },
    { value: 'TG', label: 'Togo' },
    { value: 'TO', label: 'Tonga' },
    { value: 'TT', label: 'Trinidad and Tobago' },
    { value: 'TN', label: 'Tunisia' },
    { value: 'TR', label: 'Turkey' },
    { value: 'TM', label: 'Turkmenistan' },
    { value: 'TV', label: 'Tuvalu' },
    { value: 'UG', label: 'Uganda' },
    { value: 'UA', label: 'Ukraine' },
    { value: 'AE', label: 'United Arab Emirates' },
    { value: 'GB', label: 'United Kingdom' },
    { value: 'US', label: 'United States' },
    { value: 'UY', label: 'Uruguay' },
    { value: 'UZ', label: 'Uzbekistan' },
    { value: 'VU', label: 'Vanuatu' },
    { value: 'VA', label: 'Vatican City' },
    { value: 'VE', label: 'Venezuela' },
    { value: 'VN', label: 'Vietnam' },
    { value: 'YE', label: 'Yemen' },
    { value: 'ZM', label: 'Zambia' },
    { value: 'ZW', label: 'Zimbabwe' },
  ];
  
  getCountByCountry();
  console.log("hii", filteredMarkersForTable);
  const options = [
    { value: "All", label: "All" },
    { value: "A", label: "A" },
    { value: "B", label: "B" },
    { value: "C", label: "C" },
    { value: "D", label: "D" },
    { value: "E", label: "E" },
    { value: "F", label: "F" },
    { value: "G", label: "G" },
    { value: "H", label: "H" },
    { value: "I", label: "I" },
    { value: "J", label: "J" },
    { value: "K", label: "K" },
    { value: "L", label: "L" },
    { value: "M", label: "M" },
  
  ];

  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 10;
  const maxPageNumbersToShow = 5;

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "↑" });
  const sortedMarkers = React.useMemo(() => {
    let sortableItems = [...filteredMarkersForTable];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "↑" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "↑" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredMarkersForTable, sortConfig]);

  const requestSort = (key) => {
    let direction = "↑";
    if (sortConfig.key === key && sortConfig.direction === "↑") {
      direction = "↓";
    }
    setSortConfig({ key, direction });
  };

  const getClassNamesFor = (key) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === key ? sortConfig.direction : undefined;
  };

  // Calculate the indexes of the first and last items on the current page
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItems = sortedMarkers.slice(indexOfFirstItem, indexOfLastItem);

  // Get total pages
  const totalPages = Math.ceil(filteredMarkersForTable.length / rowsPerPage);

  // Calculate the range of page numbers to show
  const startPage = Math.max(
    1,
    currentPage - Math.floor(maxPageNumbersToShow / 2)
  );
  const endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
 
  const handleCountrySelectionForTable = (selectedOption) => {

   
    if (selectedOption && selectedOption.value) {
      setSelectedCountry2(selectedOption ? selectedOption.value : null);
     
    } else {
      // Handle the case where selectedOption is null or undefined
      setSelectedCountry2("");
      console.log('No country selected');
    }
  };
  console.log(currentItems)
  return (
    <>
      <div className="flex flex-col bg-gray-200">
        {/* Header Section */}
        <div className="font-bold text-3xl text-center p-4 bg-gray-200">
          Global DNS root servers visualizer
        </div>

        {/* Main Content Section */}
        <div className="flex lg:flex-row flex-col gap-5">
          {/* Sidebar Filters */}
          
          

 {/* Main Content Area */}
<div className="flex-1 relative">
  {/* Map Section */}
  <div className="w-full h-[80vh] bg-gray-100 flex">
    <MapContainer
      center={[51.505, -0.09]}
      zoom={2}
      className="w-3/5 h-full"
      ref={mapRef}
      minZoom={2}
      maxZoom={10}
      worldCopyJump={true}
      maxBounds={bounds}
      maxBoundsViscosity={1.0}
    >
      <TileLayer
        url="https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=gAqMvillSWIbJwin1cPn"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MarkerClusterGroup
        showCoverageOnHover={false}
        zoomToBoundsOnClick={true}
        spiderfyOnMaxZoom={true}
      >
        {filteredMarkers.map((marker) => (
          (!selectedCountry ||
            marker.country === selectedCountry ||
            selectedCountry === "All") &&
          (checkedLabels.length === 0 ||
            checkedLabels.includes(marker.rootInstanceName)) && (
              <Marker
                key={marker.ID}
                position={[marker.Latitude, marker.Longitude]}
                icon={createCustomIcon(
                  colorMapping[marker.rootInstanceName],
                  marker.rootInstanceName
                )}
              >
                <Popup>
                  <div className="border border-gray-400 p-2">
                    <div className="font-bold bg-gray-100 p-2">
                      {marker.name}, {marker.country}
                    </div>
                    <div className="flex items-center p-2">
                      <div className="font-bold w-24">Operator</div>
                      <div className="text-sm">{marker.Operator}</div>
                    </div>
                    <div className="flex bg-gray-100 items-center p-2">
                      <div className="w-24 font-bold">IPv4</div>
                      <div>{marker.IPv4}</div>
                    </div>
                    <div className="flex items-center p-2">
                      <div className="w-24 font-bold">IPv6</div>
                      <div>{marker.IPv6}</div>
                    </div>
                    <div className="flex bg-gray-100 items-center p-2">
                      <div className="w-24 font-bold">ASN</div>
                      <div>{marker.ASN}</div>
                    </div>
                    {marker.Instances !== 1 && (
                      <div className="flex items-center p-2">
                        <div className="font-bold w-24">Instances</div>
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

    <div className="w-2/5 h-[80vh] p-2 bg-white">
      <div className="bg-white rounded-lg shadow-lg p-2 w-full h-full flex flex-col overflow-y-auto">
        <Legend
          countrycode={handleCountrySelection}
          sendCheckedLabels={handleCheckedLabels}
          continentselected={handleContinentSelection}
        />
        <table className="table-auto w-full h-full">
          <thead>
            <tr className="bg-gray-200 text-center">
              <th className="px-1 py-1 text-xs">Root Instance</th>
              <th className="px-1 py-1 text-xs">Sites</th>
              <th className="px-1 py-1 text-xs">Instances</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(colorMapping).map((label, index) => (
              <tr key={label} className={index % 2 === 0 ? 'bg-gray-100 text-center' : 'bg-gray-50 text-center'}>
                <td className="px-1 py-0 text-xs">{label}</td>
                <td className="px-1 py-0 text-xs">{siteCounts[label] || 0}</td>
                <td className="px-1 py-0 text-xs">{counts[label] || 0}</td>
              </tr>
            ))}
            <tr className="bg-gray-200 text-center">
              <td className="px-1 py-1 text-xs">Total</td>
              <td className="px-1 py-1 text-xs">{totalCount_site}</td>
              <td className="px-1 py-1 text-xs">{totalCount}</td>
            </tr>
          </tbody>
        </table>
        <button
          onClick={downloadCSV}
          className="mt-2 p-2 bg-blue-500 text-white rounded text-xs"
        >
          Download CSV
        </button>
      </div>
    </div>
  </div>



            {/* Charts and Tables Section */}
            <div className="text-center bg-slate-100">
              <p className="p-4 text-md font-semibold text-gray-700 bg-slate-100">
                The root server system consists of {totalInstances} instances operated by the 12 independent root server operators.
              </p>
            </div>
            
              {/* Left Side - Charts */}
              <div className="w-full flex flex-row items-center">
                {/* Pie Chart Component */}
                <div className="w-full">
                               <div className="font-bold text-2xl text-center p-3 ">
               World Instances
             </div>
                <Piechart data={aggregatedData} />
                </div>
                <div className="w-full">
             
             <div className="font-bold text-2xl text-center p-3 ">
               Asia Instances
             </div>
             <Pie_Asia data={aggregatedDataAsia} />
           
           </div>

              </div>

          
  
               

            {/* Tables Section */}
            <div className="mt-2">
              {/* Table 2 - Main Data Table */}
              <div className="mt-2 bg-slate-100 rounded-lg shadow-lg p-4 overflow-x-auto">
              <div className="">
          <div className="my-2 text-2xl text-center">
            Root Server Deployment by City
          </div>
          <div className=" flex justify-center my-2 ">
                  
                  <Select
                    options={options}
                    labelField="label"
                    valueField="value"
                    onChange={(values) => {
                      setvalues(values.map((v) => v.value));
                      setCurrentPage(1); // Reset pagination for table 1
                      // setCurrentPage_2(1); // Reset pagination for table 2
                    }}
                    style={{ width: "", backgroundColor: "white", color: "black" }}
                    searchable={false}
                    placeholder={"Roots"}
                    dropdownGap={0}
                  />
   <Select
  options={countryOptions}
  onChange={(selectedOption) => {
    if (selectedOption) {
      handleCountrySelectionForTable(selectedOption[0]);
    } else {
      handleCountrySelectionForTable(null); // Handle null case
    }
  }}
  value={selectedCountry2 ? countryOptions.find((option) => option.value === selectedCountry2) : null}
  style={{ width: "", backgroundColor: "white", color: "black" }}
  placeholder="Select Country"
  searchable={true}
/>


            
             
            </div>
        </div>



  <table className="table-auto w-full text-center">
                  <thead>
                    <tr className="bg-gray-200">
                    {(values == "All" || values == ""  )&& (<th
                        className={`px-4 py-2 cursor-pointer ${getClassNamesFor("Instances")} w-1/5`}
                        onClick={() => requestSort("Instances")}
                      >
                        Root Instance {sortConfig.key === 'Instances' ? sortConfig.direction : '↑↓'}
                      </th>)}
                      <th
                        className={`px-4 py-2 cursor-pointer ${getClassNamesFor("name")} w-1/5`}
                        onClick={() => requestSort("name")}
                      >
                        City {sortConfig.key === 'name' ? sortConfig.direction : '↑↓'}
                      </th>
                      <th
                        className={`px-4 py-2 cursor-pointer ${getClassNamesFor("Country")} w-1/5`}
                        onClick={() => requestSort("Country")}
                      >
                        Country {sortConfig.key === 'Country' ? sortConfig.direction : '↑↓'}
                      </th>
                      <th
                        className={`px-4 py-2 cursor-pointer ${getClassNamesFor("type")} w-1/5`}
                        onClick={() => requestSort("type")}
                      >
                        Type {sortConfig.key === 'type' ? sortConfig.direction : '↑↓'}
                      </th>
                      <th
                        className={`px-4 py-2 cursor-pointer ${getClassNamesFor("ipv6")} w-1/5`}
                        onClick={() => requestSort("ipv6")}
                      >
                        IPv6 Enabled {sortConfig.key === 'ipv6' ? sortConfig.direction : '↑↓'}
                      </th>
                      <th
                        className={`px-4 py-2 cursor-pointer ${getClassNamesFor("Instances")} w-1/5`}
                        onClick={() => requestSort("Instances")}
                      >
                        Instances {sortConfig.key === 'Instances' ? sortConfig.direction : '↑↓'}
                      </th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((marker, index) => (
                      <tr key={marker.ID} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50'}>
                        {(values == "All" || values == ""  )&& (<td className="px-4 py-2 w-1/5">{marker.rootInstanceName}</td>)}
                        <td className="px-4 py-2 w-1/5">{marker.name}</td>
                        <td className="px-4 py-2 w-1/5">{findCountryNameByCode(marker.country)}</td>
                        <td className="px-4 py-2 w-1/5">{marker.type}</td>
                        <td className="px-4 py-2 w-1/5">{marker.ipv6 ? "Yes" : "No"}</td>
                        <td className="px-4 py-2 w-1/5">{marker.Instances}</td>
               
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Pagination */}
                <nav className="py-2">
                  <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''} hover:cursor-pointer`}>
                      <li className="page-link" aria-label="Previous" onClick={() => paginate(currentPage - 1)}>
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Previous</span>
                      </li>
                    </li>
                    {[...Array(endPage - startPage + 1).keys()].map((i) => (
                      <li key={i + startPage} className={`page-item ${currentPage === i + startPage ? 'active' : ''} hover:cursor-pointer`}>
                        <li onClick={() => paginate(i + startPage)} className="page-link">
                          {i + startPage}
                        </li>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''} hover:cursor-pointer`}>
                      <li className="page-link" aria-label="Next" onClick={() => paginate(currentPage + 1)}>
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
                      </li>
                    </li>
                  </ul>
                </nav>
              
              </div>

              {/* Table 3 - Additional Data Table */}
              {/* <div className="mt-4 bg-white rounded-lg shadow-lg p-4 overflow-x-auto">
  <table className="table-auto w-full text-center">
    <thead>
      <tr className="bg-gray-200">
        <th
          className={`px-4 py-2 cursor-pointer ${getClassNamesFor2('Country')}`}
          onClick={() => requestSort2('Country')}
        >
          Country {sortConfig2.key === 'Country' ? '↑↓' : '↑↓'}
        </th>
        <th
          className={`px-4 py-2 cursor-pointer ${getClassNamesFor2('Sites')}`}
          onClick={() => requestSort2('Sites')}
        >
          Sites {sortConfig2.key === 'Sites' ? '↑↓' : '↑↓'}
        </th>
        <th
          className={`px-4 py-2 cursor-pointer ${getClassNamesFor2('Instances')}`}
          onClick={() => requestSort2('Instances')}
        >
          Instances {sortConfig2.key === 'Instances' ? '↑↓' : '↑↓'}
        </th>
      </tr>
    </thead>
    <tbody>
      {currentItems_2.map((marker, index) => (
        <tr key={marker.ID} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50'}>
          <td className="px-4 py-2">{findCountryNameByCode(marker.country)}</td>
          <td className="px-4 py-2">{getCountByCountry()[marker.country]?.count}</td>
          <td className="px-4 py-2">{getCountByCountry()[marker.country]?.instances || 0}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div> */}
            </div>

            {/* Additional Components */}
            {/* <div className="mt-4">
             
              <div className="font-bold text-2xl text-center p-3">
                Asia Instances
              </div>
              <Pie_Asia data={aggregatedDataAsia} />
            
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;