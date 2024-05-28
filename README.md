# Instructions for Running the Application Locally

## Prerequisites
1. Node.js and npm: 
Download and install from nodejs.org.

2. Angular CLI: 
Install globally using npm:

npm install -g @angular/cli

## Steps to Run the Application

1. Clone the repository:

git clone https://github.com/your-repo/user-management-app.git

cd user-management-app

2. Install dependencies:
npm install

3. Run the application:
ng serve

4. Open the application:

Open your browser and navigate to http://localhost:4200.

## Challenges and Decisions

1. Role-Based Access Control
Challenge: Ensuring users have access to appropriate sections based on their roles.

Decision: Used Angular’s canActivate guard to protect routes and redirect users based on roles.

2. User Authentication
Challenge: Implementing secure login and session management.

Decision: Created an authentication service that handles login, logout, and user role management using local storage.

3. Image Capture and Storage
Challenge: Capturing images using the device camera and storing them locally.

Decision: Used the captureImage function to capture images and convert them to base64 strings for download.

4. User Management and Role Update
Challenge: Allowing admins to manage user accounts and roles.

Decision: Implemented an admin dashboard with functionality to view users, update roles, and delete accounts using two-way data binding.

5. User Interface and Experience
Challenge: Designing a user-friendly and responsive interface.

Decision: Used simple CSS styling and flexbox for alignment and responsiveness.

