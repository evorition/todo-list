import { publish } from "./mediator";
import {
  selectProject,
  removeProject,
  expandTask,
  removeTask,
} from "./projectsHandler";

function projectDynamicListeners() {
  const projectItems = document.querySelectorAll(".project-item");

  projectItems.forEach((projectItem, projectIndex) => {
    projectItem.addEventListener("click", (event) => {
      if (event.target.classList.contains("delete-project")) {
        removeProject(projectIndex);
      } else {
        selectProject(projectIndex);
      }
    });
  });
}

function taskDynamicListeners() {
  const taskItems = document.querySelectorAll(".task-item");

  taskItems.forEach((taskItem, taskIndex) => {
    taskItem.addEventListener("click", (event) => {
      if (event.target.classList.contains("complete-task")) {
        removeTask(taskIndex);
      } else if (event.target.classList.contains("edit-task")) {
        publish("open-task-form", taskIndex);
      } else {
        expandTask(taskIndex);
      }
    });
  });
}

export { projectDynamicListeners, taskDynamicListeners };
