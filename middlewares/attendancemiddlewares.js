// Validation middleware
const validateAttendanceInput = (req, res, next) => {
    const { attendances } = req.body;
  
    if (!Array.isArray(attendances) || attendances.length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid attendance data' });
    }
  
    next();
  };

module.exports ={validateAttendanceInput}