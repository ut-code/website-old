---
title: "ut.code(); 学習カリキュラム #5"
date: "2019-11-03"
categories: 
  - "internal"
---

## 環境構築

今回のカリキュラムは、前回の続きでVultrのVPS上で

```
curl -fsSL https://raw.githubusercontent.com/chelproc/utcode-lectures-setup/master/lamp-on-docker/init.sh | sh
```

が実行されていることを前提としています。すでに実施済みの方は再度実行する必要はありません。

## JavaScriptから始める異世界プログラミング

HTMLとCSSを使用することで、Webサイトの構造やデザインができることが分かりました。ここからはWebサイトに動きをつけるための方法について学習していきます。まずは、index.htmlの内容を以下の通りにしてください。

```
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <title>Hello World</title>
</head>
<body>
    <script>
        document.write("Hello World!");
    </script>
</body>
</html>
```

画面にHello World!と表示されたでしょうか。おめでとうございます！これであなたはブラウザ上でプログラムを動作させることに成功しました！

scriptタグは、記述された場所で**JavaScript**と呼ばれるプログラミング言語で書かれた**スクリプト**を動作させるためのタグです。JavaScriptは、言語仕様の簡単さと柔軟性、そして開発環境の充実さから、非常に人気のある言語です。トレンドの変化が非常に早く、インターネット上には古い情報も未だに存在しているので、調べ物をするときは記事の投稿日を必ず確認しましょう。

上記の例では、JavaScriptを直接HTMLファイル内に記述しましたが、CSSと同じく、実際には可読性の観点からHTMLファイルとJavaScriptファイルは分離しておくことが一般的です。

script.jsファイルをindex.htmlと同じディレクトリに作成し、以下のように書き換えましょう。

```
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <title>Hello World</title>
</head>
<body>
    <script src="script.js"></script>
</body>
</html>
```

```
document.write("Hello World!");
```

先ほどと同じ実行結果が得られました。

## JavaScriptの基本構文

注: 以下、JavaScript以外でのプログラミングの学習経験があることが前提となっています。

### 変数宣言

```
const variable1 = 12345; // 後から変更しない値
let variable2 = "Hello"; // 後から変更する値
```

変数宣言には可能な限りconstを使用しましょう。実際の場面でletが必要になる場合はほとんどないはずです。

### 配列（リスト）

```
const fruits = ["apple", "banana", "lemon"];
document.write(fruits.length); // リストの長さの取得
fruits.push("melon"); // リストの末尾に要素を追加
fruits.slice(2, 4); // リストの2番目～(4 - 1)番目の要素を切り出し
```

JavaScriptの配列はリストです。自由に内容を増やしたり減らしたりできます。

### テンプレートリテラル

```
const name = "田中";
const age = 18;
document.write(`私の名前は${name}です。${age}歳です。`);
```

テンプレートリテラル（文字列をバッククォート「‘」で囲むと、内部の{${式}}の部分が式の結果に置き換えられます。

### if文

```
if (20 <= age) {
  document.write("ようこそ！オトナの世界へ！");
} else if (18 <= age && age < 20) {
  document.write("もう少し...");
} else {
  document.write("子供は寝る時間ですよ。");
}
```

ごく一般的に見かける文法です。Pythonに慣れている人は条件式にカッコが必要であることに注意しましょう。

### while文

```
while (remaining > 0) {
  document.write("まだですよ");
  remaining--;
}
```

こちらも一般的な文法通りです。「--」はデクリメント演算子と呼ばれ、付けた変数の値を１減らす効果を持ちます。正反対の「１加える」という機能を持つインクリメント演算子「++」も存在します。

### for文

```
for (let i = 0; i < students.length; i++) {
  document.write(students[i]);
}
```

JavaScriptのfor文はJavaやC系統の言語と同じ形式です。かっこの中にはセミコロン（;）で区切られた３つの文が並んでいます。この文は

```
let i = 0;
while (i < students.length) {
  document.write(students[i]);
  i++;
}
```

と（大体）等価です。

### 配列の列挙

配列の様に、列挙可能な値を列挙するためには、**for ... of構文**を使用します。これは、他の多くの言語におけるforeach文と同等です。

```
const numbers = [1, 3, 6, 8];
let sum = 0;
for (const number of numbers) {
    sum += number;
}
document.write(sum);
```

### 関数の定義

```
function add(a, b) {
  return a + b;
}
document.write(add(1, 2));
```

## 課題

2 ～ 100までの数値のうち、素数のみを選んで表示するプログラムを作成してください。

### ヒント

Pythonで複雑な文法を使わずに実装するとすれば以下のような感じでしょうか。

```
for i in range(2, 100 + 1):
    isPrime = True
    for j in range(2, i):
        if i % j == 0:
            isPrime = False
            break
    if isPrime:
        print(i)
```

for文の書き方が異なるので注意が必要ですね。
