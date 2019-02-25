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

BinaryTree.prototype.empty = function () {
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



BinaryTree.prototype.insert = function (value) {

  if (this.root === null) {
    this.root = new Entry(value, null);
  } else {
    recInsert(value, this.root);
  }

  function recInsert(value, entry) {
    if (value > entry.value) {
      if (entry.right === null) {
        entry.right = new Entry(value, entry);
      } else {
        recInsert(value, entry.right);
      }
    } else {
      if (entry.left === null) {
        entry.left = new Entry(value, entry);
      } else {
        recInsert(value, entry.left);
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
    if (JSON.stringify(entry.value) === JSON.stringify(value)) {
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

BinaryTree.prototype.remove = function (value) {

  let delElement = this.find(value);
  //TODO: вынести определение принадлежности стороны элемента
  if (delElement === this.root) {
    this.root = null;
    removeSimple.call(this, delElement);
    return delElement;
  }

  //Отсутствие детей у удаляемого элемента
  if (delElement.left === null && delElement.right === null) {
    if (delElement.parent.left === delElement) {
      delElement.parent.left = null;
    }
    if (delElement.parent.right === delElement) {
      delElement.parent.right = null;
    }
    delElement.parent = null;
  }

  //Присутствие только левого ребенка(ветки) у удаляемого элемента
  if (delElement.right === null) {
    if (delElement.parent.left === delElement) {
      delElement.parent.left = delElement.left;
    }
    if (delElement.parent.right === delElement) {
      delElement.parent.right = delElement.left;
    }
    delElement.parent = null;
  }

  //Далее будет идти неправильный комментарий, т. к. в данном случае оба потомка присутствуют:
  //Присутствие только правого ребенка(ветки) у удаляемого элемента
  if (delElement.right !== null) {
    //Родитель удаляемого елемента слева
    if (delElement.parent.left === delElement) {
      //Отсутствие левого ребенка у удаляемого элемента
      if (delElement.left === null) {
        let insEl = findMinimum(delElement.right);
        //Есть правый ребенок у самого крайнего левого элемента для подстановки
        if (insEl.right !== null) {
          insEl.parent.left = insEl.right;
          insEl.right.parent = insEl.parent.left;

          insEl.parent = delElement.parent;
          insEl.right = delElement.right;

          delElement.right.parent = insEl;
          delElement.parent.left = insEl;
        }
        //Нет правого ребенка у самого крайнего левого элемента для подстановки
        else {
          insEl.parent = delElement.parent;
          insEl.right = delElement.right;

          delElement.right.parent = insEl;
          delElement.parent.left = insEl;
        }

      }
      //Присутствие левого ребенка у удаляемого элемента 
      else {
        let insEl = findMinimum(delElement.right);
        //Есть правый ребенок у самого крайнего левого элемента для подстановки
        if (insEl.right !== null) {
          insEl.parent.left = insEl.right;
          insEl.right.parent = insEl.parent.left;

          insEl.parent = delElement.parent;
          insEl.right = delElement.right;
          insEl.left = delElement.left;

          delElement.right.parent = insEl;
          delElement.parent.left = insEl;
        }
        //Нет правого ребенка у самого крайнего левого элемента для подстановки
        else {
          insEl.parent = delElement.parent;
          insEl.right = delElement.right;
          insEl.left = delElement.left;
          delElement.right.parent = insEl;
          delElement.parent.left = insEl;
        }
      }
    }
    //Родитель удаляемого елемента справа
    if (delElement.parent.right === delElement) {
      //Отсутствие левого ребенка у удаляемого элемента
      if (delElement.left === null) {
        let insEl = findMinimum(delElement.right);
        //Есть правый ребенок у самого крайнего левого элемента для подстановки
        if (insEl.right !== null) {
          insEl.parent.left = insEl.right;
          insEl.right.parent = insEl.parent.left;

          insEl.parent = delElement.parent;
          insEl.right = delElement.right;
          delElement.right.parent = insEl;
          delElement.parent.right = insEl;
        }
        //Нет правого ребенка у самого крайнего левого элемента для подстановки
        else {
          insEl.parent = delElement.parent;
          insEl.right = delElement.right;
          delElement.right.parent = insEl;
          delElement.parent.right = insEl;
        }
      }
      //Присутствие левого ребенка у удаляемого элемента
      else {
        let insEl = findMinimum(delElement.right);
        //Есть правый ребенок у самого крайнего левого элемента для подстановки
        if (insEl.right !== null) {
          insEl.parent.left = insEl.right;
          insEl.right.parent = insEl.parent.left;

          insEl.parent = delElement.parent;
          insEl.right = delElement.right;
          insEl.left = delElement.left;
          delElement.right.parent = insEl;
          delElement.parent.right = insEl;
        } else {
          //Нет правого ребенка у самого крайнего левого элемента для подстановки
          insEl.parent = delElement.parent;
          insEl.right = delElement.right;
          insEl.left = delElement.left;
          delElement.right.parent = insEl;
          delElement.parent.right = insEl;
        }
      }
    }

    function findMinimum(node) {
      if (node.left == null) {
        node.parent.left = null;
        return node;
      }
      return findMinimum(node.left);
    }
  }

  function removeSimple(node) {
    let left = node.left;
    let right = node.right;
    node.parent = null;
    node.left = null;
    node.right = null;
    if (left !== null) {
      recAdd.call(this, left);
    }
    if (right !== null) {
      recAdd.call(this, right);
    }

    function recAdd(node) {
      this.insert(node.value);
      let left = node.left;
      let right = node.right;
      if (left !== null) {
        recAdd.call(this, left);
      }
      if (right !== null) {
        recAdd.call(this, right);
      }
    }
  }
  return delElement;
}

function test() {
  let mockTree = new BinaryTree();

  mockTree.insert(8);
  mockTree.insert(10);
  mockTree.insert(14);
  mockTree.insert(13);
  mockTree.insert(3);
  mockTree.insert(6);
  mockTree.insert(null);
  mockTree.insert(4);
  mockTree.insert(7);
  mockTree.insert(undefined);
  mockTree.insert(1);
  mockTree.insert(5);
  mockTree.insert("A");
  mockTree.insert("C");
  mockTree.insert({
    name: 'Oleg',
    age: 45
  });

  const testData = [{
    value: 8,
    expected: new Entry(8, null)
  }, {
    value: 10,
    expected: new Entry(10)
  }, {
    value: 14,
    expected: new Entry(14)
  }, {
    value: 13,
    expected: new Entry(13)
  }, {
    value: 3,
    expected: new Entry(3)
  }, {
    value: 6,
    expected: new Entry(6)
  }, {
    value: null,
    expected: new Entry(null)
  }, {
    value: 4,
    expected: new Entry(4)
  }, {
    value: 7,
    expected: new Entry(7)
  }, {
    value: undefined,
    expected: new Entry(undefined)
  }, {
    value: 1,
    expected: new Entry(1)
  }, {
    value: 5,
    expected: new Entry(5)
  }, {
    value: 'A',
    expected: new Entry('A')
  }, {
    value: 'C',
    expected: new Entry('C')
  }, {
    value: {
      name: 'Oleg',
      age: 45
    },
    expected: new Entry({
      name: 'Oleg',
      age: 45
    })
  }];

  testData.forEach(function (data) {

    const {
      value,
      expected
    } = data;
    
      const actual = mockTree.find(value);
      console.log(actual);
      
    
  });
}


