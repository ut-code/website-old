---
title: "ut.code(); 学習カリキュラム #15"
date: "2020-02-16"
categories: 
  - "internal"
---

今回は、昨今のフロントエンド開発の人気ライブラリReactを用いて開発する手法を学びます。

## UI開発のブレイクスルー

ヒトが操作することを想定したUIを開発することには、昔から大きな苦労が付き纏いました。ユーザーはどのような操作を行うか予測できないため、複雑な状態管理が必要だからです。単純なカウンターアプリを作ることを考えてみましょう。

```
<div id="counter">0</div>
<button id="minus">−</button>
<button id="reset">リセット</button>
<button id="plus">＋</button>
<script src="script.js"></script>
```

```
let count = 0;

const counter = document.getElementById("counter");
document.getElementById("minus").onclick = () => {
    count -= 1;
    counter.textContent = count;
};
document.getElementById("reset").onclick = () => {
    count = 0;
    counter.textContent = count;
};
document.getElementById("plus").onclick = () => {
    count += 1;
    counter.textContent = count;
};
```

このコードの問題点は、ボタンのイベントリスナーの中で表示部分の更新を行っていることです。6行目、10行目、14行目で表示部分の更新が行われており、コードの見栄えが悪いですね。また、表示部分が増えたとき、変更の漏れが生じてバグの原因が増えそうです。

そこで、状態変数を用意し、それだけを見て表示部分を更新する関数を作るという手法がよくとられます。

```
let count = 0;
const counter = document.getElementById("counter");
function update() {
    counter.textContent = count;
}

document.getElementById("minus").onclick = () => {
    count -= 1;
    update();
};
document.getElementById("reset").onclick = () => {
    count = 0;
    update();
};
document.getElementById("plus").onclick = () => {
    count += 1;
    update();
};
```

このようなコードにしておくことにより、「状態変数（この場合はcount）を更新したらupdate関数を呼び出す」とだけ記憶しておけば、表示の更新し忘れを防止することができます。

UIの更新部分を抽象化することで、コードの見通しが良くなることは間違いありません。しかしながら、状態変数に合わせてUIを更新するコードは、実装方法によっては様々な問題を引き起こします。そのうちの一つが、パフォーマンスに関する問題です。例えば、配列型の状態変数があり、その一つ一つが<li>要素にマッピングされる場合を考えてみましょう。

```
const todos = [];
const container = document.querySelector("ul.todolist");

function update() {
    container.innerHTML = "";
    for (const todo of todos) {
        const item = document.createElement("li");
        item.textContent = todo;
        container.appendChild(item);
    }
}

function addTodo(todo) {
    todos.push(todo);
    update();
}
function sortTodo() {
    todos.sort();
    update();
}
```

状態変数はtodos、状態変数の反映のための関数がupdateです。addTodoやsortTodoはUIから呼び出されることを想定しています。document.createElementは新しいHTML要素を生成するためのメソッドです。

一見シンプルで良さそうなのですが、update関数に致命的な問題があります。それは、update関数は実行されるたびにDOMを完全に置き換えてしまう点です。例えばaddTodo関数により、100件の登録された既存のTodoに対し、１件追加するだけで、それまでのDOM構造を再構築してしまうといった問題が起こるでしょう。理想を言えば、新しく追加した１件だけをレンダリングして欲しいところですね。

## Reactの導入

Reactは、Facebook社が開発したライブラリで、複雑化しがちなUIの更新処理を自動で、かつ高速に処理することに特化しています。以前のWeb開発では考えられなかった新たな概念を大量に導入することにより、大規模なUI開発を効率的に行えるようにしました。

Reactを利用するには、まずプロジェクトにnpmでreact、react-domパッケージを導入します。Parcelも利用するので導入しておきましょう。

```
<div id="main"></div>
<script src="script.jsx"></script>
```

```
const React = require("react");
const ReactDOM = require("react-dom");

ReactDOM.render(
    <div>Hello React</div>,
    document.getElementById("main")
);
```

Reactを使用するプロジェクトのJavaScriptファイルは、通常拡張子がjsではなくjsxとなります。その理由はscript.jsxの5行目を見ると分かります。JavaScriptファイルの中なのにも関わらず謎のHTMLタグが出現していますね。この記法を**JSX**と呼びます。

Reactでは、DOM構造を**仮想DOM**と呼ばれるJavaScriptオブジェクトにより管理します。JavaScriptのDOMインターフェース（getElementById、createElementなど）は、ブラウザでの描画を伴うため非常にコストの高い処理となります。そこでReactでは、DOM構造を一旦プレーンなJavaScriptオブジェクトとして管理することにより、まずDOM構造の差分を仮想DOMの状態で高速に計算した上で、実際にブラウザに描画しています。

6行目の

```
<div>Hello React</div>
```

は、トランスパイラの中で

```
React.createElement("div", null, "Hello React")
```

に変換されます。このコードは、Reactに仮想DOMの生成を指示するためのコードとなっており、ReactDOM.renderメソッドにより実際のDOMに反映させることができます。ReactDOM.renderメソッドの第二引数は仮想DOMをレンダリングするコンテナとなるHTML要素を指定します。

## カスタムコンポーネントを生成する

Reactでは、React.Componentクラスを継承したクラスをカスタムコンポーネントとして利用することができます。renderメソッドで、そのコンポーネントの内容を定義することができます。

```
class MyComponent extends React.Component {
    render() {
        return <div>Hello React components</div>;
    }
}

ReactDOM.render(
    <MyComponent />,
    document.getElementById("main")
);
```

1〜4行目で、React.Componentクラスを定義しています。renderメソッドを実装し、適切な仮想DOMを返却するようにしておくと、そのクラス名をあたかもタグのように扱うことができます。8行目では、最初に定義したMyComponentクラスを早速HTMLタグとして使用しています。なお、HTMLでは、<Tag />と記述することで、中身のないタグの開始タグと終了タグを同時に記述することができます。HTMLではinputタグなど、終了タグを必要としないタグがありましたが、JSXでは全てのタグは終了タグを持つ必要があります。このため、<Tag />などの省略記法がよく使われます。

## カスタムコンポーネントへのデータの埋め込み

JSX記法は一見奇妙な記法ではあるのですが、結局のところトランスパイラにより適当なメソッド（ReactであればReact.createElement）の呼び出しへと変換されます。トランスパイラが出力したコードを一度眺めてみると良いでしょう。したがって、JSXの中には全てのJavaScriptとして有効な式を記述することができます。JSXの中に式を記述するためには、波かっこを使用します。

```
<div>{1 + 2}</div>
<input
    type="text"
    placeholder={
        navigator.language.includes("ja") ?
            "ここに入力してください。" :
            "Please input here."
    }
/>
```

1行目の例は比較的分かりやすい例で、divタグの中身を波かっこにすることで、JavaScriptの計算式が計算できるようになっています。2行目以降の例はHTML要素の属性をJavaScript式にする例です。通常、HTML要素の属性にはダブルクォーテーションを利用しますが、式を指定する場合は波かっこを使用します。今回カッコ内で使用されているのは[三項演算子](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)と呼ばれる演算子で、JSXで頻繁に登場します。

カスタムコンポーネントに属性を適用すると、propsフィールドにその値が連想配列（オブジェクト）形式で格納されます。

```
class SelfIntroduction extends React.Component {
    render() {
        return <div>こんにちは、私は{this.props.name}です。</div>;
    }
}

ReactDOM.render(
    <SelfIntroduction name="田中" />,
    document.getElementById("main")
);
```

この場合、renderメソッドはあくまでSelfIntroductionクラスのインスタンスメソッドであるため、thisキーワードを通してpropsフィールドにアクセスできます。

## ループの処理

JSXの中で扱えるのはJavaScript式なのでした。JavaScript「式」というのがポイントです。埋め込めるのはあくまで式なので、for文やif文などの制御構文は使用することができません。if文に関しては前項でチラリと説明したように三項演算子で代用できる場合が多いです。それではfor文、繰り返しはどう表現したら良いのでしょうか？

答えは、Array#mapメソッドです。JSXでは、子要素が配列の形式で扱われます。したがって、配列を流し込むことで、任意の数の要素を動的に表示できます。例を見てみましょう。

```
<ul>
    {[1, 2, 3, 4, 5].map(value =>
        <li key={value}>{value}</li>
    )}
</ul>
```

上記のJSXは、1〜5の整数をリストとして出力するためのJSXです。アロー関数の戻り値としてliタグが指定されている点に注目してください。また、ReactでArrayを動的に生成して要素のリストとして利用する場合、key属性の値を設定する必要があります。これは、Reactが仮想DOMの変化を正確にトラッキングする為に必要な操作です。同じデータを表現するためのJSX要素は常に同じkeyが指定されていることが期待されます。

## イベントハンドラ

onClick等の属性に対し関数を指定することで、要素に対してイベントハンドラを指定することができます。乱用しすぎると複雑度が上がってしまうので、適宜メソッドに切り出すなどしてJSX部分を可能な限りシンプルに保つよう心がけましょう。

```
<button onClick={() => { alert("Clicked!"); }}>ボタン1</button>
```

ラムダ式はあくまでJavaScriptとして有効な式ですので、onClick属性には波かっこを使用しなければなりません。

## stateの利用

コンポーネントは、state（状態）を持つことができます。コンポーネントのstateを変化させるためには、React.Component#setStateメソッドを使用します。

```
class StatefulComponent extends React.Component {
    state = {
        count: 0
    };
    updateCounter(diff) {
        this.setState({
            count: this.state.count + diff
        });
    }
    render() {
        return <div>
            <p>{this.state.count}</p>
            <button onClick={() => { this.updateCounter(-1); }}>減らす</button>
            <button onClick={() => { this.updateCounter(1); }}>増やす</button>
        </div>;
    }
}
```

setStateを呼び出すと、必ずrenderメソッドが実行され、変更後のstateに基づいてDOMに変更が加えられます。renderメソッド内部で直接setStateを呼び出すと、無限ループとなってしまいます。注意しましょう。

## 双方向データバインディング

テキストフィールドの入力内容を、stateとして保存しておくことができます。この場合、

1. value属性にstateの値をバインドする
2. onChangeイベントでsetStateを実行する

といった２つの操作が必要です。例を見てみましょう。

```
class TwoWayDataBinding extends React.Component {
    state = {
        inputData: ""
    };
    render() {
        return <div>
            <input
                value={this.state.inputData}
                onChange={e => { this.setState({inputData: e.target.value}); }}
            />
            <p>あなたは{this.state.inputData}と入力しました。</p>
        </div>;
    }
}
```

イベントハンドラの第一引数は、Eventクラスのオブジェクトとなっており、targetプロパティはイベントが発生した要素を表します。上記のように記述することで、state内のinputDataと、テキストボックスに入力されている値が一致していることを保証することができます。

## 子から親への通知

親から子への情報伝達は、propsを介して行うことができました。これとは逆に、子から親へ情報伝達を行う必要がある場合は、親のイベントハンドラを子に渡すという形式をとります。具体的な例を見てみましょう。

```
class Controller extends React.Component {
    render() {
        return <div>
            <button onClick={() => { this.props.onValueChanged(-1); }}>減らす</button>
            <button onClick={() => { this.props.onValueChanged(1); }}>増やす</button>            
        </div>;
    }
}
class App extends React.Component {
    state = {
        counter: 0
    };
    render() {
        return <div>
            <Controller onValueChanged={diff => {
                this.setState({counter: this.state.counter + diff});
            }} />
            <p>{this.state.counter}</p>
        </div>
    }
}
```

以上の例では、AppコンポーネントからControllerコンポーネントに対しpropsを経由してラムダ式を与えることにより、Controller内のbuttonがクリックされた際、その親コンポーネントであるAppのstateが更新されるようになっています。

## Reactを使用する上で押さえておきたい文法知識

### スプレッド構文

JSX内でオブジェクトに対してスプレッド構文を適用することで、key-value型の構造を属性名-値の形にマッピングすることができます。下の例を見てください。

```
const inputProps = {
    type: "text",
    value: "Hello World!"
};
class App extends React.Component {
    render() {
        return <input {...inputProps} />
    }
}
```

renderメソッド内部のJSXは

```
<input type="text" value="Hello World!" />
```

と等価です。

### React.Fragment

React.Fragmentコンポーネントを使用すると、コンポーネントをグループ化することができます。HTML構造には影響を与えません。

```
class ReactFragment extends React.Component {
    render() {
        return <React.Fragment>
            <p>吾輩は猫である。</p>
            <p>名前はまだない。</p>
        </React.Fragment>;
    }
};
```

return文では通常、単一のコンポーネントしか返却することができません。divタグを使うことでもグループ化できますが、意味のないHTML構造が増えてしまうことは望ましくありません。React.Fragmentコンポーネントを使用することで、複数のコンポーネントをグループとして扱うことができるようになります。なお、

```
<React.Fragment>〜</React.Fragment>
```

は、

```
<>〜</>
```

のようにタグ名を省略して記述することができます。j

## 課題

Reactのチュートリアルは、大抵ToDoアプリを作ることを目標としています。以下に列挙する条件を満たすReactアプリを作成してください。

- 以下に示す３つのコンポーネントを作成してください。
    - CreateTodoField: 新しいToDoの入力欄
    - TodoList: 現在存在しているToDoを表示
    - App: 上記二つのコンポーネントを内包する
- propsやstateのイミュータビリティを保ってください。

![コンポーネントの分割](images/todolist-1024x337.png)

コンポーネントの分割

### ヒント

- アプリケーションがどのような状態を持つのかを考えてみましょう。今回の場合は、現在のToDoのリストとCreateTodoFieldのテキストボックス内の文字列の２つです。前者はアプリケーション全体に関わる状態なので、Appコンポーネントに持たせましょう。逆に、後者はCreateTodoField内の状態とするのが良いでしょう。
- 配列から要素を削除するためには、通常[Array#spliceメソッド](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)を使用しますが、このメソッドは残念ながら破壊的なメソッドです。イミュータビリティを保つには、[Array#filterメソッド](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)を使うと良いです。このメソッドや、[Array#mapメソッド](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/map)のコールバック関数の第２引数から、処理対象の要素のインデックスを取得することができます。TodoListの削除ボタンが押されたら、削除対象となるToDoのインデックスを取得し、Appコンポーネントに通知しましょう。
