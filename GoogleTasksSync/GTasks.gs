function getGTasksId(){
  var completedList = [];
  var notCompletedList = [];

  for (let i of gtasksListCompleted){
    completedList.push(i.taskId);
  }

  for (let i of gtasksListNotCompleted){
    notCompletedList.push(i.taskId);
  }

  return [completedList, notCompletedList];
}

function getGTaskFromId(taskId){
  for (let t of gtasksListNotCompleted){
    if (t.taskId === taskId){
      return t;
    }
  }

  for (let t of gtasksListCompleted){
    if (t.taskId === taskId){
      return t;
    }
  }

  return "";
}


function gtasks_testing(){
  getGTasks();
  var id = "WlZuVGs4RF9iMFVtSU5faA";

  Logger.log(getGTaskFromId(id).text);
}