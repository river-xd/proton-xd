import { Iter } from "../iter.ts";
import { Option } from "../../mod.ts";
import { Vec } from "../mod.ts";
import { Node } from "./mod.ts";



export class BinaryTree<T> extends Iter<T> {
  root: Option<Node<T>>;

  constructor(root?: Node<T>) {
    super();
    this.root=new Option(root);
  }

  next(): T {
    return this[Symbol.iterator]().next().value;
  }
  
  *[Symbol.iterator](): Iterator<T,any,undefined> {
    
  }

  [Symbol.toStringTag]() {
    let str="";

    for(const node of this) {

    }
    return str;
  }

  public toString() {
    return this[Symbol.toStringTag]();
  }


  
  public treversePre(f: (data: T,node: Node<T>)=> void) {
    const nodes=[this.root.value];
    for(const node of nodes) {
      if(!node) break;
      f(node.data,node);

      if(node.left.value) nodes.push(node.left.value);
      if(node.right.value) nodes.push(node.right.value);
    }
  }

  public toPreOrderedVec() {
    return new Vec(...this);
  }

  public toPreOrderedArray() {
    return [...this];
  }
  

}




