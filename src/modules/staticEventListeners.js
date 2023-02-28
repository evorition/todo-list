import { addProject, addTask } from "./projectsHandler";

// Project
const openProjectFormButton = document.getElementById("open-project-form");
const closeProjectFormButton = document.getElementById("close-project-form");
const projectForm = document.getElementById("project-form-container");

function openProjectForm() {
  openProjectFormButton.style.display = "none";
  projectForm.style.display = "block";
}

function closeProjectForm() {
  openProjectFormButton.style.display = "block";
  projectForm.style.display = "none";
}

function submitProjectForm(event) {
  event.preventDefault();

  const projectName = document.getElementById("project-name").value;

  projectForm.firstElementChild.reset();
  closeProjectForm();
  addProject(projectName);
}

// Task
const openTaskFormButton = document.getElementById("open-task-form");
const closeTaskFormButton = document.getElementById("close-task-form");
const taskForm = document.getElementById("task-form-container");

function openTaskForm() {
  taskForm.style.display = "block";
}

function closeTaskForm() {
  taskForm.style.display = "none";
}

function submitTaskForm(event) {
  event.preventDefault();

  const taskTitle = document.getElementById("title").value;
  const taskDescription = document.getElementById("description").value;
  const taskDueDate = document.getElementById("due-date").value;
  const taskPriority = document.getElementById("priority").value;

  taskForm.lastElementChild.reset();
  closeTaskForm();
  addTask(taskTitle, taskDescription, taskDueDate, taskPriority);
}

export default function initializeStaticListeners() {
  openProjectFormButton.addEventListener("click", openProjectForm);
  closeProjectFormButton.addEventListener("click", closeProjectForm);
  projectForm.addEventListener("submit", submitProjectForm);

  openTaskFormButton.addEventListener("click", openTaskForm);
  closeTaskFormButton.addEventListener("click", closeTaskForm);
  taskForm.addEventListener("submit", submitTaskForm);
}
