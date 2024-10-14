import React, { useEffect, useState } from 'react';
import { Task } from './Task'; // Adjust the path as needed
import AddTaskModal from './AddTaskModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Style/TableComponent.css';

const TableComponent: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editTask, setEditTask] = useState<Task | null>(null);

    const fetchTasks = async () => {
        try {
            const response = await fetch('http://localhost:5038/api/ticket');
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleAddTask = async (newTask: Omit<Task, 'ticketId'>) => {
        try {
            const response = await fetch('http://localhost:5038/api/ticket', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTask),
            });

            if (!response.ok) {
                throw new Error('Failed to add task');
            }

            await fetchTasks();
        } catch (error) {
            console.error('Error adding task:', error);
            alert('Failed to add task: ' + (error instanceof Error ? error.message : String(error)));
        }
    };

    const handleUpdateTask = async (updatedTask: Omit<Task, 'ticketId'>) => {
        if (editTask) {
            try {
                const response = await fetch(`http://localhost:5038/api/ticket/${editTask.ticketId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ...updatedTask, ticketId: editTask.ticketId }), // Include ticketId
                });

                if (!response.ok) {
                    throw new Error('Failed to update task');
                }

                await fetchTasks(); // Refresh the task list
                setEditTask(null);
            } catch (error) {
                console.error('Error updating task:', error);
                alert('Failed to update task: ' + (error instanceof Error ? error.message : String(error)));
            }
        }
    };

    const handleDeleteTask = async (ticketId: number) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                const response = await fetch(`http://localhost:5038/api/ticket/${ticketId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Failed to delete task');
                }

                await fetchTasks();
            } catch (error) {
                console.error('Error deleting task:', error);
                alert('Failed to delete task: ' + (error instanceof Error ? error.message : String(error)));
            }
        }
    };

    useEffect(() => {
        fetchTasks(); // Fetch tasks when the component mounts
    }, []);

    // Function to format the date as 'MMM-DD-YYYY'
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const month = date.toLocaleString('en-US', { month: 'short' });
        const day = date.getDate().toString().padStart(2, '0'); // Ensure day is two digits
        const year = date.getFullYear();

        return `${month}-${day}-${year}`; // Construct the final format
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Ticket ID</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>

                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={task.ticketId}>
                            <td>{task.ticketId}</td>
                            <td>{task.description}</td>
                            <td>{task.status}</td>
                            <td>{formatDate(task.date)}</td> {/* Use the formatDate function */}
                            <td>
                                <a
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); setEditTask(task); setIsModalVisible(true); }}
                                    className="text-primary"
                                    style={{ cursor: 'pointer' }}
                                >
                                    Edit
                                </a>
                                {" | "}
                                <a
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); handleDeleteTask(task.ticketId); }}
                                    className="text-danger"
                                    style={{ cursor: 'pointer' }}
                                >
                                    Delete
                                </a>
                            </td>

                        </tr>


                    ))}
                    <tr>
                        <td colSpan={5} >
                        <button onClick={() => { setIsModalVisible(true); setEditTask(null); }}>Add New</button>
                    </td>
                     </tr>
                </tbody>

            </table>
            {/* <button onClick={() => { setIsModalVisible(true); setEditTask(null); }}>Add Task</button> */}
            {isModalVisible && (
                <AddTaskModal
                    onClose={() => setIsModalVisible(false)}
                    onAdd={editTask ? handleUpdateTask : handleAddTask} // Use update function if editing
                    task={editTask} // Pass the task to edit
                />
            )}
        </div>
    );
};

export default TableComponent;
