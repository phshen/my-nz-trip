import React, { useState, useEffect } from 'react';
import Timeline from './components/Timeline';
import AddDayButton from './components/AddDayButton';
import ConfirmModal from './components/ConfirmModal';
import { itinerary as initialData } from './data/itinerary';

function App() {
  // Initialize state from localStorage or default data
  const [itinerary, setItinerary] = useState(() => {
    const saved = localStorage.getItem('trip-itinerary-v2');
    let data = saved ? JSON.parse(saved) : initialData;

    // Ensure all items have a unique ID
    return data.map(item => ({
      ...item,
      id: item.id || crypto.randomUUID()
    }));
  });

  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    dayIndex: null
  });

  // Save to localStorage whenever itinerary changes
  useEffect(() => {
    localStorage.setItem('trip-itinerary-v2', JSON.stringify(itinerary));
  }, [itinerary]);

  const handleAddDay = () => {
    const lastDay = itinerary[itinerary.length - 1];
    // Simple logic to increment day number, can be improved
    const nextDayNum = itinerary.length + 1;

    const newDay = {
      id: crypto.randomUUID(),
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

  const handleDeleteClick = (index) => {
    setDeleteModal({ isOpen: true, dayIndex: index });
  };

  const confirmDelete = () => {
    if (deleteModal.dayIndex !== null) {
      const newItinerary = itinerary.filter((_, i) => i !== deleteModal.dayIndex);
      setItinerary(newItinerary);
      setDeleteModal({ isOpen: false, dayIndex: null });
    }
  };

  const cancelDelete = () => {
    setDeleteModal({ isOpen: false, dayIndex: null });
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
          onDelete={handleDeleteClick}
        />
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <AddDayButton onAdd={handleAddDay} />
        </div>
        <ConfirmModal
          isOpen={deleteModal.isOpen}
          onClose={cancelDelete}
          onConfirm={confirmDelete}
          message="Are you sure you want to delete this day? This action cannot be undone."
        />
      </main>
      <footer>
        <p>Created for your amazing journey</p>
      </footer>
    </div>
  );
}

export default App;
