import React, { useState } from 'react';

const DayCard = ({ data, onSave, onDelete }) => {
    const [isEditing, setIsEditing] = useState(data.isEditing || false);
    const [editData, setEditData] = useState(data);

    const handleSave = () => {
        onSave({ ...editData, isEditing: false });
        setIsEditing(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData({ ...editData, [name]: value });
    };

    if (isEditing) {
        return (
            <div className="day-card glass-panel editing-mode">
                <div className="edit-form-group">
                    <label>Day Number</label>
                    <input name="day" value={editData.day} onChange={handleChange} placeholder="e.g. D1" />
                </div>
                <div className="edit-form-group">
                    <label>Date</label>
                    <input name="date" value={editData.date} onChange={handleChange} placeholder="e.g. 02/23" />
                </div>
                <div className="edit-form-group">
                    <label>Route</label>
                    <input name="route" value={editData.route} onChange={handleChange} placeholder="Route" />
                </div>
                <div className="edit-form-group">
                    <label>Drive Time</label>
                    <input name="driveTime" value={editData.driveTime} onChange={handleChange} placeholder="Drive Time" />
                </div>
                <div className="edit-form-group">
                    <label>Activities</label>
                    <textarea name="activities" value={editData.activities} onChange={handleChange} rows="3" />
                </div>
                <div className="edit-form-group">
                    <label>Accommodation</label>
                    <input name="accommodation" value={editData.accommodation} onChange={handleChange} placeholder="Accommodation" />
                </div>
                <div className="edit-form-group">
                    <label>Meals</label>
                    <input name="meals" value={editData.meals} onChange={handleChange} placeholder="Meals" />
                </div>
                <div className="card-actions">
                    <button className="save-btn" onClick={handleSave}>Save</button>
                </div>
            </div>
        );
    }

    return (
        <div className="day-card glass-panel fade-in-up">
            <div className="day-header">
                <div className="date-badge">
                    <span className="day-number">{data.day}</span>
                    <span className="date-text">{data.date}</span>
                </div>
                <div className="route-info">
                    <h3>{data.route}</h3>
                    <span className="drive-time">🚗 {data.driveTime}</span>
                </div>
            </div>

            <div className="day-content">
                <div className="section">
                    <h4>🌲主要活動</h4>
                    <p>{data.activities}</p>
                </div>

                <div className="section">
                    <h4>🏠 住宿</h4>
                    <p>{data.accommodation}</p>
                </div>

                <div className="section">
                    <h4>🍽️ 餐食/其他</h4>
                    <p>{data.meals || "自由安排 / 自理"}</p>
                </div>

                <div className="card-controls">
                    <button className="icon-btn edit-btn" onClick={() => setIsEditing(true)}>✏️</button>
                    <button className="icon-btn delete-btn" onClick={onDelete}>🗑️</button>
                </div>
            </div>
        </div>
    );
};

export default DayCard;
