import { publish } from "./mediator";
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
  const taskItems = document.querySelectorAll(".task-item");
  const completeTaskCheckBoxes = document.querySelectorAll(".complete-task");
  const editTaskButtons = document.querySelectorAll(".edit-task");

  // taskItems.forEach();
  // completeTaskCheckBoxes.forEach();
  editTaskButtons.forEach((editTaskButton, taskIndex) => {
    editTaskButton.addEventListener("click", () => {
      publish("open-task-form", taskIndex);
    });
  });
}

export { projectDynamicListeners, taskDynamicListeners };
