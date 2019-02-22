function Entry(value, parent) {
  this.value = value;
  this.left = null;
  this.right = null;
  this.parent = parent;
  this.toString = () => {
    let strEntry = this.value;
    return strEntry;
  };
}

function BinaryTree() {
  this.root = null;
}

BinaryTree.prototype.toArray = function () {

  let result = [];
  let entry = this.root;
  let traverse = function (entry) {
    entry.left && traverse(entry.left);
    result.push(entry.value);
    entry.right && traverse(entry.right);
  };
  traverse(entry);
  return result;
}

BinaryTree.prototype.toString = function () {

  let arrEntryValue = this.toArray();
  let outEntryString = '';

  arrEntryValue.forEach(function (element) {
    outEntryString += element + ", ";
  });
  outEntryString = outEntryString.slice(0, -2);
  return outEntryString;
}

BinaryTree.prototype.toLinkedList = function () {

  let arrEntryValue = this.toArray();
  let linkedList = new LinkedListSecond();

  for (let i = 0; i < arrEntryValue.length; i++) {
    linkedList.push(arrEntryValue[i]);
  }
  return linkedList;
}



BinaryTree.prototype.insert = function (value){
  if(this.root === null){
    this.root = new Entry(value, null);
  }
  else{
    recInsret(value, this.root);
  }


  function recInsret(value, entry){
    if(value > entry.value){
      if (entry.right === null){
        entry.right = new Entry(value, entry);
      }
      else{
        recInsret(value,entry.right);
      }
    }
    else{
      if (entry.left === null){
        entry.left = new Entry(value, entry);
      }
      else{
        recInsret(value,entry.left);
      }
    }
  }
}

BinaryTree.prototype.find = function (value) {

  if (this.root === null) {
    return null;
  } else {
    return recFind(value, this.root);
  }

  function recFind(value, entry) {
    if (entry.value === value) {
      return entry;
    }
    if (value > entry.value) {
      if (entry.right === null) {
        return null;
      } else {
        return recFind(value, entry.right);
      }
    } else {
      if (entry.left === null) {
        return null;
      } else {
        return recFind(value, entry.left);
      }
    }
  }
}


var a = new BinaryTree();
a.insert(20);
a.insert(22);
a.insert(15);
a.insert(45);
a.insert(11);
a.insert(86);
a.insert(78);
a.insert(23);
a.insert(17);
a.insert(69);


console.log(a);
console.log(a.find(17).toString());
console.log(a.toArray());
console.log(a.toString());
console.log(a.toLinkedList());
