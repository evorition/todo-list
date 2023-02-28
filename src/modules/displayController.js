import { subscribe } from "./mediator";
import {
  projectDynamicListeners,
  taskDynamicListeners,
} from "./dynamicEventListeners";

// Project
const projectsList = document.getElementById("projects-list");

function renderProjects(projects) {
  projectsList.innerHTML = "";

  projects.forEach((project) => {
    const projectItem = document.createElement("li");
    const projectName = document.createElement("span");
    const projectDelete = document.createElement("span");

    projectItem.classList.add("project-item");

    projectName.classList.add("project-name");
    projectName.textContent = project.name;

    projectDelete.classList.add("material-symbols-rounded", "delete-project");
    projectDelete.textContent = "delete";

    projectItem.appendChild(projectName);
    projectItem.appendChild(projectDelete);
    projectsList.appendChild(projectItem);
  });

  projectDynamicListeners();
}

// Task
const tasksList = document.getElementById("tasks-list");
const openTaskFormButton = document.getElementById("open-task-form");

function clearProjectTasks() {
  tasksList.innerHTML = "";
  openTaskFormButton.style.display = "none";
}

function renderProjectTasks(tasks) {
  clearProjectTasks();
  openTaskFormButton.style.display = "block";

  tasks.forEach((task) => {
    const taskItem = document.createElement("li");
    const taskTitle = document.createElement("span");
    const taskDueDate = document.createElement("span");
    const taskPriority = document.createElement("span");

    taskItem.classList.add("task-item");

    taskTitle.textContent = task.title;
    taskDueDate.textContent = task.dueDate;
    taskPriority.textContent = task.priority;

    taskItem.appendChild(taskPriority);
    taskItem.appendChild(taskDueDate);
    taskItem.appendChild(taskPriority);
    tasksList.appendChild(taskItem);
  });

  taskDynamicListeners();
}

export default function initializeDisplayController() {
  subscribe("render-projects", (projects) => {
    renderProjects(projects);
  });
  subscribe("clear-project-tasks", () => {
    clearProjectTasks();
  });
  subscribe("render-project-tasks", (tasks) => {
    renderProjectTasks(tasks);
  });
}
