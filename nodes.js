
//rectangle class
class OuterRectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
    this.x = null;
    this.y = null;
    this.rectangle = null;
    this.buckets = []
    this.nodes = []
  }
  buildRectangle() {
    this.rectangle = document.createElement("div");
    this.rectangle.classList.add("outer-rectangle")
    this.rectangle.setAttribute("style", `height: ${this.height}px; width: ${this.width}px;`);
    document.body.appendChild(this.rectangle)
    let rect = this.rectangle.getBoundingClientRect();
    this.x = rect.x;
    this.y = rect.y;
    console.log('rect', rect)
  }
  addNodes() {
    const xMin = Math.ceil(this.x);
    const xMax = Math.floor(Number(this.width) + this.x);
    const yMin = Math.ceil(this.y);
    const yMax = Math.floor(Number(this.height) + this.y);
    this.nodes = Array(20).fill(1).map((e, i) => new Node(Math.ceil(Math.random() * (xMax - xMin) + xMin), Math.ceil(Math.random() * (yMax - yMin) + yMin), i))
    console.log('nodes', this.nodes)
    this.nodes.forEach(node => node.buildNode(this.rectangle));
  }
  }


//node class

class Node {
  constructor(x, y, id) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.radius = '10';
  }
  buildNode(parentElement) {
    console.log('x', typeof this.x, this.y)
    let nodeElement = document.createElement("span")
    nodeElement.classList.add("node")
    nodeElement.style.position = "absolute";
    nodeElement.style.left = `${this.x}px`
    nodeElement.style.top = `${this.y}px`
    nodeElement.setAttribute("id", `node-${this.id}`)
    parentElement.appendChild(nodeElement)
  }
}


const outerRectangle = new OuterRectangle('500', '700')
outerRectangle.buildRectangle();
outerRectangle.addNodes();

      // class InnerRectangle extends OuterRectangle {
      //   constructor(color) {
      //     this.height = 5;
      //     this.width = 5;
      //     this.color = color;
      //   }
      // }

/*
container will have a an array of objects = nodes
attribute -- could change shape
positions of nodes is static -- but they need to change x,y to be in the correct color
tie breaking
10 radius of the node

manager owns outer rectangle
array of the buckets

large rectangle - array of all nodes - manager owns list of nodes

use reference - one guy at the top who pilots all the classes
radius of circle -- don't make them overlap the buckets

bucket - nodes with same color
*/