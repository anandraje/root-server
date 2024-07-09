import React, { useState } from 'react';
import * as Icon from 'react-icons/fi';
import Checkbox from 'react-custom-checkbox';
import Select from 'react-dropdown-select';
const Legend = ({ countrycode, sendCheckedLabels, continentselected }) => {
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

    sendContinenttoApp(selectedOption.value);
  };
  const handleChange2 = (selectedOption) => {

    sendCountryToApp(selectedOption.value);
  };
  const countries = [
    { value: 'All', label: 'All' },
    { value: 'AF', label: 'Afghanistan' },
    { value: 'AL', label: 'Albania' },
    { value: 'DZ', label: 'Algeria' },
    { value: 'AD', label: 'Andorra' },
    { value: 'AO', label: 'Angola' },
    { value: 'AI', label: 'Anguilla' },
    { value: 'AG', label: 'Antigua and Barbuda' },
    { value: 'AR', label: 'Argentina' },
    { value: 'AM', label: 'Armenia' },
    { value: 'AW', label: 'Aruba' },
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
    { value: 'BM', label: 'Bermuda' },
    { value: 'BT', label: 'Bhutan' },
    { value: 'BO', label: 'Bolivia' },
    { value: 'BA', label: 'Bosnia and Herzegovina' },
    { value: 'BW', label: 'Botswana' },
    { value: 'BR', label: 'Brazil' },
    { value: 'BN', label: 'Brunei' },
    { value: 'BG', label: 'Bulgaria' },
    { value: 'BF', label: 'Burkina Faso' },
    { value: 'BI', label: 'Burundi' },
    { value: 'KH', label: 'Cambodia' },
    { value: 'CM', label: 'Cameroon' },
    { value: 'CA', label: 'Canada' },
    { value: 'CV', label: 'Cape Verde' },
    { value: 'KY', label: 'Cayman Islands' },
    { value: 'CF', label: 'Central African Republic' },
    { value: 'TD', label: 'Chad' },
    { value: 'CL', label: 'Chile' },
    { value: 'CN', label: 'China' },
    { value: 'CO', label: 'Colombia' },
    { value: 'KM', label: 'Comoros' },
    { value: 'CG', label: 'Republic of the Congo' },
    { value: 'CD', label: 'Democratic Republic of the Congo' },
    { value: 'CR', label: 'Costa Rica' },
    { value: 'CI', label: 'Ivory Coast' },
    { value: 'HR', label: 'Croatia' },
    { value: 'CU', label: 'Cuba' },
    { value: 'CW', label: 'Curaçao' },
    { value: 'CY', label: 'Cyprus' },
    { value: 'CZ', label: 'Czech Republic' },
    { value: 'DK', label: 'Denmark' },
    { value: 'DJ', label: 'Djibouti' },
    { value: 'DM', label: 'Dominica' },
    { value: 'DO', label: 'Dominican Republic' },
    { value: 'TL', label: 'East Timor' },
    { value: 'EC', label: 'Ecuador' },
    { value: 'EG', label: 'Egypt' },
    { value: 'SV', label: 'El Salvador' },
    { value: 'GQ', label: 'Equatorial Guinea' },
    { value: 'ER', label: 'Eritrea' },
    { value: 'EE', label: 'Estonia' },
    { value: 'ET', label: 'Ethiopia' },
    { value: 'FO', label: 'Faroe Islands' },
    { value: 'FJ', label: 'Fiji' },
    { value: 'FI', label: 'Finland' },
    { value: 'FR', label: 'France' },
    { value: 'GA', label: 'Gabon' },
    { value: 'GM', label: 'Gambia' },
    { value: 'GE', label: 'Georgia' },
    { value: 'DE', label: 'Germany' },
    { value: 'GH', label: 'Ghana' },
    { value: 'GI', label: 'Gibraltar' },
    { value: 'GR', label: 'Greece' },
    { value: 'GL', label: 'Greenland' },
    { value: 'GD', label: 'Grenada' },
    { value: 'GT', label: 'Guatemala' },
    { value: 'GN', label: 'Guinea' },
    { value: 'GW', label: 'Guinea-Bissau' },
    { value: 'GY', label: 'Guyana' },
    { value: 'HT', label: 'Haiti' },
    { value: 'HN', label: 'Honduras' },
    { value: 'HK', label: 'Hong Kong' },
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
    { value: 'MO', label: 'Macau' },
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
    { value: 'MS', label: 'Montserrat' },
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
    { value: 'NU', label: 'Niue' },
    { value: 'KP', label: 'North Korea' },
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
    { value: 'SX', label: 'Sint Maarten' },
    { value: 'SK', label: 'Slovakia' },
    { value: 'SI', label: 'Slovenia' },
    { value: 'SB', label: 'Solomon Islands' },
    { value: 'SO', label: 'Somalia' },
    { value: 'ZA', label: 'South Africa' },
    { value: 'KR', label: 'South Korea' },
    { value: 'SS', label: 'South Sudan' },
    { value: 'ES', label: 'Spain' },
    { value: 'LK', label: 'Sri Lanka' },
    { value: 'SD', label: 'Sudan' },
    { value: 'SR', label: 'Suriname' },
    { value: 'SZ', label: 'Swaziland' },
    { value: 'SE', label: 'Sweden' },
    { value: 'CH', label: 'Switzerland' },
    { value: 'SY', label: 'Syria' },
    { value: 'TW', label: 'Taiwan' },
    { value: 'TJ', label: 'Tajikistan' },
    { value: 'TZ', label: 'Tanzania' },
    { value: 'TH', label: 'Thailand' },
    { value: 'TG', label: 'Togo' },
    { value: 'TO', label: 'Tonga' },
    { value: 'TT', label: 'Trinidad and Tobago' },
    { value: 'TN', label: 'Tunisia' },
    { value: 'TR', label: 'Turkey' },
    { value: 'TM', label: 'Turkmenistan' },
    { value: 'TC', label: 'Turks and Caicos Islands' },
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
  const options = [
    { value: 'All', label: 'All' },
    { value: 'Asia', label: 'Asia' },
    { value: 'North_America', label: 'North America' },
    { value: 'South_America', label: 'South America' },
    { value: 'Australia', label: 'Australia' },
    { value: 'Africa', label: 'Africa' },
    { value: 'Europe', label: 'Europe' },
  ];
  return (
    <div className='bg-white rounded-lg shadow-md p-4'>
      <div className='mb-4'>
        <div className='text-lg font-semibold mb-2'>Continent</div>
        <Select
      options={options}
      onChange={(selectedOption) => {
        if (selectedOption && selectedOption.length > 0) {
          handleChange(selectedOption[0]);
      
        } else {
    
           // Handle null case as needed
        }
      }}
      className='w-full py-2 px-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500'
    />
      </div>
      <div>
        <div className='text-lg font-semibold mb-2'>Country</div>
 
         <Select
      options={countries}
      
      onChange={(selectedOption) => {
        if (selectedOption && selectedOption.length > 0) {
          handleChange2(selectedOption[0]);
      
        } else {
    
           // Handle null case as needed
        }
      }}
      className='w-full py-2 px-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500'
    />
      </div>
      <div className='mt-4'>
        <div className='text-lg font-semibold mb-2'>Root Instances</div>
        <div className='flex flex-wrap gap-2'>
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
                    width: '24px',
                    height: '24px',
                  }}
                >
                  {checkedLabels.includes(label) && (
                    <Icon.FiCheck color='white' size={18} />
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
                    width: '24px',
                    height: '24px',
                  }}
                >
                  {checkedLabels.includes(label) && (
                    <Icon.FiCheck color='white' size={18} />
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
