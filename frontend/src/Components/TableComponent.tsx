import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../Style/TableComponent.css'; 
import AddTaskModal from './AddTaskModal'; 

interface Task {
    id: number;
    Description: string;
    Status: string;
    Date: string;
}

const TableComponent: React.FC = () => {
    const [data, setData] = useState<Task[]>([
        { id: 1, Description: 'Promotion code issued', Status: 'Open', Date: 'May-29-2022' },
        { id: 2, Description: 'Additional user account', Status: 'Open', Date: 'May-29-2022' },
        { id: 3, Description: 'Change payment method', Status: 'Open', Date: 'May-29-2022' },
        { id: 4, Description: 'Activate account', Status: 'Closed', Date: 'May-29-2022' },
        { id: 5, Description: 'Great job', Status: 'Closed', Date: 'May-29-2022' },
    ]);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editTask, setEditTask] = useState<Task | null>(null); // Track the task being edited

    const handleAddOrUpdateTask = (newTask: Omit<Task, 'id'>) => {
        if (editTask) {
            setData((prev) =>
                prev.map((task) => (task.id === editTask.id ? { ...task, ...newTask } : task))
            );
            setEditTask(null); 
        } else {
            setData((prev) => [
                ...prev,
                {
                    id: prev.length + 1, 
                    ...newTask,
                },
            ]);
        }
        setIsModalVisible(false); 
    };

    const handleDeleteTask = (id: number) => {
        setData((prev) => prev.filter((task) => task.id !== id));
    };

    const handleUpdateTask = (task: Task) => {
        setEditTask(task); 
        setIsModalVisible(true); 
    };

    return (
        <div>
            <h3>Task List</h3>
            <table>
                <thead>
                    <tr>
                        <th>Ticket id</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.Description}</td>
                            <td>{item.Status}</td>
                            <td>{item.Date}</td>
                            <td>
                                <a href="#" onClick={(e) => { e.preventDefault(); handleUpdateTask(item); }}>Update</a>
                                {" | "}
                                <a href="#" onClick={(e) => { e.preventDefault(); handleDeleteTask(item.id); }}>Delete</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="add-task">
                <button onClick={() => setIsModalVisible(true)}>
                    Add New
                </button>
            </div>

            <AddTaskModal
                isVisible={isModalVisible}
                onClose={() => {
                    setIsModalVisible(false);
                    setEditTask(null); 
                }}
                onAdd={handleAddOrUpdateTask}
                task={editTask} 
            />
        </div>
    );
};

export default TableComponent;
