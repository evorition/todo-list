import { publish } from "./mediator";
import Project from "./Project";

const projects = localStorage.getItem("projects")
  ? JSON.parse(localStorage.getItem("projects"))
  : [];
let selectedProject = null;

function initializeProjects() {
  if (projects.length) {
    projects.forEach((project, projectIndex) => {
      const projectInstance = new Project();
      projects[projectIndex] = Object.assign(projectInstance, project);
    });
    publish("render-projects", projects);
  }
}

function selectProject(projectIndex) {
  selectedProject = projects[projectIndex];
  publish("render-project-tasks", selectedProject.tasks);
  publish("highlight-selected-project", projectIndex);
}

function addProject(projectName) {
  if (projects.findIndex((project) => project.name === projectName) !== -1) {
    return;
  }

  const project = new Project(projectName);
  projects.push(project);
  localStorage.setItem("projects", JSON.stringify(projects));
  publish("render-projects", projects);
  selectProject(projects.length - 1);
}

function removeProject(projectIndex) {
  if (projects.findIndex((_, index) => index === projectIndex) !== -1) {
    publish("clear-project-tasks");
  }
  projects.splice(projectIndex, 1);
  localStorage.setItem("projects", JSON.stringify(projects));
  publish("render-projects", projects);
}

function addTask(title, description, dueDate, priority) {
  selectedProject.addTask(title, description, dueDate, priority);
  localStorage.setItem("projects", JSON.stringify(projects));
  publish("render-project-tasks", selectedProject.tasks);
}

function getTask(taskIndex) {
  return selectedProject.tasks[taskIndex];
}

function expandTask(taskIndex) {
  const task = selectedProject.tasks[taskIndex];
  publish("render-task-details", task);
}

function updateTask(taskIndex, title, description, dueDate, priority) {
  selectedProject.updateTask(taskIndex, title, description, dueDate, priority);
  localStorage.setItem("projects", JSON.stringify(projects));
  publish("render-project-tasks", selectedProject.tasks);
}

function removeTask(taskIndex) {
  selectedProject.removeTask(taskIndex);
  localStorage.setItem("projects", JSON.stringify(projects));
  publish("render-project-tasks", selectedProject.tasks);
}

export {
  initializeProjects,
  selectProject,
  addProject,
  removeProject,
  addTask,
  removeTask,
  getTask,
  expandTask,
  updateTask,
};
