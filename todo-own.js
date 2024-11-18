const { questionInt, question} = require("readline-sync")
const fs = require("fs");

const status = false


const addtask = () =>{
    let usersjson = fs.readFileSync("tasks.json","utf-8");
    let users = JSON.parse(usersjson);
    let task = question("Enter the task name: ");
    users.push({name:task,completed:status});
    usersjson = JSON.stringify(users);
    fs.writeFileSync("tasks.json",usersjson,"utf-8");
}
  
const viewtask = () =>{
    let usersjson = fs.readFileSync("tasks.json","utf-8");
    let users = JSON.parse(usersjson);
    if (users.length===0){
        console.log("No tasks available")
    }
    users.forEach((element,index) => {
        const status = element.completed ? '[✓]':'[ ]';
        console.log(`${index+1}. ${element.name} ${status}`)
    });
  
}
const markAsComplete = () =>{
    const taskIndex = questionInt("Enter the task number to mark as complete: ");
    let usersjson = fs.readFileSync("tasks.json","utf-8");
    let users = JSON.parse(usersjson);
    if (taskIndex > 0 && taskIndex <= users.length) {
        users[taskIndex - 1].completed = true
        usersjson = JSON.stringify(users);
        fs.writeFileSync("tasks.json",usersjson,"utf-8");
    }

}
const deleteTask = () => {
    let usersjson = fs.readFileSync("tasks.json","utf-8");
    let users = JSON.parse(usersjson);

    if (users.length ===0){
        console.log("No tasks to delete");
    }
    const taskIndex = questionInt("Enter the task number to delete: ");
    if (taskIndex > 0 && taskIndex <= users.length) {
        users.splice(taskIndex-1,1);
        usersjson = JSON.stringify(users);
        fs.writeFileSync("tasks.json",usersjson,"utf-8");
    }

}

while(true){
    console.log("\nTo do list\n") 
    console.log("1.View tasks");
    console.log("2.Add task");
    console.log("3.Mark as complete");           
    console.log("4.Delete task")
    console.log("5.Exit\n");
    switch(questionInt("Choose an option: "))
    {
    case 1:
         viewtask()
         break;
    case 2:
        addtask();
        break;
    case 3:
        markAsComplete();
        break;
    case 4:            
        deleteTask();
        break;
    case 5:
        console.log("Thank you for using this app");
        return;
    default:
        console.log("Invalid option");
        break;
    }
}