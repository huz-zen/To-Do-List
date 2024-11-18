const fs = require("fs");
const readline = require("readline-sync"); // Import readline-sync

const FILE_NAME = "tasks.json";
let tasks = [];

if (fs.existsSync(FILE_NAME)) {
  try {
    const fileContent = fs.readFileSync(FILE_NAME, "utf8");
    tasks = JSON.parse(fileContent || "[]");
  } catch (error) {
    console.error("Error parsing tasks.json:", error.message);
    tasks = [];
  }
}

const saveTasks = () =>{
  fs.writeFileSync(FILE_NAME, JSON.stringify(tasks, null, 2));
};


const addTask = () => {
  const taskName = readline.question("Enter task name: ");
  tasks.push({ name: taskName, completed: false });
  saveTasks();
  console.log("Task added successfully!");
};

const viewTasks = () => {
  if (tasks.length === 0) {
    console.log("No tasks available.");
    return;
  }
  tasks.forEach((task, index) => {
    console.log(`${index + 1}. [${task.completed ? "✓" : " "}] ${task.name}`);
  });
};

const markAsComplete = () => {
  if (tasks.length === 0) {
    console.log("No tasks available to complete.");
    return;
  }
  const taskNumber = readline.questionInt("Enter task number: ");
  if (taskNumber > 0 && taskNumber <= tasks.length) {
    tasks[taskNumber - 1].completed = true;
    saveTasks();
    console.log("Task marked as complete!");
  } else {
    console.log("Invalid task number.");
  }
};


const deleteTask = () => {
  if (tasks.length === 0) {
    console.log("No tasks available to delete.");
    return;
  }
  const taskNumber = readline.questionInt("Enter task number: ");
  if (taskNumber > 0 && taskNumber <= tasks.length) {
    tasks.splice(taskNumber - 1, 1);
    saveTasks();
    console.log("Task deleted successfully!");
  } else {
    console.log("Invalid task number.");
  }
};

while (true) {
  console.log("\n--- To-Do List ---");
  console.log("1. View Tasks");
  console.log("2. Add Task");
  console.log("3. Mark as Complete");
  console.log("4. Delete Task");
  console.log("5. Exit");

  const choice = readline.questionInt("Choose an option: ");
  switch (choice) {
    case 1:
      viewTasks();
      break;
    case 2:
      addTask();
      break;
    case 3:
      markAsComplete();
      break;
    case 4:
      deleteTask();
      break;
    case 5:
      console.log("Goodbye!");
      process.exit(0);
    default:
      console.log("Invalid option. Please try again.");
  }
}
