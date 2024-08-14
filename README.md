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

- [ ] login/auth
  - [ ] login screen ui refresh
  - [ ] reset password
  - [ ] logout

- [ ] groups
  - [x] create group
  - [ ] add members to group
    - [2] add member without them signing up
      - [x] refactor everything to user group_member.id, not profile.id
      - [ ] search for profiles/user by email when addig group members
      - [ ] if no existing user, create invite (linked to gm + group)
    - [ ] add member with profile
    - [ ] add member and send invite
    - [ ] accept invite

- [ ] creating expenses
  - [x] create expense (split amongst n ppl)
  - [ ] split expense by shares
  - [ ] split expense by %
  - [ ] split expense by arbitrary £ amount
  - [ ] create expense button hovers bottom right

- [ ] viewing expenses
  - [x] clearer expense list
  - [ ] click in to see details of expense (is the split)
  - [ ] group by day/week
  - [ ] sort expenses on same day by date created

- [x] settle up
  - [x] calculate overall debts
  - [x] record payments
  - [x] incorporate payments into debt calc

- [ ] archiving a group
  - [ ] set group to archived
  - [ ] banner on group page
  - [ ] prohibit new debts
  - [ ] prohibit new payments
  - [ ] prohibit changing gropu members
  - [ ] prohibit changing settings

- [ ] bugs
  - [x] tailwind doesn't apply css vars from ui package global.css (try updating global.css in webapp)

- [ ] prep for expo app
  - [ ] move api lib to package
  - [ ] export more complex types from api lib

- [ ] feature requests
  - [ ] leniency: set an amount below which it's not worth settling up
  - [ ] economic units: couples count as 2 shares in splits, but are treated as one group member for assignment purposes
  - [ ] default splits: 
  - [ ] date picker UI: today, y'day, the day before, set date manually (this turns the UI into a date picker)
