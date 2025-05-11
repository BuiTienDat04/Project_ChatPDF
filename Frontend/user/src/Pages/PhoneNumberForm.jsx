import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PhoneNumberForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:8080/user/update', { phoneNumber });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error updating phone number');
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Enter Your Phone Number</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone Number"
          required
        />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PhoneNumberForm;