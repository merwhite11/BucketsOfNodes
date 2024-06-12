class Manager {
  constructor() {
    this.rectangle = null;
    this.nodes = null;
    this.buckets = null;
  }
  getRectangle() {
    return this.rectangle;
  }
  setRectangle(rectangle) {
    this.rectangle = rectangle;
  }
  setNodes(nodes) {
    this.nodes = nodes;
  }
  reportNodes() {
    return this.nodes;
  }
  reportBuckets() {
    return this.buckets;
  }
}

class Rectangle {
  constructor(height, width, manager) {
    this.height = height;
    this.width = width;
    this.x = null;
    this.y = null;
    this.manager = manager;
    this.rectangle = null;
    // this.manager.rectangle = this;
  }
  buildRectangle() {
    //create dom element
    this.rectangle = document.createElement("div");
    this.rectangle.classList.add("outer-rectangle")
    this.rectangle.setAttribute("style", `height: ${this.height}px; width: ${this.width}px;`);
    document.body.appendChild(this.rectangle)
    //update rectangle props with dom dimensions
    let rect = this.rectangle.getBoundingClientRect();
    this.x = rect.x;
    this.y = rect.y;
    //update manager
    this.manager.setRectangle(this);
  }
  addNodes() {
    const xMin = 0;
    const xMax = Math.floor(Number(this.width)-10);
    const yMin = 0;
    const yMax = Math.floor(Number(this.height)-10);

    let nodes = Array(20).fill(1).map((e, i) => new Node(Math.ceil(Math.random() * (xMax - xMin) + xMin), Math.ceil(Math.random() * (yMax - yMin) + yMin), i))
    this.manager.setNodes(nodes)

    this.manager.nodes.forEach(node => node.buildNode(this.rectangle));
  }
}

class Node {
  constructor(x, y, id) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.radius = '10';
  }

  buildNode(parentElement) {
    console.log('called!')
    let nodeElement = document.createElement("span")
    nodeElement.classList.add("node");
    nodeElement.style.position = "absolute";
    nodeElement.style.left = `${this.x}px`;
    nodeElement.style.top = `${this.y}px`;
    nodeElement.setAttribute("id", `node-${this.id}`);
    parentElement.appendChild(nodeElement)

  }
}

const myManager = new Manager;

const myRectangle = new Rectangle('500', '700', myManager);
myRectangle.buildRectangle();
myRectangle.addNodes();
// console.log('manager nodes', myManager.reportNodes())
// console.log(myRectangle.nodes)
// console.log(myManager.getRectangle())
console.log(myRectangle.rectangle)
console.log(myManager.reportNodes())