import { useState } from "react";

// RegistrationForm component
function RegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    program: "",
    dateOfBirth: "",
    city: "",
    bio: "",
    profilePicture: null
  });

  // State for form validation errors, submission status, and messages
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Handle input changes and update form data
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // Update form data based on input type (text or file)
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }

    setMessage("");
    setMessageType("");
  };

  // Validate form fields before submission
  const validateForm = () => {
    const newErrors = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName =
        "Full name must be at least 2 characters long.";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email =
        "Please enter a valid email address.";
    }

    // Phone number validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[0-9+\-\s()]{7,20}$/.test(formData.phone)) {
      newErrors.phone =
        "Please enter a valid phone number.";
    }

    // Program validation
    if (!formData.program) {
      newErrors.program = "Please select a program.";
    }

    // Date of Birth validation
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth =
        "Date of birth is required.";
    }

    // City validation
    if (!formData.city.trim()) {
      newErrors.city = "City is required.";
    } else if (formData.city.trim().length < 2) {
      newErrors.city =
        "City must be at least 2 characters long.";
    }

    // Bio validation
    if (!formData.bio.trim()) {
      newErrors.bio = "Bio is required.";
    } else if (formData.bio.trim().length < 10) {
      newErrors.bio =
        "Bio must be at least 10 characters long.";
    }

    // Profile Picture validation
    if (!formData.profilePicture) {
      newErrors.profilePicture =
        "Please upload a profile picture.";
    } else if (
      !formData.profilePicture.type.startsWith("image/")
    ) {
      newErrors.profilePicture =
        "Please upload a valid image file.";
    }

    // Update errors state and return validation result
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setMessageType("");

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const data = new FormData();

    // Append form data to FormData object for submission
    data.append("fullName", formData.fullName);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("program", formData.program);
    data.append("dateOfBirth", formData.dateOfBirth);
    data.append("city", formData.city);
    data.append("bio", formData.bio);
    data.append("profilePicture", formData.profilePicture);

    // Send form data to the backend API
    try {
      const response = await fetch(
        "http://localhost:3000/api/register",
        {
          method: "POST",
          body: data
        }
      );

      const result = await response.json();

      if (response.ok) {
        setMessage(
          result.message || "Registration submitted successfully!"
        );
        setMessageType("success");
      } else {
        setMessage(
          result.message || "Registration failed. Please check your information."
        );
        setMessageType("error");
      }

    } catch (error) {
      console.error("Submission failed:", error);

      setMessage(
        "Unable to connect to the server. Please try again."
      );
      setMessageType("error");

    } finally {
      setIsSubmitting(false);
    }
  };

  // Render the registration form with input fields, validation messages, and submission button
  return (
    <div className="form-container">

      <h1>Student Registration</h1>

      <p>Fill in your details below.</p>

      {/* Success / Error Message */}
      {message && (
        <div className={`message ${messageType}`}>
          {messageType === "success" ? "✅ " : "❌ "}
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>

        // Full Name Input Field
        <div className="form-group">
          <label htmlFor="fullName">
            Full Name
          </label>
     
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
          />

          {errors.fullName && (
            <p className="error">
              {errors.fullName}
            </p>
          )}
        </div>

          // Email Input Field
        <div className="form-group">
          <label htmlFor="email">
            Email
          </label>

          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />

          {errors.email && (
            <p className="error">
              {errors.email}
            </p>
          )}
        </div>


          // Phone Number Input Field
        <div className="form-group">
          <label htmlFor="phone">
            Phone Number
          </label>

          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />

          {errors.phone && (
            <p className="error">
              {errors.phone}
            </p>
          )}
        </div>

          // Program Selection Dropdown
        <div className="form-group">
          <label htmlFor="program">
            Program
          </label>

          <select
            id="program"
            name="program"
            value={formData.program}
            onChange={handleChange}
          >
            <option value="">
              Select your program
            </option>

            <option value="computer-science">
              Computer Science
            </option>

            <option value="software-engineering">
              Software Engineering
            </option>

            <option value="information-technology">
              Information Technology
            </option>

            <option value="data-science">
              Data Science
            </option>
          </select>

          {errors.program && (
            <p className="error">
              {errors.program}
            </p>
          )}
        </div>

          // Date of Birth Input Field
        <div className="form-group">
          <label htmlFor="dateOfBirth">
            Date of Birth
          </label>

          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />

          {errors.dateOfBirth && (
            <p className="error">
              {errors.dateOfBirth}
            </p>
          )}
        </div>

          // City Input Field
        <div className="form-group">
          <label htmlFor="city">
            City
          </label>

          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter your city"
          />

          {errors.city && (
            <p className="error">
              {errors.city}
            </p>
          )}
        </div>

          // Bio Textarea Field
        <div className="form-group">
          <label htmlFor="bio">
            Bio
          </label>

          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself"
            rows="5"
          />

          {errors.bio && (
            <p className="error">
              {errors.bio}
            </p>
          )}
        </div>

          // Profile Picture Upload Field
        <div className="form-group">
          <label htmlFor="profilePicture">
            Profile Picture
          </label>

          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            accept="image/*"
            onChange={handleChange}
          />

          {errors.profilePicture && (
            <p className="error">
              {errors.profilePicture}
            </p>
          )}
        </div>

          // Submit Button
        <button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "⏳ Submitting..."
            : "Submit Registration"}
        </button>

      </form>
    </div>
  );
}

export default RegistrationForm;