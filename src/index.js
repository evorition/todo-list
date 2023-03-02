import initializeStaticListeners from "./modules/formsController";
import initializeDisplayController from "./modules/displayController";
import { initializeProjects } from "./modules/projectsHandler";

initializeDisplayController();
initializeStaticListeners();
initializeProjects();
