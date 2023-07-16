# TypeScript

## 1. Part

### Primitive Types

- `string`
- `number`, no matter `float` or `int`
- `boolean`, either `true` or `false`

### Object Type

Althought that TypeScript can infer object types, it's better to define all types.

```typescript
const plane: {
    company: string,
    model: string,
    year: number
} = {
    make: "airbus",
    model: "beluga",
    year: 1992
}
```

Nested objects exist too. This is a JavaScript object:

```js
const product = {
  id: 'abc1',
  price: 12.99,
  tags: ['great-offer', 'hot-and-new'],
  details: {
    title: 'Red Carpet',
    description: 'A great carpet - almost brand-new!'
  }
}
```

This would be the type of this object:

```typescript
const product: {
    id: string;
    price: number;
    tags: string[];
    details: {
        title: string;
        description: string;
    }
}
```

### Tuples

A tuple is a typed array with a pre-defined length and types for each index.

`const aTuple: [string, number, boolean] = ["this", 85, true];`

### Enums

Enums allow a developer to define a set of named constants.

#### Numeric Enums

By default, enums will initialize the first value to 0 and add 1 to each additional value. They can be empty, first element be initialized or each element initalized.

```typescript
enum CardinalDirections {
    North,
    East,
    South,
    West
};
```

#### String Enums

```typescript
enum CardinalDirections {
    North = 'North',
    East = "East",
    South = "South",
    West = "West"
};
```

Enums can be mixed as string and number enums too.

### Any Type

Type `any` can be any value, such as `string`, `boolean`, etc. However, this should be avoided.

### Union Type

Union type helps parameters able to be one of multiple types, denoted by `|`.

```typescript
function combine(inp1: string | number, inp2: string | number) {
    if ((typeof inp1 === "string") && (typeof inp2 === "string")) {
        console.log(inp1 + " and " + inp2);
        return;
    }
    else if ((typeof inp1 === "number") && (typeof inp2 === "number")) {
        console.log(inp1 + inp2);
        return;
    }
    else {
        console.log("maybe you should try something else.");
        return;
    }
}


combine("Max", "Anna");
combine(21, 3);
```

### Literal Type

In addition to the general types `string` and `number`, we can refer to *specific* strings and numbers in type positions.

```typescript
const constantString = "Hello World";
// Because `constantString` can only represent 1 possible string, it
// has a literal type representation
```

or

```typescript
const someStrings: "Woo" | "Boo"
```

### Creating a new type for convenience

Instead of writing, say, `var: string | number`, we can create our new types.

```typescript
type Combinable = string | number;
type ConversionDescriptor = "as-number" | "as-text";

function combine(inp1: Combinable, inp2: Combinable) {
    // .
    // .
    // .
}
```

We can encode more complex type definitions into our own types.

### Defining function types

It's pretty handy to have functions as types, because it encourages stability.

```typescript
type multType = (fparam: number, sparam: number) => number;

const multResult: multType = (first: number, second: number) => {
    return first * second;
}

function printResult(fn: multType, first: number, second: number) {
    console.log(fn(first, second));
};

printResult(multResult, 3, 5);

// 15
```

## 2. Part

### Watch Mode

When working with a single TypeScript file, we repeatedly compile the file using tsc command. We can use watch mode to automatically compile the file on change.

`tsc app.ts --watch`

or

`tsc app.ts -w`

In watch mode, even if there is a TypeScript error, it is logged in the terminal. Correcting the error will again recompile the output JavaScript file.

### Compiling the entire project / multiple files

The presence of a `tsconfig.json` file in a directory indicates that the directory is the root of a TypeScript project. The `tsconfig.json` file specifies the root files and the compiler options required to compile the project.

After `tsc --init`, we can just say `tsc` into the terminal and all the `.ts` files will be compiled. Then, if `tsc --watch` or `tsc -w` entered, the TypeScript will automatically follow every file.

### Excluding a file from compilation process

Inside the `tsconfig.json`, we can add `"exclude: [...]` in order to prevent TypeScript to compile added files:

```typescript
{
    "compilerOptions": {
        // .
        // .
        // .
    },
    "exclude": [
        "node_modules",
        "iDontWantThisFile"
    ]
}
```

In contrast, there's `"include"` option is the same as `"exclude"` which works the same way. However, if any file not put into `"include"` won't compile.

Another option is `"files"` array, where we can define the **individual** files — can't specify whole folders just like `"include"`.

### Emitting `.js` files elsewhere

When compiling `.ts` files, the TypeScript automatically compiles the files into the same folder where `.ts` files are located.

In the configuration file, set `outDir: "./dist"` to generate `.js` files into `dist/` folder. Note that structuring inside the `src/` folder won't change the situation, it will still compile as the same in `src/` folder.

`rootDir` simply sets compiler to focus on the selected directory. When set to, say, `./src`, if any TypeScript code written besides that folder won't be compiled. Otherwise, TypeScript compile those files too.

## Classes and Interfaces

This part has strong ties with OOP. A simple class declaration would be:

```typescript
class Department {
    public name: string;
    private employees: string[] = []; // also methods can be private

    constructor(name: string) {
        this.name = name;
    }

    describe(this: Department) {
        console.log("The department is " + this.name);
    }

    addEmployee(employee: string) {
        this.employees.push(employee);
    }

    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}
```

### Readonly

`readonly` modifier prevents assignments to the field outside of the constructor.

```typescript
class Greeter {
  readonly name: string = "hey";
    // .
    // .
    // .
}
```

or

```typescript
class Department {
    public readonly name: string;
    private readonly employees: string[] = [];
}
```

### Inheritance

Inheriting classes using `extends` keywords, and `super()` constructor method.

```typescript
class ITDepartment extends Department {
    public admins: string[];
    constructor(name: string, admins: string[]) {
        super(name);
        this.admins = admins;
    }
}
```

### `protected` modifier

When a member is marked private, it cannot be accessed from outside of its containing class.

The **protected** modifier acts much like the **private** modifier with the exception that members declared **protected** can also be accessed within deriving classes.

### `get` and `set` properties

These are simply used to have getter and setter methods.

```typescript
class AccountingDepartment extends Department {    
    private reports: string[] = [];
    private lastReport: string;
    constructor(name: string, lastReport: string | never[]) {
        super(name);
        this.lastReport = lastReport[0];
    }
    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error("lastReport not found");
    }
    set mostRecentReport(value: string) {
        if (!value) {
            throw new Error("no such thing in set prop");
        }
        this.addReport(value);
    }
    //.
    //.
    //.
}
```

and to call these methods:

```typescript
// get
console.log(accountDep.mostRecentReport);
// set
let text: string = "this is the last report";
accountDep.mostRecentReport = text;
```

## Static method

As like in other programming languages, `static` keyword in TypeScript let's users to be able to static variable or method accesible.

## Abstract classes

An abstract class is a class that cannot be instantiated on its own. Abstract classes are typically used to define the structure and behavior of a group of related classes.

Declaration of an abstract class is like: `abstract class Department { ... }`. Also, we can define an abstract method of this abstract class, however, we should re-create that method in each class that inherits this abstract class. An abstract method can be declared as:

```typescript
abstract class Department {
    static fiscalYear: number = 2023;
    public name: string;
    private employees: string[] = []; // also methods can be private

    constructor(name: string) {
        this.name = name;
    }

    abstract returnSomething(this: Department): void;
    //.
    //.
    //.
}

class ITDepartment extends Department {
    //.
    //.
    //.
    returnSomething() {
        return this.admins;
    }
}

```

`string | string[]` may be passed instead of `void`.

### Interfaces

To put it simple, an interface describes the structure of an object — or describes how the object should look like — . In TypeScript, an interface just contains the definition of methods and properties, not their implementation. It is the functionality of the class that carries out the connection between the interface by providing the connection with all the parameters of the interface.

```typescript
interface Person {
    name: string;
    age: number;

    greet(phrase: string): void; // we don't have to add parameters
}
```

and

```typescript
let user: Person = {
    name: "dude",
    age: 21,
    greet(phrase: string) {
        console.log(phrase + " i'm " + this.name);
    }
}
```

A class can implement one, also more than one interfaces.

```typescript
interface Person {
    name: string;
    age: number;

    greet(phrase: string): void;
}

interface Animal {
    species: string;
}

// implementing class...

class PersonClass implements Person, Animal {
    name: string;
    age: number;

    species: string;

    constructor(name: string, age: number, species: string) {
        this.name = name;
        this.age = age;
        this.species = species;
    }

    greet(phrase: string): void {
        throw new Error("Method not implemented.");
    }

}
```

### Extending interfaces

```typescript
interface Named {
    readonly name: string
}

interface Greetable extends Named {
    greet(phrase: string): void;
}

class Person implements Greetable {
    greet(phrase: string): void {
        // ... 
    }
    name: string;
    
    constructor(n: string) {
        this.name = n;
    }
}
```

### Interfaces as function types

Below code would work both ways.

```typescript
// type AddFn = (a: number, b: number) => number;

interface AddFn {
    (f: number, s: number): number;
}

let add: AddFn;

add = (num1: number, num2: number) {
    return num1 + num2;
}
```

### Optional parameters

To simply declare optional parameters in interfaces, `?` is used.

```typescript
interface Show {
    showName: string;
    showTime?: number;

    saySmth?(): void;
}
```

## 3. Part

### Advanced typing concepts

This part's concepts are:

- intersection types
- type guards
- discriminated unions
- type casting
- function overloads

### Intersection types

Intersection type simply let's a variable which combined by more than one types to have a type which exists on all of the specified types.

```typescript
type Admin = {
    name: string;
    privileges: string[];
}

type Employee = {
    name: string;
    startDate: Date;
}

type ElevatedEmployee = Admin & Employee;
```

`interface` may be used instead of `type`, therefore

```typescript
// type ElevatedEmployee = Admin & Employee;
interface ElevatedEmployee = Admin & Employee;
```

```typescript
type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

// type Universal can only be number!

let universal1: Universal = 0;
let universal2: Universal = "hey"; // error
let universal3: Universal = false; // error
```

## 4. Part

### Generics

Generics in programming, simply provides flexibility to code. We need a way of capturing the type of the argument in such a way that we can also use it to denote what is being returned. Here, we will use a *type variable*, a special kind of variable that works on types rather than values.

```typescript
function identity<Type>(arg: Type): Type {
  return arg;
}
```

We’ve now added a type variable `Type` to the identity function. This `Type` allows us to capture the type the user provides (e.g. `number`), so that we can use that information later. Here, we use `Type` again as the return type.

In TypeScript, we can build both generic functions and generic classes.

### Generic functions

Let's say we want to have a `merge` function where it merges to objects:

```typescript
function merge(objA: object, objB: object) {
    return Object.assign(objA, objB);
}

console.log(merge({name: "some random dude"}, {age: 21}));

// output:
// {name: 'some random dude', age: 21}
```

This works, however, if we wanted to store this in a variable and then access the `name` object:

```typescript
const mergedObj = merge({name: "some random dude"}, {age: 21});
mergedObj.name;

// Property 'name' does not exist on type 'object'.
```

This is because type `object` is a highly unspecified object, and we can handle this issue by using generics:

```typescript
function merge<S extends object, T extends object>(objA: S, objB: T) {
    return Object.assign(objA, objB);
}

const mergedObj = merge({name: "jackson"}, {age: 19});
console.log(mergedObj.name); // no error
```

and even (it's the same):

```typescript
function merge<T extends object, U extends object>(objA: T, objB: U): T & U {
    return Object.assign(objA, objB);
}
```

Also, we can add more elements (technically, unspecified objects).

```typescript
// no error

const newMerge = merge<{name: string, hobbies: string[]}, {age: number}>(
    {name: "my name", hobbies: ["write code", "read political history books", 
                                "lot's of hacking!"]}, 
    {age: 19}
)
```

### Using type parameters in generic constraints

You can declare a type parameter that is constrained by another type parameter. For example, here we’d like to get a property from an object given its name. We’d like to ensure that we’re not accidentally grabbing a property that does not exist on the obj, so we’ll place a constraint between the two types:

```typescript
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}
 
let x = { a: 1, b: 2, c: 3, d: 4 };
const returnedProperty = getProperty(x, "a");
console.log(returnedProperty);
```

### Generic classes

TypeScript supports generic classes. The generic type parameter is specified in angle brackets after the name of the class. A generic class can have generic fields (member variables) or methods.

An example:

```typescript
class DataStorage<T> {
    private data: T[] = [];

    constructor() {

    }

    addItem(item: T | T[]) {
        if (Array.isArray(item)) {
            this.data = this.data.concat(item);
        } else {
            this.data.push(item);
        }
        
    }

    removeItem(item: T) {
        this.data.splice(this.data.indexOf(item), 1);
    }

    get getItems() {
        return [...this.data];
    }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("ankaraunifedaisi");
console.log(textStorage.getItems);
textStorage.addItem(["bro", "dad", "mom", "sister"]);
console.log(textStorage.getItems);

//

const numberStorage = new DataStorage<number>();
numberStorage.addItem(1);
numberStorage.addItem([1, 3, 5, 7, 9]);
console.log(numberStorage.getItems);

// 

const objectStorage = new DataStorage<object>();
objectStorage.addItem({name: "random dude", age: 19});
console.log(objectStorage.getItems);
objectStorage.addItem([
    {life: "is good"},
    {rommel: "desert fox"}
])
console.log(objectStorage.getItems);
```

This code works until we try to remove an object from the `objectStorage`. It doesn't give error but code doesn't work properly, because object is a reference type in TypeScript.

One way to achieve this is to restrain `T` to be only work for primitives.

```typescript
class DataStorage<T extends string | number> {
    private data: T[] = [];

    constructor() {

    }

    // ...
}
```
