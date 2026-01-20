import React from 'react';

const AddDayButton = ({ onAdd }) => {
    return (
        <button className="add-day-btn" onClick={onAdd} title="Add New Day">
            <span>+</span>
        </button>
    );
};

export default AddDayButton;
