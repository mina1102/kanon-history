// The paper's graph example, shown when there is no saved editor content.
__$__.defaultCode = `class Node {
    constructor() {
        this.next1 = null;
        this.next2 = null;
        this.next3 = null;
        this.__mark = false;
    }

    // 新しく構築したグラフに対して1回呼び出す。
    countReachableNodes_current() {
        this.__mark = true;
        let queue = [this];
        let count = 0;

        while (queue.length > 0) {
            let current = queue.shift();
            count += 1;

            for (let i = 0; i < 3; i++) {
                // iが0, 1, 2の順に、next1, next2, next3を調べる。
                let next = current["next" + (i + 1)];
                if (next != null && !next.__mark) {
                    next.__mark = true;
                    queue.push(next);
                }
            }
        }

        return count;
    }
    
    countReachableNodes_error() {
        this.__mark = true;
        let queue = [this];
        let count = 0;

        while (queue.length > 0) {
            let current = queue.shift();
            count += 1;

            for (let i = 0; i < 3; i++) {
                // iが0, 1, 2の順に、next1, next2, next3を調べる。
                let next = current["next" + (i + 1)];
                if (next != null) {
                    next.__mark = true;
                    queue.push(next);
                }
            }
        }

        return count;
    }
}



// 8ノードの有向グラフを構築する。
function createGraph() {
    let root = new Node();

    // 左端から3方向へ分岐。
    root.next1 = new Node();
    root.next2 = new Node();
    root.next3 = new Node();

    // 上側と中央を接続。
    root.next1.next1 = new Node();
    root.next1.next2 = root.next2;

    // 中央から2方向へ分岐。
    root.next2.next1 = new Node();
    root.next2.next2 = new Node();

    // 下側から中央下へ合流。
    root.next3.next1 = root.next2.next2;

    // 右端のノードを作成。
    root.next1.next1.next1 = new Node();

    // 右側で参照を合流。
    root.next2.next1.next1 = root.next1.next1;
    root.next2.next1.next2 = root.next1.next1.next1;
    root.next2.next2.next1 = root.next1.next1.next1;

    return root;
}

let result = createGraph().countReachableNodes_error();
`;
