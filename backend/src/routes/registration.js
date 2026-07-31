//Importing required modules
const express = require("express");
const multer = require("multer");

const router = express.Router();

const upload = multer({
  dest: "src/uploads/"
});

// Registration route
router.post(
  "/register",
  upload.single("profilePicture"),
  (req, res) => {
    const {
      fullName,
      email,
      phone,
      program,
      dateOfBirth,
      city,
      bio
    } = req.body;

    // Full Name validation
    if (!fullName || fullName.trim().length < 2) {
      return res.status(400).json({
        success: false,
        field: "fullName",
        message: "Full name must be at least 2 characters long."
      });
    }

    // Email validation
    if (!email || !email.includes("@")) {
      return res.status(400).json({
        success: false,
        field: "email",
        message: "Please provide a valid email address."
      });
    }

    // Phone number validation
    if (!phone || phone.trim().length < 7) {
      return res.status(400).json({
        success: false,
        field: "phone",
        message: "Phone number must contain at least 7 characters."
      });
    }

    // Program selection validation
    if (!program) {
      return res.status(400).json({
        success: false,
        field: "program",
        message: "Please select a program."
      });
    }

    // Date of birth validation
    if (!dateOfBirth) {
      return res.status(400).json({
        success: false,
        field: "dateOfBirth",
        message: "Date of birth is required."
      });
    }

    // City validation
    if (!city || city.trim().length < 2) {
      return res.status(400).json({
        success: false,
        field: "city",
        message: "City must be at least 2 characters long."
      });
    }

    // Bio validation
    if (!bio || bio.trim().length < 10) {
      return res.status(400).json({
        success: false,
        field: "bio",
        message: "Bio must be at least 10 characters long."
      });
    }

    // Profile picture validation
    if (!req.file) {
      return res.status(400).json({
        success: false,
        field: "profilePicture",
        message: "Please upload a profile picture."
      });
    }

    // If all validations pass, send a success response
    res.status(201).json({
      success: true,
      message: "Registration submitted successfully!",
      data: {
        fullName,
        email,
        phone,
        program,
        dateOfBirth,
        city,
        bio,
        profilePicture: req.file.filename
      }
    });
  }
);

module.exports = router;