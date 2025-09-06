import React, { useState } from 'react';

function App() {
  const [user, setUser] = useState(null); // Stores user info after login
  const [role, setRole] = useState('passenger'); // Role selection during login/register
  const [flights] = useState([
    { id: 1, flightNumber: 'AI101', flightName: 'Air India', from: 'Mumbai', to: 'Delhi', journeyDateTime: '2025-09-20T10:00' },
    { id: 2, flightNumber: '6E202', flightName: 'IndiGo', from: 'Bangalore', to: 'Chennai', journeyDateTime: '2025-09-22T15:30' },
  ]);
  const [searchParams, setSearchParams] = useState({ from: '', to: '', date: '' });
  const [searchResults, setSearchResults] = useState([]);
  const [bookingFlight, setBookingFlight] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({ passengers: 1, assistanceRequired: false });

  // Simple login simulation
  function handleLogin(e) {
    e.preventDefault();
    const name = e.target.name.value;
    if (!name) return alert('Enter a name');
    setUser({ name, role });
  }

  // Handle search form
  function handleSearch(e) {
    e.preventDefault();
    const results = flights.filter(f =>
      (!searchParams.from || f.from.toLowerCase().includes(searchParams.from.toLowerCase())) &&
      (!searchParams.to || f.to.toLowerCase().includes(searchParams.to.toLowerCase())) &&
      (!searchParams.date || f.journeyDateTime.startsWith(searchParams.date))
    );
    setSearchResults(results);
  }

  // Handle booking submit
  function handleBooking(e) {
    e.preventDefault();
    alert(`Booking requested for ${bookingDetails.passengers} passengers on flight ${bookingFlight.flightNumber}`);
    setBookingFlight(null);
    setBookingDetails({ passengers: 1, assistanceRequired: false });
  }

  if (!user) {
    return (
      <div style={{ padding: 20, maxWidth: 400, margin: 'auto' }}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input name="name" placeholder="Your Name" style={{ width: '100%', marginBottom: 10 }} />
          <select onChange={e => setRole(e.target.value)} value={role} style={{ width: '100%', marginBottom: 10 }}>
            <option value="passenger">Passenger</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" style={{ width: '100%' }}>Login</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ padding: 20, maxWidth: 700, margin: 'auto' }}>
      <h1>Welcome, {user.name} ({user.role})</h1>
      <button onClick={() => setUser(null)} style={{ marginBottom: 20 }}>Logout</button>

      {user.role === 'passenger' && (
        <>
          {!bookingFlight ? (
            <>
              <h2>Search Flights</h2>
              <form onSubmit={handleSearch} style={{ marginBottom: 20 }}>
                <input
                  placeholder="From"
                  value={searchParams.from}
                  onChange={e => setSearchParams({ ...searchParams, from: e.target.value })}
                  style={{ marginRight: 10 }}
                />
                <input
                  placeholder="To"
                  value={searchParams.to}
                  onChange={e => setSearchParams({ ...searchParams, to: e.target.value })}
                  style={{ marginRight: 10 }}
                />
                <input
                  type="date"
                  value={searchParams.date}
                  onChange={e => setSearchParams({ ...searchParams, date: e.target.value })}
                  style={{ marginRight: 10 }}
                />
                <button type="submit">Search</button>
              </form>

              <h3>Available Flights</h3>
              {searchResults.length === 0 ? (
                <p>No flights found (try searching or leave fields blank to list all).</p>
              ) : (
                <ul>
                  {searchResults.map(flight => (
                    <li key={flight.id} style={{ marginBottom: 8 }}>
                      {flight.flightName} ({flight.flightNumber}) - {flight.from} to {flight.to} on {new Date(flight.journeyDateTime).toLocaleString()}
                      <button onClick={() => setBookingFlight(flight)} style={{ marginLeft: 10 }}>Book</button>
                    </li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <>
              <h2>Booking for {bookingFlight.flightName} ({bookingFlight.flightNumber})</h2>
              <form onSubmit={handleBooking}>
                <label>
                  Number of Passengers:
                  <input
                    type="number"
                    min="1"
                    value={bookingDetails.passengers}
                    onChange={e => setBookingDetails({ ...bookingDetails, passengers: +e.target.value })}
                    style={{ marginLeft: 10, width: 60 }}
                    required
                  />
                </label>
                <br />
                <label>
                  Assistance Required:
                  <input
                    type="checkbox"
                    checked={bookingDetails.assistanceRequired}
                    onChange={e => setBookingDetails({ ...bookingDetails, assistanceRequired: e.target.checked })}
                    style={{ marginLeft: 10 }}
                  />
                </label>
                <br />
                <button type="submit" style={{ marginTop: 10 }}>Confirm Booking</button>
                <button type="button" onClick={() => setBookingFlight(null)} style={{ marginLeft: 10, marginTop: 10 }}>Cancel</button>
              </form>
            </>
          )}
        </>
      )}

      {user.role === 'admin' && (
        <div>
          <h2>Admin Panel</h2>
          <p>Admin functionalities like managing flights and bookings will be here.</p>
        </div>
      )}
    </div>
  );
}

export default App;
