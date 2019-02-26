describe('BSTree Entry', () => {
    const testData = [{
        expected: `value`
    }, {
        expected: `left`
    }, {
        expected: `right`
    }, {
        expected: `parent`
    }, {
        expected: `toString`
    }];
    testData.forEach(function (data) {
        const {
            expected
        } = data;
        let entry = new Entry();
        it(`should return True, when BSTree Entry has ${expected} prop/method`, function () {
            const actual = expected in entry;
            assert.deepEqual(actual, true);
        });
    });
});

describe('Binary search tree constructor', () => {
    const testData = [{
        expected: `root`
    }, {
        expected: `empty`
    }, {
        expected: `toArray`
    }, {
        expected: `toString`
    }, {
        expected: `toLinkedList`
    }, {
        expected: `insert`
    }, {
        expected: `remove`
    }, {
        expected: `find`
    }];
    testData.forEach(function (data) {
        const {
            expected
        } = data;
        let bSTree = new BinaryTree();
        it(`should return True, when Binary search tree has ${expected} prop/method`, function () {
            const actual = expected in bSTree;
            assert.deepEqual(actual, true);
        });
    });
});

describe('Binary search tree methods', () => {
    describe('Binary search tree -> Empty method', () => {
        it('shoud be null of mockTree', () => {

            let mockTree = new BinaryTree();
            mockTree.insert(8);
            mockTree.insert(10);
            mockTree.insert(14);
            mockTree.insert(13);
            mockTree.insert(3);
            mockTree.insert(6);
            mockTree.insert(4);
            mockTree.insert(7);
            mockTree.insert(1);
            mockTree.insert(5);
            mockTree.empty();
            assert.deepEqual(mockTree, new BinaryTree());
        });

        it('shoud be root == null of mockTree', () => {

            let mockTree = new BinaryTree();
            mockTree.insert(8);
            mockTree.insert(10);
            mockTree.insert(14);
            mockTree.insert(13);
            mockTree.insert(3);
            mockTree.insert(6);
            mockTree.insert(4);
            mockTree.insert(7);
            mockTree.insert(1);
            mockTree.insert(5);
            mockTree.empty();
            assert.deepEqual(mockTree.root, null);
        });
    });

    describe('Binary search tree -> ToArray method', () => {
        it('shoud return new sorted array of mockTree --> ["A", "C", undefined, null, 1, 3, 4, 5, 6, 7, 8, 10, 13, 14]', () => {

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

            let mockArr = ["A", "C", undefined, null, 1, 3, 4, 5, 6, 7, 8, 10, 13, 14];
            const actual = mockTree.toArray();
            assert.deepEqual(actual, mockArr);
        });
    });

    describe('Binary search tree -> ToString method', () => {
        it('shoud return new string (sorted) of mockTree --> A, C, undefined, null, 1, 3, 4, 5, 6, 7, 8, 10, 13, 14', () => {

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

            let mockStr = 'A, C, undefined, null, 1, 3, 4, 5, 6, 7, 8, 10, 13, 14';
            const actual = mockTree.toString();
            assert.deepEqual(actual, mockStr);
        });
    });

    describe('Binary search tree -> ToLinkedList method', () => {
        it('shoud return new LinkedList (sorted) of mockTree', () => {

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

            let mockLinkedList = new LinkedListSecond();
            mockLinkedList.push("A");
            mockLinkedList.push("C");
            mockLinkedList.push(undefined);
            mockLinkedList.push(null);
            mockLinkedList.push(1);
            mockLinkedList.push(3);
            mockLinkedList.push(4);
            mockLinkedList.push(5);
            mockLinkedList.push(6);
            mockLinkedList.push(7);
            mockLinkedList.push(8);
            mockLinkedList.push(10);
            mockLinkedList.push(13);
            mockLinkedList.push(14);

            const actual = JSON.stringify(mockTree.toLinkedList());
            assert.strictEqual(actual, JSON.stringify(mockLinkedList));
        });
    });

    describe('Binary search tree -> Insert method', () => {
        const testData = [{
            value: 8,
            expected: [8]
        }, {
            value: 10,
            expected: [8, 10]
        }, {
            value: 14,
            expected: [8, 10, 14]
        }, {
            value: 13,
            expected: [8, 10, 13, 14]
        }, {
            value: 3,
            expected: [3, 8, 10, 13, 14]
        }, {
            value: 6,
            expected: [3, 6, 8, 10, 13, 14]
        }, {
            value: null,
            expected: [null, 3, 6, 8, 10, 13, 14]
        }, {
            value: 4,
            expected: [null, 3, 4, 6, 8, 10, 13, 14]
        }, {
            value: 7,
            expected: [null, 3, 4, 6, 7, 8, 10, 13, 14]
        }, {
            value: undefined,
            expected: [undefined, null, 3, 4, 6, 7, 8, 10, 13, 14]
        }, {
            value: 1,
            expected: [undefined, null, 1, 3, 4, 6, 7, 8, 10, 13, 14]
        }, {
            value: 5,
            expected: [undefined, null, 1, 3, 4, 5, 6, 7, 8, 10, 13, 14]
        }, {
            value: 'A',
            expected: ['A', undefined, null, 1, 3, 4, 5, 6, 7, 8, 10, 13, 14]
        }, {
            value: 'C',
            expected: ['A', 'C', undefined, null, 1, 3, 4, 5, 6, 7, 8, 10, 13, 14]
        }, {
            value: {
                name: 'Oleg',
                age: 45
            },
            expected: ['A', 'C', {
                name: 'Oleg',
                age: 45
            }, undefined, null, 1, 3, 4, 5, 6, 7, 8, 10, 13, 14]
        }, ];

        let mockTree = new BinaryTree();
        testData.forEach(function (data) {

            const {
                value,
                expected
            } = data;
            it(`shoud insert element = ${value} in Binary Search Tree`, () => {
                let outStr = [];
                mockTree.insert(value);
                outStr = mockTree.toArray();
                assert.deepEqual(outStr, expected);
            });
        });
    });

    describe('Binary search tree -> Find method', () => {
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
            it(`shoud find element = ${value} in Binary Search Tree and return Entry`, () => {

                const actual = JSON.stringify(mockTree.find(value).toString());
                assert.strictEqual(actual, JSON.stringify(expected.toString()));
            });
        });
    });


    describe('Binary search tree -> Remove method', () => {
        describe('Remove node', () => {
            var treeEx = new BinaryTree();
            before(function () {

                let A = new Entry(8);

                let B1 = new Entry(6);
                let B2 = new Entry(10);

                let C1 = new Entry(4);
                let C2 = new Entry(7);

                let C3 = new Entry(9);

                treeEx.root = A;

                A.left = B1;
                A.right = B2;
                B1.parent = A;
                B2.parent = A;

                B1.left = C1;
                B1.right = C2;
                C1.parent = B1;
                C2.parent = B1;

                B2.left = C3;
                C3.parent = B2;

            });
            it('delete node with value 11 without tail', function () {
                tree = new BinaryTree();
                tree.insert(8);

                tree.insert(6);
                tree.insert(10);

                tree.insert(4);
                tree.insert(7);
                tree.insert(9);
                tree.insert(11);
                tree.remove(11);
                var s1 = JSON.stringify(tree, function (key, value) {
                    if (key === 'parent') {
                        return undefined; // удаляем все parent-ы
                    }
                    return value;
                });


                var s2 = JSON.stringify(treeEx, function (key, value) {
                    if (key === 'parent') {
                        return undefined; // удаляем все parent-ы
                    }
                    return value;
                });

                assert.equal(s1, s2);
            });
        });
        describe('Remove node', () => {
            var treeEx = new BinaryTree();
            before(function () {

                let A = new Entry(8);

                let B1 = new Entry(6);
                let B2 = new Entry(10);

                let C1 = new Entry(5);
                let C2 = new Entry(7);

                let C3 = new Entry(9);
                let C4 = new Entry(11);

                treeEx.root = A;

                A.left = B1;
                A.right = B2;
                B1.parent = A;
                B2.parent = A;

                B1.left = C1;
                B1.right = C2;
                C1.parent = B1;
                C2.parent = B1;

                B2.left = C3;
                B2.right = C4;
                C3.parent = B2;
                C4.parent = B2;

            });
            it('delete left parent\'s node with right tail', function () {
                tree = new BinaryTree();
                tree.insert(8);

                tree.insert(6);
                tree.insert(10);

                tree.insert(4);
                tree.insert(7);
                tree.insert(9);
                tree.insert(11);
                tree.insert(5);
                tree.remove(4);
                var s1 = JSON.stringify(tree, function (key, value) {
                    if (key === 'parent') {
                        return undefined; // удаляем все parent-ы
                    }
                    return value;
                });


                var s2 = JSON.stringify(treeEx, function (key, value) {
                    if (key === 'parent') {
                        return undefined; // удаляем все parent-ы
                    }
                    return value;
                });

                assert.equal(s1, s2);
            });
        });
        describe('Remove node', () => {
            var treeEx = new BinaryTree();
            before(function () {

                let A = new Entry(8);

                let B1 = new Entry(7);
                let B2 = new Entry(10);

                let C1 = new Entry(4);

                let C3 = new Entry(9);
                let C4 = new Entry(11);

                treeEx.root = A;

                A.left = B1;
                A.right = B2;
                B1.parent = A;
                B2.parent = A;

                B1.left = C1;
                C1.parent = B1;

                B2.left = C3;
                B2.right = C4;
                C3.parent = B2;
                C4.parent = B2;

            });
            it('delete node with right kid', function () {
                tree = new BinaryTree();
                tree.insert(8);

                tree.insert(6);
                tree.insert(10);

                tree.insert(4);
                tree.insert(7);
                tree.insert(9);
                tree.insert(11);
                //tree.insert(3);
                tree.remove(6);
                var s1 = JSON.stringify(tree, function (key, value) {
                    if (key === 'parent') {
                        return undefined; // удаляем все parent-ы
                    }
                    return value;
                });


                var s2 = JSON.stringify(treeEx, function (key, value) {
                    if (key === 'parent') {
                        return undefined; // удаляем все parent-ы
                    }
                    return value;
                });

                assert.equal(s1, s2);
            });
        });
        describe('Remove node', () => {
            var treeEx = new BinaryTree();
            before(function () {

                let A = new Entry(8);

                let B1 = new Entry(6);
                let B2 = new Entry(11);

                let C1 = new Entry(4);
                let C2 = new Entry(7);

                let C3 = new Entry(9);

                treeEx.root = A;

                A.left = B1;
                A.right = B2;
                B1.parent = A;
                B2.parent = A;

                B1.left = C1;
                B1.right = C2;
                C1.parent = B1;
                C2.parent = B1;

                B2.left = C3;
                //B2.right = C4;
                C3.parent = B2;
                //C4.parent = B2;

            });
            it('delete node with right and left kids', function () {
                tree = new BinaryTree();
                tree.insert(8);

                tree.insert(6);
                tree.insert(10);

                tree.insert(4);
                tree.insert(7);
                tree.insert(9);
                tree.insert(11);
                tree.remove(10);
                var s1 = JSON.stringify(tree, function (key, value) {
                    if (key === 'parent') {
                        return undefined; // удаляем все parent-ы
                    }
                    return value;
                });


                var s2 = JSON.stringify(treeEx, function (key, value) {
                    if (key === 'parent') {
                        return undefined; // удаляем все parent-ы
                    }
                    return value;
                });

                assert.equal(s1, s2);
            });

        });
        describe('Remove node', () => {
            var treeEx = new BinaryTree();
            before(function () {

                let A = new Entry(8);

                let B1 = new Entry(6);
                let B2 = new Entry(11);

                let C1 = new Entry(4);
                let C2 = new Entry(7);

                let C3 = new Entry(9);
                let C4 = new Entry(13);

                treeEx.root = A;

                A.left = B1;
                A.right = B2;
                B1.parent = A;
                B2.parent = A;

                B1.left = C1;
                B1.right = C2;
                C1.parent = B1;
                C2.parent = B1;

                B2.left = C3;
                B2.right = C4;
                C3.parent = B2;
                C4.parent = B2;

            });
            it('delete node with left kid and right kid with tail', function () {
                tree = new BinaryTree();
                tree.insert(8);

                tree.insert(6);
                tree.insert(10);

                tree.insert(4);
                tree.insert(7);
                tree.insert(9);
                tree.insert(11);
                tree.insert(13);
                tree.remove(10);
                var s1 = JSON.stringify(tree, function (key, value) {
                    if (key === 'parent') {
                        return undefined; // удаляем все parent-ы
                    }
                    return value;
                });


                var s2 = JSON.stringify(treeEx, function (key, value) {
                    if (key === 'parent') {
                        return undefined; // удаляем все parent-ы
                    }
                    return value;
                });

                assert.equal(s1, s2);
            });

        });
        describe('Remove node', () => {
            var treeEx = new BinaryTree();
            before(function () {

                let A = new Entry(8);

                let B1 = new Entry(6);
                let B2 = new Entry(11);

                let C1 = new Entry(4);
                let C2 = new Entry(7);

                let C3 = new Entry(9);
                let C4 = new Entry(13);

                let D1 = new Entry(14);

                treeEx.root = A;

                A.left = B1;
                A.right = B2;
                B1.parent = A;
                B2.parent = A;

                B1.left = C1;
                B1.right = C2;
                C1.parent = B1;
                C2.parent = B1;

                B2.left = C3;
                B2.right = C4;
                C3.parent = B2;
                C4.parent = B2;
                C4.right = D1;
                D1.parent = C4;

            });
            it('delete node with left kid and right kid with long tail', function () {
                tree = new BinaryTree();
                tree.insert(8);

                tree.insert(6);
                tree.insert(10);

                tree.insert(4);
                tree.insert(7);
                tree.insert(9);
                tree.insert(11);
                tree.insert(13);
                tree.insert(14);
                tree.remove(10);
                var s1 = JSON.stringify(tree, function (key, value) {
                    if (key === 'parent') {
                        return undefined; // удаляем все parent-ы
                    }
                    return value;
                });


                var s2 = JSON.stringify(treeEx, function (key, value) {
                    if (key === 'parent') {
                        return undefined; // удаляем все parent-ы
                    }
                    return value;
                });

                assert.equal(s1, s2);
            });

        });
        describe('Remove node', () => {
            var treeEx = new BinaryTree();
            before(function () {

                let A = new Entry(6);

                let B1 = new Entry(4);
                let B2 = new Entry(7);

                let C1 = new Entry(4);
                let C2 = new Entry(7);

                let D1 = new Entry(10);

                let E2 = new Entry(9);
                let E3 = new Entry(11);

                treeEx.root = A;

                A.left = B1;
                A.right = B2;
                B1.parent = A;
                B2.parent = A;


                B2.right = D1;
                D1.parent = B2;

                D1.right = E3;
                D1.left = E2;

                E3.parent = D1;
                E2.parent = D1;

            });
            it('delete head of tree', function () {
                tree = new BinaryTree();
                tree.insert(8);

                tree.insert(6);
                tree.insert(10);

                tree.insert(4);
                tree.insert(7);
                tree.insert(9);
                tree.insert(11);

                tree.remove(8);
                var s1 = JSON.stringify(tree, function (key, value) {
                    if (key === 'parent') {
                        return undefined; // удаляем все parent-ы
                    }
                    return value;
                });


                var s2 = JSON.stringify(treeEx, function (key, value) {
                    if (key === 'parent') {
                        return undefined; // удаляем все parent-ы
                    }
                    return value;
                });

                assert.equal(s1, s2);
            });

        });
    });
});
