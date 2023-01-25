function getTagNameFromId(tagId){
  for (let t of habiticaTags){
    if (t.tagId === tagId){
      return t.tagName;
    }
  }

  return "";
}

function getTagIdFromName(tagName){
  for (let t of habiticaTags){
    if (t.tagName === tagName){
      return t.tagName;
    }
  }

  return "";
}

function getHabiticaTodoAliases(){
  var aliasList = [];
  for (let t of habiticaTodos){
    if (t.alias === undefined){
      // pass
    } else {
      aliasList.push(t.alias);
    }
  }

  return aliasList;
}

function getHabiticaTodoFromAlias(alias){
  for (let t of habiticaTodos){
    if (t.alias === alias){
      return t;
    }
  }

  return "";
}

function addGTaskToHabitica(gtaskId){
  var gtask = getGTaskFromId(gtaskId);
  buildRequest("post", "tasks/user", gtask.convertToHabiticaPayload());
}

function markGTaskAsDone(gtaskId){
  var habiticaTodo = getHabiticaTodoFromAlias(gtaskId);
  buildRequest("post", "tasks/" + habiticaTodo.id + "/score/up", {"up": "True"});
}

function updateGTaskDueDate(gtask){

}
