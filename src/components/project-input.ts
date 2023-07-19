import Component from "./base-component";
import { validate, ValidatableObject } from "../utils/validation";
import autobind from "../decorator/autobind";
import { ProjectState } from "../state/project-state";

export const projectState = ProjectState.getInstance();

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

export default ProjectInput;
