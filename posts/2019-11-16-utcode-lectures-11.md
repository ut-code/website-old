---
title: "ut.code(); 学習カリキュラム #11"
date: "2019-11-16"
categories: 
  - "internal"
---

今回は重ための内容から入ります。眠くなる時間帯に読まないようにしましょう。

## Promise

### 同期処理と非同期処理

時間の掛かる処理というものがあります。例えば、インターネット通信や、ファイルの読み込みといった類の処理です。これらの処理を一般的な方法で実装しようとすると、その処理を行う間、ユーザーからの入力が受けられない状態になってしまいます。これが俗に言う、「フリーズした」状態です。幸いなことに、JavaScriptでは、時間の掛かる処理の待ち時間を、他の処理のために充てることができるようになっています。これを**非同期処理**といいます。JavaScriptにおける非同期処理は、**コールバック**を用いて処理されます。

```
setTimeout(() => {
    document.write("Text 1");
}, 1000);
```

setTimeout関数は、2つの引数をとり、第1引数で指定された関数を、第2引数で指定された時間（ミリ秒）後に実行します。このように、システムによって処理の完了後に呼び出される関数を、**コールバック関数**と呼びます。

それでは、setTimeout関数を用いて、1秒毎に異なるメッセージを表示させることを考えてみましょう。すぐに思いつくのは、以下のようなコードです。

```
setTimeout(() => {
    document.write("Text 1");
    setTimeout(() => {
        document.write("Text 2");
        setTimeout(() => {
            document.write("Text 3");
            setTimeout(() => {
                document.write("Text 4");
            }, 1000);
        }, 1000);
    }, 1000);
}, 1000);
```

くどいですね。一昔前のJavaScriptでは、上記コードのように、コールバック関数が大量に使用された結果、インデントが非常に深くなるという事態に陥りがちでした（人々はこれをコールバック地獄と呼びました）。

この状況を解決するために生まれたのが、Promise APIです。Promiseを用いると、上記のコードは以下のように書き換えることができます。

```
function mySetTimeout(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}
mySetTimeout(1000).then(value => {
    document.write("Text 1");
    return mySetTimeout(1000);
}).then(value => {
    document.write("Text 2");
    return mySetTimeout(1000);
}).then(value => {
    document.write("Text 3");
    return mySetTimeout(1000);
}).then(value => {
    document.write("Text 4");
    return mySetTimeout(1000);
});
```

それでは、上記のコードを解説していきます。

### Promiseとは何なのか？

#### Promiseに対応する関数やメソッドの作成

setTimeout関数は、昔ながらのコールバック関数を用いた形式となっています。そのため、Promiseを用いてsetTimeoutを利用するためには、setTimeoutをPromiseに対応させるための関数（ラッパー関数）を作成する必要があります。

- Promiseに対応する非同期処理関数は、Promiseクラスのインスタンスを返します。
- Promiseクラスのコンストラクタは、ただ1つの引数をとりま す。
- この引数は関数で、その関数は二つの引数(resolveとreject)をとることができます。
- 非同期処理はその関数の中で実行し、正常に終了した時点でresolveを、異常終了した場合はrejectを呼びます。
- resolveはただ一つの引数を取り、非同期処理の結果を渡します。
- rejectはただ一つの引数を取り、処理の失敗の理由を渡します。

#### Promiseを用いた非同期処理に対応する関数の使い方

- Promiseに対応する非同期処理関数により得られたPromiseクラスのインスタンスは、thenメソッドを持ちます。
- thenメソッドはただ一つの引数を取り、この引数は関数です。
- この関数はただ一つの引数を取り、thenメソッドが実行された時点で一度内部的に保存されます。
- 非同期処理が終了した時点で、この関数は実行され、引数には非同期処理の結果(前頁のresolveの引数に相当)が渡されます。
- この関数の中でPromiseを返すと、そのPromiseがresolveされた時点で、thenメソッドの返り値として得られるPromiseがresolveされます。

### Async / Await文

Async / Await構文を用いると、Promiseを用いた非同期処理をさらに簡潔に記述することができます。

```
async function promiseTest() {
    await mySetTimeout(1000);
    document.write("Text 1");
    await mySetTimeout(1000);
    document.write("Text 2");
    await mySetTimeout(1000);
    document.write("Text 3");
    await mySetTimeout(1000);
    document.write("Text 4");
}
promiseTest();
```

上記コードの要点は、以下の通りです。

- asyncキーワードを指定した関数の中でawait文が実行されると、その関数はPromiseが解決（＝resolveまたはreject）されるまで実行が中断されます。
- Promiseがresolveされた場合にはその値がawait文の戻り値と なり、rejectされた場合は例外を発生します。
- await文を使用する関数は、asyncキーワードを付与する必要が あります。
- asyncキーワードが付与された関数は、自動的に戻り値が Promise型となります。

## Ajax

ユーザーがWebサイトを閲覧している際、新たな情報を得るためには、通常ページの遷移が発生します。**Ajax**（エイジャックスと読みます）と呼ばれる技を使用すると、ページ遷移を発生させることなく、JavaScriptのみを用いてHTTPリクエストを発行したり、その結果を取得・加工・表示したりすることができます。Ajaxを用いると、ページ全体を読み込み直すことなく、必要な部分だけを取得・反映させることができるため、レスポンス速度の改善が期待できます。

### Fetch API

Fetch APIは、JavaScriptを用いてHTTPリクエストを作成することのできる、現状最も簡単な方法です。Promiseに対応しており、高い可読性が魅力です。Fetch APIを用いて、サーバー上のテキストファイルを取得して表示させる例を、以下に示します。

```
(async () => {
    const result = await fetch("data.txt");
    const text = await result.text();
    alert(text);
})();
```

```
こんにちは
```

fetch関数はPromiseを返却するため、asyncキーワードを指定した関数でラップする必要があります。今回は無名関数を用いて関数の生成と実行を同時に行なっています。なお、alert関数はメッセージボックスを表示するための関数です。

![Ajaxを用いて非同期的にリモートのデータを取得する](images/image-36-1024x406.png)

Ajaxを用いて非同期的にリモートのデータを取得する

fetchメソッドの戻り値は、ResponseクラスのPromiseになります。また、Responseクラスのtextメソッドにより、リクエストの結果を文字列のPromiseで取得できます。

### Fetch APIを用いてPOSTリクエストを送信する

fetch関数に取得先のURLのみを指定した場合、発行されるリクエストはGETメソッドです。しかしながら、第２引数に適切な値を設定することにより、POSTリクエストを発行することができます。

#### JSON

前回のカリキュラムでは、formタグを用いてサーバー側にPOSTリクエストを送信しました。このとき、どのような形式でデータが送信されるかを覚えていますか？そうです。URLエンコードされて送信されるのでした。しかしながら、URLエンコードは簡潔な反面、複雑なデータ構造を表現しようとすると、すぐに壁に突き当たります。例えば、JavaScriptにおいて以下のように表現されるデータ構造を考えてみましょう。

```
const data = [
    { id: 1, name: "田中", age: 19 },
    { id: 2, name: "鈴木", age: 21 },
    { id: 3, name: "佐藤", age: 23 }
];
```

田中さんのデータだけであれば、application/x-www-form-urlencoded（URLエンコード）形式でも「id=1&name=田中&age=19」などと表現できるのですが、件数が複数件になっていくと、この形式では厳しくなってきます。そこで登場するのが、**JSON**（JavaScript Object Notation）と呼ばれるデータの表現方法です。名前に「JavaScript」と付くことからも分かる通り、JSONはそれ単体でJavaScriptとして有効な文字列です。また、JavaScriptには、JSONを簡単に扱えるようにするためのメソッド群が用意されています。

```
JSON.stringify(data)
```

JSON.stringifyメソッドを用いると、オブジェクトをJSON形式に変換できます。以上のコードにより得られる文字列は以下の通りです。

\[{"id":1,"name":"田中","age":19},{"id":2,"name":"鈴木","age":21},{"id":3,"name":"佐藤","age":23}\]

特徴としては、JavaScriptでは必須ではなかったオブジェクトのキー名につけるダブルクォーテーションが必須となった点です。その他は通常のJavaScriptと全く変わりがありません。JSON.stringifyメソッドは改行や余分な空白文字を入れませんが、当然のことながら存在していても間違ったJSONではありません。

なお、JSON.stringifyメソッド等で生成したJSONは、JSON.parseメソッドで元のJavaScriptオブジェクトに戻すことができます。

#### Content-Typeリクエストヘッダを指定してPOSTリクエスト

JSON.stringifyメソッドを用いて生成したJSONをリクエストボディとし、Fetch APIを用いてPOSTリクエストを送信してみましょう。サンプルコードは以下の通りです。

```
const result = await fetch("/do-something.php", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
});
const resultText = await result.text();
```

先ほどはfetch関数の第一引数のみを使用しましたが、今回は第二引数も使用しています。fetch関数の第二引数では、リクエストに関する様々な設定を行うことができます。methodにはリクエストメソッドを、bodyにはリクエストボディを、headersにはリクエストヘッダを「ヘッダ名: 値」の形のオブジェクトで記述します。JSONのMIMEタイプは「application/json」なので、Content-Typeに忘れずに指定しましょう。

## PHPからリクエストボディに指定されたJSONを利用する

先ほどのスクリプトにより送られてきたJSON

\[{"id":1,"name":"田中","age":19},{"id":2,"name":"鈴木","age":21},{"id":3,"name":"佐藤","age":23}\]

をPHPから受信することを考えてみましょう。今回は、受け取った全ての人の名前を出力するプログラムを書いてみます。

```
<?php
$json = file_get_contents('php://input');
$data = json_decode($json);
foreach ($data as $person) {
    print("{$person->name}\n");
}
```

前回のカリキュラムでformタグを用いてPOSTリクエストを送信した際、リクエストボディがapplication/x-www-form-urlencoded形式でエンコードされていました。しかしながら、今回のリクエストボディはJSON（application/json形式）です。したがって、今までのように$\_POST\['キー名'\]などのようには取得できません。一度リクエストボディを文字列として受け取った後、JSONとして解釈する必要があります。

PHPでリクエストボディを文字列として取得するには、file\_get\_contents('php://input')とします。これにより受け取ったJSONを、3行目のjson\_decode関数によりPHPのオブジェクトに変換します。この時の$dataを[var\_dump関数](https://www.php.net/manual/ja/function.var-dump.php)（変数の中身を詳細に出力するための関数です）を用いて出力した結果は以下の通りです。

array(3) {
   \[0\]=> object(stdClass)#1 (3) {
     \["id"\]=> int(1)
     \["name"\]=> string(6) "田中"
     \["age"\]=> int(19)
   }
   \[1\]=> object(stdClass)#2 (3) {
     \["id"\]=> int(2)
     \["name"\]=> string(6) "鈴木"
     \["age"\]=> int(21)
   }
   \[2\]=> object(stdClass)#3 (3) {
     \["id"\]=> int(3)
     \["name"\]=> string(6) "佐藤"
     \["age"\]=> int(23)
   }
 }

stdClassという見慣れない文字列が見えます。PHPのstdClassは、全てのクラスとなるクラスで、インスタンスを作成すると、好きなフィールドに書き込むことができます。

```
$person = new stdClass();
$person->name = '田中';
$person->age = 19;
print("{$person->name}さんの年齢は{$person->age}です。");
```

上記はstdClassの使用例です。連想配列とは異なり、stdClassはあくまでクラスなので、フィールドにアクセスする際はアロー演算子（->）を使用します。

## 課題

前回の課題で作成した商品検索システムを、Ajaxを用いてページ遷移なしで動作するように改良してください。

### ヒント

0から作成するのはかなり辛くなってくるかと思いますので、以下に解答例の一部を示します。

```
<h1>商品検索システム</h1>
<p>商品ID: <input type="text" id="product-id"></p>
<button id="search-button">検索</button>
<div id="viewer"></div>
<script src="script.js"></script>
```

```
document.getElementById("search-button").onclick = async () => {
    const productId = document.getElementById("product-id").value;
    /* この部分に、サーバー側にproductIdをJSON形式で送信して価格を取得するプログラムを記述します。 */
    document.getElementById("viewer").textContent = /* 結果 */;
};
```

```
<?php
$products = [
    ['product_id' => 'A101', 'price' => 100],
    ['product_id' => 'A102', 'price' => 300],
    ['product_id' => 'B321', 'price' => 230],
    ['product_id' => 'B334', 'price' => 360]
];
/* この部分に、リクエストボディのJSONを解析するプログラムを記述します。 */
foreach ($products as $product) {
    if ($product['product_id'] == /* 検索対象のプロダクトID */) {
        print($product['price']);
        exit;
    }
}
```
