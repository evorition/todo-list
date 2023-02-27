export default class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
  }

  removeTask(taskIndex) {
    if (taskIndex >= 0 && taskIndex < this.tasks.length) {
      this.tasks.splice(taskIndex, 1);
    }
  }
}
