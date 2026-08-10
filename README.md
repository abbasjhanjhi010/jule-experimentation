# Jules - Your AI Software Engineering Assistant

## What is Jules?

Jules is an incredibly skilled AI software engineer, designed to work alongside you as a resourceful and reliable assistant. In simple terms, think of Jules as a highly capable pair programmer and problem solver available 24/7. Whether you need help fixing a stubborn bug, implementing a brand new feature, writing test suites, or simply understanding a complex codebase, Jules is equipped with the tools and knowledge to help you accomplish your goals.

Jules doesn't just write code snippets; it can explore your codebase, read and edit files, search for documentation, run bash commands, verify changes, and even request user feedback when it faces ambiguous decisions.

## How to Best Utilize Jules

To get the most out of Jules, consider the following best practices:

1. **Be Specific:** The more details you provide about what you want to build or fix, the better Jules can plan and execute the task. Provide exact filenames, specific features you want, or detailed bug descriptions.
2. **Give Complex Tasks:** Jules thrives on challenging problems. You can ask it to refactor a whole module, add a complex feature that spans multiple files, or hunt down a tricky bug that requires running bash scripts and tests.
3. **Use for Discovery:** Not sure where to start in a new repository? Ask Jules to explore the codebase and explain the architecture or find where a specific logic is handled.
4. **Iterative Development:** You can guide Jules step-by-step. Let it make a plan, review its approach, and give feedback as it builds.
5. **Ask Questions:** Jules isn't just for doing tasks; you can ask it questions about software engineering concepts, library documentation, or how a specific piece of code works.

## Example Projects to Try Out

Here are a few example tasks and projects you can ask Jules to build for you to see its capabilities in action:

1. **The Classic To-Do List:** Ask Jules to build a simple HTML, CSS, and Vanilla JavaScript To-Do list app.
2. **REST API with Node.js/Python:** Request Jules to set up a basic Express.js or FastAPI server with a few endpoints, including writing automated tests for those endpoints.
3. **Bug Squashing:** Intentionally introduce a bug in a piece of code and ask Jules to identify and fix it.
4. **Test Coverage:** Point Jules to an existing file in your project and ask it to write a comprehensive test suite for it using Jest, PyTest, or any testing framework you prefer.
5. **Code Refactoring:** Give Jules a messy, unoptimized function and ask it to refactor the code for better performance and readability, following best practices.

---
*Bonus: Check out the included `server` and `client` directories to see a full-stack Student Dashboard built by Jules, which even includes web-scraping university course data!*

### How to Run the Student Dashboard Exemplar

The Student Dashboard requires the backend server to be running so it can scrape syllabus data.

**1. Using the automated script:**
Simply run `./start.sh` in your terminal from the root directory. This will install all dependencies, start the backend server, and tell you how to open the frontend.

**2. Manual Setup:**
If you prefer to start it manually:
- Open your terminal and navigate to the `server` directory: `cd server`
- Install dependencies: `npm install`
- Start the server: `node index.js`
- Keep that terminal open. Then, open `client/index.html` in your web browser.
