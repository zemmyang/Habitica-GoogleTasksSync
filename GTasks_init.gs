const gtasksOptionalArgs = {
    'maxResults': PropertiesService.getScriptProperties().getProperty("gtasks_maxresults"),
    'showHidden':true
};
let gtasksListCompleted = [];
let gtasksListNotCompleted = [];
let gtasksTaskList = [];

class GoogleTask{
  constructor(text, taskId, parentId, taskListId, taskListName, isCompleted, dueDate, notes){
      this.text = text;
      this.taskId = taskId;
      this.parentId = parentId;
      this.taskListId = taskListId;
      this.taskListName = taskListName;
      this.isCompleted = isCompleted;
      this.dueDate = dueDate;
      this.notes = notes;
  }

  convertToHabiticaPayload(){
    var payload = {
      "type" : "todo",
      "text" : this.taskListName + ": " + this.text,
      "alias" : this.taskId,
      "notes" : this.notes,
    }

    if (this.parentId === undefined){
      // placeholder 
      // TODO: implement subtasks as checklists
    }

    if (this.dueDate === undefined){
      // pass
    } else {
      payload["date"] = this.dueDate;
    }

    return payload;
  }

}

function getGoogleTaskLists(){
  // Get the ID/Name of the task lists on GTasks
  //    Names will be used as tags on Habitica
  //    IDs will be used to get the tasks in each list
  var taskLists = Tasks.Tasklists.list(gtasksOptionalArgs).getItems();

  if (!taskLists) {
    return [];
  }

  return taskLists.map(function(taskList) {
    return {
      id: taskList.getId(),
      name: taskList.getTitle()
    };
  });
}

function getGTasksPerList(taskListData){
  // Get all the tasks associated with a task list
  //    argument must be in the format {id: taskListId, name: taskListName}
  //
  // Note: For the purposes of this function, it's ok if the name/ID don't 
  //       match, but the data passed to Habitica will be wrong

  const listID = taskListData.id;
  const listName = taskListData.name;

  var completedTaskList = [];
  var notCompletedTaskList = [];
  var tasks = Tasks.Tasks.list(listID, gtasksOptionalArgs);

  if (tasks.items) {
    for (let t of tasks.items){
      let task = new GoogleTask(t.title, t.id, t.parent, listID, listName, Boolean(t.completed), t.due, t.notes);

      if (t.title === "Recurring task test"){
        Logger.log("WATCH: " + t.id);
      }

      if (Boolean(t.completed)){
        completedTaskList.push(task);
      } else {
        notCompletedTaskList.push(task);
      }
    }
  }
  
  return [completedTaskList, notCompletedTaskList];
}

function getGTasks(){
  // Just get all of it.
  gtasksTaskList = getGoogleTaskLists();

  var completedList = [];
  var notCompletedList = [];

  for (let l of gtasksTaskList){
    const [comp, ncomp] = getGTasksPerList(l);
    completedList = completedList.concat(comp);
    notCompletedList = notCompletedList.concat(ncomp);
  }

  // return [completedList, notCompletedList];
  gtasksListCompleted = completedList;
  gtasksListNotCompleted = notCompletedList;
}
