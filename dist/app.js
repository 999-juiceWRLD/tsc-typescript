import { greet } from "./helper.js";
import ProjectInput from "./components/project-input.js";
import ProjectList from "./components/project-list.js";
greet();
const projectInput = new ProjectInput();
const activeProjectList = new ProjectList("active");
const finishedProjectList = new ProjectList("finished");
//# sourceMappingURL=app.js.map