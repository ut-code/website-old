---
title: "ut.code(); 学習カリキュラム #4"
date: "2019-11-03"
categories: 
  - "internal"
---

今回はデザインです。ある意味Web開発の一番楽しいところですね。ある程度までは非常にスムーズに進められるのですが、こだわり始めると途端に面倒になってきます。

## 環境構築

今回のカリキュラムは、前回の続きでVultrのVPS上で

```
curl -fsSL https://raw.githubusercontent.com/chelproc/utcode-lectures-setup/master/lamp-on-docker/init.sh | sh
```

が実行されていることを前提としています。すでに実施済みの方は再度実行する必要はありません。

## 構造とデザインの分離

HTMLは、文書の構造を定義するための規格でしかありません。したがって、Webページをデザインし、色鮮やかに作り上げるためには、別の言語を使う必要があります。Webページのデザインに使用するための言語を**CSS**といいます。CSSを使用するためには、主に３通りの方法があります。

### ①要素のstyle属性を使用する

もっとも簡単な方法ですが、可読性（＝読み返した時の理解のしやすさ）が低いので、実際のプロダクトで使用される場面はあまり見かけません。何だか無性にCSSを殴り書きしたくなったときに使いましょう。

```
<div style="color: red; font-size: 40px;">Hello World</div>
```

CSSは、「プロパティ名: 値;」の形式で記述します。今回は文字色を表すcolorプロパティと、文字サイズを表すfont-sizeプロパティを使用しました。こちらをブラウザで表示すると、以下のようになります。

Hello World

### ②styleタグを使用する

headタグの中にstyleタグを設けることで、CSSをHTMLから分離させ、可読性を上げることができます。以下の形式で記述します。

セレクタ {
  プロパティ名: 値;
}

セレクタについては後述します。先ほどと同じ結果となるサンプルは以下になります。

```
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <title>Hello World</title>
    <style>
        #message {
            color: red;
            font-size: 40px;
        }
    </style>
</head>
<body>
    <div id="message">Hello World!</div>
</body>
</html>
```

### ③linkタグを使用してCSSを外部ファイル化する

```
<link rel="stylesheet" href="ファイル名">
```

を使用すると、先ほどのstyleタグの中身を全て外部ファイルとして書き出すことができます。現代のWeb開発で使用される形式は基本的にこの形式です。

index.htmlと同じディレクトリにstyle.cssを作成しましょう。

![style.cssを作成](images/image-24.png)

style.cssを作成

index.htmlとstyle.cssの内容は以下のようにします。

```
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <title>Hello World</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="message">Hello World!</div>
</body>
</html>
```

```
#message {
    color: red;
    font-size: 40px;
}
```

結果はもちろん最初と同じです。

## CSSセレクタ

CSSセレクタは、ブラウザがCSSを適用する際、どのHTML要素に対して適用するかを決定するための構文です。よく使うものだけ例示しておきましょう。

<table class="wp-block-table"><tbody><tr><td>セレクタ</td><td>適用される要素の例</td></tr><tr><td>#utcode</td><td>&lt;div id="utcode"&gt;&lt;/div&gt;</td></tr><tr><td>.utcode</td><td>&lt;div class="utcode"&gt;&lt;/div&gt;</td></tr><tr><td>header</td><td>&lt;header&gt;&lt;/header&gt;</td></tr><tr><td>input[type=text]</td><td>&lt;input type="text"&gt;</td></tr><tr><td>article.utcode</td><td>&lt;article class="utcode"&gt;&lt;/article&gt;</td></tr><tr><td>#utcode header<br>（子孫セレクタ）</td><td>&lt;div id="utcode"&gt;<br>&lt;header&gt;&lt;/header&gt;<br>&lt;/div&gt;</td></tr></tbody></table>

## 疑似クラス

疑似クラスを用いると、CSSを用いたインタラクティブな表現が簡単に実装できます。以下の文字列にカーソルを合わせてみてください。

#utcode-article-utcode-lectures-04-hover-pseudo-class:hover { color: red; font-size: 30px; }

Hello World!

これは、以下のようにして実装されています。

```
<div id="message">Hello World!</div>
```

```
#message:hover {
  color: red;
  font-size: 30px;
}
```

:hover疑似クラスを用いると、マウスカーソルが乗った時のみに適用されるスタイルシートを指定できます。

## CSSで使用できる値

### 色

CSSには、「color」「background-color」「border-color」など、色を指定するためのプロパティが多くあります。CSSは、色を指定するための方法を複数提供しており、状況に応じて適切に使い分けることができます。主に使用されるものは、以下の通りです。純粋な赤色を表現するための一例を掲載しています。

- 16進数表記 ... #ff0000
    - 色の赤成分、緑成分、青成分を、0〜255の256段階の16進数で表現し、3数を横に並べて先頭に#をつける記法です。もっとも一般的な記法になります。#f00のように省略することもできます。
- rgb関数 ... rgb(255, 0, 0)
    - rgb(赤成分, 緑成分, 青成分)の形式で指定します。各成分は0以上255以下の数値か、0%〜100%を指定できます。プログラムを用いで動的に色を生成する場合に便利な形式です。
- rgba関数 ... rgba(255, 0, 0, 1)
    - rgb関数の末尾にアルファ値（透明度）を指定するための形式です。0〜1の数値か0%〜100%を利用できます。透明度が必要になる場合は必然的にこの形式（もしくはhsla関数）を使用することになります。
- hsl(a)関数 ... hsl(0, 100, 50) / hsla(0, 100, 50, 1)
    - 色相、彩度、明度の形式で指定します。
- キーワード ... red
    - red、blue、yellowなど、一般的な色はキーワードによって指定できます。微妙な調整ができないのでお勧めしません。

### 長さの単位

CSSの豊富な長さの単位は、HTML / CSSがUI構築言語としても多用される一因になっています。よく使うものを以下に示します。

- px
    - 論理ピクセル数によって指定します。スマートフォンや高解像度モニターを搭載したPCでは、1pxはデバイスピクセルよりも大きくなります。基本的にこれを使っておけば問題なし。
- %
    - 比によって指定します。基準が何になるかは指定するプロパティによって異なるので注意が必要です。pxの次によく使われます。
- em
    - 文字の大きさを1としたときの比です。
- rem
    - html要素のフォントサイズを1としたときの比です。
- vw / vh
    - ビューポート（ブラウザの表示領域）の横幅（vw）、縦幅（vh）を100としたときの比です。
- vmax / vmin
    - ビューポートの横幅、縦幅のうち、大きいもの（vmax）、小さいもの（vmin）を100としたときの比です。

calc関数を使用すると、複数の単位を併用できます。例えば、

```
width: calc(100% - 300px);
```

は、「横幅100%よりも300px分だけ小さい幅」を表します。乱用は禁物ですが、複雑なレイアウトを簡単に実現できるので、ぜひ覚えておきましょう。

## CSS開発のお供に

CSSのプロパティは星の数ほどあります。すべて覚えることは現実的には不可能なので、使うときに調べれば良いでしょう。

- CSS3リファレンス ... [http://www.htmq.com/css3/indexa.shtml](http://www.htmq.com/css3/indexa.shtml)
    - 前回紹介したHTMLクイックリファレンスのCSS版（CSS3とは最新バージョンのCSSのことです）
- CSS - MDN ... [https://developer.mozilla.org/ja/docs/Web/CSS](https://developer.mozilla.org/ja/docs/Web/CSS)
    - 情報は正確で厳密ですが難解です。

## 演習問題

- marginとpaddingの違い、使い方について調べてみましょう。
- 「ブロックレベル要素」と「インライン要素」の違いについて調べてみましょう。これらを指定できるCSSプロパティは何でしょうか？
- Flexboxを用いたレイアウトについて調べてみましょう。

## 課題

こんな感じのカッチョイイログイン画面を作ってみましょう。

![カッチョイイログイン画面](images/image-25-1024x560.png)

カッチョイイログイン画面

- ログインフォームを上下中央揃えにするために、Flexboxの知識が必要不可欠です。
- 細かい部分に気を使いつつ、更新を繰り返しながらCSSを修正しましょう。
- ログインボタンはマウスカーソルを合わせると色が変わります。

### ヒント

HTMLは以下のみで実装できます。

```
<div id="container">
	<h1>ログイン</h1>
	<table>
		<tr><th>ID:</th><td><input type="text"></td></tr>
		<tr><th>パスワード:</th><td><input type="password"></td></tr>
	</table>
	<button>ログイン</button>
</div>
```

- 複合的なセレクタを積極的に使用していきましょう。無闇にidやclassをつけて可読性を下げるよりは、「#container th」などとした方がベターです。
- Flexboxは、#containerをbody内画面中央に配置するために使用します。bodyタグに「display: flex;」を指定しましょう。この際、bodyタグの高さを画面の高さに揃えるため、html要素とbody要素に「height: 100%;」を指定する必要があります。
- 要素がブロックレベル要素なのかインライン要素なのかを意識しましょう。h1要素はデフォルトでブロックレベル要素なので、そのボックスは行を占有しています。したがって、テキストを中央に揃える際は「text-align: center;」が利用できます。それに対し、button要素はボックス自体を右にそろえる必要があるので、別のアプローチを取る必要があります。「margin-left: auto;」を指定することで実現することができますが、buttonはデフォルトでインライン要素なので、marginを指定することができません。まずはbutton要素をブロックレベルに変換することを考えましょう。
