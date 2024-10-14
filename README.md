# Task Management Application

## Description

This project is a Task Management Application built using **.NET 8** for the backend and **React** for the frontend. The application implements a CRUD (Create, Read, Update, Delete) functionality for managing tickets, allowing users to track their tasks efficiently. 

### Key Features:
- **Ticket ID**: A unique identifier for each ticket.
- **Description**: A brief summary of the ticket issue.
- **Status**: Indicates whether the ticket is "Open" or "Closed".
- **Date**: The date when the ticket was created.
- **Actions**: Options to update or delete each ticket.
- **Sorting and Filtering**: Users can sort tickets by various attributes and filter the list.
- **Pagination**: The application supports pagination for easier navigation through large lists of tickets.

## Technologies Used
- **Backend**: 
  - .NET 8
  - Entity Framework
  - SQL Server (Docker)
- **Frontend**: 
  - React
  - Bootstrap for styling
- **Testing**:
  - NUnit
  - Moq

## Setup Instructions

### Prerequisites
- Ensure you have **.NET 8 SDK** installed. You can download it from [here](https://dotnet.microsoft.com/download).
- Install **Docker** to run SQL Server in a container. You can download Docker from [here](https://www.docker.com/get-started).

Before you begin, ensure you have the following installed on your macOS:

- **Docker**: Download from [Docker's official website](https://www.docker.com/products/docker-desktop).
- **Azure Data Studio**: Download from the [official Azure Data Studio page](https://docs.microsoft.com/en-us/sql/azure-data-studio/download-azure-data-studio).

## Getting Started

Follow these steps to set up SQL Server in a Docker container.

### 1. Open Terminal

Open the Terminal application on your macOS.

### 2. Pull the SQL Server Docker Image

Run the following command to pull the SQL Server image from Docker Hub:

```bash
docker pull mcr.microsoft.com/mssql/server
```

### 3. Run SQL Server in Docker

Start a new container with SQL Server using the following command. 

```bash
   docker run -e "ACCEPT_EULA=1" -e "MSSQL_SA_PASSWORD=CodeWith123" -e "MSSQL_PID=Developer"  -e "MSSQL_USER=SA" -p 1433:1433 -d --name=sql_new mcr.microsoft.com/azure-sql-edge
```

### 4. Check if SQL Server is Running

To confirm that the SQL Server container is running, execute:

```bash
docker ps
```

You should see `sql_server_container` listed in the output.

## Connecting with Azure Data Studio

### 1. Open Azure Data Studio

Launch Azure Data Studio on your macOS.

### 2. Create a New Connection

- Click on **New Connection** or use the **Command Palette** (Cmd + Shift + P) and search for "New Connection".

### 3. Enter Connection Details

Fill in the connection fields:

- **Server Name**: `localhost`
- **Authentication Type**: `SQL Login`
- **User Name**: `sa`
- **Password**: `CodeWith123` (the password you set earlier)
- **Database Name**: Leave blank or use `master`.

### 4. Connect

Click the **Connect** button. If everything is set up correctly, you will be connected to your SQL Server instance.

## Example Queries

You can execute SQL queries in Azure Data Studio. Here’s a simple example:



## Stopping and Removing the Container

To stop the SQL Server container, use:

```bash
docker stop sql_server_container
```

To remove the container, execute:

```bash
docker rm sql_server_container
```

## Conclusion

You have successfully set up SQL Server on macOS using Docker and connected to it with Azure Data Studio. This environment is ideal for local development and testing.



### Backend Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/Task_Fullstack_Developer_dotNET.git
   cd Task_Fullstack_Developer_dotNET/backend
   ```

2. **Run SQL Server with Docker**:
   Open your terminal and run the following command to start a SQL Server instance:
   ```bash
   docker run -e "ACCEPT_EULA=1" -e "MSSQL_SA_PASSWORD=CodeWith123" -e "MSSQL_PID=Developer"  -e "MSSQL_USER=SA" -p 1433:1433 -d --name=sql_new mcr.microsoft.com/azure-sql-edge
   ```

3. **Database Migrations**:
   - Navigate to the `backend` directory.
   - Run the following commands to apply database migrations:
   ```bash
   dotnet ef migrations add InitialCreate
   dotnet ef database update
   ```

4. **Run the Backend Application**:
   - In the `backend` directory, run:
   ```bash
   dotnet run
   ```
   The application should now be running on `http://localhost:5038`.

### Frontend Setup

1. **Navigate to the Frontend Directory**:
   ```bash
   cd ../frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Frontend Application**:
   ```bash
   npm start
   ```
   This will start the React application on `http://localhost:3000`.

### Running Tests

- For backend tests, navigate to the `Backend.Tests` directory and run:
  ```bash
  dotnet test
  ```
- For frontend tests, you can use:
  ```bash
  npm test
  ```


## Acknowledgments
- [React](https://reactjs.org/)
- [.NET](https://dotnet.microsoft.com/)
- [Entity Framework](https://docs.microsoft.com/en-us/ef/)
