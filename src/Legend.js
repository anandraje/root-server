import React, { useState } from 'react';
import * as Icon from 'react-icons/fi';
import Checkbox from 'react-custom-checkbox';
import Select from 'react-select';

import './Legen.css'
import { isDisabled } from '@testing-library/user-event/dist/utils';
const Legend = ({ countrycode, sendCheckedLabels, continentselected ,marker}) => {
  const colorMapping1 = {
    A: '#FF0000',    // Red
    B: '#0000FF',    // Blue
    C: '#013220',    // Green
    D: '#FFA500',    // Orange
    E: '#800080',    // Purple
    F: '#FFD000',    // Yellow
    G: '#CC0066',    // Pink
  };

  const colorMapping2 = {
    H: '#00FFFF',    // Cyan
    I: '#A52A2A',    // Brown
    J: '#00FF00',    // Lime
    K: '#EE82EE',    // Violet
    L: '#808080',    // Gray
    M: '#000000',    // Black
    All: '#700000',  // Dark Red
  };

  const markerCountries = new Set(marker.map(marker => marker.country));
console.log("lo",markerCountries)
// Update countries array with disabled or styled options
  const [country,selectedcountry] =useState({value:"All",label:"All"})
  const [checkedLabels, setCheckedLabels] = useState(['All']);
  
  const handleCheckboxChange = (label) => {
    if (label === 'All') {
      setCheckedLabels(['All']);
      sendCheckedLabels(['All']);
    } else {
      const newCheckedLabels = checkedLabels.includes(label)
        ? checkedLabels.filter((item) => item !== label)
        : [...checkedLabels, label];

      if (newCheckedLabels.includes('All')) {
        newCheckedLabels.splice(newCheckedLabels.indexOf('All'), 1);
      }

      setCheckedLabels(newCheckedLabels);
      sendCheckedLabels(newCheckedLabels);
    }
  };

  const sendCountryToApp = (selectedCountry) => {
    console.log('Selected country value:', selectedCountry);
    countrycode(selectedCountry);
  };

  const sendContinenttoApp = (continent) => {
    
    continentselected(continent);
  };
  const handleChange = (selectedOption) => {
    if(selectedOption.value=="All"){

      setFilteredCountries(countries)
    }
    selectedcountry({ value: "All", label: "All" });
    sendContinenttoApp(selectedOption.value);
  };
  const handleChange2 = (selectedOption) => {
    if(selectedOption.value=="All"){
      
      setFilteredCountries(filteredCountries)
    }
   
    sendCountryToApp(selectedOption.value);
  };
  const [selectedContinent, setSelectedContinent] = useState({value:"All",label:"All"})
  const countries = [
    { value: 'All', label: 'All', continent: selectedContinent },

    { value: 'AF', label: 'Afghanistan', continent: 'Asia' },
    { value: 'AL', label: 'Albania', continent: 'Europe' },
    { value: 'DZ', label: 'Algeria', continent: 'Africa' },
    { value: 'AD', label: 'Andorra', continent: 'Europe' },
    { value: 'AO', label: 'Angola', continent: 'Africa' },
    { value: 'AI', label: 'Anguilla', continent: 'North_America' },
    { value: 'AG', label: 'Antigua and Barbuda', continent: 'North_America' },
    { value: 'AR', label: 'Argentina', continent: 'South_America' },
    { value: 'AM', label: 'Armenia', continent: 'Asia' },
    { value: 'AW', label: 'Aruba', continent: 'North_America' },
    { value: 'AU', label: 'Australia', continent: 'Australia' },
    { value: 'AT', label: 'Austria', continent: 'Europe' },
    { value: 'AZ', label: 'Azerbaijan', continent: 'Asia' },
    { value: 'BS', label: 'Bahamas', continent: 'North_America' },
    { value: 'BH', label: 'Bahrain', continent: 'Asia' },
    { value: 'BD', label: 'Bangladesh', continent: 'Asia' },
    { value: 'BB', label: 'Barbados', continent: 'North_America' },
    { value: 'BY', label: 'Belarus', continent: 'Europe' },
    { value: 'BE', label: 'Belgium', continent: 'Europe' },
    { value: 'BZ', label: 'Belize', continent: 'North_America' },
    { value: 'BJ', label: 'Benin', continent: 'Africa' },
    { value: 'BM', label: 'Bermuda', continent: 'North_America' },
    { value: 'BT', label: 'Bhutan', continent: 'Asia' },
    { value: 'BO', label: 'Bolivia', continent: 'South_America' },
    { value: 'BA', label: 'Bosnia and Herzegovina', continent: 'Europe' },
    { value: 'BW', label: 'Botswana', continent: 'Africa' },
    { value: 'BR', label: 'Brazil', continent: 'South_America' },
    { value: 'BN', label: 'Brunei', continent: 'Asia' },
    { value: 'BG', label: 'Bulgaria', continent: 'Europe' },
    { value: 'BF', label: 'Burkina Faso', continent: 'Africa' },
    { value: 'BI', label: 'Burundi', continent: 'Africa' },
    { value: 'KH', label: 'Cambodia', continent: 'Asia' },
    { value: 'CM', label: 'Cameroon', continent: 'Africa' },
    { value: 'CA', label: 'Canada', continent: 'North_America' },
    { value: 'CV', label: 'Cape Verde', continent: 'Africa' },
    { value: 'KY', label: 'Cayman Islands', continent: 'North_America' },
    { value: 'CF', label: 'Central African Republic', continent: 'Africa' },
    { value: 'TD', label: 'Chad', continent: 'Africa' },
    { value: 'CL', label: 'Chile', continent: 'South_America' },
    { value: 'CN', label: 'China', continent: 'Asia' },
    { value: 'CO', label: 'Colombia', continent: 'South_America' },
    { value: 'KM', label: 'Comoros', continent: 'Africa' },
    { value: 'CG', label: 'Republic of the Congo', continent: 'Africa' },
    { value: 'CD', label: 'Democratic Republic of the Congo', continent: 'Africa' },
    { value: 'CR', label: 'Costa Rica', continent: 'North_America' },
    { value: 'CI', label: 'Ivory Coast', continent: 'Africa' },
    { value: 'HR', label: 'Croatia', continent: 'Europe' },
    { value: 'CU', label: 'Cuba', continent: 'North_America' },
    { value: 'CW', label: 'Curaçao', continent: 'North_America' },
    { value: 'CY', label: 'Cyprus', continent: 'Europe' },
    { value: 'CZ', label: 'Czech Republic', continent: 'Europe' },
    { value: 'DK', label: 'Denmark', continent: 'Europe' },
    { value: 'DJ', label: 'Djibouti', continent: 'Africa' },
    { value: 'DM', label: 'Dominica', continent: 'North_America' },
    { value: 'DO', label: 'Dominican Republic', continent: 'North_America' },
    { value: 'TL', label: 'East Timor', continent: 'Asia' },
    { value: 'EC', label: 'Ecuador', continent: 'South_America' },
    { value: 'EG', label: 'Egypt', continent: 'Africa' },
    { value: 'SV', label: 'El Salvador', continent: 'North_America' },
    { value: 'GQ', label: 'Equatorial Guinea', continent: 'Africa' },
    { value: 'ER', label: 'Eritrea', continent: 'Africa' },
    { value: 'EE', label: 'Estonia', continent: 'Europe' },
    { value: 'ET', label: 'Ethiopia', continent: 'Africa' },
    { value: 'FO', label: 'Faroe Islands', continent: 'Europe' },
    { value: 'FJ', label: 'Fiji', continent: 'Australia' },
    { value: 'FI', label: 'Finland', continent: 'Europe' },
    { value: 'FR', label: 'France', continent: 'Europe' },
    { value: 'GA', label: 'Gabon', continent: 'Africa' },
    { value: 'GM', label: 'Gambia', continent: 'Africa' },
    { value: 'GE', label: 'Georgia', continent: 'Asia' },
    { value: 'DE', label: 'Germany', continent: 'Europe' },
    { value: 'GH', label: 'Ghana', continent: 'Africa' },
    { value: 'GI', label: 'Gibraltar', continent: 'Europe' },
    { value: 'GR', label: 'Greece', continent: 'Europe' },
    { value: 'GL', label: 'Greenland', continent: 'North_America' },
    { value: 'GD', label: 'Grenada', continent: 'North_America' },
    { value: 'GT', label: 'Guatemala', continent: 'North_America' },
    { value: 'GN', label: 'Guinea', continent: 'Africa' },
    { value: 'GW', label: 'Guinea-Bissau', continent: 'Africa' },
    { value: 'GY', label: 'Guyana', continent: 'South_America' },
    { value: 'HT', label: 'Haiti', continent: 'North_America' },
    { value: 'HN', label: 'Honduras', continent: 'North_America' },
    { value: 'HK', label: 'Hong Kong', continent: 'Asia' },
    { value: 'HU', label: 'Hungary', continent: 'Europe' },
    { value: 'IS', label: 'Iceland', continent: 'Europe' },
    { value: 'IN', label: 'India', continent: 'Asia' },
    { value: 'ID', label: 'Indonesia', continent: 'Asia' },
    { value: 'IR', label: 'Iran', continent: 'Asia' },
    { value: 'IQ', label: 'Iraq', continent: 'Asia' },
    { value: 'IE', label: 'Ireland', continent: 'Europe' },
    { value: 'IL', label: 'Israel', continent: 'Asia' },
    { value: 'IT', label: 'Italy', continent: 'Europe' },
    { value: 'JM', label: 'Jamaica', continent: 'North_America' },
    { value: 'JP', label: 'Japan', continent: 'Asia' },
    { value: 'JO', label: 'Jordan', continent: 'Asia' },
    { value: 'KZ', label: 'Kazakhstan', continent: 'Asia' },
    { value: 'KE', label: 'Kenya', continent: 'Africa' },
    { value: 'KI', label: 'Kiribati', continent: 'Australia' },
    { value: 'KW', label: 'Kuwait', continent: 'Asia' },
    { value: 'KG', label: 'Kyrgyzstan', continent: 'Asia' },
    { value: 'LA', label: 'Laos', continent: 'Asia' },
    { value: 'LV', label: 'Latvia', continent: 'Europe' },
    { value: 'LB', label: 'Lebanon', continent: 'Asia' },
    { value: 'LS', label: 'Lesotho', continent: 'Africa' },
    { value: 'LR', label: 'Liberia', continent: 'Africa' },
    { value: 'LY', label: 'Libya', continent: 'Africa' },
    { value: 'LI', label: 'Liechtenstein', continent: 'Europe' },
    { value: 'LT', label: 'Lithuania', continent: 'Europe' },
    { value: 'LU', label: 'Luxembourg', continent: 'Europe' },
    { value: 'MO', label: 'Macau', continent: 'Asia' },
    { value: 'MK', label: 'North Macedonia', continent: 'Europe' },
    { value: 'MG', label: 'Madagascar', continent: 'Africa' },
    { value: 'MW', label: 'Malawi', continent: 'Africa' },
    { value: 'MY', label: 'Malaysia', continent: 'Asia' },
    { value: 'MV', label: 'Maldives', continent: 'Asia' },
    { value: 'ML', label: 'Mali', continent: 'Africa' },
    { value: 'MT', label: 'Malta', continent: 'Europe' },
    { value: 'MH', label: 'Marshall Islands', continent: 'Australia' },
    { value: 'MR', label: 'Mauritania', continent: 'Africa' },
    { value: 'MU', label: 'Mauritius', continent: 'Africa' },
    { value: 'MX', label: 'Mexico', continent: 'North_America' },
    { value: 'FM', label: 'Micronesia', continent: 'Australia' },
    { value: 'MD', label: 'Moldova', continent: 'Europe' },
    { value: 'MC', label: 'Monaco', continent: 'Europe' },
    { value: 'MN', label: 'Mongolia', continent: 'Asia' },
    { value: 'ME', label: 'Montenegro', continent: 'Europe' },
    { value: 'MA', label: 'Morocco', continent: 'Africa' },
    { value: 'MZ', label: 'Mozambique', continent: 'Africa' },
    { value: 'MM', label: 'Myanmar', continent: 'Asia' },
    { value: 'NA', label: 'Namibia', continent: 'Africa' },
    { value: 'NR', label: 'Nauru', continent: 'Australia' },
    { value: 'NP', label: 'Nepal', continent: 'Asia' },
    { value: 'NL', label: 'Netherlands', continent: 'Europe' },
    { value: 'NZ', label: 'New Zealand', continent: 'Australia' },
    { value: 'NI', label: 'Nicaragua', continent: 'North_America' },
    { value: 'NE', label: 'Niger', continent: 'Africa' },
    { value: 'NG', label: 'Nigeria', continent: 'Africa' },
    { value: 'KP', label: 'North Korea', continent: 'Asia' },
    { value: 'NO', label: 'Norway', continent: 'Europe' },
    { value: 'OM', label: 'Oman', continent: 'Asia' },
    { value: 'PK', label: 'Pakistan', continent: 'Asia' },
    { value: 'PW', label: 'Palau', continent: 'Australia' },
    { value: 'PS', label: 'Palestine', continent: 'Asia' },
    { value: 'PA', label: 'Panama', continent: 'North_America' },
    { value: 'PG', label: 'Papua New Guinea', continent: 'Australia' },
    { value: 'PY', label: 'Paraguay', continent: 'South_America' },
    { value: 'PE', label: 'Peru', continent: 'South_America' },
    { value: 'PH', label: 'Philippines', continent: 'Asia' },
    { value: 'PL', label: 'Poland', continent: 'Europe' },
    { value: 'PT', label: 'Portugal', continent: 'Europe' },
    { value: 'QA', label: 'Qatar', continent: 'Asia' },
    { value: 'RO', label: 'Romania', continent: 'Europe' },
    { value: 'RU', label: 'Russia', continent: 'Europe' },
    { value: 'RW', label: 'Rwanda', continent: 'Africa' },
    { value: 'KN', label: 'Saint Kitts and Nevis', continent: 'North_America' },
    { value: 'LC', label: 'Saint Lucia', continent: 'North_America' },
    { value: 'VC', label: 'Saint Vincent and the Grenadines', continent: 'North_America' },
    { value: 'WS', label: 'Samoa', continent: 'Australia' },
    { value: 'SM', label: 'San Marino', continent: 'Europe' },
    { value: 'ST', label: 'São Tomé and Príncipe', continent: 'Africa' },
    { value: 'SA', label: 'Saudi Arabia', continent: 'Asia' },
    { value: 'SN', label: 'Senegal', continent: 'Africa' },
    { value: 'RS', label: 'Serbia', continent: 'Europe' },
    { value: 'SC', label: 'Seychelles', continent: 'Africa' },
    { value: 'SL', label: 'Sierra Leone', continent: 'Africa' },
    { value: 'SG', label: 'Singapore', continent: 'Asia' },
    { value: 'SK', label: 'Slovakia', continent: 'Europe' },
    { value: 'SI', label: 'Slovenia', continent: 'Europe' },
    { value: 'SB', label: 'Solomon Islands', continent: 'Australia' },
    { value: 'SO', label: 'Somalia', continent: 'Africa' },
    { value: 'ZA', label: 'South Africa', continent: 'Africa' },
    { value: 'KR', label: 'South Korea', continent: 'Asia' },
    { value: 'SS', label: 'South Sudan', continent: 'Africa' },
    { value: 'ES', label: 'Spain', continent: 'Europe' },
    { value: 'LK', label: 'Sri Lanka', continent: 'Asia' },
    { value: 'SD', label: 'Sudan', continent: 'Africa' },
    { value: 'SR', label: 'Suriname', continent: 'South_America' },
    { value: 'SZ', label: 'Eswatini', continent: 'Africa' },
    { value: 'SE', label: 'Sweden', continent: 'Europe' },
    { value: 'CH', label: 'Switzerland', continent: 'Europe' },
    { value: 'SY', label: 'Syria', continent: 'Asia' },
    { value: 'TW', label: 'Taiwan', continent: 'Asia' },
    { value: 'TJ', label: 'Tajikistan', continent: 'Asia' },
    { value: 'TZ', label: 'Tanzania', continent: 'Africa' },
    { value: 'TH', label: 'Thailand', continent: 'Asia' },
    { value: 'TG', label: 'Togo', continent: 'Africa' },
    { value: 'TO', label: 'Tonga', continent: 'Australia' },
    { value: 'TT', label: 'Trinidad and Tobago', continent: 'North_America' },
    { value: 'TN', label: 'Tunisia', continent: 'Africa' },
    { value: 'TR', label: 'Turkey', continent: 'Asia' },
    { value: 'TM', label: 'Turkmenistan', continent: 'Asia' },
    { value: 'TV', label: 'Tuvalu', continent: 'Australia' },
    { value: 'UG', label: 'Uganda', continent: 'Africa' },
    { value: 'UA', label: 'Ukraine', continent: 'Europe' },
    { value: 'AE', label: 'United Arab Emirates', continent: 'Asia' },
    { value: 'GB', label: 'United Kingdom', continent: 'Europe' },
    { value: 'US', label: 'United States', continent: 'North_America' },
    { value: 'UY', label: 'Uruguay', continent: 'South_America' },
    { value: 'UZ', label: 'Uzbekistan', continent: 'Asia' },
    { value: 'VU', label: 'Vanuatu', continent: 'Australia' },
    { value: 'VA', label: 'Vatican City', continent: 'Europe' },
    { value: 'VE', label: 'Venezuela', continent: 'South_America' },
    { value: 'VN', label: 'Vietnam', continent: 'Asia' },
    { value: 'YE', label: 'Yemen', continent: 'Asia' },
    { value: 'ZM', label: 'Zambia', continent: 'Africa' },
    { value: 'ZW', label: 'Zimbabwe', continent: 'Africa'  }
  ];
  
  const options = [
    { value: 'All', label: 'All' },
    { value: 'Asia', label: 'Asia' },
    { value: 'North_America', label: 'North America' },
    { value: 'South_America', label: 'South America' },
    { value: 'Australia', label: 'Australia' },
    { value: 'Africa', label: 'Africa' },
    { value: 'Europe', label: 'Europe' },
  ];
  
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const updatedCountries =filteredCountries.map(country => {
    const hasMarker = markerCountries.has(country.value) || country.value=="All";
    return {
      ...country,
      isDisabled: !hasMarker, // Add a property to indicate if the country should be disabled
    };
  });
console.log(updatedCountries)
  const handleContinentChange = (selectedOption) => {
    setSelectedContinent(selectedOption);
    selectedcountry({ value: "All", label: "All" });
    
    const filtered = countries.filter(country => country.continent === selectedOption.value || country.value=="All");
    console.log("hey",country);
    setFilteredCountries({value:"All",label:"All"})
    setFilteredCountries(filtered);
    handleChange2({label:"All"}); 
    handleChange(selectedOption);
  };
  console.log("bol",country)
  const handleCountryChange = (selectedOption) => {
    console.log("heyy",country);
    selectedcountry(selectedOption)
    handleChange2(selectedOption);
  };

  return (
    <div className='bg-white  shadow-md p-2 '>
      <div className='mb-2'>
        <div className='text-md font-semibold mb-2'>Continent</div>
        <Select
          options={options}
          
          onChange={(selectedOption) => {
            if (selectedOption) {
              handleContinentChange(selectedOption);
            }
          }}
          value={selectedContinent}
          className='w-full  border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500'
        />
      
      </div>
      <div>
        <div className='text-md font-semibold mb-2'>Country</div>
        <Select
          options={updatedCountries}
          onChange={(selectedOption) => {
            if (selectedOption) {
              handleCountryChange(selectedOption);
            }
          }}
          value={country}
          className='w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500'
          styles={{
            option: (provided, state) => ({
              ...provided,
              opacity: state.isDisabled ? 0.5 : 1,
              cursor: state.isDisabled ? 'not-allowed' : 'default',
            }),
          }}
        />

   
      </div>
      <div className='mt-2'>
        <div className='text-md font-semibold mb-2'>Root Instances</div>
        <div className='flex flex-wrap gap-1'>
          {/* ColorMapping1 checkboxes */}
          {Object.keys(colorMapping1).map((label) => (
            <Checkbox
              key={label}
              checked={checkedLabels.includes(label)}
              onChange={() => handleCheckboxChange(label)}
              icon={
                <div
                  className='flex items-center justify-center'
                  style={{
                    backgroundColor: colorMapping1[label],
                    width: '22px',
                    height: '22px',
                  }}
                >
                  {checkedLabels.includes(label) && (
                    <Icon.FiCheck color='white' size={16} />
                  )}
                </div>
              }
              borderColor={colorMapping1[label]}
              borderRadius={20}
              style={{ overflow: 'hidden' }}
              size={24}
              label={`${label}`}
            />
          ))}
          {/* ColorMapping2 checkboxes */}
          {Object.keys(colorMapping2).map((label) => (
            <Checkbox
              key={label}
              checked={checkedLabels.includes(label)}
              onChange={() => handleCheckboxChange(label)}
              icon={
                <div
                  className='flex items-center justify-center'
                  style={{
                    backgroundColor: colorMapping2[label],
                    width: '22px',
                    height: '22px',
                  }}
                >
                  {checkedLabels.includes(label) && (
                    <Icon.FiCheck color='white' size={16} />
                  )}
                </div>
              }
              borderColor={colorMapping2[label]}
              borderRadius={20}
              style={{ overflow: 'hidden' }}
              size={24}
              label={`${label}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Legend;
