# AGENT instructions

## General
- Each agent MUST use a `expertise-[agent-name].yaml` located in the folder `expertise` to get more knowledge about the system.
- Always use Context7 MCP when I need library/API documentation, code generation, setup or configuration steps without me having to explicitly ask.
- 
## Development
- Rather start with a complete new solution that modifying the existing code
- Plan the system and ask for acknowledgement before start the implementation
- YOU MUST Develop the software driven by the specification and with a TDD approach.
- First write appropiate end-to-end tests (derived by the specification) and unit tests
- After that implement the functionality and run the tests if the implementation is successful
- All tests MUST pass.
- A short feedback-loop is important for development productivity. Summarize the test results


## Repository Layout
- `backend` backend code (e.g. webserver, data-abstraction-layer)
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
- Check if the specification is secured by corresponding tests
- Update documentation for user facing changes.
- Each agent MUST updates the expertise file with the current knowledge of the system.
- Create a log of the prompts.