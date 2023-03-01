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
    const completeTaskCheckBox = document.createElement("input");
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
    editTaskButton.classList.add("edit-task");

    completeTaskCheckBox.setAttribute("type", "checkbox");

    taskTitle.textContent = task.title;
    taskDueDate.textContent = task.dueDate;
    taskPriority.textContent = task.priority;

    editTaskButton.textContent = "Edit";

    taskItem.appendChild(completeTaskCheckBox);
    taskItem.appendChild(taskTitle);
    taskItem.appendChild(editTaskButton);
    taskItem.appendChild(taskDueDate);
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
