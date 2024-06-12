class Stack {
  constructor() {
    this.items = []
  }
  add(item) {
    this.items.push(item)
  }
  remove() {
    this.items.pop()
  }
}

class Queue {
  constructor() {
    this.items = []
  }
  add(item) {
    this.items.unshift(item)
  }
  remove() {
    this.items.shift(item)
  }
}

class StackQueue {
  constructor() {
    let store = new Queue()
  }
  //rewrite push
  //use queue.add then reverse array?

  //rewrite remove
  //reverse array then queue.remove ??

  //use linked list
  //pointer increments every time you push them down
}

/*

*/