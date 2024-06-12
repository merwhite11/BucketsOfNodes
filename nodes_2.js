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
  setBuckets(buckets) {
    this.buckets = buckets;
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
    //get rect range for random coords
    const xMin = 0;
    const xMax = Math.floor(Number(this.width)-10);
    const yMin = 0;
    const yMax = Math.floor(Number(this.height)-10);
    //create nodes and update manager
    let nodes = Array(20).fill(1).map((e, i) => new Node(Math.ceil(Math.random() * (xMax - xMin) + xMin), Math.ceil(Math.random() * (yMax - yMin) + yMin), i))
    this.manager.setNodes(nodes)
    //build nodes on the dom
    this.manager.nodes.forEach(node => node.buildNode(this.rectangle));
  }
  colorNodes(colors) {
    this.manager.nodes.forEach(node => this.manager.nodes.forEach(node => node.colorNode(colors)))
  }
  addBuckets(colors) {
    //create buckets and update manager
    let buckets = Array(5).fill(1).map((e, i) => new Bucket(this.width/5, this.height, this.x, this.y, i, this.manager.nodes));
    this.manager.setBuckets(buckets)
    //build buckets on the dom
    this.manager.buckets.map((bucket, i) => bucket.buildBucket(this.rectangle, colors[i]));
  }
  sortNodes(colors) {
    this.manager.buckets.forEach(bucket => {
      bucket.bucketNodes.forEach(bucketNode => {
        if(bucket.color !== bucketNode.color) {
          console.log('wrong color', bucketNode.node.style.backgroundColor)
          let colorIdx = colors.indexOf(bucketNode.node.style.backgroundColor)
          // console.log('colorIdx', colors[colorIdx], colorIdx)
          let xMax = bucket.width * (colorIdx + 1);
          let xMin = colorIdx * bucket.width;
          let yMin = 0;
          let yMax = Math.floor(Number(this.height)-10)
          let left = Math.ceil(Math.random() * (xMax - xMin) + xMin);
          let top = Math.ceil(Math.random() * (yMax - yMin) + yMin)
          bucketNode.node.style.left = `${left.toString()}px`
          bucketNode.node.style.top = `${top.toString()}px`
        }
      })
      bucket.reportBucketNodes()
    })
}
}

class Node {
  constructor(x, y, id) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.radius = '10';
    this.node = null;
    this.color = null;
  }

  buildNode(parentElement) {
    let nodeElement = document.createElement("span")
    nodeElement.classList.add("node");
    nodeElement.style.position = "absolute";
    nodeElement.style.left = `${this.x}px`;
    nodeElement.style.top = `${this.y}px`;
    nodeElement.setAttribute("id", `node-${this.id}`);
    parentElement.appendChild(nodeElement);
    this.node = nodeElement;
  }
  colorNode(colors) {
    let colorIdx = Math.floor(Math.random() * colors.length)
    let color = colors[colorIdx]
    this.node.style.backgroundColor = color;
  }
}

class Bucket {
  constructor(width, height, x, y, i, nodes) {
    this.width = width;
    this.height = height;
    this.left = (width * i);
    this.right = this.left + width;
    this.y = y;
    this.color = null;
    this.nodes = nodes;
    this.bucketNodes = [];
  }
  buildBucket(parentElement, color) {
    let bucketElement = document.createElement("section")
    bucketElement.classList.add("bucket");
    bucketElement.style.width = `${this.width}px`;
    bucketElement.style.height = `${this.height}px`;

    this.color = color;
    bucketElement.style.backgroundColor = color;

    parentElement.appendChild(bucketElement);
    this.reportBucketNodes()
  }
  reportBucketNodes() {
    let bucketNodes = this.nodes.filter((node) => node.x > this.left && node.x < this.right)
    this.bucketNodes = bucketNodes;
    console.log('bucketNodes', this.bucketNodes)
    return this.bucketNodes;
  }
}

const myManager = new Manager;

const myRectangle = new Rectangle('500', '700', myManager);
myRectangle.buildRectangle();
myRectangle.addNodes();
myRectangle.colorNodes(['red', 'green', 'pink', 'blue', 'brown'])
// myRectangle.addBuckets(['red', 'green', 'pink', 'blue', 'brown'])
// myRectangle.sortNodes(['red', 'green', 'pink', 'blue', 'brown'])
// console.log('manager nodes', myManager.reportNodes())
// console.log(myRectangle.nodes)
// console.log(myManager.getRectangle())
console.log(myRectangle.rectangle)
console.log(myManager.reportNodes())

