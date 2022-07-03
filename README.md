## Table of Contents

1. [Introduction](#introduction)
2. [Project Setup](#project-setup)
3. [Questions & Suggestions](#questions--suggestions)

## Introduction

This repo was used to test a subscription object on Stripe with a recurring payment & usage records. The majority of the methods are under `components/stripe/StripeWrapper.tsx`

This is a built on top of the [Next.js starter template](https://github.com/nickderaj/Nextjs-TS-Template) repo with TypeScript to easily get started on a production ready app. Included are

- Stories: for designing components and seeing them live,
- Tailwind CSS: for quick development without the need of CSS classes,
- ESlint + Prettier + Husky Git Hooks: to format the code and ensure that no matter who works on the code, it will stay formatted the same way.
- Template Components and Layouts to easily replicate.

## Project Setup

- To run the app, run `yarn install` and `yarn dev`.
- To run Storybook, run `yarn storybook`.
- The lint and formatting functions are `yarn lint` and `yarn prettier` respectively.
- The lint function will auto-run when you try to commit to a git repo, set up in the .husky folder.

Note: This app was designed to only be used with yarn to prevent a `package-lock.json` from being created which can cause conflicts - change the `engines` in `package.json` if you want to use npm instead.

## Questions & Suggestions

If you have any questions, feel free to reach out at nickderaj@gmail.com or message me on Discord at NickD#1188<br/>
If there's something you think should be added, branch out and make a PR! :)
