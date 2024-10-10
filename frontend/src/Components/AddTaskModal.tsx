import React, { useState, useEffect } from 'react';
import '../Style/AddTaskModal.css'; 

interface Task {
    Description: string;
    Status: string;
    Date: string;
}

interface AddTaskModalProps {
    isVisible: boolean;
    onClose: () => void;
    onAdd: (task: Task) => void;
    task?: Task | null; 
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ isVisible, onClose, onAdd, task }) => {
    const [newTask, setnewTask] = useState<Task>({
        Description: '',
        Status: '',
        Date: '',
    });

    // handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setnewTask((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (task) {
            setnewTask({
                Description: task.Description || '',
                Status: task.Status || '',
                Date: task.Date || '',
            });
        } else {
            setnewTask({ Description: '', Status: '', Date: '' }); 
        }
    }, [task]);

    const handleAddOrUpdateTask = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newTask.Description && newTask.Status && newTask.Date) {
            onAdd({
                Description: newTask.Description,
                Status: newTask.Status,
                Date: newTask.Date,
            });
            setnewTask({ Description: '', Status: '', Date: '' }); 
        } else {
            alert("Please fill out all fields."); 
        }
    };

    if (!isVisible) return null; 

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>{task ? 'Update Task' : 'Add New Task'}</h3>
                <form onSubmit={handleAddOrUpdateTask}>
                    <input
                        type="text"
                        name="Description"
                        placeholder="Task Description"
                        value={newTask.Description}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="Status"
                        placeholder="Task Status"
                        value={newTask.Status}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="Date"
                        placeholder="Date"
                        value={newTask.Date}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">{task ? 'Update Task' : 'Add New'}</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default AddTaskModal;
