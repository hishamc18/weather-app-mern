import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherHistory } from '../redux/slices/weatherSlice';

const WeatherHistory = () => {
  const dispatch = useDispatch();
  const { history, loading, error } = useSelector((state) => state.weather);

  const [city, setCity] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [filteredHistory, setFilteredHistory] = useState([]);

  useEffect(() => {
    setFilteredHistory(history);
  }, [history]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!city || !from || !to) {
      alert('Please fill all filters');
      return;
    }

    // Validate date range ≤ 30 days
    const fromDate = new Date(from);
    const toDate = new Date(to);
    const diff = (toDate - fromDate) / (1000 * 60 * 60 * 24);
    if (diff > 30) {
      alert('Date range cannot exceed 30 days');
      return;
    }
    dispatch(fetchWeatherHistory({ city, from, to }));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Weather History</h2>

      {/* Filter Form */}
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border p-2 rounded flex-grow min-w-[150px]"
          required
        />
        <input
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {/* Loading */}
      {loading && <p>Loading weather history...</p>}

      {/* Error */}
      {error && <p className="text-red-600">Error: {error}</p>}

      {/* Table */}
      {!loading && !error && filteredHistory.length > 0 && (
  <div className="overflow-x-auto w-full">
    <table className="min-w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th className="border border-gray-300 px-4 py-2">Date</th>
          <th className="border border-gray-300 px-4 py-2">City</th>
          <th className="border border-gray-300 px-4 py-2">Temperature (°C)</th>
          <th className="border border-gray-300 px-4 py-2">Description</th>
          <th className="border border-gray-300 px-4 py-2">Icon</th>
        </tr>
      </thead>
      <tbody>
        {filteredHistory.map((entry) => (
          <tr key={entry._id || entry.date}>
            <td className="border border-gray-300 px-4 py-2">
              {new Date(entry.date).toLocaleDateString()}
            </td>
            <td className="border border-gray-300 px-4 py-2">{entry.city}</td>
            <td className="border border-gray-300 px-4 py-2">{entry.temperature}</td>
            <td className="border border-gray-300 px-4 py-2">{entry.description}</td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              {entry.icon && (
                <img
                  src={`http://openweathermap.org/img/wn/${entry.icon}@2x.png`}
                  alt={entry.description}
                  className="inline-block w-8 h-8"
                />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}


      {/* No results */}
      {!loading && !error && filteredHistory.length === 0 && (
        <p>No weather history found for the selected filters.</p>
      )}
    </div>
  );
};

export default WeatherHistory;
