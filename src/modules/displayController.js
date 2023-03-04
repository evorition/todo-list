import { subscribe } from "./mediator";
import {
  projectDynamicListeners,
  taskDynamicListeners,
} from "./dynamicEventListeners";

// Project
const projectsList = document.getElementById("projects-list");

function highlightSelectedProject(projectIndex) {
  projectsList.childNodes[projectIndex].classList.add("selected");
}

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
  projectsList.childNodes.forEach((projectItem) => {
    projectItem.classList.remove("selected");
  });
  tasksList.innerHTML = "";
  openTaskFormButton.style.display = "none";
}

function renderProjectTasks(tasks) {
  clearProjectTasks();
  openTaskFormButton.style.display = "flex";

  tasks.forEach((task) => {
    const taskItem = document.createElement("li");
    const completeTaskCheckBox = document.createElement("input");
    const taskDetails = document.createElement("span");
    const taskTitle = document.createElement("span");
    const taskDueDate = document.createElement("span");

    const editTaskButton = document.createElement("span");

    switch (task.priority) {
      case "low":
        taskItem.classList.add("low-priority");
        break;
      case "medium":
        taskItem.classList.add("medium-priority");
        break;
      case "high":
        taskItem.classList.add("high-priority");
        break;
      default:
        break;
    }

    taskItem.classList.add("task-item");

    completeTaskCheckBox.classList.add("complete-task");
    completeTaskCheckBox.setAttribute("type", "checkbox");

    taskDetails.classList.add("task-details");

    editTaskButton.classList.add("material-symbols-rounded", "edit-task");
    editTaskButton.textContent = "edit_note";

    taskTitle.textContent = task.title;
    taskDueDate.textContent = task.dueDate;

    taskItem.appendChild(completeTaskCheckBox);
    taskDetails.appendChild(taskTitle);
    taskDetails.appendChild(taskDueDate);
    taskItem.appendChild(taskDetails);
    taskItem.appendChild(editTaskButton);
    tasksList.appendChild(taskItem);
  });

  taskDynamicListeners();
}

const taskDetails = document.getElementById("task-details");
const closeTaskDetailsButton = document.getElementById("close-task-details");
const taskBackground = document.getElementById("bg");

function closeTaskDetails() {
  taskBackground.style.display = "none";
  taskDetails.style.display = "none";
}

function renderDetailedProjectTask(task) {
  taskBackground.style.display = "block";
  taskDetails.style.display = "block";

  const taskTitle = document.getElementById("task-title");
  const taskDescription = document.getElementById("task-description");
  const taskDueDate = document.getElementById("task-due-date");
  const taskPriority = document.getElementById("task-priority");

  taskTitle.textContent = task.title;
  taskDescription.textContent = task.description;
  taskDueDate.textContent = task.dueDate;
  taskPriority.textContent = task.priority;
}

closeTaskDetailsButton.addEventListener("click", closeTaskDetails);

export default function initializeDisplayController() {
  subscribe("highlight-selected-project", (projectIndex) => {
    highlightSelectedProject(projectIndex);
  });
  subscribe("render-projects", (projects) => {
    renderProjects(projects);
  });
  subscribe("clear-project-tasks", () => {
    clearProjectTasks();
  });
  subscribe("render-project-tasks", (tasks) => {
    renderProjectTasks(tasks);
  });
  subscribe("render-task-details", (task) => {
    renderDetailedProjectTask(task);
  });
}
