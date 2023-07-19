import Component from "./base-component";
import { Project } from "../utils/project";
import autobind from "../decorator/autobind";
import { ProjectStatus } from "../state/project-state";
import ProjectItem from "./project-item";
import { DragTarget } from "../models/drag-drop";
import { projectState } from "./project-input";

// ProjectList class
class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
    assignedProjects: Project[];

    constructor(private type: "active" | "finished") {
        
        super("project-list", "app", false, `${type}-projects`);
        this.assignedProjects = [];

        this.configure();
        this.renderContent();
    }

    @autobind
    dragOverHandler(event: DragEvent): void {
        if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
            event.preventDefault();
            const listEl = <HTMLUListElement>this.element.querySelector("ul");
            listEl.classList.add("droppable");
        }
    }

    @autobind
    dropHandler(event: DragEvent): void {
        const projectId = event.dataTransfer!.getData("text/plain");
        projectState.moveProject(projectId, this.type === "active" ? ProjectStatus.ACTIVE : ProjectStatus.FINISHED);
    }

    @autobind
    dragLeaverHandler(event: DragEvent): void {
        const listEl = <HTMLUListElement>this.element.querySelector("ul");
        listEl.classList.remove("droppable");
    }

    configure() {
        this.element.addEventListener("dragover", this.dragOverHandler);
        this.element.addEventListener("dragleave", this.dragLeaverHandler);
        this.element.addEventListener("drop", this.dropHandler);

        projectState.addListener((projects: Project[]) => {
            const relevantProject = projects.filter(element => {
                if (this.type === "active") {
                    return element.status === ProjectStatus.ACTIVE;
                }
                return element.status === ProjectStatus.FINISHED;
            })
            this.assignedProjects = relevantProject;
            this.renderProjects();
        });
    }

    renderContent() {
        const listId: string = `${this.type}-projects-list`;
        this.element.querySelector("ul")!.id = listId;
        this.element.querySelector("h2")!.textContent = this.type.toUpperCase() + " PROJECTS";
    }

    private renderProjects() {
        const listEl = <HTMLUListElement>document.getElementById(`${this.type}-projects-list`);
        listEl.innerHTML = "";
        for (const item of this.assignedProjects) {
            new ProjectItem(this.element.querySelector("ul")!.id, item);
        }
    }
}

export default ProjectList;
