
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
  addNodes(colors) {
    const xMin = 0;
    const xMax = Math.floor(Number(this.width)-10);
    const yMin = 0;
    const yMax = Math.floor(Number(this.height)-10);
    this.nodes = Array(20).fill(1).map((e, i) => new Node(Math.ceil(Math.random() * (xMax - xMin) + xMin), Math.ceil(Math.random() * (yMax - yMin) + yMin), i))
    console.log('nodes', this.nodes)
    this.nodes.forEach(node => node.buildNode(this.rectangle, colors));
  }
  addBuckets(colors) {
    this.buckets = Array(5).fill(1).map((e, i) => new Bucket(this.width/5, this.height, this.x, this.y, i, this.nodes));
    this.buckets.map((bucket, i) => bucket.buildBucket(this.rectangle, colors[i]));
    console.log('this.buckets', this.buckets)
  }
  sortNodes(colors) {

    //go thru buckets
    this.buckets.forEach(bucket => {
      bucket.bucketNodes.forEach(bucketNode => {
        if(bucket.color !== bucketNode.color) {
          console.log('wrong color', bucketNode.color)
          let colorIdx = colors.indexOf(bucketNode.color)
          console.log('colorIdx', colors[colorIdx], colorIdx)
          let xMax = bucket.width * colorIdx;
          let xMin = xMax - bucket.width;
          let yMin = 0;
          let yMax = Math.floor(Number(this.height)-10)
          bucketNode.x = Math.ceil(Math.random() * (xMax - xMin) + xMin);
          bucketNode.y = Math.ceil(Math.random() * (yMax - yMin) + yMin);
        }
      })
    })
      //go thru bucketNodes
        //if bucket !== bucketNode color
          //reassign bucketNode x and y to a random num in color range

  }
  // generateRandomCoords(xMin, xMax, yMin, yMax) {

  // }

}


//node class

class Node {
  constructor(x, y, id) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.radius = '10';
    // this.color = null;
  }
  buildNode(parentElement, colors) {

    let nodeElement = document.createElement("span")
    nodeElement.classList.add("node");
    nodeElement.style.position = "absolute";
    nodeElement.style.left = `${this.x}px`;
    nodeElement.style.top = `${this.y}px`;
    nodeElement.setAttribute("id", `node-${this.id}`);
    let colorIdx = Math.floor(Math.random() * 5)
    nodeElement.style.backgroundColor = colors[colorIdx]
    this.color = colors[colorIdx]

    parentElement.appendChild(nodeElement);
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
    this.reportNodes()


  }
  reportNodes() {
    console.log('this.x', this.left, this.right)
    let bucketNodes = this.nodes.filter((node) => node.x > this.left && node.x < this.right)
    this.bucketNodes = bucketNodes;
    // console.log(this.bucketNodes)
  }

}


const outerRectangle = new OuterRectangle('500', '700')
outerRectangle.buildRectangle();
outerRectangle.addNodes(['red', 'green', 'pink', 'blue', 'brown']);
outerRectangle.addBuckets(['red', 'green', 'pink', 'blue', 'brown'])
outerRectangle.sortNodes(['red', 'green', 'pink', 'blue', 'brown'])

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