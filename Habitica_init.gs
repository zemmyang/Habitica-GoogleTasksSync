let habiticaTodos = [];
let habiticaTags = [];

class HabiticaTodo{
  constructor(text, id, notes, isCompleted){
    this.text = text; // name of the task as shown to the user
    this.id = id;
    this.notes = notes;
    this.isCompleted = isCompleted;
  }

  addDueDate(date){
    this.dueDate = date;
  }

  addTags(tags){
    this.tags = tags;
  }

  addAlias(alias){
    this.alias = alias;
  }

}

class HabiticaTag{
  constructor(tagName, tagId){
    this.tagName = tagName;
    this.tagId = tagId;
  }
}

function buildRequest(method, url, payload){
  if (payload === undefined){
   var params = {
     "method" : method,
     "headers" : {
       "x-api-user" : PropertiesService.getScriptProperties().getProperty("habitica_userid"), 
       "x-api-key" : PropertiesService.getScriptProperties().getProperty("habitica_apikey")
     },
     "muteHttpExceptions": true
   }
  } else {
   var params = {
     "method" : method,
     "headers" : {
       "x-api-user" : PropertiesService.getScriptProperties().getProperty("habitica_userid"), 
       "x-api-key" : PropertiesService.getScriptProperties().getProperty("habitica_apikey")
     },
     "payload": payload,
     "muteHttpExceptions": true
   }
  }

    var response = UrlFetchApp.fetch(PropertiesService.getScriptProperties().getProperty("habitica_apiurl") + url, params);
    return response
}

function getTags(){
  let taglistResponse = buildRequest('get', 'tags');  
  var data = JSON.parse(taglistResponse.getContentText());

  var tagList = [];
  if (data.success){
    for(let t of data.data){
      tagList.push(new HabiticaTag(t.name, t.id));
    }
  } else {
    Logger.log("Error in taglistResponse request: %s",taglistResponse);
  }
  return tagList;
}

function getTodosFromHabitica(){
  habiticaTags = getTags();

  let todolistResponse = buildRequest('get', 'tasks/user');
  var data = JSON.parse(todolistResponse.getContentText());

  var taskList = [];
  if (data.success){
    for(let i of data.data){
      if (i.type === "todo"){
        var todo = new HabiticaTodo(i.text, i.id, i.notes, false);
        if (i.tags.length){
          var tags = [];
          for(let t of i.tags){
            tags.push(new HabiticaTag(getTagNameFromId(t), t));
          }
          todo.addTags(tags);
        }
        if (i.alias){
          todo.addAlias(i.alias);
        }
        if (i.date){
          todo.addDueDate(i.date);
        }

        taskList.push(todo);
      }
    }
  } else {
    Logger.log("Error in todolistResponse request: %s",todolistResponse);
  }

  // return taskList;
  habiticaTodos = taskList;
}
