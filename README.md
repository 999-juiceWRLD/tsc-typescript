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
