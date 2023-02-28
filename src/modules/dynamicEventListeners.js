import { selectProject, removeProject } from "./projectsHandler";

function projectDynamicListeners() {
  const projectNames = document.querySelectorAll(".project-name");
  const projectDeleteButtons = document.querySelectorAll(".delete-project");

  projectNames.forEach((projectName, projectIndex) => {
    projectName.addEventListener("click", () => {
      selectProject(projectIndex);
    });
  });
  projectDeleteButtons.forEach((projectDeleteButton, projectIndex) => {
    projectDeleteButton.addEventListener("click", () => {
      removeProject(projectIndex);
    });
  });
}

function taskDynamicListeners() {
  //
}

export { projectDynamicListeners, taskDynamicListeners };
