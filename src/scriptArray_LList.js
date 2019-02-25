function List() {
    this.pop = function () {};
    this.push = function () {};
    this.shift = function () {};
    this.unshift = function () {};
    this.length = function () {};
    this.remove = function () {};
    this.some = function () {};
    this.every = function () {};
    this.splice = function () {};
    this.isArray = function () {};
}



function ArrayList() {
    List.apply(this, arguments);
    this.arr = [];

    this.pop = function () {

        if (this.arr.length === 0) {
            return undefined;
        }
        let lastElement = this.arr[this.arr.length - 1]
        this.arr.length = this.arr.length - 1;
        return lastElement;
    }

    this.push = function () {

        for (let i = 0; i < arguments.length; i++) {
            this.arr[this.arr.length] = arguments[i];
        }
        return this.arr.length;
    }

    this.shift = function () {

        if (this.arr.length === 0) {
            return undefined;
        }
        let firstEl = this.arr[0];
        for (let i = 0; i < this.arr.length; i++) {
            this.arr[i] = this.arr[i + 1];
        }
        this.arr.length = this.arr.length - 1;
        return firstEl;
    }

    this.unshift = function () {

        for (let i = 0; i < arguments.length; i++) {
            for (let j = this.arr.length; j > 0; j--) {
                this.arr[j] = this.arr[j - 1];
            }
            this.arr[0] = arguments[i];
        }
        return this.arr.length;
    }

    this.length = function () {

        let i = -1;
        for (let key in this.arr) {
            i = key;
        }
        return +i + 1;
    }

    this.isArray = function (obj) {

        if (obj.constructor === Array) return true;
        else return false;
    }

    this.remove = function (element) {

        if (this.arr.length - 1 < element) {
            return undefined;
        }
        let removeElement = this.arr[element];
        for (let i = element; this.arr.length > i; i++) {
            this.arr[i] = this.arr[i + 1];
        }
        this.arr.length = this.arr.length - 1;
        return removeElement;
    }

    this.some = function (arr, callback, arg) {

        var i, length = this.arr.length;
        for (i = 0; i < length; i = i + 1) {
            if (callback.call(arg, this.arr[i], i, this.arr)) {
                return true;
            }
        }
        return false;
    }

    this.every = function (arr, callback, arg) {

        var i, length = arr.length;
        for (i = 0; i < length; i = i + 1) {
            if (!callback.call(arg, arr[i], i, arr)) {
                return false;
            }
        }
        return true;
    }

    this.splice = function () {

        let removedElements = [];
        if (arguments[1] === undefined && arguments[0] > 0) {
            let j = 0;
            for (let i = arguments[0]; i < this.arr.length; i++) {
                removedElements[j] = this.arr[i];
                j++;
            }
            this.arr.length = arguments[0];
            return removedElements;
        }
        if (arguments[1] === undefined && arguments[0] < 0) {
            let j = 0;
            for (let i = this.arr.length + arguments[0]; i < this.arr.length; i++) {
                removedElements[j] = this.arr[i];
                j++;
            }
            this.arr.length = this.arr.length + arguments[0];
            return removedElements;
        }
        if (arguments[1] === undefined && arguments[0] === 0) {
            for (let i = 0; i < this.arr.length; i++) {
                removedElements[i] = this.arr[i];
            }
            this.arr.length = 0;
            return removedElements;
        }

        if (arguments[0] >= 0) {
            if (arguments[1] > 0) {
                let k = 0;
                for (let i = arguments[0]; i < arguments[0] + arguments[1]; i++) {
                    removedElements[k] = this.arr[i];
                    k++;
                }
                for (let i = 0; i < arguments[1]; i++) {
                    for (let j = arguments[0]; j < this.arr.length; j++) {
                        this.arr[j] = this.arr[j + 1];
                    }
                    this.arr.length = this.arr.length - 1;
                }

            }
            if (arguments[2] !== undefined) {
                for (let i = arguments.length - 3; i >= 0; i--) {
                    for (let j = this.arr.length; j > arguments[0]; j--) {
                        this.arr[j] = this.arr[j - 1];
                    }
                    this.arr[arguments[0]] = arguments[i + 2];
                }
            }
        }
        if (arguments[0] < 0) {
            var arg = this.arr.length + arguments[0];
            if (arguments[1] > 0) {
                let k = 0;
                for (let i = arg; i < arg + arguments[1]; i++) {
                    removedElements[k] = this.arr[i];
                    k++;
                }
                for (let i = 0; i < arguments[1]; i++) {
                    for (let j = arg; j < this.arr.length; j++) {
                        this.arr[j] = this.arr[j + 1];
                    }
                    this.arr.length = this.arr.length - 1;
                }

            }
            if (arguments[2] !== undefined) {
                for (let i = arguments.length - 3; i >= 0; i--) {
                    for (let j = this.arr.length; j > -arguments[0]; j--) {
                        this.arr[j] = this.arr[j - 1];
                    }
                    this.arr[arg] = arguments[i + 2];
                }
            }
        }
        return removedElements;
    }

}

function Node(data) {

    this.data = data;
    this.next = null;
}

function LinkedList() {

    List.apply(this, arguments);
    this._length = 0;
    this.head = null;

    this.push = function (data) {

        let node = new Node(data),
            currentNode = this.head;
        // 1-ый случай: пустой список
        if (!currentNode) {
            this.head = node;
            this._length++;

            return node.data;
        }
        // 2-ой случай: не пустой список
        while (currentNode.next) {
            currentNode = currentNode.next;
        }
        currentNode.next = node;
        this._length++;
        return node.data;
    }

    this.unshift = function (data) {

        let tempNode = this.head;
        this.head = new Node(data);
        this.head.next = tempNode;
        this._length++;
        return this._length;
    }

    this.pop = function () {

        let lastNode = this.head;
        let beforeLastNode = this.head;
        let deleteNode;

        if (this._length == 0) {
            return null;
        }

        if (this._length == 1) {
            deleteNode = this.head;
            this.head = null;
            this._length = 0;
            return deleteNode.data;
        }

        for (let i = 1; i < this._length; i++) {
            lastNode = lastNode.next;
        }
        for (let i = 1; i < this._length - 1; i++) {
            beforeLastNode = beforeLastNode.next;
        }
        beforeLastNode.next = null;
        deleteNode = lastNode;
        lastNode = null;
        this._length--;
        return deleteNode.data;
    }

    this.shift = function () {

        if (this._length == 0) {
            return null;
        }

        let firstNode = this.head;
        this.head = this.head.next;
        let deleteNote = firstNode;
        firstNode = null;
        this._length--;
        return deleteNote.data;
    }

    this.length = function () {

        return this._length;
    }

    this.isArray = function (arg) {

        if (typeof arg[`data`] === 'object' &&
            ('join' in arg[`data`] && typeof arg[`data`].join === 'function') &&
            ('length' in arg[`data`] && typeof arg[`data`].length === 'number')) {
            return true;
        }
        return false;
    }

    this.toString = function () {

        let outStringArr = [];
        let currentNode = this.head;
        for (let i = 0; i < this._length; i++) {
            outStringArr.push(currentNode[`data`]);
            currentNode = currentNode.next;
        }
        return outStringArr.toString();
    }

    this.remove = function (position) {

        var currentNode = this.head,
            length = this._length,
            count = 0,
            message = {
                failure: 'Failure: non-existent node in this list.'
            },
            beforeNodeToDelete = null,
            nodeToDelete = null,
            deletedNode = null;

        // 1-ый случай: неверная позиция
        if (position <= 0 || position > length || position == null || position == undefined) {
            throw new Error(message.failure);
        }

        // 2-ой случай: первый узел удален
        if (position === 1) {
            this.head = currentNode.next;
            deletedNode = currentNode;
            currentNode = null;
            this._length--;

            return deletedNode;
        }

        if (position > 1) {
            for (let i = 1; i < position - 1; i++) {
                currentNode = currentNode.next;
            }

            // 3-ий случай: все другие узлы удалены
            while (count < position) {
                beforeNodeToDelete = currentNode;
                nodeToDelete = currentNode.next;
                count++;
            }

            beforeNodeToDelete.next = nodeToDelete.next;
            deletedNode = nodeToDelete;
            nodeToDelete = null;
            this._length--;

            return deletedNode;
        }
    }

    this.some = function (callback) {

        if (this == null) {
            throw new TypeError('Linked List ==> null');
        }

        if (typeof callback !== 'function') {
            throw new TypeError(`Callback is not function!!!`);
        }

        // let t = Object(this);
        let length = this._length;
        let currentNode = this.head;

        let thisArg = arguments.length >= 2 ? arguments[1] : void 0;

        for (let i = 0; i < length; i++) {
            if (i > 0) {
                currentNode = currentNode.next;
            }

            if (callback.call(thisArg, currentNode, this.indexOf(currentNode.data), this)) {
                return true;
            }
        }

        return false;
    }

    this.every = function (callback) {

        if (this == null) {
            throw new TypeError('Linked List ==> null');
        }

        if (typeof callback !== 'function') {
            throw new TypeError(`Callback is not function!!!`);
        }

        let length = this._length;
        let currentNode = this.head;
        let boolFlag = 0;

        let thisArg = arguments.length >= 2 ? arguments[1] : void 0;

        for (let i = 1; i < length; i++) {

            if (i > 1) {
                currentNode = currentNode.next;
            }

            if (callback.call(thisArg, currentNode, this.indexOf(currentNode.data), this)) {
                boolFlag += 1;
            }

            if (i == length - 1) return true;

            if (boolFlag != i) return false;

        }
        return false;
    }

    this.splice = function () {

        let removedElements = new LinkedList();
        if (this.head === null) {

            if (arguments.length < 3) return removedElements;
            this.head = new Node(arguments[2]);
            let lastEl = this.head;
            this._length = 1;
            for (let i = 3; i < arguments.length; i++) {
                lastEl.next = new Node(arguments[i]);
                lastEl = lastEl.next;
                this._length++;
            }
            return removedElements;
        }
        let elBeforeSeg = this.head;
        let elAfterSeg;
        let startIndex = arguments[0] >= 0 ? arguments[0] : this._length - arguments[0];

        let i = 0;
        while (i < startIndex - 1) {
            elBeforeSeg = elBeforeSeg.next;
            i++;
        }

        if (arguments[0] == 0) {
            elAfterSeg = elBeforeSeg;
        }

        if (arguments[0] > 0) {
            elAfterSeg = elBeforeSeg.next;
        }


        if (startIndex === 0) {
            elBeforeSeg = null;
        }

        i = 0;
        if (arguments[1] > 0) {
            removedElements.head = elAfterSeg;
            let lastEl = elAfterSeg;

            while (i < arguments[1]) {
                if (elAfterSeg === null) {
                    elAfterSeg = new Node();
                    lastEl = elAfterSeg;
                    break;
                };
                lastEl = elAfterSeg;
                removedElements._length++;
                elAfterSeg = elAfterSeg.next;
                this._length--;
                i++;
            }
            lastEl.next = null;
        }

        if (arguments.length < 3) {
            if (elBeforeSeg !== null) {
                elBeforeSeg.next = elAfterSeg;
                return removedElements;
            } else { //нету хэда
                this.head = elAfterSeg;
                return removedElements;
            }
        }

        let firstElSeg = new Node(arguments[2]);
        this._length++;
        if (elBeforeSeg == null) {
            this.head = firstElSeg;
        } else {
            elBeforeSeg.next = firstElSeg;
        }

        let lastElSeg = firstElSeg;

        for (let i = 3; i < arguments.length; i++) {
            lastElSeg.next = new Node(arguments[i]);
            this._length++;
            lastElSeg = lastElSeg.next;
        }
        lastElSeg.next = elAfterSeg;
        return removedElements;
    }

    this.indexOf = function (element) {

        let count = 0;
        let current = this.head;
        let flag = 0;

        // iterae over the list
        while (current != null && flag != 1) {
            // compare each element of the list
            // with given element
            if (JSON.stringify(current.data) === JSON.stringify(element)) {
                flag += 1;
                return count;
            }

            count++;
            current = current.next;
        }

        // not found
        return -1;
    }

    this.insertAt = function (element, index) {

        if (index > 0 && index > this._length)
            return false;
        else {
            // creates a new node
            let node = new Node(element);
            let curr, prev;

            curr = this.head;

            // add the element to the
            // first index
            if (index == 0) {
                node.next = this.head;
                this.head = node;
            } else {
                curr = this.head;
                var it = 0;

                // iterate over the list to find
                // the position to insert
                while (it < index) {
                    it++;
                    prev = curr;
                    curr = curr.next;
                }

                // adding an element
                node.next = curr;
                prev.next = node;
            }
            this._length++;
            return this._length;
        }
    }

    this.searchNodeAt = function (position) {

        let currentNode = this.head,
            length = this._length,
            count = 1,
            message = {
                failure: 'Failure: non-existent node in this list.'
            };

        // 1-ый случай: неверная позиция
        if (length === 0 || position < 1 || position > length) {
            throw new Error(message.failure);
        }

        // 2-ой случай: верная позиция
        while (count < position) {
            currentNode = currentNode.next;
            count++;
        }
        return currentNode;
    }

    this.removeElement = function (element) {

        var current = this.head;
        var prev = null;

        while (current != null) {
            if (JSON.stringify(current.data) === JSON.stringify(element)) {
                if (prev == null) {
                    this.head = current.next;
                } else {
                    prev.next = current.next;
                }
                this._length--;
                return current.data;
            }
            prev = current;
            current = current.next;
        }
        return -1;
    }

    this.toArray = function () {

        let outStringArr = [];
        let currentNode = this.head;
        for (let i = 0; i < this._length; i++) {
            outStringArr.push(currentNode[`data`]);
            currentNode = currentNode.next;
        }
        return outStringArr;
    }

    this.printList = function () {

        let curr = this.head;
        let str = "";
        while (curr) {
            str += curr.data + " / ";
            curr = curr.next;
        }
        return str;
    }

    this.isEmpty = function () {

        if (this._length == 0) {
            return true;
        }
        return false;
    }
}

function ListSecond() {

    List.apply(this, arguments);
}

ListSecond.prototype.sort = function () {};
ListSecond.prototype.toArrayList = function () {};
ListSecond.prototype.toLinkedList = function () {};
ListSecond.prototype.toString = function () {};

function ArrayListSecond() {

    this.arr = [];
}

ArrayListSecond.prototype = Object.create(ListSecond.prototype);
ArrayListSecond.prototype.constructor = ArrayListSecond;

ArrayListSecond.prototype.pop = function () {

    if (this.arr.length === 0) {
        return undefined;
    }
    let lastElement = this.arr[this.arr.length - 1]
    this.arr.length = this.arr.length - 1;
    return lastElement;
}

ArrayListSecond.prototype.push = function () {

    for (let i = 0; i < arguments.length; i++) {
        this.arr[this.arr.length] = arguments[i];
    }
    return this.arr.length;
}

ArrayListSecond.prototype.shift = function () {

    if (this.arr.length === 0) {
        return undefined;
    }
    let firstEl = this.arr[0];
    for (let i = 0; i < this.arr.length; i++) {
        this.arr[i] = this.arr[i + 1];
    }
    this.arr.length = this.arr.length - 1;
    return firstEl;
}

ArrayListSecond.prototype.unshift = function () {

    for (let i = 0; i < arguments.length; i++) {
        for (let j = this.arr.length; j > 0; j--) {
            this.arr[j] = this.arr[j - 1];
        }
        this.arr[0] = arguments[i];
    }
    return this.arr.length;
}

ArrayListSecond.prototype.length = function () {

    let i = -1;
    for (let key in this.arr) {
        i = key;
    }
    return +i + 1;
}

ArrayListSecond.prototype.isArray = function (obj) {

    if (obj.constructor === Array) return true;
    else return false;
}

ArrayListSecond.prototype.remove = function (element) {

    if (this.arr.length - 1 < element) {
        return undefined;
    }
    let removeElement = this.arr[element];
    for (let i = element; this.arr.length > i; i++) {
        this.arr[i] = this.arr[i + 1];
    }
    this.arr.length = this.arr.length - 1;
    return removeElement;
}

ArrayListSecond.prototype.some = function (arr, callback, arg) {

    var i, length = this.arr.length;
    for (i = 0; i < length; i = i + 1) {
        if (callback.call(arg, this.arr[i], i, this.arr)) {
            return true;
        }
    }
    return false;
}

ArrayListSecond.prototype.every = function (arr, callback, arg) {

    var i, length = arr.length;
    for (i = 0; i < length; i = i + 1) {
        if (!callback.call(arg, arr[i], i, arr)) {
            return false;
        }
    }
    return true;
}

ArrayListSecond.prototype.splice = function () {

    let removedElements = [];
    if (arguments[1] === undefined && arguments[0] > 0) {
        let j = 0;
        for (let i = arguments[0]; i < this.arr.length; i++) {
            removedElements[j] = this.arr[i];
            j++;
        }
        this.arr.length = arguments[0];
        return removedElements;
    }
    if (arguments[1] === undefined && arguments[0] < 0) {
        let j = 0;
        for (let i = this.arr.length + arguments[0]; i < this.arr.length; i++) {
            removedElements[j] = this.arr[i];
            j++;
        }
        this.arr.length = this.arr.length + arguments[0];
        return removedElements;
    }
    if (arguments[1] === undefined && arguments[0] === 0) {
        for (let i = 0; i < this.arr.length; i++) {
            removedElements[i] = this.arr[i];
        }
        this.arr.length = 0;
        return removedElements;
    }

    if (arguments[0] >= 0) {
        if (arguments[1] > 0) {
            let k = 0;
            for (let i = arguments[0]; i < arguments[0] + arguments[1]; i++) {
                removedElements[k] = this.arr[i];
                k++;
            }
            for (let i = 0; i < arguments[1]; i++) {
                for (let j = arguments[0]; j < this.arr.length; j++) {
                    this.arr[j] = this.arr[j + 1];
                }
                this.arr.length = this.arr.length - 1;
            }

        }
        if (arguments[2] !== undefined) {
            for (let i = arguments.length - 3; i >= 0; i--) {
                for (let j = this.arr.length; j > arguments[0]; j--) {
                    this.arr[j] = this.arr[j - 1];
                }
                this.arr[arguments[0]] = arguments[i + 2];
            }
        }
    }
    if (arguments[0] < 0) {
        var arg = this.arr.length + arguments[0];
        if (arguments[1] > 0) {
            let k = 0;
            for (let i = arg; i < arg + arguments[1]; i++) {
                removedElements[k] = this.arr[i];
                k++;
            }
            for (let i = 0; i < arguments[1]; i++) {
                for (let j = arg; j < this.arr.length; j++) {
                    this.arr[j] = this.arr[j + 1];
                }
                this.arr.length = this.arr.length - 1;
            }

        }
        if (arguments[2] !== undefined) {
            for (let i = arguments.length - 3; i >= 0; i--) {
                for (let j = this.arr.length; j > -arguments[0]; j--) {
                    this.arr[j] = this.arr[j - 1];
                }
                this.arr[arg] = arguments[i + 2];
            }
        }
    }
    return removedElements;
}

ArrayListSecond.prototype.toArrayList = function () {

    return this.arr;
};

ArrayListSecond.prototype.toLinkedList = function () {

    linkedList = new LinkedListSecond();
    for (let i = 0; i < this.arr.length; i++) {
        linkedList.push(this.arr[i]);
    }
    return linkedList;
};

ArrayListSecond.prototype.toString = function () {

    let strArr = '';
    for (let i = 0; i < this.arr.length; i++) {
        if (typeof (this.arr[i]) === Object) {
            strArr += '[object Object],';
            continue;
        }
        strArr += this.arr[i] + ',';
    }
    strArr = strArr.replace(/,(\s+)?$/, '');
    return strArr
};

ArrayListSecond.prototype.sort = function () {

    let n = this.arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - 1 - i; j++) {
            if (this.arr[j + 1] < this.arr[j]) {
                let t = this.arr[j + 1];
                this.arr[j + 1] = this.arr[j];
                this.arr[j] = t;
            }
        }
    }
    return this.arr;
}

function LinkedListSecond() {

    this._length = 0;
    this.head = null;

}


LinkedListSecond.prototype = Object.create(ListSecond.prototype);
LinkedListSecond.prototype.constructor = LinkedListSecond;

LinkedListSecond.prototype.push = function (data) {

    let node = new Node(data),
        currentNode = this.head;
    // 1-ый случай: пустой список
    if (!currentNode) {
        this.head = node;
        this._length++;

        return node.data;
    }
    // 2-ой случай: не пустой список
    while (currentNode.next) {
        currentNode = currentNode.next;
    }
    currentNode.next = node;
    this._length++;
    return node.data;
}

LinkedListSecond.prototype.unshift = function (data) {

    let tempNode = this.head;
    this.head = new Node(data);
    this.head.next = tempNode;
    this._length++;
    return this._length;
}

LinkedListSecond.prototype.pop = function () {

    let lastNode = this.head;
    let beforeLastNode = this.head;
    let deleteNode;

    if (this._length == 0) {
        return null;
    }

    if (this._length == 1) {
        deleteNode = this.head;
        this.head = null;
        this._length = 0;
        return deleteNode.data;
    }

    for (let i = 1; i < this._length; i++) {
        lastNode = lastNode.next;
    }
    for (let i = 1; i < this._length - 1; i++) {
        beforeLastNode = beforeLastNode.next;
    }
    beforeLastNode.next = null;
    deleteNode = lastNode;
    lastNode = null;
    this._length--;
    return deleteNode.data;
}

LinkedListSecond.prototype.shift = function () {

    if (this._length == 0) {
        return null;
    }

    let firstNode = this.head;
    this.head = this.head.next;
    let deleteNote = firstNode;
    firstNode = null;
    this._length--;
    return deleteNote.data;
}

LinkedListSecond.prototype.length = function () {

    return this._length;
}

LinkedListSecond.prototype.isArray = function (arg) {

    if (typeof arg[`data`] === 'object' &&
        ('join' in arg[`data`] && typeof arg[`data`].join === 'function') &&
        ('length' in arg[`data`] && typeof arg[`data`].length === 'number')) {
        return true;
    }
    return false;
}

LinkedListSecond.prototype.toString = function () {

    let outStringArr = [];
    let currentNode = this.head;
    for (let i = 0; i < this._length; i++) {
        outStringArr.push(currentNode[`data`]);
        currentNode = currentNode.next;
    }
    return outStringArr.toString();
}

LinkedListSecond.prototype.remove = function (position) {

    var currentNode = this.head,
        length = this._length,
        count = 0,
        message = {
            failure: 'Failure: non-existent node in this list.'
        },
        beforeNodeToDelete = null,
        nodeToDelete = null,
        deletedNode = null;

    // 1-ый случай: неверная позиция
    if (position <= 0 || position > length || position == null || position == undefined) {
        throw new Error(message.failure);
    }

    // 2-ой случай: первый узел удален
    if (position === 1) {
        this.head = currentNode.next;
        deletedNode = currentNode;
        currentNode = null;
        this._length--;

        return deletedNode;
    }

    if (position > 1) {
        for (let i = 1; i < position - 1; i++) {
            currentNode = currentNode.next;
        }

        // 3-ий случай: все другие узлы удалены
        while (count < position) {
            beforeNodeToDelete = currentNode;
            nodeToDelete = currentNode.next;
            count++;
        }

        beforeNodeToDelete.next = nodeToDelete.next;
        deletedNode = nodeToDelete;
        nodeToDelete = null;
        this._length--;

        return deletedNode;
    }

}

LinkedListSecond.prototype.some = function (callback) {

    if (this == null) {
        throw new TypeError('Linked List ==> null');
    }

    if (typeof callback !== 'function') {
        throw new TypeError(`Callback is not function!!!`);
    }

    // let t = Object(this);
    let length = this._length;
    let currentNode = this.head;

    let thisArg = arguments.length >= 2 ? arguments[1] : void 0;

    for (let i = 0; i < length; i++) {
        if (i > 0) {
            currentNode = currentNode.next;
        }

        if (callback.call(thisArg, currentNode, this.indexOf(currentNode.data), this)) {
            return true;
        }
    }

    return false;
}

LinkedListSecond.prototype.every = function (callback) {

    if (this == null) {
        throw new TypeError('Linked List ==> null');
    }

    if (typeof callback !== 'function') {
        throw new TypeError(`Callback is not function!!!`);
    }

    let length = this._length;
    let currentNode = this.head;
    let boolFlag = 0;

    let thisArg = arguments.length >= 2 ? arguments[1] : void 0;

    for (let i = 1; i < length; i++) {

        if (i > 1) {
            currentNode = currentNode.next;
        }

        if (callback.call(thisArg, currentNode, this.indexOf(currentNode.data), this)) {
            boolFlag += 1;
        }

        if (i == length - 1) return true;

        if (boolFlag != i) return false;

    }
    return false;
}

LinkedListSecond.prototype.splice = function () {

    let removedElements = new LinkedList();
    if (this.head === null) {

        if (arguments.length < 3) return removedElements;
        this.head = new Node(arguments[2]);
        let lastEl = this.head;
        this._length = 1;
        for (let i = 3; i < arguments.length; i++) {
            lastEl.next = new Node(arguments[i]);
            lastEl = lastEl.next;
            this._length++;
        }
        return removedElements;
    }
    let elBeforeSeg = this.head;
    let elAfterSeg;
    let startIndex = arguments[0] >= 0 ? arguments[0] : this._length - arguments[0];

    let i = 0;
    while (i < startIndex - 1) {
        elBeforeSeg = elBeforeSeg.next;
        i++;
    }

    if (arguments[0] == 0) {
        elAfterSeg = elBeforeSeg;
    }

    if (arguments[0] > 0) {
        elAfterSeg = elBeforeSeg.next;
    }


    if (startIndex === 0) {
        elBeforeSeg = null;
    }

    i = 0;
    if (arguments[1] > 0) {
        removedElements.head = elAfterSeg;
        let lastEl = elAfterSeg;

        while (i < arguments[1]) {
            if (elAfterSeg === null) {
                elAfterSeg = new Node();
                lastEl = elAfterSeg;
                break;
            };
            lastEl = elAfterSeg;
            removedElements._length++;
            elAfterSeg = elAfterSeg.next;
            this._length--;
            i++;
        }
        lastEl.next = null;
    }

    if (arguments.length < 3) {
        if (elBeforeSeg !== null) {
            elBeforeSeg.next = elAfterSeg;
            return removedElements;
        } else { //нету хэда
            this.head = elAfterSeg;
            return removedElements;
        }
    }

    let firstElSeg = new Node(arguments[2]);
    this._length++;
    if (elBeforeSeg == null) {
        this.head = firstElSeg;
    } else {
        elBeforeSeg.next = firstElSeg;
    }

    let lastElSeg = firstElSeg;

    for (let i = 3; i < arguments.length; i++) {
        lastElSeg.next = new Node(arguments[i]);
        this._length++;
        lastElSeg = lastElSeg.next;
    }
    lastElSeg.next = elAfterSeg;
    return removedElements;
}

LinkedListSecond.prototype.indexOf = function (element) {

    let count = 0;
    let current = this.head;
    let flag = 0;

    // iterae over the list
    while (current != null && flag != 1) {
        // compare each element of the list
        // with given element
        if (JSON.stringify(current.data) === JSON.stringify(element)) {
            flag += 1;
            return count;
        }

        count++;
        current = current.next;
    }

    // not found
    return -1;
}

LinkedListSecond.prototype.insertAt = function (element, index) {

    if (index > 0 && index > this._length)
        return false;
    else {
        // creates a new node
        let node = new Node(element);
        let curr, prev;

        curr = this.head;

        // add the element to the
        // first index
        if (index == 0) {
            node.next = this.head;
            this.head = node;
        } else {
            curr = this.head;
            var it = 0;

            // iterate over the list to find
            // the position to insert
            while (it < index) {
                it++;
                prev = curr;
                curr = curr.next;
            }

            // adding an element
            node.next = curr;
            prev.next = node;
        }
        this._length++;
        return this._length;
    }
}

LinkedListSecond.prototype.searchNodeAt = function (position) {

    let currentNode = this.head,
        length = this._length,
        count = 1,
        message = {
            failure: 'Failure: non-existent node in this list.'
        };

    // 1-ый случай: неверная позиция
    if (length === 0 || position < 1 || position > length) {
        throw new Error(message.failure);
    }

    // 2-ой случай: верная позиция
    while (count < position) {
        currentNode = currentNode.next;
        count++;
    }
    return currentNode;
}

LinkedListSecond.prototype.removeElement = function (element) {

    var current = this.head;
    var prev = null;

    // iterate over the list
    while (current != null) {
        // comparing element with current
        // element if found then remove the
        // and return true
        if (JSON.stringify(current.data) === JSON.stringify(element)) {
            if (prev == null) {
                this.head = current.next;
            } else {
                prev.next = current.next;
            }
            this._length--;
            return current.data;
        }
        prev = current;
        current = current.next;
    }
    return -1;
}

LinkedListSecond.prototype.toArray = function () {

    let outStringArr = [];
    let currentNode = this.head;
    for (let i = 0; i < this._length; i++) {
        outStringArr.push(currentNode[`data`]);
        currentNode = currentNode.next;
    }
    return outStringArr;
}

LinkedListSecond.prototype.printList = function () {

    let curr = this.head;
    let str = "";
    while (curr) {
        str += curr.data + " / ";
        curr = curr.next;
    }
    return str;
}

LinkedListSecond.prototype.isEmpty = function () {

    if (this._length == 0) {
        return true;
    }
    return false;
}

LinkedListSecond.prototype.toLinkedList = function () {

    return this;
}

LinkedListSecond.prototype.sort = function () {

    let result = [];
    let item = this.head;
    const sortedSinglyList = new LinkedListSecond();


    while (item) {
        if (!result.length) {
            result.push(item.data);
        } else {
            // Find location to insert.
            let isInserted = false;

            for (let i = 0; i < result.length; i++) {
                if (item.data < result[i]) {
                    result.splice(i, 0, item.data);

                    isInserted = true;
                    break;
                } else if (i == result.length - 1) {
                    // Last item and nothing is smaller, so add it to the end.
                    result.push(item.data);
                    break;
                }
            }
        }

        item = item.next;
    }
    for (let i = 0; i < result.length; i++) {
        sortedSinglyList.push(result[i]);
    }
    return sortedSinglyList;
};
