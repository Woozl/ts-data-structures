import SinglyLinkedList from "./SinglyLinkedList";

// let start = new ListNode<number>(4, new ListNode<number>(5, new ListNode<number>(6)));
// console.log(start.val);

let ll = new SinglyLinkedList();
ll.append(1);
ll.append(2);
ll.append(3);

console.log(ll.toArray());
console.log(ll.reverse().toArray())