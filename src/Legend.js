import React from 'react'

import * as Icon from "react-icons/fi";
import Checkbox from "react-custom-checkbox";
import { useState } from 'react';
const Legend = ({countrycode, sendCheckedLabels,continentselected}) => {
  
    function sendCountryToApp(selectedCountry) {
      
        console.log("Selected country code:", selectedCountry);
        countrycode(selectedCountry)
     
    }
    function sendContinenttoApp(continent){
        console.log(continent);
        continentselected(continent);
    }
    const colorMapping1 = {
        A: "#FF0000",    // Red
        B: "#0000FF",    // Blue
        C: "#013220",    // Green
        D: "#FFA500",    // Orange
        E: "#800080",    // Purple
        F: "#FFD000",    // Yellow
        G: "#CC0066",    // Pink

      };
      const colorMapping2 = {

        H: "#00FFFF",    // Cyan
        I: "#A52A2A",    // Brown
        J: "#00FF00",    // Lime
        K: "#EE82EE",    // Violet
        L: "#808080",    // Gray
        M: "#000000",
        All:"#700000"     // Black

      };
      const [checkedLabels, setCheckedLabels] = useState([]);
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
      
  return (
    
    
    <>
    <div className='flex flex-col'>
    <div className='flex gap-5'>
    
    <div>
    <div>
        Continent
    </div>
    <select className='h-7'  onChange={(e) => sendContinenttoApp(e.target.value)} >
    <option value="All">---select---</option>
        <option value="Asia">Asia</option>
        <option value="North_America">North America</option>
        <option value="South_America">South America</option>
        <option value="Australia">Austraila</option>
        <option value="Africa">Africa</option>
        <option value="Europe">Europe</option>

    </select>
</div>
<div>
        <div>Country</div>
            <select className='h-7' onChange={(e) => sendCountryToApp(e.target.value)}>
            <option value="All">---select---</option>
    <option value="AE">United Arab Emirates</option>
    <option value="AF">Afghanistan</option>
    <option value="AL">Albania</option>
    <option value="AM">Armenia</option>
    <option value="AO">Angola</option>
    <option value="AR">Argentina</option>
    <option value="AT">Austria</option>
    <option value="AU">Australia</option>
    <option value="AZ">Azerbaijan</option>
    <option value="BA">Bosnia and Herzegovina</option>
    <option value="BB">Barbados</option>
    <option value="BD">Bangladesh</option>
    <option value="BE">Belgium</option>
    <option value="BF">Burkina Faso</option>
    <option value="BG">Bulgaria</option>
    <option value="BH">Bahrain</option>
    <option value="BI">Burundi</option>
    <option value="BJ">Benin</option>
    <option value="BL">Saint Barthélemy</option>
    <option value="BN">Brunei</option>
    <option value="BO">Bolivia</option>
    <option value="BR">Brazil</option>
    <option value="BT">Bhutan</option>
    <option value="BW">Botswana</option>
    <option value="BY">Belarus</option>
    <option value="CA">Canada</option>
    <option value="CD">Democratic Republic of the Congo</option>
    <option value="CG">Republic of the Congo</option>
    <option value="CH">Switzerland</option>
    <option value="CI">Ivory Coast</option>
    <option value="CK">Cook Islands</option>
    <option value="CL">Chile</option>
    <option value="CM">Cameroon</option>
    <option value="CN">China</option>
    <option value="CO">Colombia</option>
    <option value="CR">Costa Rica</option>
    <option value="CW">Curaçao</option>
    <option value="CY">Cyprus</option>
    <option value="CZ">Czech Republic</option>
    <option value="DE">Germany</option>
    <option value="DJ">Djibouti</option>
    <option value="DK">Denmark</option>
    <option value="DM">Dominica</option>
    <option value="DO">Dominican Republic</option>
    <option value="DZ">Algeria</option>
    <option value="EC">Ecuador</option>
    <option value="EE">Estonia</option>
    <option value="EG">Egypt</option>
    <option value="ES">Spain</option>
    <option value="FI">Finland</option>
    <option value="FJ">Fiji</option>
    <option value="FM">Federated States of Micronesia</option>
    <option value="FO">Faroe Islands</option>
    <option value="FR">France</option>
    <option value="GA">Gabon</option>
    <option value="GB">United Kingdom</option>
    <option value="GD">Grenada</option>
    <option value="GE">Georgia</option>
    <option value="GH">Ghana</option>
    <option value="GL">Greenland</option>
    <option value="GM">Gambia</option>
    <option value="GN">Guinea</option>
    <option value="GR">Greece</option>
    <option value="GT">Guatemala</option>
    <option value="GU">Guam</option>
    <option value="GY">Guyana</option>
    <option value="HK">Hong Kong</option>
    <option value="HN">Honduras</option>
    <option value="HR">Croatia</option>
    <option value="HT">Haiti</option>
    <option value="HU">Hungary</option>
    <option value="ID">Indonesia</option>
    <option value="IE">Ireland</option>
    <option value="IL">Israel</option>
    <option value="IN">India</option>
    <option value="IQ">Iraq</option>
    <option value="IR">Iran</option>
    <option value="IS">Iceland</option>
    <option value="IT">Italy</option>
    <option value="JM">Jamaica</option>
    <option value="JO">Jordan</option>
    <option value="JP">Japan</option>
    <option value="KE">Kenya</option>
    <option value="KG">Kyrgyzstan</option>
    <option value="KH">Cambodia</option>
    <option value="KM">Comoros</option>
    <option value="KR">South Korea</option>
    <option value="KW">Kuwait</option>
    <option value="KZ">Kazakhstan</option>
    <option value="LA">Laos</option>
    <option value="LB">Lebanon</option>
    <option value="LC">Saint Lucia</option>
    <option value="LK">Sri Lanka</option>
    <option value="LR">Liberia</option>
    <option value="LS">Lesotho</option>
    <option value="LT">Lithuania</option>
    <option value="LU">Luxembourg</option>
    <option value="LV">Latvia</option>
    <option value="MA">Morocco</option>
    <option value="MD">Moldova</option>
    <option value="ME">Montenegro</option>
    <option value="MG">Madagascar</option>
    <option value="MH">Marshall Islands</option>
    <option value="MK">North Macedonia</option>
    <option value="ML">Mali</option>
    <option value="MM">Myanmar</option>
    <option value="MN">Mongolia</option>
    <option value="MO">Macao</option>
    <option value="MU">Mauritius</option>
    <option value="MV">Maldives</option>
    <option value="MW">Malawi</option>
    <option value="MX">Mexico</option>
    <option value="MY">Malaysia</option>
    <option value="MZ">Mozambique</option>
    <option value="NC">New Caledonia</option>
    <option value="NG">Nigeria</option>
    <option value="NL">Netherlands</option>
    <option value="NO">Norway</option>
    <option value="NP">Nepal</option>
    <option value="NZ">New Zealand</option>
    <option value="OM">Oman</option>
    <option value="PA">Panama</option>
    <option value="PE">Peru</option>
    <option value="PF">French Polynesia</option>
    <option value="PG">Papua New Guinea</option>
    <option value="PH">Philippines</option>
    <option value="PK">Pakistan</option>
    <option value="PL">Poland</option>
    <option value="PR">Puerto Rico</option>
    <option value="PS">Palestine</option>
    <option value="PT">Portugal</option>
    <option value="PW">Palau</option>
    <option value="PY">Paraguay</option>
    <option value="QA">Qatar</option>
    <option value="RE">Réunion</option>
    <option value="RO">Romania</option>
    <option value="RS">Serbia</option>
    <option value="RU">Russia</option>
    <option value="RW">Rwanda</option>
    <option value="SA">Saudi Arabia</option>
    <option value="SB">Solomon Islands</option>
    <option value="SC">Seychelles</option>
    <option value="SD">Sudan</option>
    <option value="SE">Sweden</option>
    <option value="SG">Singapore</option>
    <option value="SI">Slovenia</option>
    <option value="SK">Slovakia</option>
    <option value="SN">Senegal</option>
    <option value="SO">Somalia</option>
    <option value="SR">Suriname</option>
    <option value="SV">El Salvador</option>
    <option value="SX">Sint Maarten</option>
    <option value="TD">Chad</option>
    <option value="TG">Togo</option>
    <option value="TH">Thailand</option>
    <option value="TJ">Tajikistan</option>
    <option value="TN">Tunisia</option>
    <option value="TR">Turkey</option>
    <option value="TT">Trinidad and Tobago</option>
    <option value="TW">Taiwan</option>
    <option value="TZ">Tanzania</option>
    <option value="UA">Ukraine</option>
    <option value="UG">Uganda</option>
    <option value="US">United States</option>
    <option value="UY">Uruguay</option>
    <option value="UZ">Uzbekistan</option>
    <option value="VE">Venezuela</option>
    <option value="VG">British Virgin Islands</option>
    <option value="VN">Vietnam</option>
    <option value="VU">Vanuatu</option>
    <option value="WS">Samoa</option>
    <option value="YE">Yemen</option>
    <option value="ZA">South Africa</option>
    <option value="ZM">Zambia</option>
    <option value="ZW">Zimbabwe</option>
    </select>
    </div>
    
    </div>
    <div className='flex flex-col'>
        <div>Root Instances</div>
        <div className='flex gap-[40px]'>
           
        {Object.keys(colorMapping1).map((label) => (
        <Checkbox
          key={label}
          checked={checkedLabels.includes(label)}
              onChange={() => handleCheckboxChange(label)}
          icon={
            <div
              style={{
                display: "flex",
                flex: 1,
                backgroundColor: colorMapping1[label],
                alignSelf: "stretch",
              }}
            >
              <Icon.FiCheck color="white" size={20} />
            </div>
          }
          borderColor={colorMapping1[label]}
          borderRadius={20}
          style={{ overflow: "hidden", margin: '10px' }} // Added margin for spacing between checkboxes
          size={20}
          label={`${label}`}
        />
      ))}
                
      
        </div>
        <div className='flex gap-[40px]'>
        {Object.keys(colorMapping2).map((label) => (
        <Checkbox
          key={label}
          checked={checkedLabels.includes(label)}
              onChange={() => handleCheckboxChange(label)}
          icon={
            <div
              style={{
                display: "flex",
                flex: 1,
                backgroundColor: colorMapping2[label],
                alignSelf: "stretch",
              }}
            >
              <Icon.FiCheck color="white" size={20} />
            </div>
          }
          borderColor={colorMapping2[label]}
          borderRadius={20}
          style={{ overflow: "hidden", margin: '10px' }} // Added margin for spacing between checkboxes
          size={20}
          label={`${label}`}
        />
        ))}
        </div>
    </div>
    </div>
    

  
    </>
  )
}

export default Legend