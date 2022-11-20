// Globals
const scriptProperties = PropertiesService.getScriptProperties();

function main() {
  // Initialize the data
  getGTasks();
  getTodosFromHabitica();

  // Get tasks from GTasks
  let [gtasksCompletedIDs, gtasksIncompleteIDs] = getGTasksId();

  // Get todos from Habitica. This entire list only contains incomplete tasks
  let habiticaTodoAliases = getHabiticaTodoAliases();

  // Copy incomplete tasks from GTasks to Habitica
  //      If the GTask ID is not in the list of Habitica aliases
  //      Add it to Habitica

  let incompleteGTaskIDsToCopy = gtasksIncompleteIDs.filter(x => !habiticaTodoAliases.includes(x));

  for(let t of incompleteGTaskIDsToCopy){
    addGTaskToHabitica(t);
  }

  // Mark all completed tasks as done
  let completeGTaskIDsToMarkAsDone = gtasksCompletedIDs.filter(x => habiticaTodoAliases.includes(x));

  for(let t of completeGTaskIDsToMarkAsDone){
    markGTaskAsDone(t);
  }

  // Update changes in due date

  //    Find GTasks that are in Habitica
  let incompleteGTaskIDsInHabitica = gtasksIncompleteIDs.filter(x => habiticaTodoAliases.includes(x));
  
  //    Find any mismatch in due dates
  for (let t of incompleteGTaskIDsInHabitica){
    let habiticaTodo = getHabiticaTodoFromAlias(t);
    let gtask = getGTaskFromId(t);

    if (gtask.dueDate === undefined){
      // pass
    } else {
      
      let gtaskDueDate = new Date(gtask.dueDate);
      let habiticaDueDate = new Date(habiticaTodo.dueDate);

      if (gtaskDueDate.valueOf() === habiticaDueDate.valueOf()){
        // pass
      } else {
        buildRequest("put", "tasks/" + habiticaTodo.id, {"date": gtask.dueDate});
      }
    }

  }

}

