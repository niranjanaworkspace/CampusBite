// CampusBite order manager. The three data structures are implemented here.
"use strict";
const prices={"Veg Sandwich":40,"Masala Dosa":60,"Chicken Roll":70,"Tea":12,"Fresh Lime":25,"Veg Fried Rice":80};

// Queue: orders are called in the order they arrive.
class OrderQueue{constructor(){this.items=[];}enqueue(o){this.items.push(o);}dequeue(){return this.items.length?this.items.shift():null;}size(){return this.items.length;}toArray(){return [...this.items];}}

// Linked list: keeps all order records.
class OrderNode{constructor(order){this.order=order;this.next=null;}}
class OrderLinkedList{
  constructor(){this.head=null;}
  insert(order){const n=new OrderNode(order);if(!this.head){this.head=n;return;}let c=this.head;while(c.next)c=c.next;c.next=n;}
  toArray(){const a=[];let c=this.head;while(c){a.push(c.order);c=c.next;}return a;}
}

// Binary search tree: searches for an order number.
class TreeNode{constructor(order){this.key=order.id;this.order=order;this.left=null;this.right=null;}}
class OrderBST{
  constructor(){this.root=null;}
  insert(order){const n=new TreeNode(order);if(!this.root){this.root=n;return;}let c=this.root;while(true){if(n.key===c.key)return;if(n.key<c.key){if(!c.left){c.left=n;return;}c=c.left;}else{if(!c.right){c.right=n;return;}c=c.right;}}}
  search(id){let c=this.root,k=Number(id);while(c){if(k===c.key)return c.order;c=k<c.key?c.left:c.right;}return null;}
}
let nextId=1001,queue=new OrderQueue(),records=new OrderLinkedList(),tree=new OrderBST();
const el=id=>document.getElementById(id);
function safe(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function msg(id,text,error=false){el(id).textContent=text;el(id).style.color=error?"#b34e5b":"#10694f";}
function createOrder(name,item,qty){const o={id:nextId++,name:name.trim(),item,qty,total:prices[item]*qty,status:"Waiting",time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})};records.insert(o);tree.insert(o);queue.enqueue(o);return o;}
function showRecords(list){el("recordCount").textContent=list.length+" record"+(list.length===1?"":"s");if(!list.length){el("recordsBody").innerHTML='<tr><td colspan="7" class="empty-cell">No matching orders found.</td></tr>';return;}el("recordsBody").innerHTML=list.map(o=>`<tr><td class="id">#${o.id}</td><td><b>${safe(o.name)}</b><br><small>${safe(o.time)}</small></td><td>${safe(o.item)}</td><td>${o.qty}</td><td><b>₹${o.total}</b></td><td><span class="status ${o.status.toLowerCase()}">${o.status}</span></td><td><div class="row-actions">${o.status==="Preparing"?`<button class="mini" data-action="complete" data-id="${o.id}">Complete</button>`:""}${o.status==="Waiting"?`<button class="mini cancel" data-action="cancel" data-id="${o.id}">Cancel</button>`:""}${["Completed","Cancelled"].includes(o.status)?"—":""}</div></td></tr>`).join("");}
function render(){const all=records.toArray();el("totalCount").textContent=all.length;el("waitingCount").textContent=all.filter(o=>o.status==="Waiting").length;el("preparingCount").textContent=all.filter(o=>o.status==="Preparing").length;el("completedCount").textContent=all.filter(o=>o.status==="Completed").length;el("queueBadge").textContent=queue.size()+" order"+(queue.size()===1?"":"s");const w=queue.toArray();el("queueList").innerHTML=w.length?w.map((o,i)=>`<div class="queue-item"><div class="order-num">#${o.id}</div><div class="queue-info"><b>${safe(o.item)}</b><small>${safe(o.name)} · Qty ${o.qty} · ₹${o.total}</small></div><span class="position">#${i+1}</span></div>`).join(""):'<div class="empty">☕<b>No orders waiting</b><small>Add an order to get started.</small></div>';showRecords(all.slice().reverse());}
el("orderForm").addEventListener("submit",e=>{e.preventDefault();const name=el("customerName").value.trim(),item=el("foodItem").value,qty=Number(el("quantity").value);if(!name){msg("formMessage","Please enter a student name.",true);return;}if(!Number.isInteger(qty)||qty<1||qty>20){msg("formMessage","Quantity must be between 1 and 20.",true);return;}const o=createOrder(name,item,qty);render();e.target.reset();el("quantity").value=1;msg("formMessage",`Order #${o.id} added successfully.`);});
el("callNextBtn").addEventListener("click",()=>{const o=queue.dequeue();if(!o){msg("formMessage","There are no waiting orders.",true);return;}o.status="Preparing";render();msg("formMessage",`Order #${o.id} is now being prepared.`);});
el("recordsBody").addEventListener("click",e=>{const b=e.target.closest("button[data-action]");if(!b)return;const o=tree.search(b.dataset.id);if(!o)return;if(b.dataset.action==="complete"&&o.status==="Preparing"){o.status="Completed";msg("searchMessage",`Order #${o.id} completed.`);}if(b.dataset.action==="cancel"&&o.status==="Waiting"){queue=new OrderQueue();records.toArray().filter(x=>x.status==="Waiting"&&x.id!==o.id).forEach(x=>queue.enqueue(x));o.status="Cancelled";msg("searchMessage",`Order #${o.id} cancelled.`);}render();});
el("searchForm").addEventListener("submit",e=>{e.preventDefault();const id=el("searchId").value.trim();if(!id){msg("searchMessage","Enter an order number.",true);return;}const o=tree.search(id);if(o){showRecords([o]);msg("searchMessage",`Order #${o.id} found.`);}else{showRecords([]);msg("searchMessage",`Order #${id} was not found.`,true);}});
el("showAllBtn").addEventListener("click",()=>{el("searchId").value="";msg("searchMessage","");render();});
el("resetBtn").addEventListener("click",()=>{if(!confirm("Reset all demo orders?"))return;nextId=1001;queue=new OrderQueue();records=new OrderLinkedList();tree=new OrderBST();el("orderForm").reset();el("quantity").value=1;msg("formMessage","Demo has been reset.");msg("searchMessage","");render();});
render();
