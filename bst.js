class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    // If the tree is empty, the key will be inserted as the root
    if (this.key == null) {
      this.key = key;
      this.value = value;
    }

    /*  If the tree exists, start at the root and compare to the key you're inserting
        If the new key is less than the root, new key needs to live on the left side.
    */
    else if (key < this.key) {
      /* If existing node doesn't have a left child,
        insert new node as the left child with `this` as the parent.
      */
      if (this.left == null) {
        this.left = new BinarySearchTree(key, value, this);
      }
      /* If the node already has a left child, we recursively call the `insert` method
        so the node is added further down the tree.
      */
      else {
        this.left.insert(key, value);
      }
    }
    /* Similarly, if the new key is greater than the root,
      follow the same process on the right side.
    */
    else {
      if (this.right == null) {
        this.right = new BinarySearchTree(key, value, this);
      }
      else {
        this.right.insert(key, value);
      }
    }
  }

  find(key) {
    // If the item is found at the root then return that value
    if (this.key === key) {
      return this.value;
    }
    /* If the item is less than the root, follow the left child.
      If there is an existing left child, recursively check its children
      until you find the item.
    */
    else if (key < this.key && this.left) {
      return this.left.find(key);
    }
    /* If the item is greater than the root, follow the right child.
      If there is an existing right child, recursively check its children
      until you find the item.
    */
    else if (key > this.key && this.right) {
      return this.right.find(key);
    }
    // You have searched the tree and the item is not in the tree.
    else {
      throw new Error('Key Error');
    }
  }

  remove(key) {
    if (this.key === key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      }
      /* If the node only has a left child,
        replace the node with its left child
      */
      else if (this.left) {
        this._replaceWith(this.left);
      }
      /* If the node only has a right child,
        replace the node with its right child
      */
      else if (this.right) {
        this._replaceWith(this.right);
      }
      /* If the node has no children, simply remove it
        and any references to it by calling `this._replaceWith(null)`
      */
      else {
        this._replaceWith(null);
      }
    }
    else if (key < this.key && this.left) {
      this.left.remove(key);
    }
    else if (key > this.key && this.right) {
      this.right.remove(key);
    }
    else {
      throw new Error('Key Error');
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node;
      }
      else if (this == this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent
      }
    }
    else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      }
      else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }
}

const BST = new BinarySearchTree();
BST.insert(3);
BST.insert(1);
BST.insert(4);
BST.insert(6);
BST.insert(9);
BST.insert(2);
BST.insert(5);
BST.insert(7);
console.log(BST);
// Results are the same as the first exercise.

const BST2 = new BinarySearchTree();
BST2.insert('E');
BST2.insert('A');
BST2.insert('S');
BST2.insert('Y');
BST2.insert('Q');
BST2.insert('U');
BST2.insert('E');
BST2.insert('S');
BST2.insert('T');
BST2.insert('I');
BST2.insert('O');
BST2.insert('N');
console.log(BST2);
// Results are different from the first exercise.
// I assumed that duplicates were not allowed, so I just left them out of my drawing.
// However, the code does allow duplicates and pushes them to the right side of the tree.

// 4. This program adds the values of all nodes in a BST.  Its runtime is linear O(n).

function treeHeight(bst) {
  if (!bst) {
    return 0;
  }
  if (!bst.left && !bst.right) {
    return 1;
  }
  let height = treeHeight(bst.left);
  let rightHeight = treeHeight(bst.right);
  if (rightHeight > height) {
    height = rightHeight;
  }
  return height + 1;
}

console.log(treeHeight(BST));

function isBST(bst) {
  if (!bst) {
    return true;
  }
  if (!bst.left && !bst.right) {
    return true;
  }
  if (!bst.left && bst.right) {
    return bst.key < bst.right.key;
  }
  if (bst.left && !bst.right) {
    return bst.left.key < bst.key;
  }
  if (bst.left && bst.right) {
    return isBST(bst.left) && isBST(bst.right);
  }
}

console.log(isBST(BST));
console.log(isBST(BST2));

function thirdLargestNode(bst) {
  let currNode = bst;
  while (currNode.right !== null) {
    currNode = currNode.right;
  }
  if (!currNode.left) {
    currNode = currNode.parent;
    if (currNode.left) {
      return currNode.left.key;
    }
    else {
      return currNode.parent.key;
    }
  }
  let secondLargest = currNode.left;
  if (!secondLargest.left && !secondLargest.right) {
    return currNode.parent.key;
  }
  while (secondLargest.right !== null) {
    secondLargest = secondLargest.right;
  }
  if (secondLargest.left) {
    return secondLargest.left.key;
  }
  else {
    return secondLargest.parent.key;
  }
}

console.log(thirdLargestNode(BST));
console.log(thirdLargestNode(BST2));
// thirdLargestNode() will always return the correct value if there are no duplicates.
// If there are duplicates, it may or may not return the correct value depending on the positioning of the duplicates in the particular tree.

function isBalanced(bst) {
  const heightDifference = treeHeight(bst.left) - treeHeight(bst.right);
  return heightDifference <= 1 && heightDifference >= -1;
}

console.log(isBalanced(BST));
console.log(isBalanced(BST2));
const balancedTree = new BinarySearchTree();
balancedTree.insert(3);
console.log(isBalanced(balancedTree));
balancedTree.insert(1);
console.log(isBalanced(balancedTree));
balancedTree.insert(2);
console.log(isBalanced(balancedTree));
balancedTree.insert(4);
console.log(isBalanced(balancedTree));
