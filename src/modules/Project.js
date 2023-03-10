import Task from "./Task";

export default class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }

  addTask(title, description, dueDate, priority) {
    const task = new Task(title, description, dueDate, priority);
    this.tasks.push(task);
  }

  removeTask(taskIndex) {
    if (taskIndex >= 0 && taskIndex < this.tasks.length) {
      this.tasks.splice(taskIndex, 1);
    }
  }

  updateTask(taskIndex, title, description, dueDate, priority) {
    const task = this.tasks[taskIndex];

    task.title = title;
    task.description = description;
    task.dueDate = dueDate;
    task.priority = priority;
  }
}
