const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  constructor() {
    this.rooting = null;
  }

  root() {
   return this.rooting;
  }

  add(data) {
    // throw new NotImplementedError('Not implemented');
    this.rooting = addNode(this.rooting, data);

    function addNode(node, data) {
      if (!node) {
        return new Node(data);
      }

      if (node.data === data) {
        return node;
      }

      if (data < node.data) {
        node.left = addNode(node.left, data);
      } else {
        node.right = addNode(node.right, data);
      }

      return node;
    }
  }

  has(data) {
    return !!this.find(data);
  }

  find(data, node = this.rooting) {
    if (node === null) {
      return null;
    } else if (data < node.data) {
      return this.find(data, node.left);
    } else if (data > node.data) {
      return this.find(data, node.right);
    } else {
      return node;
    }
  }

  remove(data) {
    this.rooting = removeCurrentNode(this.rooting, data);

    function removeCurrentNode(node, data) {
      if (!node) {
        return null;
      }

      if (data < node.data) {
        node.left = removeCurrentNode(node.left, data);
        return node;
      } else if (node.data < data) {
        node.right = removeCurrentNode(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }

        if (!node.left) {
          node = node.right;
          return node;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }

        let minFromRight = node.right;
        while (minFromRight.left) {
          minFromRight = minFromRight.left;
        }
        node.data = minFromRight.data;

        node.right = removeCurrentNode(node.right, minFromRight.data);

        return node;
      }
    }
  }

  min() {
    if (!this.rooting) {
      return;
    }

    let node = this.rooting;
    while (node.left) {
      node = node.left;
    }

    return node.data;
  }
  

  max() {
    if (!this.rooting) {
      return;
    }

    let node = this.rooting;
    while (node.right) {
      node = node.right;
    }

    return node.data;
}
}

module.exports = {
  BinarySearchTree
};