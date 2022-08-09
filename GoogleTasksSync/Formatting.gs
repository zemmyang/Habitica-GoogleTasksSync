/**
 * Formatting the responses
 */

function generate_gtasks_list(need, tags){
  var send_to_habitica = [];
  var list_of_ids = [];
  var completed_tasks = [];

  var task_lists_dictionary = getTaskLists()

  for(var i of task_lists_dictionary) {
    var value = getTasks(i['id']);
    for (var j in value){
      var parent = value[j]['parent'];
      var title = value[j]['title'];

      var dict = {}

      if (typeof parent === 'undefined' || parent === null){
        // Logger.log(i['name'] + ": " + title + value[j]['id']); // top-level tasks
        dict['text'] = title
        dict['type'] = "todo"
        dict['alias'] = value[j]['id']
        dict['notes'] = value[j]['notes']
        dict['date'] = value[j]['date']
        dict['tags'] = tags[i['name']]

        if(value[j]['completed']){
          completed_tasks.push(dict)
        } else {
          send_to_habitica.push(dict)
          list_of_ids.push(value[j]['id'])
        }
      } else {
        for (var k in value){
          if (value[k]['id'] === parent){
            // Logger.log(i['name'] + ": " + value[k]['title'] + ": " + value[j]['title'] + value[j]['id']); // second-level tasks
            dict['text'] = value[k]['title'] + ": " + value[j]['title']
            dict['type'] = "todo"
            dict['alias'] = value[j]['id']
            dict['notes'] = value[j]['notes']
            dict['date'] = value[j]['date']
            dict['tags'] = tags[i['name']]

            if(value[j]['completed']){
              completed_tasks.push(dict)
            } else {
              send_to_habitica.push(dict)
              list_of_ids.push(value[j]['id'])
            }
          }
        }
      }
    }
  }

  if(need === 'send_to_habitica'){
    return send_to_habitica
  } else if (need === 'list_of_ids'){
    return list_of_ids
  } else if (need === 'completed_tasks'){
    return completed_tasks
  }
}

function test(){
  Logger.log(generate_gtasks_list('completed_tasks'))
}
