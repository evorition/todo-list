import { publish } from "./mediator";
import {
  selectProject,
  removeProject,
  expandTask,
  removeTask,
} from "./projectsHandler";

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
  const tasksDetailsButton = document.querySelectorAll(".task-details");
  const completeTaskCheckBoxes = document.querySelectorAll(".complete-task");
  const editTaskButtons = document.querySelectorAll(".edit-task");

  tasksDetailsButton.forEach((taskDetailsButton, taskIndex) => {
    taskDetailsButton.addEventListener("click", () => {
      expandTask(taskIndex);
    });
  });
  completeTaskCheckBoxes.forEach((completeTaskCheckBox, taskIndex) => {
    completeTaskCheckBox.addEventListener("change", () => {
      removeTask(taskIndex);
    });
  });
  editTaskButtons.forEach((editTaskButton, taskIndex) => {
    editTaskButton.addEventListener("click", () => {
      publish("open-task-form", taskIndex);
    });
  });
}

export { projectDynamicListeners, taskDynamicListeners };
