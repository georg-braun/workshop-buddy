# AGENT instructions

## General
- Always use Context7 MCP when I need library/API documentation, code generation, setup or configuration steps without me having to explicitly ask.
- Follow the twelve-factor app principles (see https://12factor.net/)

## Development
- Rather start with a complete new solution that modifying the existing code
- Plan the system and ask for acknowledgement before start the implementation
- YOU MUST Develop the software driven by the specification and with a TDD approach.
- First write appropiate end-to-end tests (derived by the specification) and unit tests
- After that implement the functionality and run the tests if the implementation is successful
- All tests MUST pass!
- A short feedback-loop is important for development productivity. Summarize the test results

## Specification
- The specifications in `/instructions/specs.json` MUST be met and verfified by successful e2e tests.
- Test the e2e using playwright-cli. Check playwright-cli --help for available commands.

## Architecture
- Use a feature oriented source code structure.

## Repository Layout
- `services` service code (e.g. webserver)
- `frontend` frontend code 
- `infrastructure` infastructure code (e.g. docker-compose)
- `e2e-tests` for the end-to-end tests

## Commmit messages and pull requests
- Follow the https://www.conventionalcommits.org/en/v1.0.0/ style for
  commit messages.
- Every pull request should answer:
  - **What changed?**
  - **Why?**
  - **Breaking changes?**

## Review checklist
- Specification MUST be fullfilled by successful tests
- User documentation is updated
- Readme for the most important functionalities and startup is created.
- A log of the prompts is created.