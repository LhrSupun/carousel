// create a linkd list of images
export default class LinkedList {
    constructor(value) {
        this.value = value;
        this.head = null;
        this.tail = null;
        this.count = 0;
    }

    append(value) {
        const node = { value: value, next: null }; // create a node
        if (!this.head) { // if the list is empty
            this.head = node; // set the head to the node
            this.tail = node; // set the tail to the node
        } else { // if the list is not empty
            this.tail.next = node; // set the next node to the tail
            node.prev = this.tail; // set the previous node to the tail
            this.tail = node; // set the tail to the node
        }
        this.count++; // increment the count
    }

    getCount() {
        return this.count;
    }

    get(index) {
        if (index < 0 || index >= this.count) { // if the index is out of bounds
            return null;
        }
        let current = this.head; // set the current node to the head
        for (let i = 0; i < index; i++) { // iterate through the list
            current = current.next; // set the current node to the next node
        }
        return current; // return the current node
    }


}