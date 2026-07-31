# Full-Stack Form Validation

A full-stack student registration form built with React and Express. The project demonstrates client-side and server-side validation, file uploads, loading states, and success/error feedback.

## Features

* Multi-field registration form
* 8 form fields
* Dropdown/select input
* Date input
* Profile picture upload
* Client-side validation
* Field-specific validation errors
* Server-side validation
* Image upload using Multer
* Form submission using FormData
* Success and error messages
* Loading indicator during submission
* Submit button disabled while submitting
* Express backend
* CORS configuration

## Form Fields

The form collects:

1. Full Name
2. Email
3. Phone Number
4. Program
5. Date of Birth
6. City
7. Bio
8. Profile Picture

## Tech Stack

### Frontend

* React
* JavaScript
* CSS
* Fetch API
* FormData

### Backend

* Node.js
* Express
* CORS
* Multer

## Project Structure

Forms/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── RegistrationForm.jsx
│   │   ├── App.jsx
│   │   └── index.css
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   └── registration.js
│   │   ├── uploads/
│   │   └── server.js
│   └── package.json
│
└── README.md
```

## Validation

### Client-side validation

The React frontend validates:

* Required fields
* Email format
* Phone number format
* Program selection
* Date of birth
* City length
* Bio length
* Image selection
* Image file type

Each invalid field displays a specific error message.

### Server-side validation

The Express backend performs its own validation before accepting the submission.

This ensures that the application does not rely only on frontend validation.

## File Upload

Profile pictures are uploaded using `multipart/form-data`.

The frontend creates a `FormData` object and sends the image together with the other form fields.

Multer handles the uploaded image on the Express server.

## API Endpoint

### POST `/api/register`

Accepts:

* `fullName`
* `email`
* `phone`
* `program`
* `dateOfBirth`
* `city`
* `bio`
* `profilePicture`

A successful request returns a success response.

Invalid requests return an appropriate error message.

## Running the Project

### Backend

Open a terminal:

```bash
cd backend
npm install
npm run dev
```

The backend runs on:

http://localhost:3000
```

### Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on the local development URL provided by Vite.

## Testing

The application should be tested with:

### Empty form

The form should display field-specific validation errors.

### Invalid data

Invalid email, phone number, short city name, short bio, missing program, missing date, or missing image should be rejected.

### Valid submission

A valid submission should display:

```text
Registration submitted successfully!
```

### Server unavailable

If the backend is unavailable, the frontend should display an error message.

## Learning Outcomes

This project demonstrates:

* React form handling
* Controlled components
* Client-side validation
* Server-side validation
* REST API communication
* FormData
* Multipart file uploads
* Express middleware
* CORS
* Loading states
* Error handling
* User feedback


## Author
Fatima Haroon
```
