// Core Logic for To-Do List (can be tested independently)
class TodoManager {
    constructor() {
        this.tasks = [];
    }

    addTask(text) {
        if (!text || text.trim() === '') return null;
        const task = {
            id: Date.now().toString(),
            text: text.trim(),
            completed: false
        };
        this.tasks.push(task);
        return task;
    }

    removeTask(id) {
        const index = this.tasks.findIndex(t => t.id === id);
        if (index !== -1) {
            this.tasks.splice(index, 1);
            return true;
        }
        return false;
    }

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            return task;
        }
        return null;
    }

    getTasks() {
        return this.tasks;
    }
}

// Export for testing if in Node.js environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TodoManager };
}

// DOM Interaction (only runs in browser)
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        const todoManager = new TodoManager();

        const taskInput = document.getElementById('taskInput');
        const addButton = document.getElementById('addButton');
        const taskList = document.getElementById('taskList');

        function renderTasks() {
            taskList.innerHTML = '';
            todoManager.getTasks().forEach(task => {
                const li = document.createElement('li');

                const span = document.createElement('span');
                span.textContent = task.text;
                if (task.completed) {
                    span.classList.add('completed');
                }
                span.style.cursor = 'pointer';
                span.addEventListener('click', () => {
                    todoManager.toggleTask(task.id);
                    renderTasks();
                });

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.classList.add('delete-btn');
                deleteBtn.addEventListener('click', () => {
                    todoManager.removeTask(task.id);
                    renderTasks();
                });

                li.appendChild(span);
                li.appendChild(deleteBtn);
                taskList.appendChild(li);
            });
        }

        addButton.addEventListener('click', () => {
            const text = taskInput.value;
            if (todoManager.addTask(text)) {
                taskInput.value = '';
                renderTasks();
            }
        });

        taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const text = taskInput.value;
                if (todoManager.addTask(text)) {
                    taskInput.value = '';
                    renderTasks();
                }
            }
        });
    });
}
