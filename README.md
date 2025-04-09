# Cross Package Declaration Merging

A monorepo demonstrating TypeScript's module declaration merging capabilities across different packages.

## Project Structure

This is a monorepo managed with pnpm workspaces, containing the following packages:

### `some-package`

The base package that defines the original types and exports.

- `package.json`: Configures the package with custom exports paths:

  ```json
  {
    "exports": {
      ".": "./src/index.ts",
      "./custom-path": "./src/foo.ts"
    }
  }
  ```

- Uses TypeScript for type definitions

### `test-package`

A package that demonstrates declaration merging with `some-package`.

- `src/types.ts`: Contains module declarations that merge with types from `some-package`

  ```typescript
  // Both approaches are equivalent
  declare module 'some-package/custom-path' {
    interface Foo {
      new: string
    }
  }

  // Both approaches are equivalent
  declare module 'some-package' {
    namespace something {
      interface Foo {
        another: string
      }
    }
  }
  ```

- `src/index.ts`: Example usage of the merged declarations

  ```typescript
  import { something } from 'some-package'

  const foo: something.Foo = {
    existing: 'foo',
    new: 'bar', // from custom-path declaration
    another: 'baz', // from main module declaration
  }
  ```

## Declaration Merging Examples

This repository demonstrates that:

1. Type augmentation works regardless of how you access the target types
2. You can merge declarations from:
   - A package's main entry point
   - A package's custom export path
   - Namespace declarations across packages
3. The key requirement is that the target types must be accessible in your project

## Development

This project uses:

- pnpm for package management
- TypeScript for type safety
- Monorepo structure for managing multiple packages

## License

MIT
