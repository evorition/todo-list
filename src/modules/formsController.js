import { subscribe } from "./mediator";
import { addProject, addTask, getTask, updateTask } from "./projectsHandler";

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
const submitTaskButton = document.getElementById("submit-task-button");

function openTaskForm(taskIndex = null) {
  if (taskIndex !== null) {
    const task = getTask(taskIndex);

    const taskTitle = document.getElementById("title");
    const taskDescription = document.getElementById("description");
    const taskDueDate = document.getElementById("due-date");
    const taskPriority = document.getElementById("priority");

    taskTitle.value = task.title;
    taskDescription.value = task.description;
    taskDueDate.value = task.dueDate;
    taskPriority.value = task.priority;

    submitTaskButton.textContent = "Edit";
    submitTaskButton.setAttribute("data-task-index", taskIndex);
  } else {
    submitTaskButton.textContent = "Submit";
  }
  taskForm.style.display = "block";
}

function resetTaskForm() {
  taskForm.lastElementChild.reset();
  submitTaskButton.textContent = "Submit";
  submitTaskButton.removeAttribute("data-task-index");
}

function closeTaskForm() {
  resetTaskForm();
  taskForm.style.display = "none";
}

function submitTaskForm(event) {
  event.preventDefault();

  const taskIndex = submitTaskButton.getAttribute("data-task-index");

  const taskTitle = document.getElementById("title").value;
  const taskDescription = document.getElementById("description").value;
  const taskDueDate = document.getElementById("due-date").value;
  const taskPriority = document.getElementById("priority").value;

  if (taskIndex) {
    closeTaskForm();
    updateTask(
      taskIndex,
      taskTitle,
      taskDescription,
      taskDueDate,
      taskPriority
    );
  } else {
    closeTaskForm();
    addTask(taskTitle, taskDescription, taskDueDate, taskPriority);
  }
}

export default function initializeStaticListeners() {
  subscribe("open-task-form", (task) => {
    openTaskForm(task);
  });

  openProjectFormButton.addEventListener("click", openProjectForm);
  closeProjectFormButton.addEventListener("click", closeProjectForm);
  projectForm.addEventListener("submit", submitProjectForm);

  openTaskFormButton.addEventListener("click", () => {
    openTaskForm();
  });
  closeTaskFormButton.addEventListener("click", closeTaskForm);
  taskForm.addEventListener("submit", submitTaskForm);
}
