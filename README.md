# Fit Lit
Turing School of Software & Design - Mod 2


## Table of Contents
  - [Abstract](#abstract)
  - [Technologies](#technologies)
  - [Code Architecture](#code-architecture)
  - [Illustrations](#illustrations)
  - [Install + Setup](#set-up)
  - [Contributors](#contributors)
  - [Wins](#wins)
  - [Challenges + Improvements](#challenges-+-Improvements)
  - [Project Specs](#project-specs)

## Abstract
Fit Lit is a fitness application designed to keep track of and display a user's fitness data. The user fills out profile information which is stored on their account and displayed on page load. Also displayed on page load is a variety of fitness information organized into categories of steps, hydration and sleep. The steps section displays the user's step goal in comparison to the aggregate step goal of all users on Fit Lit. The Hydration section displays the user's daily water consumption, their daily consumption as a proportion of FitLit's recommended water intake, and their water consumption over the previous week. The Sleep section displays the user's number of hours slept and sleep quality for the day, averaged for the week, and charted daily for the previous week. The display of all of this information is responsive to view on a desktop, tablet or mobile device.

## Technologies
  - Javascript (vanilla)
  - HTML
  - CSS
  - Mocha/Chai
  - eslint
  - Chart.js
  - figma.com (used to build wireframe)

## Code Architecture
  - OOP Principles
  - Vanilla JavaScript
    - Array Iterator Methods
  - Separate JavaScript files
    - User/UserRepository
    - Hydration/HydrationRepository
    - Sleep/SleepRepository
    - API call function
    - Scripts.js - all DOM related work

## Illustrations

![recording (5)](https://user-images.githubusercontent.com/63213406/126401645-dc3e2aa7-6d9b-4383-9c3f-630dc28e4d25.gif)

## Install + Setup
  - To download and use Fit Lit, you can fork and/or clone it to your local machine.
  - Navigate (cd) into the new directory.
  - Enter the following command to open Fitlit in your browser - open src/index.html
  - OR visit our deployed Fit Lit page - [here]()

## Contributors
  - [Erica Spitz](https://github.com/e-spitz)
  - [Mae Duphorne](https://github.com/maeduphorne)

## Wins
  - Effective and efficient testing for all JavaScript classes, methods and properties
  - Separation of Data Model versus DOM
  - Demonstrate several examples of using dynamic, DRY code
  - Learning our first library, Chart.js

## Challenges + Improvements
  - We ran into design challenges in making the page responsive.
  - We had some difficulties with the styling of the charts in Chart.js
  For future Iterations:
  - We would like to add the ability for a user to pick the date they can see information for. Currently the user's page starts at the current date only.
  - We would like to add additional data related to the user's daily activity
  - We would like to add ability for the user to interact with other users - friendly competitions, leaderboards, more comparative stats, etc.

## Project Specs
  - The project spec & rubric can be found [here](https://frontend.turing.edu/projects/fitlit.html)
