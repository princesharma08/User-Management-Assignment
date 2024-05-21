# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

# User Management Application

This is a responsive CRUD (Create, Read, Update, Delete) application built with React that manages users using the JSONPlaceholder API. The application allows you to fetch, add, edit, and delete users, providing a seamless user experience with error handling.

## Features

- **Fetch Users**: Fetches and displays a list of users in a table format.
- **Create User**: Provides a form to create a new user with successfully message.
- **Update User**: Allows editing of existing user details through a form with successfully message.
- **Delete User**: Enables deletion of users with confirmation.
- **Table Actions**: Ensure that table row data will perform update, view, and delete functionality by icons from Actions column.
- **View User Details**: Fetch and display the user details by ID with edit button , which is render by table actions of view  button.
- **Responsive Design**: Ensures the application looks good on both desktop and mobile devices.
- **Error Handling**: Displays error messages for failed API requests.
- **Loading Spinner**: Create and Shows a loading spinner while API requests are in progress.

## Technologies Used

- React
- React Router
- Tailwind CSS
- Axios
- JSONPlaceholder API
- React Icons
- Loading Spinners

## Installation

To get started with this project, clone the repository and install the dependencies:

```bash
git clone https://github.com/your-username/user-management-app.git
cd user-management-app
npm install
npm start
```