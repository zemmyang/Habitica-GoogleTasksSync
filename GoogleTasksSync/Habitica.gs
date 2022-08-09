/**
 * Helper functions for Habitica adapted from the wiki
 */

const habId = "4894c584-9889-4447-a784-2d693790a6c5";
const habToken = "53d0548c-ba2f-438a-8598-1ad4f2f1e76a";

function list_habitica_tasks(need){
  var current_task_list = []
  var ids = []
  var aliases = []
  var url = 'https://habitica.com/api/v3/tasks/user'

  //set paramaters
  var paramsTemplate = {
    "method" : "get",
    "headers" : {
      "x-api-user" : habId,
      "x-api-key" : habToken
    }
  }
  var params = paramsTemplate;
  var response = UrlFetchApp.fetch(url, params);
  var data = JSON.parse(response.getContentText());

  if (data.success){
    for(var item in data.data){
      var dict = {
        id: data.data[item].id,
        alias: data.data[item].alias,
        date: data.data[item].date
      }
      if (data.data[item].type === 'todo'){
        current_task_list.push(dict)
        ids.push(data.data[item].id)
        aliases.push(data.data[item].alias)
      }
    }
  } else {
    Logger.log(response)
  }

  if(need === 'current_task_list'){
    return current_task_list
  } else if (need === 'ids'){
    return ids
  } else if (need === 'aliases'){
    return aliases
  }
}

function create_task(payload) {
  var url = "https://habitica.com/api/v3/tasks/user"

  //set paramaters
  var params = {
    "method" : "post",
    "headers" : {
      "x-api-user" : habId,
      "x-api-key" : habToken
    },
    "payload": payload
  }
  var response = UrlFetchApp.fetch(url, params);
  return response
}

function mark_task_as_done(task_id) {
  var url = "https://habitica.com/api/v3/tasks/" + task_id + "/score/up"
  var paramsTemplate = {
    "method" : "post",
    "headers" : {
      "x-api-user" : habId,
      "x-api-key" : habToken
    },
    "payload": {
      "up": "True"
    }
  }
  var params = paramsTemplate;
  var response = UrlFetchApp.fetch(url, params);
  return response
}

function update_task_date(task_id, new_date) {
  var url = "https://habitica.com/api/v3/tasks/" + task_id
  var paramsTemplate = {
    "method" : "put",
    "headers" : {
      "x-api-user" : habId,
      "x-api-key" : habToken
    },
    "payload": {
      "date": new_date
    }
  }
  var params = paramsTemplate;
  var response = UrlFetchApp.fetch(url, params);
  return response
}
