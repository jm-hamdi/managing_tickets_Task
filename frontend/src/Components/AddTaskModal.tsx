import React, { useState, useEffect } from 'react';
import { Task } from './Task'; // Adjust the import path

interface AddTaskModalProps {
    onClose: () => void;
    onAdd: (task: Omit<Task, 'ticketId'>) => void;
    task?: Task | null; // Optional for editing a task
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ onClose, onAdd, task }) => {
    const [newTask, setNewTask] = useState<Omit<Task, 'ticketId'>>({
        description: '',
        status: 'Open',
        date: new Date().toISOString().slice(0, 10), // Initial date as YYYY-MM-DD for the date picker
    });

    useEffect(() => {
        if (task) {
            setNewTask({
                description: task.description,
                status: task.status,
                date: new Date(task.date).toISOString().slice(0, 10), // Format the task date for the date picker
            });
        }
    }, [task]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onAdd(newTask); // Call the parent onAdd or onUpdate method
        onClose(); // Close the modal after submission
    };

    // Function to format date as 'MMM-DD-YYYY'
    const formatDate = (date: string): string => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
        };
        return new Date(date).toLocaleDateString('en-US', options).replace(',', '');
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>{task ? 'Update Task' : 'Add New Task'}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            className="form-control"
                            value={newTask.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="status" className="form-label">Status</label>
                        <select
                            id="status"
                            name="status"
                            className="form-control"
                            value={newTask.status}
                            onChange={handleChange}
                        >
                            <option value="Open">Open</option>
                            <option value="Closed">Closed</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="date" className="form-label">Date</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            className="form-control"
                            value={newTask.date} // Use YYYY-MM-DD format for date input
                            onChange={handleChange}
                            required
                        />
                        <small className="form-text text-muted">
                            Selected date: {formatDate(newTask.date)}
                        </small>
                    </div>
                    <div className="d-flex justify-content-end mt-3">
                        <button type="submit" className="btn btn-primary me-2">
                            {task ? 'Update Task' : 'Add Task'}
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTaskModal;
