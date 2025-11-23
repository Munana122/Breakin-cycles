const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  courseName: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Financial Literacy', 'Coding & Tech', 'Entrepreneurship', 'Beauty & Wellness']
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  enrolledAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date
  }
});

// Compound index to prevent duplicate enrollments
enrollmentSchema.index({ userId: 1, courseName: 1 }, { unique: true });

module.exports = mongoose.model('Enrollment', enrollmentSchema);
