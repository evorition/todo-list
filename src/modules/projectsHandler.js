import Project from "./Project";

const projects = [];
let selectedProject = null;

function projectExist(name) {
  return projects.some((project) => project.name === name);
}

function projectIndex(name) {
  return projects.findIndex((project) => project.name === name);
}

function selectProject(name) {
  if (projectExist(name)) {
    selectedProject = projects[projectIndex(name)];
  }
}

function getSelectedProject() {
  return selectProject;
}

function addProject(name) {
  if (name !== "" && !projectExist(name)) {
    const project = new Project(name);
    projects.push(project);
  }
}

function removeProject(name) {
  if (projectExist(name)) {
    if (name === getSelectedProject(name)) {
      selectedProject = null;
    }

    projects.splice(projectIndex(name), 1);
  }
}

export { addProject, removeProject, selectProject, getSelectedProject };
