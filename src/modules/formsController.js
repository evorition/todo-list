import { subscribe } from "./mediator";
import { addProject, addTask, getTask, updateTask } from "./projectsHandler";

// Project
const openProjectFormButton = document.getElementById("open-project-form");
const closeProjectFormButton = document.getElementById("close-project-form");
const projectForm = document.getElementById("project-form-container");
const projectName = document.getElementById("project-name");

function openProjectForm() {
  openProjectFormButton.style.display = "none";
  projectForm.style.display = "block";
}

function resetProjectForm() {
  projectForm.firstElementChild.reset();
  projectName.setCustomValidity("");
}

function closeProjectForm() {
  openProjectFormButton.style.display = "block";
  projectForm.style.display = "none";
  resetProjectForm();
}

function validateProjectForm() {
  if (!projectName.value.trim().length) {
    projectName.setCustomValidity("Project name can't be empty.");
    projectName.reportValidity();
  } else {
    projectName.setCustomValidity("");
    projectName.dispatchEvent(new Event("input", { bubbles: true }));
  }
}

function submitProjectForm(event) {
  event.preventDefault();

  if (!projectName.checkValidity()) {
    return;
  }

  const projectNameValue = projectName.value.trim();

  closeProjectForm();
  addProject(projectNameValue);
}

// Task
const openTaskFormButton = document.getElementById("open-task-form");
const closeTaskFormButton = document.getElementById("close-task-form");
const taskForm = document.getElementById("task-form-container");
const taskFormTitle = document.getElementById("task-form-title");
const submitTaskButton = document.getElementById("submit-task-button");
const taskTitle = document.getElementById("title");
const taskDescription = document.getElementById("description");
const taskDueDate = document.getElementById("due-date");
const taskPriority = document.getElementById("priority");
const taskBackground = document.getElementById("bg");

function openTaskForm(taskIndex = null) {
  if (taskIndex !== null) {
    const task = getTask(taskIndex);

    taskTitle.value = task.title;
    taskDescription.value = task.description;
    taskDueDate.value = task.dueDate;
    taskPriority.value = task.priority;

    submitTaskButton.textContent = "Edit";
    submitTaskButton.setAttribute("data-task-index", taskIndex);

    taskFormTitle.textContent = "Edit task";
  } else {
    submitTaskButton.textContent = "Submit";
  }
  taskBackground.style.display = "block";
  taskForm.style.display = "block";
}

function resetTaskForm() {
  taskForm.lastElementChild.reset();
  submitTaskButton.textContent = "Submit";
  submitTaskButton.removeAttribute("data-task-index");
  taskFormTitle.textContent = "Add new title";
  taskTitle.setCustomValidity("");
}

function closeTaskForm() {
  resetTaskForm();
  taskBackground.style.display = "none";
  taskForm.style.display = "none";
}

function validateTaskForm() {
  if (!taskTitle.value.trim().length) {
    taskTitle.setCustomValidity("Task name can't be empty.");
    taskTitle.reportValidity();
  } else {
    taskTitle.setCustomValidity("");
    taskTitle.dispatchEvent(new Event("input", { bubbles: true }));
  }
}

function submitTaskForm(event) {
  event.preventDefault();

  if (!taskTitle.checkValidity()) {
    return;
  }

  const taskIndex = submitTaskButton.getAttribute("data-task-index");

  const taskTitleValue = taskTitle.value.trim();
  const taskDescriptionValue = taskDescription.value.trim();
  const taskDueDateValue = taskDueDate.value;
  const taskPriorityValue = taskPriority.value;

  if (taskIndex) {
    closeTaskForm();
    updateTask(
      taskIndex,
      taskTitleValue,
      taskDescriptionValue,
      taskDueDateValue,
      taskPriorityValue
    );
  } else {
    closeTaskForm();
    addTask(
      taskTitleValue,
      taskDescriptionValue,
      taskDueDateValue,
      taskPriorityValue
    );
  }
}

export default function initializeStaticListeners() {
  subscribe("open-task-form", (task) => {
    openTaskForm(task);
  });

  openProjectFormButton.addEventListener("click", openProjectForm);
  closeProjectFormButton.addEventListener("click", closeProjectForm);
  projectForm.addEventListener("submit", submitProjectForm);
  projectName.addEventListener("keyup", validateProjectForm);

  openTaskFormButton.addEventListener("click", () => {
    openTaskForm();
  });
  closeTaskFormButton.addEventListener("click", closeTaskForm);
  taskForm.addEventListener("submit", submitTaskForm);
  taskTitle.addEventListener("keyup", validateTaskForm);
}
