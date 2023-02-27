export default class Task {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  getTitle() {
    return this.title;
  }

  setTitle(newTitle) {
    if (newTitle) {
      this.title = newTitle;
    }
  }

  getDescription() {
    return this.description;
  }

  setDescription(newDescription) {
    if (newDescription) {
      this.description = newDescription;
    }
  }

  getDueDate() {
    return this.dueDate;
  }

  setDueDate(newDueDate) {
    if (newDueDate) {
      this.dueDate = newDueDate;
    }
  }

  getPriority() {
    return this.priority;
  }

  setPriority(newPriority) {
    if (["low", "medium", "high"].indexOf(newPriority) !== -1) {
      this.priority = newPriority;
    }
  }
}
