import './styles1.css';

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Form() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phoneCode: "+91",
    phoneNumber: "",
    country: "",
    city: "",
    pan: "",
    aadhar: "",
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const countryCity = {
    India: ["Delhi", "Mumbai", "Jaipur"],
    USA: ["New York", "Los Angeles", "Chicago"],
    Canada: ["Toronto", "Vancouver", "Ottawa"],
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  const validateForm = () => {
    const newErrors = {};
    for (let field in formData) {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (formData.phoneNumber && !/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Enter 10-digit number";
    }

    if (formData.pan && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan)) {
      newErrors.pan = "Invalid PAN format";
    }

    if (formData.aadhar && !/^\d{12}$/.test(formData.aadhar)) {
      newErrors.aadhar = "Aadhar must be 12 digits";
    }

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      navigate("/submitted", { state: formData });
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        {[
          ["firstName", "First Name"],
          ["lastName", "Last Name"],
          ["username", "Username"],
          ["email", "Email"],
        ].map(([name, label]) => (
          <div key={name}>
            <label>{label}:</label>
            <input
              type="text"
              name={name}
              value={formData[name]}
              onChange={handleChange}
            />
            <div style={{ color: "red" }}>{errors[name]}</div>
          </div>
        ))}

        <div>
          <label>Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
          <div style={{ color: "red" }}>{errors.password}</div>
        </div>

        <div>
          <label>Phone No.:</label>
          <select
            name="phoneCode"
            value={formData.phoneCode}
            onChange={handleChange}
          >
            <option value="+91">+91 (India)</option>
            <option value="+1">+1 (USA)</option>
            <option value="+44">+44 (UK)</option>
          </select>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter 10-digit number"
          />
          <div style={{ color: "red" }}>{errors.phoneNumber}</div>
        </div>

        <div>
          <label>Country:</label>
          <select name="country" value={formData.country} onChange={handleChange}>
            <option value="">Select</option>
            {Object.keys(countryCity).map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          <div style={{ color: "red" }}>{errors.country}</div>
        </div>

        <div>
          <label>City:</label>
          <select name="city" value={formData.city} onChange={handleChange}>
            <option value="">Select</option>
            {formData.country &&
              countryCity[formData.country].map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
          </select>
          <div style={{ color: "red" }}>{errors.city}</div>
        </div>

        <div>
          <label>PAN No.:</label>
          <input
            type="text"
            name="pan"
            value={formData.pan}
            onChange={handleChange}
            placeholder="ABCDE1234F"
          />
          <div style={{ color: "red" }}>{errors.pan}</div>
        </div>

        <div>
          <label>Aadhar No.:</label>
          <input
            type="text"
            name="aadhar"
            value={formData.aadhar}
            onChange={handleChange}
            placeholder="12 digit number"
          />
          <div style={{ color: "red" }}>{errors.aadhar}</div>
        </div>

        <button type="submit" disabled={!isFormValid}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
