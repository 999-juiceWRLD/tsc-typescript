import Component from "./base-component.js";
import { Project } from "../utils/project.js";
import autobind from "../decorator/autobind.js";
import { Draggable } from "../models/drag-drop.js";

// ProjectItem class
class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
    hostId: string;
    private project: Project;

    get person() {
        if (this.project.people === 1) {
            return "1 Person";
        } else {
            return `${this.project.people} People assigned`;
        }
    }
    
    constructor(hostId: string, project: Project) {
        super("single-project", hostId, false, project.id);
        this.hostId = hostId;
        this.project = project;

        this.configure();
        this.renderContent();
    }

    @autobind
    dragStartHandler(event: DragEvent): void {
        event.dataTransfer!.setData("text/plain", this.project.id);
        event.dataTransfer!.effectAllowed = "move";
    }

    dragEndHandler(_: DragEvent): void {
    }

    configure(): void { 
        this.element.addEventListener("dragstart", this.dragStartHandler); 
        this.element.addEventListener("dragend", this.dragEndHandler);
    }

    renderContent(): void {
        this.element.querySelector("h2")!.textContent = this.project.title;
        this.element.querySelector("h3")!.textContent = this.person;
        this.element.querySelector("p")!.textContent = this.project.description;
    }
}

export default ProjectItem;
