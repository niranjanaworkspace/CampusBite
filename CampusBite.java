// CampusBite: simple Java demonstration of Queue, Linked List and BST.
// Run: javac CampusBite.java
// Then: java CampusBite

import java.util.ArrayList;
import java.util.List;

public class CampusBite {
    static class Order {
        int id, quantity;
        String student, item, status;
        Order(int id, String student, String item, int quantity) {
            this.id=id; this.student=student; this.item=item; this.quantity=quantity; this.status="Waiting";
        }
        public String toString() { return "#" + id + " | " + student + " | " + item + " | Qty " + quantity + " | " + status; }
    }

    // Queue: first added, first called.
    static class OrderQueue {
        List<Order> items = new ArrayList<>();
        void enqueue(Order order) { items.add(order); }
        Order dequeue() { return items.isEmpty() ? null : items.remove(0); }
        void display() { for (Order o : items) System.out.println(o); }
    }

    // Linked list: stores order records.
    static class Node { Order order; Node next; Node(Order o) { order=o; } }
    static class OrderLinkedList {
        Node head;
        void insert(Order o) {
            Node n=new Node(o);
            if(head==null){head=n;return;}
            Node c=head; while(c.next!=null)c=c.next; c.next=n;
        }
        Order search(int id) {
            Node c=head; while(c!=null){if(c.order.id==id)return c.order;c=c.next;} return null;
        }
        void display() { Node c=head; while(c!=null){System.out.println(c.order);c=c.next;} }
    }

    // Binary search tree: finds an order using its ID.
    static class TreeNode { Order order; TreeNode left,right; TreeNode(Order o){order=o;} }
    static class OrderBST {
        TreeNode root;
        void insert(Order o){root=insertAt(root,o);}
        TreeNode insertAt(TreeNode n,Order o){
            if(n==null)return new TreeNode(o);
            if(o.id<n.order.id)n.left=insertAt(n.left,o);
            else if(o.id>n.order.id)n.right=insertAt(n.right,o);
            return n;
        }
        Order search(int id){
            TreeNode n=root;
            while(n!=null){if(id==n.order.id)return n.order;n=id<n.order.id?n.left:n.right;}
            return null;
        }
        void sorted(){inOrder(root);}
        void inOrder(TreeNode n){if(n==null)return;inOrder(n.left);System.out.println(n.order);inOrder(n.right);}
    }

    public static void main(String[] args) {
        OrderQueue queue=new OrderQueue();
        OrderLinkedList list=new OrderLinkedList();
        OrderBST tree=new OrderBST();
        Order[] sample={
            new Order(1001,"Ananya","Veg Sandwich",1),
            new Order(1002,"Rahul","Masala Dosa",2),
            new Order(1003,"Maya","Tea",1)
        };
        for(Order o:sample){queue.enqueue(o);list.insert(o);tree.insert(o);}
        System.out.println("CAMPUSBITE - CANTEEN ORDERS");
        System.out.println("\\nWaiting orders:");
        queue.display();
        System.out.println("\\nCalling the next order:");
        Order next=queue.dequeue();
        if(next!=null){next.status="Preparing";System.out.println(next);}
        System.out.println("\\nAll order records:");
        list.display();
        System.out.println("\\nSearching for order 1003:");
        Order found=tree.search(1003);
        System.out.println(found==null?"Order not found.":found);
        System.out.println("\\nOrders sorted by order number:");
        tree.sorted();
    }
}
