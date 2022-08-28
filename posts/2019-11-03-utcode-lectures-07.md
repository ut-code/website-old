---
title: "ut.code(); 学習カリキュラム #7"
date: "2019-11-03"
categories: 
  - "internal"
---

前回の記事はだいぶ抽象的な内容が多く辛かったかと思いますが、今回からはまた具体的な内容に入っていきます。

## JavaScriptの高度な文法

### オブジェクト

JavaScriptにおいて、「名前」＋「値」の形のデータ構造を定義することができます。以下の例を見てください。

```
const student1 = {
    name: "田中",
    age: 19,
    favorite: ["orange", "lemon", "melon"]
};
document.write(student1.favorite[1]);
document.write(student1["age"]);
```

{キー名: 値, ...}の構文を使用すると、JavaScriptにおけるオブジェクトが生成されます（ここでいうオブジェクトとは、紛らわしいですがオブジェクト指向のオブジェクトとは若干異なるものです）。ドット演算子を使用すると、オブジェクト内部に保持される値を参照できます。

7行目のように、ドット演算子の代わりにブラケット記号を用いると、文字列を介して値にアクセスすることができます。この表法は可読性が低いため常用すべきではないですが、キー名が変数によって動的に変化する場合に有用です。

### ラムダ式

変数の中に入れることができるのは、何も数値や文字列だけではありません。例えば、関数自体も変数の中に格納することができます。以下の例を見てください。

```
function add(a, b) {
    return a + b;
}
const add2 = add;
document.write(add2(3, 4));
```

以下の例では、自分で定義したadd関数を、add2という変数に代入し、add2を経由してadd関数を実行しています。JavaScriptにおいて、関数は一般的な変数と何ら変わりはありません。したがって、以下のようなコードも有効です。

```
function writeHello() {
    document.write("Hello");
}
function doSomething(callback) {
    callback();
}
doSomething(writeHello);
```

この例では、doSomething関数の引数としてwriteHello関数を渡しています。doSomething関数の内部では、writeHello関数がcallbackという名前で渡ってくるので、この変数callbackを使用して間接的にwriteHello関数を実行しています。

関数をこのような形で利用する場合、わざわざwriteHelloのように、関数に名前をつけることが煩わしくなってきます（**無名関数**）。無名関数を定義するためには、**ラムダ式**を使用することができます。以下のコードを見てみましょう。

```
function doSomething(callback) {
    callback();
}
doSomething(() => {
    document.write("Hello");
});
```

doSomething関数を呼び出す際の引数として使用されている部分がラムダ式です。ラムダ式は、

(引数1, 引数2, ...) => { 処理1; 処理2; ... }

の形式で記述できます。先ほどの例は、writeHelloを別途定義した場合と全く同じ結果となります。

JavaScriptのラムダ式（と言いつつこれは様々な言語で共通です）では、引数が１つだけの場合、前半のカッコが省略できます。同様に、処理が一つだけで、かつそれがreturn文の場合、後半の波括弧が省略できます。このような省略記法を最大限利用した例を以下に示します。

```
const numbers = [1, 3, 6, 8];
const doubledNumber = numbers.map(v => v * 2);
```

doubledNumberの中身は\[2, 6, 12, 16\]です。どういうことでしょうか。実は、上記の例において、

```
v => v * 2
```

は、引数を１つ取って２倍して返す関数になっています。さらに、JavaScriptの配列はArrayクラスのインスタンスで、Arrayクラスは[mapメソッド](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/map)を持ちます。mapメソッドは、呼び出し可能な関数１つを引数にとり、配列の各要素に対してその関数を実行し、その結果からなる新しい配列を返します。理解を深めるためにmap関数を独自で実装する場合、以下のようなコードになるでしょう。

```
function map(array, callback) {
    const result = [];
    for (const item of array) {
        result.push(callback(item));
    }
    return result;
}
```

上のコードにより作成したmap関数を用いて、先ほどの例を書き直すと、以下のようになります。

```
const numbers = [1, 3, 6, 8];
const doubledNumber = map(numbers, v => v * 2);
```

### クロージャ

注: 発展的な内容です。余裕がない場合は飛ばしていただいても支障はありません。

ラムダ式を使用して無名関数を定義した際、無名関数の中から見える変数は無名関数に束縛されます。以下の例を見てください。

```
function createCounter() {
    let count = 0;
    return () => {
        count += 1;
        return count;
    };
}
const counter1 = createCounter();
document.write(counter1());
document.write(counter1());
const counter2 = createCounter();
document.write(counter2());
```

上の例において、createCounter関数は関数を返す関数です。この関数の戻り値の関数の中からは、count変数が見えています。本来であれば、createCounter関数が終了した時点で、定義されていたcount変数は破棄されるはずだったのですが、count変数は返り値の無名関数の中からアクセス可能で、かつその無名関数が呼び出し元で保存されているため、count変数が生き続けています。このように、関数がその中から見える変数等（環境）を内部に閉じ込める仕組みを**クロージャ**と呼びます。

なお、counter1から見えるcount変数と、counter2から見えるcount変数は別物です。これは、createCounter関数が実行されるたびに、let文により新しくcount変数が生成されているためです。

## 演習問題

- \[オブジェクト\] student1のfavoriteのすべての要素を出力するプログラムを作成してください。
- \[ラムダ式\]\[やや難\] Arrayクラスのreduceメソッドとラムダ式を使用して、配列のすべての要素の合計値を求めるプログラムを作成してください。
- \[クロージャ\]\[難\] サンプルプログラムのcreateCounter関数を改変し、以下のコードが動作するようにしてください。
    - ヒント: createCounter関数は、キーとしてnextとresetを持つオブジェクトを返す関数です。それぞれにラムダ式を用いて無名関数を格納し、count変数をクロージャに囲い込みましょう。

```
const counter = createCounter();
document.write(counter.next()); // 1
document.write(counter.next()); // 2
counter.reset();
document.write(counter.next()); // 1
```
