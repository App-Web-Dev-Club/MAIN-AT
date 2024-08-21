import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState(""); // Error state

  const navigate = useNavigate(); // useNavigate hook

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation(`${latitude},${longitude}`);
      },
      (error) => {
        console.error('Error location:', error);
        setLocation('Location not available');
      }
    );
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      console.log(registrationNumber, location);
      const response = await axios.post("YOUR_API_ENDPOINT_HERE", {
        registrationNumber,
        location,
      });
      console.log(response.data);
      if (response.data && response.data.access) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.access}`;
        navigate("#"); // Use navigate for routing
      } else {
        setError("Invalid registration number");
      }
    } catch (error) {
      setError("Login Failed. Please try again later");
      console.error("Login Failed. Please try again later", error);
    }
  };

  return (
    <div>
      {/* Add your form or UI elements here */}
      {error && <p>{error}</p>}
    </div>
  );
}

export default Login;
