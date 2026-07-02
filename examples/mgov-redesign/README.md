# Implementation Helpers

This .zip folder contains a basic Vite & React application. Within the /src directory you will find application code that displays components that are derived from the [Triptk Figma file](https://www.figma.com/design/VtAxUgaFMUueWgvi3kNoXJ/-TRIPTK--Medicare.gov-Redesign?node-id=1656-7514&t=G6ZamoVJnyEnkMGR-1).

## Goals and what even is this

Since the Design System cannot consume, audit and release these changes in the allotted time, I've taken a first pass effort at implementing the designs. This has meant:

1. Overriding DS tokens where needed
2. Creating new tokens
3. Creating new styles
4. Creating new components
5. Creating new patterns

CAVEAT: I did this in 4 days. I used generative AI to consume the designs and generate the code. I have not had time to fully vette anything here. I reviewed it as I was going and tried my best to guide the AI to do reasonable, helpful and realistic things. That said, I view all of this code in the following way:

This is starter code to get teams going faster. I don't expect any of this code to survive and I hope folks use it to iterate and build out things faster. This is not final code that is endorsed or will be supported long term by the CMS Design System.

## Installation

1. Unzip the folder -- you've probably already done this if you are ready this.
2. Switch to node version 22+: `nvm use 22`
3. `npm i`
4. `npm run dev`

You should see the application running at `localhost:5173` (or some other 517\* port depending on what is avaialable on your local machine).

## Consumption of CSS

I've tried to present a few different options depending on what teams need for ingestion of CSS styling. There are three CSS files at the top level of the /src directory that are of interest:

1. shared-tokens.css
2. mgov-theme-global.css
3. mgov-theme-scope.css

The shared-tokens.css file are root scoped tokens that are shared across styles in this example application. These are net new tokens that are designed to not conflict or override existing DS tokens.

The tokens contained within mgov-them-global.css are root (global) scoped tokens that DO override DS level tokens. The idea here is that your application needs these tokens everywhere, and you need the overrides everywhere.

For teams who want more control, you can emulate the mgov-theme-scope.css file. Here the token overrides of the DS are scoped to a class that can be applied to any element you want the overrides to take place on. If you want to limit the impact of the overrides, you'll want to reference this approach.

## Organization of the Application

1. The first section shows the expected Typography styles. The classes that support the typography are stored in a top level css file called `typography.css`.
2. New components are then listed. These include: Filter Popover, Tile, Banner, Breadcrubms and Search.
3. Existing components are then demonstrated. These are Feature Card (just our Card that has been extended), TextField, Badge (here called the Pill to align with the Figma designs), Alert, Dialog, Dropdown, Button, ChoiceList (here called the Choice Block to align with the Triptk Figma designs), and Tooltip.
4. Patterns. Cards, Bottom Bar, Newletter Signup, and Quick Tasks
