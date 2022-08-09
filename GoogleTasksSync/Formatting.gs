/**
 * Formatting the responses
 */

function generate_gtasks_list(need, tags){
  var send_to_habitica = [];
  var list_of_ids = [];
  var completed_tasks = [];
  var tasks_with_parent = {};

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

        var is_parent = false;

        for (var k in value){
            if (value[k]['parent'] === value[j]['id']) {
              is_parent = true
            }
        }

        // parents will be added later with their children
        if(!is_parent) {
          if(value[j]['completed']){
            completed_tasks.push(dict)
          } else {
            send_to_habitica.push(dict)
            list_of_ids.push(value[j]['id'])
          }
        }
      } else {
        if (parent in tasks_with_parent) {
          tasks_with_parent[parent]['checklist'].push({
            'text': title,
            'completed': value[j]['completed']
          })
        } else {
          for (var k in value){
            if (value[k]['id'] === parent) {
              dict['text'] = value[k]['title']
              dict['type'] = "todo"
              dict['alias'] = value[k]['id']
              dict['notes'] = value[k]['notes']
              dict['date'] = value[k]['date']
              dict['tags'] = tags[i['name']]
              dict['checklist'] = []

              dict['checklist'].push({
                'text': title,
                'completed': value[j]['completed']
              })
            }
          }

          tasks_with_parent[parent] = dict
        }
      }
    }
  }

  // add all tasks with children to lists
  for(var i of task_lists_dictionary) {
    var value = getTasks(i['id']);
    for (var j in value){
      var alias = value[j]['id'];

      if (value[j]['id'] in tasks_with_parent) {
        // formats checklist to JSON
        // var checklist = JSON.stringify(tasks_with_parent[alias]['checklist'])
        // tasks_with_parent[alias]['checklist'] =  checklist.toString().replace(/\"/g, "")

        if(value[j]['completed']){
          completed_tasks.push(tasks_with_parent[alias])
        } else {
          send_to_habitica.push(tasks_with_parent[alias])
          list_of_ids.push(tasks_with_parent[alias])
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
