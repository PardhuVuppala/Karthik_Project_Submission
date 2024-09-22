import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [jsonData, setJsonData] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState('');

  const options = ['Alphabets', 'Numbers', 'Highest Lowercase Alphabet'];

  const handleJsonChange = (e) => {
    setJsonData(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedFilters([...selectedFilters, value]);
    } else {
      setSelectedFilters(selectedFilters.filter((filter) => filter !== value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResponseData(null);

    try {
      const parsedJson = JSON.parse(jsonData);

      const response = await axios.post('http://localhost:4000/bfhl', {
        data: parsedJson.data,
      });

      const filteredResponse = {};
      if (selectedFilters.includes('Alphabets')) {
        filteredResponse.alphabets = response.data.alphabets;
      }
      if (selectedFilters.includes('Numbers')) {
        filteredResponse.numbers = response.data.numbers;
      }
      if (selectedFilters.includes('Highest Lowercase Alphabet')) {
        filteredResponse.highest_lowercase_alphabet = response.data.highest_lowercase_alphabet;
      }

      setResponseData(filteredResponse);
    } catch (error) {
      setError('Invalid JSON format or request failed');
      console.error(error);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Data Processor</h1>
      <form onSubmit={handleSubmit}>
        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
          API Input
        </label>
        <textarea
          value={jsonData}
          onChange={handleJsonChange}
          placeholder="Enter JSON data"
          rows="5"
          style={{
            width: '100%',
            marginBottom: '10px',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />

        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
          Select Filters:
        </label>
        <div style={{ marginBottom: '10px' }}>
          {options.map((option) => (
            <div key={option} style={{ marginBottom: '5px' }}>
              <label>
                <input
                  type="checkbox"
                  value={option}
                  onChange={handleCheckboxChange}
                  style={{ marginRight: '5px' }}
                />
                {option}
              </label>
            </div>
          ))}
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#007BFF',
            color: '#FFF',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
          }}
        >
          Submit
        </button>
      </form>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      {responseData && (
        <div>
          <h3 style={{ marginTop: '20px' }}>Filtered Response:</h3>
          {responseData.numbers && <p>Numbers: {responseData.numbers.join(', ')}</p>}
          {responseData.alphabets && <p>Alphabets: {responseData.alphabets.join(', ')}</p>}
          {responseData.highest_lowercase_alphabet && (
            <p>Highest Lowercase Alphabet: {responseData.highest_lowercase_alphabet}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;