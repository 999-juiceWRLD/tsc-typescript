import { greet } from "./helper.js";
import Component from "./components/base-component.js";
import autobind from "./decorator/autobind.js";
import ProjectItem from "./components/project-item.js";
import ProjectInput from "./components/project-input.js";
import { ProjectState, Listener, State, ProjectStatus } from "./state/project-state.js";
import ProjectList from "./components/project-list.js";
import { validate } from "./utils/validation.js";

greet();

const projectInput = new ProjectInput();
const activeProjectList = new ProjectList("active");
const finishedProjectList = new ProjectList("finished");
