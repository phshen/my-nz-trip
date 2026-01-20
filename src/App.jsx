import React, { useState, useEffect } from 'react';
import Timeline from './components/Timeline';
import AddDayButton from './components/AddDayButton';
import { itinerary as initialData } from './data/itinerary';

function App() {
  // Initialize state from localStorage or default data
  const [itinerary, setItinerary] = useState(() => {
    const saved = localStorage.getItem('trip-itinerary');
    return saved ? JSON.parse(saved) : initialData;
  });

  // Save to localStorage whenever itinerary changes
  useEffect(() => {
    localStorage.setItem('trip-itinerary', JSON.stringify(itinerary));
  }, [itinerary]);

  const handleAddDay = () => {
    const lastDay = itinerary[itinerary.length - 1];
    // Simple logic to increment day number, can be improved
    const nextDayNum = itinerary.length + 1;

    const newDay = {
      date: "New Date",
      day: `D${nextDayNum}`,
      route: "New Route",
      driveTime: "0 min",
      activities: "Plan your activities...",
      accommodation: "TBD",
      meals: "",
      isEditing: true // Auto-enter edit mode for new items
    };

    setItinerary([...itinerary, newDay]);
  };

  const handleUpdateDay = (index, updatedDay) => {
    const newItinerary = [...itinerary];
    newItinerary[index] = updatedDay;
    setItinerary(newItinerary);
  };

  const handleDeleteDay = (index) => {
    if (window.confirm("Are you sure you want to delete this day?")) {
      const newItinerary = itinerary.filter((_, i) => i !== index);
      setItinerary(newItinerary);
    }
  };

  return (
    <div className="app-container">
      <header className="main-header">
        <h1>🇳🇿 New Zealand Adventure</h1>
        <p>13 Days South Island Road Trip</p>
      </header>
      <main>
        <Timeline
          data={itinerary}
          onUpdate={handleUpdateDay}
          onDelete={handleDeleteDay}
        />
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <AddDayButton onAdd={handleAddDay} />
        </div>
      </main>
      <footer>
        <p>Created for your amazing journey</p>
      </footer>
    </div>
  );
}

export default App;
