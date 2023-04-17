const {NotImplementedError} = require('../extensions/index.js');

const {Node} = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
    rootNode = null;

    root() {
        return this.rootNode;
    }

    add(data) {
        let node = new Node(data);

        if (this.rootNode === null) {
            this.rootNode = new Node(data);
            return;
        }

        let currentNode = this.rootNode;
        this.insertNode(currentNode, node);
    }

    insertNode(currentNode, newNode) {
        if (newNode.data < currentNode.data) {
            if (currentNode.left === null) {
                currentNode.left = newNode;
            } else {
                this.insertNode(currentNode.left, newNode);
            }
        }

        if (newNode.data > currentNode.data) {
            if (currentNode.right === null) {
                currentNode.right = newNode;
            } else {
                this.insertNode(currentNode.right, newNode);
            }
        }
    }

    has(data) {
        const node = new Node(data);

        return this.search(this.root(), node) !== null;
    }

    find(data) {
        const node = new Node(data);

        return this.search(this.root(), node);
    }

    search(currentNode, node) {
        if (currentNode === null) {
            return null;
        }

        if (currentNode.data === node.data) {
            return currentNode;
        }

        if (node.data < currentNode.data) {
            return this.search(currentNode.left, node);
        }

        if (node.data > currentNode.data) {
            return this.search(currentNode.right, node);
        }
    }

    remove(data) {
        this.rootNode = this.removeNode(this.rootNode, data);
    }

    removeNode(currentRoot, data) {
        if (currentRoot === null) {
            return null;
        } else if (data < currentRoot.data) {
            currentRoot.left = this.removeNode(currentRoot.left, data);
            return currentRoot;
        } else if (data > currentRoot.data) {
            currentRoot.right = this.removeNode(currentRoot.right, data);
            return currentRoot;
        } else {
            if (currentRoot.left === null && currentRoot.right === null) {
                currentRoot = null;
                return currentRoot;
            }

            if (currentRoot.left === null) {
                currentRoot = currentRoot.right;
                return currentRoot;
            } else if (currentRoot.right === null) {
                currentRoot = currentRoot.left;
                return currentRoot;
            }

            let newNode = this.findMinNode(currentRoot.right);
            currentRoot.data = newNode.data;
            currentRoot.right = this.removeNode(currentRoot.right, newNode.data);

            return currentRoot;
        }
    }

    min() {
        if (this.root().left === null) {
            return this.root()?.data;
        } else {
            return this.findMinNode(this.root().left)?.data;
        }
    }

    findMinNode(currentNode) {
        if (currentNode.left === null) {
            return currentNode;
        } else {
            return this.findMinNode(currentNode.left);
        }
    }

    max() {
        if (this.root().right === null) {
            return this.root()?.data;
        } else {
            return this.findMaxNode(this.root().right)?.data;
        }
    }

    findMaxNode(currentNode) {
        if (currentNode.right === null) {
            return currentNode;
        } else {
            return this.findMaxNode(currentNode.right);
        }
    }
}

module.exports = {
    BinarySearchTree
};