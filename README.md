# Turborepo starter

This is an official starter Turborepo.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps

- `webapp`: a [Next.js](https://nextjs.org/) app 
- `web`: another [Next.js](https://nextjs.org/) app (currently unused)
- `supabase`: a [Supabase](https://supabase.com/) project comprising db schemas and migrations

### Packages

- `@repo/ui`: a React component library implemented by `webapp` that relies on [shadcn](https://ui.shadcn.com)
- `@repo/supabase-types`: return types defined by the db schema in `supabase`
- `@repo/tailind-config`: tailwind config, implemented by `webapp` and `@repo/ui`
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
npm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
npm dev
```

### To do list

- [ ] login screen ui refresh
- [x] create group
- [ ] add members to group
- [ ] expenses
  - [ ] create expense (split amongst n ppl)
  - [ ] split expense by shares
  - [ ] split expense by %
  - [ ] split expense by arbitrary £ amount
- [ ] settle up
  - [x] calculate overall debts
  - [ ] record payments
- [ ] bugs
  - [ ] tailwind doesn't apply css vars from ui package global.css (try updating global.css in webapp)
- [ ] prep for expo app
  - [ ] move api lib to package
  - [ ] export more complex types from api lib
