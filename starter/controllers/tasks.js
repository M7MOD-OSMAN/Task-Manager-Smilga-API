const Task = require('../models/task')
const asyncWrapper = require('../middleware/async')
const { createCE } = require('../errors/custom-error')

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({})
  res.status(200).json({ tasks })
})
const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body)
  res.status(200).json({ task })
})
const getTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params
  const task = await Task.findOne({ _id: taskID })
  if (!task) {
    return next(createCE(`Task with id ${taskID} not found`, 404))
    // return res.status(404).json({ msg: `Task with id ${taskID} not found` })
  }
  res.status(200).json({ task })
})
const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params
  const task = await Task.findByIdAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  })
  if (!task) {
    return next(createCE(`Task with id ${taskID} not found`, 404))

    // return res.status(404).json({ msg: `Task with id ${taskID} not found` })
  }
  res.status(200).json({ task })
})
const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params
  const task = await Task.findByIdAndDelete({ _id: taskID })
  if (!task) {
    return next(createCE(`Task with id ${taskID} not found`, 404))
    // return res.status(404).json({ msg: `Task with id ${taskID} not found` })
  }
  res.status(200).json({ task })
})

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
}
