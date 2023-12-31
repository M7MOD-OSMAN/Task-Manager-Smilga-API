const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name must be provided'],
    trim: true,
    maxLength: [20, 'Maximum length allowed for name field is 20 characters'],
  },
  completed: { type: Boolean, default: false },
})

module.exports = mongoose.model('Task', TaskSchema)
