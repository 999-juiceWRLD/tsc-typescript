/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/base-component.ts":
/*!******************************************!*\
  !*** ./src/components/base-component.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Component base class
class Component {
    constructor(templateId, hostElementId, insertAtStart, newElementId) {
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hostElementId);
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        if (newElementId) {
            this.element.id = newElementId;
        }
        this.attach(insertAtStart);
    }
    attach(insertAtBegin) {
        this.hostElement.insertAdjacentElement(insertAtBegin ? "afterbegin" : "beforeend", this.element);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Component);


/***/ }),

/***/ "./src/components/project-input.ts":
/*!*****************************************!*\
  !*** ./src/components/project-input.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   projectState: () => (/* binding */ projectState)
/* harmony export */ });
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-component */ "./src/components/base-component.ts");
/* harmony import */ var _utils_validation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/validation */ "./src/utils/validation.ts");
/* harmony import */ var _decorator_autobind__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../decorator/autobind */ "./src/decorator/autobind.ts");
/* harmony import */ var _state_project_state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../state/project-state */ "./src/state/project-state.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




const projectState = _state_project_state__WEBPACK_IMPORTED_MODULE_3__.ProjectState.getInstance();
// ProjectInput class
class ProjectInput extends _base_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super("project-input", "app", true, "user-input");
        this.titleInputElement = this.element.querySelector("#title");
        this.descriptionInputElement = this.element.querySelector("#description");
        this.peopleInputElement = this.element.querySelector("#people");
        this.configure();
    }
    gatherUserInput() {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;
        const validatableTitle = {
            value: enteredTitle,
            required: true,
            minLength: 5
        };
        const validatableDescription = {
            value: enteredDescription,
            required: true
        };
        const validatablePeople = {
            value: +enteredPeople,
            required: true,
            min: 1
        };
        // return alert if all is false
        if (!(0,_utils_validation__WEBPACK_IMPORTED_MODULE_1__.validate)(validatableTitle) ||
            !(0,_utils_validation__WEBPACK_IMPORTED_MODULE_1__.validate)(validatableDescription) ||
            !(0,_utils_validation__WEBPACK_IMPORTED_MODULE_1__.validate)(validatablePeople)) {
            alert("Invalid operation — please try again.");
            return;
        }
        else {
            return [enteredTitle, enteredDescription, parseFloat(enteredPeople)];
        }
    }
    clearInputs() {
        this.titleInputElement.value = "";
        this.descriptionInputElement.value = "";
        this.peopleInputElement.value = "";
    }
    submitHandler(event) {
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
    renderContent() {
    }
}
__decorate([
    _decorator_autobind__WEBPACK_IMPORTED_MODULE_2__["default"]
], ProjectInput.prototype, "submitHandler", null);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProjectInput);


/***/ }),

/***/ "./src/components/project-item.ts":
/*!****************************************!*\
  !*** ./src/components/project-item.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-component */ "./src/components/base-component.ts");
/* harmony import */ var _decorator_autobind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../decorator/autobind */ "./src/decorator/autobind.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


// ProjectItem class
class ProjectItem extends _base_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
    get person() {
        if (this.project.people === 1) {
            return "1 Person";
        }
        else {
            return `${this.project.people} People assigned`;
        }
    }
    constructor(hostId, project) {
        super("single-project", hostId, false, project.id);
        this.hostId = hostId;
        this.project = project;
        this.configure();
        this.renderContent();
    }
    dragStartHandler(event) {
        event.dataTransfer.setData("text/plain", this.project.id);
        event.dataTransfer.effectAllowed = "move";
    }
    dragEndHandler(_) {
    }
    configure() {
        this.element.addEventListener("dragstart", this.dragStartHandler);
        this.element.addEventListener("dragend", this.dragEndHandler);
    }
    renderContent() {
        this.element.querySelector("h2").textContent = this.project.title;
        this.element.querySelector("h3").textContent = this.person;
        this.element.querySelector("p").textContent = this.project.description;
    }
}
__decorate([
    _decorator_autobind__WEBPACK_IMPORTED_MODULE_1__["default"]
], ProjectItem.prototype, "dragStartHandler", null);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProjectItem);


/***/ }),

/***/ "./src/components/project-list.ts":
/*!****************************************!*\
  !*** ./src/components/project-list.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-component */ "./src/components/base-component.ts");
/* harmony import */ var _decorator_autobind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../decorator/autobind */ "./src/decorator/autobind.ts");
/* harmony import */ var _state_project_state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../state/project-state */ "./src/state/project-state.ts");
/* harmony import */ var _project_item__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./project-item */ "./src/components/project-item.ts");
/* harmony import */ var _project_input__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./project-input */ "./src/components/project-input.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





// ProjectList class
class ProjectList extends _base_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(type) {
        super("project-list", "app", false, `${type}-projects`);
        this.type = type;
        this.assignedProjects = [];
        this.configure();
        this.renderContent();
    }
    dragOverHandler(event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
            event.preventDefault();
            const listEl = this.element.querySelector("ul");
            listEl.classList.add("droppable");
        }
    }
    dropHandler(event) {
        const projectId = event.dataTransfer.getData("text/plain");
        _project_input__WEBPACK_IMPORTED_MODULE_4__.projectState.moveProject(projectId, this.type === "active" ? _state_project_state__WEBPACK_IMPORTED_MODULE_2__.ProjectStatus.ACTIVE : _state_project_state__WEBPACK_IMPORTED_MODULE_2__.ProjectStatus.FINISHED);
    }
    dragLeaverHandler(event) {
        const listEl = this.element.querySelector("ul");
        listEl.classList.remove("droppable");
    }
    configure() {
        this.element.addEventListener("dragover", this.dragOverHandler);
        this.element.addEventListener("dragleave", this.dragLeaverHandler);
        this.element.addEventListener("drop", this.dropHandler);
        _project_input__WEBPACK_IMPORTED_MODULE_4__.projectState.addListener((projects) => {
            const relevantProject = projects.filter(element => {
                if (this.type === "active") {
                    return element.status === _state_project_state__WEBPACK_IMPORTED_MODULE_2__.ProjectStatus.ACTIVE;
                }
                return element.status === _state_project_state__WEBPACK_IMPORTED_MODULE_2__.ProjectStatus.FINISHED;
            });
            this.assignedProjects = relevantProject;
            this.renderProjects();
        });
    }
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector("ul").id = listId;
        this.element.querySelector("h2").textContent = this.type.toUpperCase() + " PROJECTS";
    }
    renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`);
        listEl.innerHTML = "";
        for (const item of this.assignedProjects) {
            new _project_item__WEBPACK_IMPORTED_MODULE_3__["default"](this.element.querySelector("ul").id, item);
        }
    }
}
__decorate([
    _decorator_autobind__WEBPACK_IMPORTED_MODULE_1__["default"]
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    _decorator_autobind__WEBPACK_IMPORTED_MODULE_1__["default"]
], ProjectList.prototype, "dropHandler", null);
__decorate([
    _decorator_autobind__WEBPACK_IMPORTED_MODULE_1__["default"]
], ProjectList.prototype, "dragLeaverHandler", null);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProjectList);


/***/ }),

/***/ "./src/decorator/autobind.ts":
/*!***********************************!*\
  !*** ./src/decorator/autobind.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// autobind decorator
// target and methodName params are not used
function autobind(target, methodName, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (autobind);


/***/ }),

/***/ "./src/helper.ts":
/*!***********************!*\
  !*** ./src/helper.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   greet: () => (/* binding */ greet)
/* harmony export */ });
function greet() {
    console.log("çalış lan çalış");
}


/***/ }),

/***/ "./src/state/project-state.ts":
/*!************************************!*\
  !*** ./src/state/project-state.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProjectState: () => (/* binding */ ProjectState),
/* harmony export */   ProjectStatus: () => (/* binding */ ProjectStatus),
/* harmony export */   State: () => (/* binding */ State)
/* harmony export */ });
/* harmony import */ var _utils_project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/project */ "./src/utils/project.ts");

class State {
    constructor() {
        this.listeners = [];
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
}
// Project type
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["ACTIVE"] = 0] = "ACTIVE";
    ProjectStatus[ProjectStatus["FINISHED"] = 1] = "FINISHED";
})(ProjectStatus || (ProjectStatus = {}));
class ProjectState extends State {
    constructor() {
        super();
        this.projects = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
    addProject(title, description, numOfPeople) {
        const newProject = new _utils_project__WEBPACK_IMPORTED_MODULE_0__.Project(Math.random().toString(), title, description, numOfPeople, ProjectStatus.ACTIVE);
        this.projects.push(newProject);
        this.updateListeners();
    }
    moveProject(projectId, newStatus) {
        const element = this.projects.find(i => i.id === projectId);
        if (element && element.status !== newStatus) {
            element.status = newStatus;
            this.updateListeners();
        }
    }
    updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}


/***/ }),

/***/ "./src/utils/project.ts":
/*!******************************!*\
  !*** ./src/utils/project.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Project: () => (/* binding */ Project)
/* harmony export */ });
class Project {
    constructor(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
}


/***/ }),

/***/ "./src/utils/validation.ts":
/*!*********************************!*\
  !*** ./src/utils/validation.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   validate: () => (/* binding */ validate)
/* harmony export */ });
function validate(input) {
    let isValid = true;
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


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper */ "./src/helper.ts");
/* harmony import */ var _components_project_input__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/project-input */ "./src/components/project-input.ts");
/* harmony import */ var _components_project_list__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/project-list */ "./src/components/project-list.ts");



(0,_helper__WEBPACK_IMPORTED_MODULE_0__.greet)();
const projectInput = new _components_project_input__WEBPACK_IMPORTED_MODULE_1__["default"]();
const activeProjectList = new _components_project_list__WEBPACK_IMPORTED_MODULE_2__["default"]("active");
const finishedProjectList = new _components_project_list__WEBPACK_IMPORTED_MODULE_2__["default"]("finished");

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFRLENBQUMsQ0FBQztBQUNwRCxNQUFNLG1CQUFtQixHQUFHLElBQUksZ0VBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2RyYWctZHJvcC8uL3NyYy9jb21wb25lbnRzL2Jhc2UtY29tcG9uZW50LnRzIiwid2VicGFjazovL2RyYWctZHJvcC8uL3NyYy9jb21wb25lbnRzL3Byb2plY3QtaW5wdXQudHMiLCJ3ZWJwYWNrOi8vZHJhZy1kcm9wLy4vc3JjL2NvbXBvbmVudHMvcHJvamVjdC1pdGVtLnRzIiwid2VicGFjazovL2RyYWctZHJvcC8uL3NyYy9jb21wb25lbnRzL3Byb2plY3QtbGlzdC50cyIsIndlYnBhY2s6Ly9kcmFnLWRyb3AvLi9zcmMvZGVjb3JhdG9yL2F1dG9iaW5kLnRzIiwid2VicGFjazovL2RyYWctZHJvcC8uL3NyYy9oZWxwZXIudHMiLCJ3ZWJwYWNrOi8vZHJhZy1kcm9wLy4vc3JjL3N0YXRlL3Byb2plY3Qtc3RhdGUudHMiLCJ3ZWJwYWNrOi8vZHJhZy1kcm9wLy4vc3JjL3V0aWxzL3Byb2plY3QudHMiLCJ3ZWJwYWNrOi8vZHJhZy1kcm9wLy4vc3JjL3V0aWxzL3ZhbGlkYXRpb24udHMiLCJ3ZWJwYWNrOi8vZHJhZy1kcm9wL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2RyYWctZHJvcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZHJhZy1kcm9wL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZHJhZy1kcm9wL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZHJhZy1kcm9wLy4vc3JjL2FwcC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb21wb25lbnQgYmFzZSBjbGFzc1xuYWJzdHJhY3QgY2xhc3MgQ29tcG9uZW50PFQgZXh0ZW5kcyBIVE1MRWxlbWVudCwgVSBleHRlbmRzIEhUTUxFbGVtZW50PiB7XG4gICAgdGVtcGxhdGVFbGVtZW50OiBIVE1MVGVtcGxhdGVFbGVtZW50O1xuICAgIGhvc3RFbGVtZW50OiBUO1xuICAgIGVsZW1lbnQ6IFU7XG5cbiAgICBjb25zdHJ1Y3Rvcih0ZW1wbGF0ZUlkOiBzdHJpbmcsIGhvc3RFbGVtZW50SWQ6IHN0cmluZywgaW5zZXJ0QXRTdGFydDogYm9vbGVhbiwgXG4gICAgICAgICAgICAgICAgbmV3RWxlbWVudElkPzogc3RyaW5nIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGVFbGVtZW50ID0gPEhUTUxUZW1wbGF0ZUVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGVtcGxhdGVJZCk7XG4gICAgICAgIHRoaXMuaG9zdEVsZW1lbnQgPSA8VD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChob3N0RWxlbWVudElkKTtcbiAgICBcbiAgICAgICAgY29uc3QgaW1wb3J0ZWROb2RlID0gZG9jdW1lbnQuaW1wb3J0Tm9kZShcbiAgICAgICAgICAgIHRoaXMudGVtcGxhdGVFbGVtZW50LmNvbnRlbnQsXG4gICAgICAgICAgICB0cnVlXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IDxVPmltcG9ydGVkTm9kZS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgaWYgKG5ld0VsZW1lbnRJZCkge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmlkID0gbmV3RWxlbWVudElkO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmF0dGFjaChpbnNlcnRBdFN0YXJ0KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGF0dGFjaChpbnNlcnRBdEJlZ2luOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuaG9zdEVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KGluc2VydEF0QmVnaW4gPyBcImFmdGVyYmVnaW5cIiA6IFwiYmVmb3JlZW5kXCIsIHRoaXMuZWxlbWVudCk7XG4gICAgfVxuXG4gICAgYWJzdHJhY3QgY29uZmlndXJlPygpOiB2b2lkO1xuICAgIGFic3RyYWN0IHJlbmRlckNvbnRlbnQoKTogdm9pZDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29tcG9uZW50O1xuIiwiaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiLi9iYXNlLWNvbXBvbmVudFwiO1xuaW1wb3J0IHsgdmFsaWRhdGUsIFZhbGlkYXRhYmxlT2JqZWN0IH0gZnJvbSBcIi4uL3V0aWxzL3ZhbGlkYXRpb25cIjtcbmltcG9ydCBhdXRvYmluZCBmcm9tIFwiLi4vZGVjb3JhdG9yL2F1dG9iaW5kXCI7XG5pbXBvcnQgeyBQcm9qZWN0U3RhdGUgfSBmcm9tIFwiLi4vc3RhdGUvcHJvamVjdC1zdGF0ZVwiO1xuXG5leHBvcnQgY29uc3QgcHJvamVjdFN0YXRlID0gUHJvamVjdFN0YXRlLmdldEluc3RhbmNlKCk7XG5cbi8vIFByb2plY3RJbnB1dCBjbGFzc1xuY2xhc3MgUHJvamVjdElucHV0IGV4dGVuZHMgQ29tcG9uZW50PEhUTUxEaXZFbGVtZW50LCBIVE1MRm9ybUVsZW1lbnQ+IHtcblxuICAgIHRpdGxlSW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50O1xuICAgIGRlc2NyaXB0aW9uSW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50O1xuICAgIHBlb3BsZUlucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihcInByb2plY3QtaW5wdXRcIiwgXCJhcHBcIiwgdHJ1ZSwgXCJ1c2VyLWlucHV0XCIpO1xuICAgICAgICB0aGlzLnRpdGxlSW5wdXRFbGVtZW50ID0gPEhUTUxJbnB1dEVsZW1lbnQ+dGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGl0bGVcIik7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb25JbnB1dEVsZW1lbnQgPSA8SFRNTElucHV0RWxlbWVudD50aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcIiNkZXNjcmlwdGlvblwiKTtcbiAgICAgICAgdGhpcy5wZW9wbGVJbnB1dEVsZW1lbnQgPSA8SFRNTElucHV0RWxlbWVudD50aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcIiNwZW9wbGVcIik7XG4gICAgICAgIHRoaXMuY29uZmlndXJlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnYXRoZXJVc2VySW5wdXQoKTogW3N0cmluZywgc3RyaW5nLCBudW1iZXJdIHwgdm9pZCB7XG4gICAgICAgIGNvbnN0IGVudGVyZWRUaXRsZSA9IHRoaXMudGl0bGVJbnB1dEVsZW1lbnQudmFsdWU7XG4gICAgICAgIGNvbnN0IGVudGVyZWREZXNjcmlwdGlvbiA9IHRoaXMuZGVzY3JpcHRpb25JbnB1dEVsZW1lbnQudmFsdWU7XG4gICAgICAgIGNvbnN0IGVudGVyZWRQZW9wbGUgPSB0aGlzLnBlb3BsZUlucHV0RWxlbWVudC52YWx1ZTtcblxuICAgICAgICBjb25zdCB2YWxpZGF0YWJsZVRpdGxlOiBWYWxpZGF0YWJsZU9iamVjdCA9IHtcbiAgICAgICAgICAgIHZhbHVlOiBlbnRlcmVkVGl0bGUsXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgICAgIG1pbkxlbmd0aDogNVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHZhbGlkYXRhYmxlRGVzY3JpcHRpb246IFZhbGlkYXRhYmxlT2JqZWN0ID0ge1xuICAgICAgICAgICAgdmFsdWU6IGVudGVyZWREZXNjcmlwdGlvbixcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgdmFsaWRhdGFibGVQZW9wbGU6IFZhbGlkYXRhYmxlT2JqZWN0ID0ge1xuICAgICAgICAgICAgdmFsdWU6ICtlbnRlcmVkUGVvcGxlLFxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgICAgICBtaW46IDFcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJldHVybiBhbGVydCBpZiBhbGwgaXMgZmFsc2VcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgIXZhbGlkYXRlKHZhbGlkYXRhYmxlVGl0bGUpIHx8IFxuICAgICAgICAgICAgIXZhbGlkYXRlKHZhbGlkYXRhYmxlRGVzY3JpcHRpb24pIHx8XG4gICAgICAgICAgICAhdmFsaWRhdGUodmFsaWRhdGFibGVQZW9wbGUpKSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoXCJJbnZhbGlkIG9wZXJhdGlvbiDigJQgcGxlYXNlIHRyeSBhZ2Fpbi5cIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFtlbnRlcmVkVGl0bGUsIGVudGVyZWREZXNjcmlwdGlvbiwgcGFyc2VGbG9hdChlbnRlcmVkUGVvcGxlKV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNsZWFySW5wdXRzKCkge1xuICAgICAgICB0aGlzLnRpdGxlSW5wdXRFbGVtZW50LnZhbHVlID0gXCJcIjtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbklucHV0RWxlbWVudC52YWx1ZSA9IFwiXCI7XG4gICAgICAgIHRoaXMucGVvcGxlSW5wdXRFbGVtZW50LnZhbHVlID0gXCJcIjtcbiAgICB9XG5cbiAgICBAYXV0b2JpbmRcbiAgICBwcml2YXRlIHN1Ym1pdEhhbmRsZXIoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IHVzZXJJbnB1dCA9IHRoaXMuZ2F0aGVyVXNlcklucHV0KCk7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHVzZXJJbnB1dCkpIHtcbiAgICAgICAgICAgIGNvbnN0IFt0aXRsZSwgZGVzYywgcGVvcGxlXSA9IHVzZXJJbnB1dDtcbiAgICAgICAgICAgIHByb2plY3RTdGF0ZS5hZGRQcm9qZWN0KHRpdGxlLCBkZXNjLCBwZW9wbGUpO1xuICAgICAgICAgICAgdGhpcy5jbGVhcklucHV0cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgIGNvbmZpZ3VyZSgpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgdGhpcy5zdWJtaXRIYW5kbGVyKTtcbiAgICB9XG4gICAgXG4gICAgcmVuZGVyQ29udGVudCgpOiB2b2lkIHtcbiAgICAgICAgXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0SW5wdXQ7XG4iLCJpbXBvcnQgQ29tcG9uZW50IGZyb20gXCIuL2Jhc2UtY29tcG9uZW50XCI7XG5pbXBvcnQgeyBQcm9qZWN0IH0gZnJvbSBcIi4uL3V0aWxzL3Byb2plY3RcIjtcbmltcG9ydCBhdXRvYmluZCBmcm9tIFwiLi4vZGVjb3JhdG9yL2F1dG9iaW5kXCI7XG5pbXBvcnQgeyBEcmFnZ2FibGUgfSBmcm9tIFwiLi4vbW9kZWxzL2RyYWctZHJvcFwiO1xuXG4vLyBQcm9qZWN0SXRlbSBjbGFzc1xuY2xhc3MgUHJvamVjdEl0ZW0gZXh0ZW5kcyBDb21wb25lbnQ8SFRNTFVMaXN0RWxlbWVudCwgSFRNTExJRWxlbWVudD4gaW1wbGVtZW50cyBEcmFnZ2FibGUge1xuICAgIGhvc3RJZDogc3RyaW5nO1xuICAgIHByaXZhdGUgcHJvamVjdDogUHJvamVjdDtcblxuICAgIGdldCBwZXJzb24oKSB7XG4gICAgICAgIGlmICh0aGlzLnByb2plY3QucGVvcGxlID09PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gXCIxIFBlcnNvblwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGAke3RoaXMucHJvamVjdC5wZW9wbGV9IFBlb3BsZSBhc3NpZ25lZGA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgY29uc3RydWN0b3IoaG9zdElkOiBzdHJpbmcsIHByb2plY3Q6IFByb2plY3QpIHtcbiAgICAgICAgc3VwZXIoXCJzaW5nbGUtcHJvamVjdFwiLCBob3N0SWQsIGZhbHNlLCBwcm9qZWN0LmlkKTtcbiAgICAgICAgdGhpcy5ob3N0SWQgPSBob3N0SWQ7XG4gICAgICAgIHRoaXMucHJvamVjdCA9IHByb2plY3Q7XG5cbiAgICAgICAgdGhpcy5jb25maWd1cmUoKTtcbiAgICAgICAgdGhpcy5yZW5kZXJDb250ZW50KCk7XG4gICAgfVxuXG4gICAgQGF1dG9iaW5kXG4gICAgZHJhZ1N0YXJ0SGFuZGxlcihldmVudDogRHJhZ0V2ZW50KTogdm9pZCB7XG4gICAgICAgIGV2ZW50LmRhdGFUcmFuc2ZlciEuc2V0RGF0YShcInRleHQvcGxhaW5cIiwgdGhpcy5wcm9qZWN0LmlkKTtcbiAgICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyIS5lZmZlY3RBbGxvd2VkID0gXCJtb3ZlXCI7XG4gICAgfVxuXG4gICAgZHJhZ0VuZEhhbmRsZXIoXzogRHJhZ0V2ZW50KTogdm9pZCB7XG4gICAgfVxuXG4gICAgY29uZmlndXJlKCk6IHZvaWQgeyBcbiAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnc3RhcnRcIiwgdGhpcy5kcmFnU3RhcnRIYW5kbGVyKTsgXG4gICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2VuZFwiLCB0aGlzLmRyYWdFbmRIYW5kbGVyKTtcbiAgICB9XG5cbiAgICByZW5kZXJDb250ZW50KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcImgyXCIpIS50ZXh0Q29udGVudCA9IHRoaXMucHJvamVjdC50aXRsZTtcbiAgICAgICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJoM1wiKSEudGV4dENvbnRlbnQgPSB0aGlzLnBlcnNvbjtcbiAgICAgICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJwXCIpIS50ZXh0Q29udGVudCA9IHRoaXMucHJvamVjdC5kZXNjcmlwdGlvbjtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFByb2plY3RJdGVtO1xuIiwiaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiLi9iYXNlLWNvbXBvbmVudFwiO1xuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gXCIuLi91dGlscy9wcm9qZWN0XCI7XG5pbXBvcnQgYXV0b2JpbmQgZnJvbSBcIi4uL2RlY29yYXRvci9hdXRvYmluZFwiO1xuaW1wb3J0IHsgUHJvamVjdFN0YXR1cyB9IGZyb20gXCIuLi9zdGF0ZS9wcm9qZWN0LXN0YXRlXCI7XG5pbXBvcnQgUHJvamVjdEl0ZW0gZnJvbSBcIi4vcHJvamVjdC1pdGVtXCI7XG5pbXBvcnQgeyBEcmFnVGFyZ2V0IH0gZnJvbSBcIi4uL21vZGVscy9kcmFnLWRyb3BcIjtcbmltcG9ydCB7IHByb2plY3RTdGF0ZSB9IGZyb20gXCIuL3Byb2plY3QtaW5wdXRcIjtcblxuLy8gUHJvamVjdExpc3QgY2xhc3NcbmNsYXNzIFByb2plY3RMaXN0IGV4dGVuZHMgQ29tcG9uZW50PEhUTUxEaXZFbGVtZW50LCBIVE1MRWxlbWVudD4gaW1wbGVtZW50cyBEcmFnVGFyZ2V0IHtcbiAgICBhc3NpZ25lZFByb2plY3RzOiBQcm9qZWN0W107XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHR5cGU6IFwiYWN0aXZlXCIgfCBcImZpbmlzaGVkXCIpIHtcbiAgICAgICAgXG4gICAgICAgIHN1cGVyKFwicHJvamVjdC1saXN0XCIsIFwiYXBwXCIsIGZhbHNlLCBgJHt0eXBlfS1wcm9qZWN0c2ApO1xuICAgICAgICB0aGlzLmFzc2lnbmVkUHJvamVjdHMgPSBbXTtcblxuICAgICAgICB0aGlzLmNvbmZpZ3VyZSgpO1xuICAgICAgICB0aGlzLnJlbmRlckNvbnRlbnQoKTtcbiAgICB9XG5cbiAgICBAYXV0b2JpbmRcbiAgICBkcmFnT3ZlckhhbmRsZXIoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xuICAgICAgICBpZiAoZXZlbnQuZGF0YVRyYW5zZmVyICYmIGV2ZW50LmRhdGFUcmFuc2Zlci50eXBlc1swXSA9PT0gXCJ0ZXh0L3BsYWluXCIpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCBsaXN0RWwgPSA8SFRNTFVMaXN0RWxlbWVudD50aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcInVsXCIpO1xuICAgICAgICAgICAgbGlzdEVsLmNsYXNzTGlzdC5hZGQoXCJkcm9wcGFibGVcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBAYXV0b2JpbmRcbiAgICBkcm9wSGFuZGxlcihldmVudDogRHJhZ0V2ZW50KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHByb2plY3RJZCA9IGV2ZW50LmRhdGFUcmFuc2ZlciEuZ2V0RGF0YShcInRleHQvcGxhaW5cIik7XG4gICAgICAgIHByb2plY3RTdGF0ZS5tb3ZlUHJvamVjdChwcm9qZWN0SWQsIHRoaXMudHlwZSA9PT0gXCJhY3RpdmVcIiA/IFByb2plY3RTdGF0dXMuQUNUSVZFIDogUHJvamVjdFN0YXR1cy5GSU5JU0hFRCk7XG4gICAgfVxuXG4gICAgQGF1dG9iaW5kXG4gICAgZHJhZ0xlYXZlckhhbmRsZXIoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xuICAgICAgICBjb25zdCBsaXN0RWwgPSA8SFRNTFVMaXN0RWxlbWVudD50aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcInVsXCIpO1xuICAgICAgICBsaXN0RWwuY2xhc3NMaXN0LnJlbW92ZShcImRyb3BwYWJsZVwiKTtcbiAgICB9XG5cbiAgICBjb25maWd1cmUoKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIiwgdGhpcy5kcmFnT3ZlckhhbmRsZXIpO1xuICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdsZWF2ZVwiLCB0aGlzLmRyYWdMZWF2ZXJIYW5kbGVyKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsIHRoaXMuZHJvcEhhbmRsZXIpO1xuXG4gICAgICAgIHByb2plY3RTdGF0ZS5hZGRMaXN0ZW5lcigocHJvamVjdHM6IFByb2plY3RbXSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcmVsZXZhbnRQcm9qZWN0ID0gcHJvamVjdHMuZmlsdGVyKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnR5cGUgPT09IFwiYWN0aXZlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQuc3RhdHVzID09PSBQcm9qZWN0U3RhdHVzLkFDVElWRTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQuc3RhdHVzID09PSBQcm9qZWN0U3RhdHVzLkZJTklTSEVEO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHRoaXMuYXNzaWduZWRQcm9qZWN0cyA9IHJlbGV2YW50UHJvamVjdDtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyUHJvamVjdHMoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyQ29udGVudCgpIHtcbiAgICAgICAgY29uc3QgbGlzdElkOiBzdHJpbmcgPSBgJHt0aGlzLnR5cGV9LXByb2plY3RzLWxpc3RgO1xuICAgICAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcInVsXCIpIS5pZCA9IGxpc3RJZDtcbiAgICAgICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJoMlwiKSEudGV4dENvbnRlbnQgPSB0aGlzLnR5cGUudG9VcHBlckNhc2UoKSArIFwiIFBST0pFQ1RTXCI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW5kZXJQcm9qZWN0cygpIHtcbiAgICAgICAgY29uc3QgbGlzdEVsID0gPEhUTUxVTGlzdEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7dGhpcy50eXBlfS1wcm9qZWN0cy1saXN0YCk7XG4gICAgICAgIGxpc3RFbC5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdGhpcy5hc3NpZ25lZFByb2plY3RzKSB7XG4gICAgICAgICAgICBuZXcgUHJvamVjdEl0ZW0odGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ1bFwiKSEuaWQsIGl0ZW0pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0TGlzdDtcbiIsIi8vIGF1dG9iaW5kIGRlY29yYXRvclxuLy8gdGFyZ2V0IGFuZCBtZXRob2ROYW1lIHBhcmFtcyBhcmUgbm90IHVzZWRcbmZ1bmN0aW9uIGF1dG9iaW5kKHRhcmdldDogYW55LCBtZXRob2ROYW1lOiBzdHJpbmcsIGRlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvcikge1xuICAgIGNvbnN0IG9yaWdpbmFsTWV0aG9kID0gZGVzY3JpcHRvci52YWx1ZTtcbiAgICBjb25zdCBhZGpEZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3IgPSB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgY29uc3QgYm91bmRGbiA9IG9yaWdpbmFsTWV0aG9kLmJpbmQodGhpcyk7XG4gICAgICAgICAgICByZXR1cm4gYm91bmRGbjtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIGFkakRlc2NyaXB0b3I7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGF1dG9iaW5kO1xuIiwiZXhwb3J0IGZ1bmN0aW9uIGdyZWV0KCkge1xuICAgIGNvbnNvbGUubG9nKFwiw6dhbMSxxZ8gbGFuIMOnYWzEscWfXCIpO1xufVxuIiwiaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gXCIuLi91dGlscy9wcm9qZWN0XCI7XG5cbi8vIFByb2plY3Qgc3RhdGUgbWFuYWdlbWVudFxuXG5leHBvcnQgdHlwZSBMaXN0ZW5lcjxUPiA9IChpdGVtczogVFtdKSA9PiB2b2lkO1xuXG5leHBvcnQgY2xhc3MgU3RhdGU8VD4ge1xuICAgIHByb3RlY3RlZCBsaXN0ZW5lcnM6IExpc3RlbmVyPFQ+W10gPSBbXTtcblxuICAgIGFkZExpc3RlbmVyKGxpc3RlbmVyRm46IExpc3RlbmVyPFQ+KSB7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzLnB1c2gobGlzdGVuZXJGbik7XG4gICAgfVxufVxuXG4vLyBQcm9qZWN0IHR5cGVcblxuZXhwb3J0IGVudW0gUHJvamVjdFN0YXR1cyB7XG4gICAgQUNUSVZFLFxuICAgIEZJTklTSEVEXG59XG5cbmV4cG9ydCBjbGFzcyBQcm9qZWN0U3RhdGUgZXh0ZW5kcyBTdGF0ZTxQcm9qZWN0PntcbiAgICBwcml2YXRlIHByb2plY3RzOiBQcm9qZWN0W10gPSBbXTtcbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogUHJvamVjdFN0YXRlO1xuXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgfVxuXG4gICAgc3RhdGljIGdldEluc3RhbmNlKCkge1xuICAgICAgICBpZiAodGhpcy5pbnN0YW5jZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmluc3RhbmNlID0gbmV3IFByb2plY3RTdGF0ZSgpO1xuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgICB9XG5cbiAgICBhZGRQcm9qZWN0KHRpdGxlOiBzdHJpbmcsIGRlc2NyaXB0aW9uOiBzdHJpbmcsIG51bU9mUGVvcGxlOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0KFxuICAgICAgICAgICAgTWF0aC5yYW5kb20oKS50b1N0cmluZygpLFxuICAgICAgICAgICAgdGl0bGUsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgICAgIG51bU9mUGVvcGxlLFxuICAgICAgICAgICAgUHJvamVjdFN0YXR1cy5BQ1RJVkVcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5wcm9qZWN0cy5wdXNoKG5ld1Byb2plY3QpO1xuICAgICAgICB0aGlzLnVwZGF0ZUxpc3RlbmVycygpO1xuICAgIH1cblxuICAgIG1vdmVQcm9qZWN0KHByb2plY3RJZDogc3RyaW5nLCBuZXdTdGF0dXM6IFByb2plY3RTdGF0dXMpIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMucHJvamVjdHMuZmluZChpID0+IGkuaWQgPT09IHByb2plY3RJZClcbiAgICAgICAgaWYgKGVsZW1lbnQgJiYgZWxlbWVudC5zdGF0dXMgIT09IG5ld1N0YXR1cykge1xuICAgICAgICAgICAgZWxlbWVudC5zdGF0dXMgPSBuZXdTdGF0dXM7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUxpc3RlbmVycygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGZvciAoY29uc3QgbGlzdGVuZXJGbiBvZiB0aGlzLmxpc3RlbmVycykge1xuICAgICAgICAgICAgbGlzdGVuZXJGbih0aGlzLnByb2plY3RzLnNsaWNlKCkpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4iLCJpbXBvcnQgeyBQcm9qZWN0U3RhdHVzIH0gZnJvbSBcIi4uL3N0YXRlL3Byb2plY3Qtc3RhdGVcIjtcblxuZXhwb3J0IGNsYXNzIFByb2plY3Qge1xuICAgIHB1YmxpYyBpZDogc3RyaW5nO1xuICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xuICAgIHB1YmxpYyBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIHB1YmxpYyBwZW9wbGU6IG51bWJlcjtcbiAgICBwdWJsaWMgc3RhdHVzOiBQcm9qZWN0U3RhdHVzO1xuXG4gICAgY29uc3RydWN0b3IoaWQ6IHN0cmluZywgdGl0bGU6IHN0cmluZywgZGVzY3JpcHRpb246IHN0cmluZywgcGVvcGxlOiBudW1iZXIsIHN0YXR1czogUHJvamVjdFN0YXR1cykge1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgICAgICB0aGlzLnBlb3BsZSA9IHBlb3BsZTtcbiAgICAgICAgdGhpcy5zdGF0dXMgPSBzdGF0dXM7XG4gICAgfVxufSIsImV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZShpbnB1dDogVmFsaWRhdGFibGVPYmplY3QpOiBib29sZWFuIHtcbiAgICBsZXQgaXNWYWxpZDogYm9vbGVhbiA9IHRydWU7XG4gICAgaWYgKGlucHV0LnJlcXVpcmVkKSB7XG4gICAgICAgIGlzVmFsaWQgPSBpc1ZhbGlkICYmIGlucHV0LnZhbHVlLnRvU3RyaW5nKCkudHJpbSgpLmxlbmd0aCAhPT0gMDtcbiAgICB9XG4gICAgaWYgKGlucHV0Lm1pbkxlbmd0aCAhPSBudWxsICYmIHR5cGVvZiBpbnB1dC52YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiBpbnB1dC52YWx1ZS5sZW5ndGggPj0gaW5wdXQubWluTGVuZ3RoO1xuICAgIH1cbiAgICBpZiAoaW5wdXQubWF4TGVuZ3RoICE9IG51bGwgJiYgdHlwZW9mIGlucHV0LnZhbHVlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGlzVmFsaWQgPSBpc1ZhbGlkICYmIGlucHV0LnZhbHVlLmxlbmd0aCA8PSBpbnB1dC5tYXhMZW5ndGg7XG4gICAgfVxuICAgIGlmIChpbnB1dC5taW4gIT0gbnVsbCAmJiB0eXBlb2YgaW5wdXQudmFsdWUgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgaXNWYWxpZCA9IGlzVmFsaWQgJiYgaW5wdXQudmFsdWUgPj0gaW5wdXQubWluO1xuICAgIH1cbiAgICBpZiAoaW5wdXQubWF4ICE9IG51bGwgJiYgdHlwZW9mIGlucHV0LnZhbHVlID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgIGlzVmFsaWQgPSBpc1ZhbGlkICYmIGlucHV0LnZhbHVlIDw9IGlucHV0Lm1heDtcbiAgICB9XG4gICAgcmV0dXJuIGlzVmFsaWQ7XG59XG5cbi8vIHZhbGlkYXRpb24gbWVjaGFuaXNtXG5leHBvcnQgaW50ZXJmYWNlIFZhbGlkYXRhYmxlT2JqZWN0IHtcbiAgICB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyO1xuICAgIHJlcXVpcmVkPzogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICBtaW5MZW5ndGg/OiBudW1iZXI7XG4gICAgbWF4TGVuZ3RoPzogbnVtYmVyO1xuICAgIG1pbj86IG51bWJlcjtcbiAgICBtYXg/OiBudW1iZXI7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGdyZWV0IH0gZnJvbSBcIi4vaGVscGVyXCI7XG5pbXBvcnQgUHJvamVjdElucHV0IGZyb20gXCIuL2NvbXBvbmVudHMvcHJvamVjdC1pbnB1dFwiO1xuaW1wb3J0IFByb2plY3RMaXN0IGZyb20gXCIuL2NvbXBvbmVudHMvcHJvamVjdC1saXN0XCI7XG5cbmdyZWV0KCk7XG5cbmNvbnN0IHByb2plY3RJbnB1dCA9IG5ldyBQcm9qZWN0SW5wdXQoKTtcbmNvbnN0IGFjdGl2ZVByb2plY3RMaXN0ID0gbmV3IFByb2plY3RMaXN0KFwiYWN0aXZlXCIpO1xuY29uc3QgZmluaXNoZWRQcm9qZWN0TGlzdCA9IG5ldyBQcm9qZWN0TGlzdChcImZpbmlzaGVkXCIpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9