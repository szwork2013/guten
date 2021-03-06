import {remove, isPlainObject, filter, isString, find} from "lodash"

class Database {
  constructor() {
    this._id = 3
    this.data = {
      todo: [
        {id: "1", title: "hello", completed: false},
        {id: "2", title: "world", completed: true}
      ]
    }
  }

  // find("todo")
  // find("todo", "id")
  // find("todo", {query})
  find(type, arg) {
    if (isPlainObject(arg))
      return filter(this.data[type], arg)
    else if (isString(arg))
      return find(this.data[type], {id: arg})
    else
      return this.data[type]
  }

  insert(type, item) {
    var items = this.data[type] = this.data[type] || []
    item.id = String(this._id++)
    items.push(item)
    return item
  }

  update(type, id, item) {
    var doc = this.find(type, id)
    Object.assign(doc, item)
    return doc
  }

  delete(type, id) {
    return remove(this.data[type], {id: id})
  }
}

export var db = new Database()
