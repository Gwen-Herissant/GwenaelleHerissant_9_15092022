# Billed — HR SaaS App (Frontend)

Debugging and testing a HR web application, as part of a front-end development training program.

> This is the **frontend** repository. It must be run alongside the [backend repository](https://github.com/OpenClassrooms-Student-Center/Billed-app-FR-Back).

## Project Overview

This project was completed as part of a structured front-end development curriculum. Rather than building from scratch, the goal here was to **debug an existing application** and **write a comprehensive test suite** to ensure its reliability.

Working on a real-world HR SaaS app used to manage expense reports, the work covered fixing identified bugs, writing unit and integration tests in JavaScript, and designing a manual end-to-end test plan for the employee journey.

## Objectives

- Debug the application using Chrome DevTools
- Write unit tests and integration tests with Jest
- Design a manual end-to-end test plan
- Ensure overall reliability and quality of the codebase

## Tech Stack

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Jest](https://img.shields.io/badge/Jest-C21325?style=flat&logo=jest&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white)

## What I Learned

- Debugging a web application systematically using Chrome Debugger
- Writing unit tests and integration tests with Jest
- Designing an end-to-end manual test plan
- Reading and working within an unfamiliar existing codebase
- Understanding the value of testing in ensuring software quality

## Context

This project is part of the **OpenClassrooms Front-End Developer** curriculum. It introduces testing and debugging as core developer skills, shifting the focus from building new features to ensuring the quality and reliability of existing code.

---

## Project Architecture

This frontend app connects to a local backend API. Both must be running simultaneously.

Recommended folder structure:

```
bill-app/
   ├── Billed-app-FR-Back
   └── Billed-app-FR-Front
```

## Getting Started

### 1. Set up the backend

Clone and run the backend first — follow the instructions in the [backend repository](https://github.com/OpenClassrooms-Student-Center/Billed-app-FR-Back).

### 2. Set up the frontend

Clone the repository into your `bill-app` folder:

```bash
git clone https://github.com/OpenClassrooms-Student-Center/Billed-app-FR-Front.git
cd Billed-app-FR-Front
```

Install dependencies:

```bash
npm install
```

Install and run live-server:

```bash
npm install -g live-server
live-server
```

The app is available at: `http://127.0.0.1:8080/`

## Running Tests

Run the full test suite:

```bash
npm run test
```

Run a single test file:

```bash
npm i -g jest-cli
jest src/__tests__/your_test_file.js
```

View test coverage report: `http://127.0.0.1:8080/coverage/lcov-report/`

## Test Accounts

| Role | Email | Password |
|---|---|---|
| Admin | admin@test.tld | admin |
| Employee | employee@test.tld | employee |
