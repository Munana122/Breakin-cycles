const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  roomName: {
    type: String,
    required: true,
    index: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  author: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true,
    maxlength: 2000
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
});
// Compound index for efficient queries
messageSchema.index({ roomName: 1, createdAt: -1 });

module.exports = mongoose.model('Message', messageSchema);
