module.exports = (req, res, next) => {
  const {
    fullName,
    businessEmail,
    companyName,
    phoneNumber
  } = req.body;

  // full name
  if (!fullName || fullName.trim().length < 3) {
    return res.status(400).json({
      success: false,
      message: "Full name must be at least 3 characters"
    });
  }

  // email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!businessEmail || !emailRegex.test(businessEmail)) {
    return res.status(400).json({
      success: false,
      message: "Invalid business email"
    });
  }

  // company name
  if (!companyName || companyName.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: "Company name is required"
    });
  }

  // phone number
  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneNumber || !phoneRegex.test(phoneNumber)) {
    return res.status(400).json({
      success: false,
      message: "Phone number must be 10 digits"
    });
  }

  // all good
  next();
};
