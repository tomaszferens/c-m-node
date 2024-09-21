# c-m-node

Node.js project with TypeScript

## Prerequisites

- [Node.js](https://nodejs.org/) installed
- [pnpm](https://pnpm.io/) package manager installed

## Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd c-m-node
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

## Available Scripts

- ### `pnpm run dev`

  Runs the project in development mode with hot reloading using `tsx`.

- ### `pnpm run build`

  Builds the project using `tsup` and outputs to the `dist` directory.

- ### `pnpm run start`

  Executes the compiled JavaScript file from the `dist` directory.

- ### `pnpm run build-start`

  Builds the project and then starts it.

- ### `pnpm run type-check`

  Checks for TypeScript type errors without emitting files.

## Usage

### Development

To start the project in development mode:

```bash
pnpm run dev
```

### Building and Starting

To build the project:

```bash
pnpm run build
```

To start the project after building:

```bash
pnpm run start
```

Or combine both:

```bash
pnpm run build-start
```

### Type Checking

To perform type checking:

```bash
pnpm run type-check
```

## Dependencies

- **TypeScript**: For static typing.
- **tsx**: To run TypeScript files directly.
- **tsup**: For bundling the TypeScript code.
- **@types/node**: Type definitions for Node.js.

## License

This project is licensed under the ISC License.
