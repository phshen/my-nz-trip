import React from 'react';
import DayCard from './DayCard';
import { itinerary } from '../data/itinerary';

const Timeline = ({ data, onUpdate, onDelete }) => {
    return (
        <div className="timeline-container">
            {data.map((day, index) => (
                <div key={index} className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                        <DayCard
                            data={day}
                            onSave={(updatedDay) => onUpdate(index, updatedDay)}
                            onDelete={() => onDelete(index)}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Timeline;
