# TypeScript

## Primitive Types

- `string`
- `number`, no matter `float` or `int`
- `boolean`, either `true` or `false`

## Object Type

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

## Tuples

A tuple is a typed array with a pre-defined length and types for each index.

`const aTuple: [string, number, boolean] = ["this", 85, true];`

## Enums

Enums allow a developer to define a set of named constants.

### Numeric Enums

By default, enums will initialize the first value to 0 and add 1 to each additional value. They can be empty, first element be initialized or each element initalized.

```typescript
enum CardinalDirections {
    North,
    East,
    South,
    West
};
```

### String Enums

```typescript
enum CardinalDirections {
    North = 'North',
    East = "East",
    South = "South",
    West = "West"
};
```

Enums can be mixed as string and number enums too.

## Any Type

Type `any` can be any value, such as `string`, `boolean`, etc. However, this should be avoided.

## Union Type

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

## Literal Type

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

## Creating a new type for convenience

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

## Defining function types

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
