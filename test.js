const assert = require('assert');
const { TodoManager } = require('./script.js');

console.log('Starting tests for TodoManager...');

const manager = new TodoManager();

// Test: Initial state
assert.strictEqual(manager.getTasks().length, 0, 'Initial task list should be empty');

// Test: Add task
const task1 = manager.addTask('Buy groceries');
assert.strictEqual(manager.getTasks().length, 1, 'Task list should have 1 item');
assert.strictEqual(task1.text, 'Buy groceries', 'Task text should match');
assert.strictEqual(task1.completed, false, 'New task should not be completed');

// Test: Add empty task
const taskEmpty = manager.addTask('   ');
assert.strictEqual(taskEmpty, null, 'Empty task should not be added');
assert.strictEqual(manager.getTasks().length, 1, 'Task list should still have 1 item');

// Test: Toggle task
manager.toggleTask(task1.id);
const toggledTask = manager.getTasks().find(t => t.id === task1.id);
assert.strictEqual(toggledTask.completed, true, 'Task should be marked as completed');

// Test: Remove task
manager.removeTask(task1.id);
assert.strictEqual(manager.getTasks().length, 0, 'Task list should be empty again');

console.log('All tests passed successfully! ✅');
