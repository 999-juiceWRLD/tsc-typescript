import { greet } from "./helper";
import ProjectInput from "./components/project-input";
import ProjectList from "./components/project-list";

greet();

const projectInput = new ProjectInput();
const activeProjectList = new ProjectList("active");
const finishedProjectList = new ProjectList("finished");
