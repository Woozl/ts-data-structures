import SinglyLinkedList from "./SinglyLinkedList";

test('Generates value', () => {
    expect(new SinglyLinkedList(4).pop()).toBe(4);
});