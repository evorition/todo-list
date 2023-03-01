import { publish } from "./mediator";
import Project from "./Project";

const projects = [];
let selectedProject = null;

function selectProject(projectIndex) {
  selectedProject = projects[projectIndex];
  publish("render-project-tasks", selectedProject.tasks);
}

function addProject(projectName) {
  const project = new Project(projectName);
  projects.push(project);
  publish("render-projects", projects);
  selectProject(projects.length - 1);
}

function removeProject(projectIndex) {
  if (projects.findIndex((_, index) => index === projectIndex) !== -1) {
    publish("clear-project-tasks");
  }
  projects.splice(projectIndex, 1);
  publish("render-projects", projects);
}

function addTask(title, description, dueDate, priority) {
  selectedProject.addTask(title, description, dueDate, priority);
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
  publish("render-project-tasks", selectedProject.tasks);
}

function removeTask(taskIndex) {
  selectedProject.removeTask(taskIndex);
  publish("render-project-tasks", selectedProject.tasks);
}

export {
  selectProject,
  addProject,
  removeProject,
  addTask,
  removeTask,
  getTask,
  expandTask,
  updateTask,
};
