class ListNode {
  constructor(val) {
    this.value = val;
    this.next = null
  }
}

class Stack {
  constructor(head = null) {
    this.head = head;
  }
  push(item) {
    if(this.head) {
      let newHead = new ListNode(item);
      newHead.next = this.head;
      this.head = newHead;
    } else {
      this.head = item;
    }
  }
  pop() {
    if(this.head === null) return;
    if(this.head.next === null) this.head = null;
    this.head = this.head.next;
  }
}


const myStack = new Stack(1)
myStack.pop()
console.log(myStack)
myStack.push(2)
myStack.push(3)
myStack.push(4)
myStack.push(5)
myStack.push(6)
myStack.pop()
console.log(myStack)


class Queue {
  constructor(head = null) {
    this.head = head
  }
  enqueue(item) {
    let newHead = new ListNode(item);
    newHead.next = this.head;
    this.head = newHead;
  }
  dequeue() {
    if(this.head === null) return;

    if(this.head.next === null) {
      this.head = null;
      return;
    }
    let curr = this.head;
    while(curr.next.next) {
      curr = curr.next
    }
    curr.next = null;
  }
}

const queue = new Queue(1)
queue.enqueue(2)
queue.enqueue(3)
queue.enqueue(4)
queue.enqueue(5)
console.log(queue)
queue.dequeue()
// console.log(queue)

class StackQueue {
  constructor() {
    let store = new Queue()
  }
  //rewrite enqueue
  //use queue.add then reverse array?

  //rewrite remove
  //reverse array then queue.remove ??

  //use linked list
  //pointer increments every time you push them down
}

/*

*/