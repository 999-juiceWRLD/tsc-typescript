import { greet } from "./helper.js";
greet();

// Drag & drop interfaces

interface Draggable {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
    dragOverHandler(event: DragEvent): void;
    dropHandler(event: DragEvent): void;
    dragLeaverHandler(event: DragEvent): void;
}

// Project type

enum ProjectStatus {
    ACTIVE,
    FINISHED
}

class Project {
    public id: string;
    public title: string;
    public description: string;
    public people: number;
    public status: ProjectStatus;

    constructor(id: string, title: string, description: string, people: number, status: ProjectStatus) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
}


// Project state management

type Listener<T> = (items: T[]) => void;

class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }
}

class ProjectState extends State<Project>{
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
        super();
     }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }

        this.instance = new ProjectState();
        return this.instance;
    }

    addProject(title: string, description: string, numOfPeople: number) {
        const newProject = new Project(
            Math.random().toString(),
            title,
            description,
            numOfPeople,
            ProjectStatus.ACTIVE
        );
        this.projects.push(newProject);
        this.updateListeners();
    }

    moveProject(projectId: string, newStatus: ProjectStatus) {
        const element = this.projects.find(i => i.id === projectId)
        if (element && element.status !== newStatus) {
            element.status = newStatus;
            this.updateListeners();
        }
    }

    private updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}

const projectState = ProjectState.getInstance();

// validation mechanism
interface ValidatableObject {
    value: string | number;
    required?: boolean | undefined;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

function validate(input: ValidatableObject): boolean {
    let isValid: boolean = true;
    if (input.required) {
        isValid = isValid && input.value.toString().trim().length !== 0;
    }
    if (input.minLength != null && typeof input.value === "string") {
        isValid = isValid && input.value.length >= input.minLength;
    }
    if (input.maxLength != null && typeof input.value === "string") {
        isValid = isValid && input.value.length <= input.maxLength;
    }
    if (input.min != null && typeof input.value === "number") {
        isValid = isValid && input.value >= input.min;
    }
    if (input.max != null && typeof input.value === "number") {
        isValid = isValid && input.value <= input.max;
    }
    return isValid;
}


// autobind decorator
// target and methodName params are not used
function autobind(target: any, methodName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}

// Component base class
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    constructor(templateId: string, hostElementId: string, insertAtStart: boolean, 
                newElementId?: string | undefined) {
        this.templateElement = <HTMLTemplateElement>document.getElementById(templateId);
        this.hostElement = <T>document.getElementById(hostElementId);
    
        const importedNode = document.importNode(
            this.templateElement.content,
            true
        );
        this.element = <U>importedNode.firstElementChild;
        if (newElementId) {
            this.element.id = newElementId;
        }
        
        this.attach(insertAtStart);
    }

    private attach(insertAtBegin: boolean) {
        this.hostElement.insertAdjacentElement(insertAtBegin ? "afterbegin" : "beforeend", this.element);
    }

    abstract configure?(): void;
    abstract renderContent(): void;
}


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
        console.log("DragEnd");
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


// ProjectInput class

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {

    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        super("project-input", "app", true, "user-input");
        this.titleInputElement = <HTMLInputElement>this.element.querySelector("#title");
        this.descriptionInputElement = <HTMLInputElement>this.element.querySelector("#description");
        this.peopleInputElement = <HTMLInputElement>this.element.querySelector("#people");
        this.configure();
    }

    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;

        const validatableTitle: ValidatableObject = {
            value: enteredTitle,
            required: true,
            minLength: 5
        };

        const validatableDescription: ValidatableObject = {
            value: enteredDescription,
            required: true
        };

        const validatablePeople: ValidatableObject = {
            value: +enteredPeople,
            required: true,
            min: 1
        }

        // return alert if all is false
        if (
            !validate(validatableTitle) || 
            !validate(validatableDescription) ||
            !validate(validatablePeople)) {
                alert("Invalid operation — please try again.");
                return;
        } else {
            return [enteredTitle, enteredDescription, parseFloat(enteredPeople)];
        }
    }

    private clearInputs() {
        this.titleInputElement.value = "";
        this.descriptionInputElement.value = "";
        this.peopleInputElement.value = "";
    }

    @autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            console.log(title, desc, people);
            projectState.addProject(title, desc, people);
            this.clearInputs();
        }
    }

     configure() {
        this.element.addEventListener("submit", this.submitHandler);
    }
    
    renderContent(): void {
        
    }
}


const projectInput = new ProjectInput();
const activeProjectList = new ProjectList("active");
const finishedProjectList = new ProjectList("finished");
