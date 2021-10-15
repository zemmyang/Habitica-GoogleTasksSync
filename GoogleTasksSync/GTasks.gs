/**
 * Helper functions for GTasks adapted from the Google Tasks API documentation
 */

/**
 * Returns the ID and name of every task list in the user's account.
 * @return {Array.<Object>} The task list data.
 */
function getTaskLists() {
  var optionalArgs = {
    'maxResults': 100
  };

  var taskLists = Tasks.Tasklists.list(optionalArgs).getItems();
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

/**
 * Returns information about the tasks within a given task list.
 * @param {String} taskListId The ID of the task list.
 * @return {Array.<Object>} The task data.
 */
function getTasks(taskListId) {
  var optionalArgs = {
    maxResults: 100
  };

  var tasks = Tasks.Tasks.list(taskListId, optionalArgs);
  if (tasks.items) {
    var item_list = []
    for (var i = 0; i < tasks.items.length; i++) {
      var task = tasks.items[i];
      var dict = {
        id: task.id,
        title: task.title,
        parent: task.parent,
        date: task.due,
        notes: task.notes,
        completed: Boolean(task.completed)
      }
      item_list.push(dict)
    }
    return item_list
  } else {
    return [];
  }
}

/**
 * Sets the completed status of a given task.
 * @param {String} taskListId The ID of the task list.
 * @param {String} taskId The ID of the task.
 * @param {Boolean} completed True if the task should be marked as complete, false otherwise.
 */
function setCompleted(taskListId, taskId, completed) {
  var task = Tasks.newTask();
  if (completed) {
    task.setStatus('completed');
  } else {
    task.setStatus('needsAction');
    task.setCompleted(null);
  }
  Tasks.Tasks.patch(task, taskListId, taskId);
}