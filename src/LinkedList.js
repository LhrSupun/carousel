// create a linkd list of images
export default class LinkedList {
    constructor(value) {
        this.value = value;
        this.head = null;
        this.tail = null;
        this.count = 0;
    }

    append(value) {
        const node = { value: value, next: this.getHead() }; // create a node
        if (!this.head) { // if the list is empty
            this.head = node; // set the head to the node
            this.tail = node; // set the tail to the node
            
        } else { // if the list is not empty
            this.tail.next = node; // set the next node to the tail
            node.prev = this.tail; // set the previous node to the tail
            this.tail = node; // set the tail to the node
            // connect node to the head
        }
        this.count++; // increment the count
    }

    getCount() {
        return this.count;
    }

    getHead() {
        return this.head;
    }

    getLast() {
        return this.tail;
    }

}