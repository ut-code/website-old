---
title: "ut.code(); 学習カリキュラム #13"
date: "2019-12-23"
categories: 
  - "internal"
---

今回はフロントエンドに戻ります。ここからは比較的新しい開発手法を取り入れていきます。

## ブラウザ外で動作するJavaScript

これまで私たちが書いてきたJavaScriptは、ブラウザ上で動作することを前提としていました。しかしながら、JavaScriptは、ブラウザを介さず、Pythonのように直接実行されることを想定した実装があります。現在の標準は**Node.js**です。高速に動作することで有名なGoogle ChromeのV8と呼ばれるJavaScriptエンジンを搭載しているため、その高速さは折り紙付きです。

適当なディレクトリ に適当なJavaScriptファイルを配置し、以下のように記述してください。

```
console.log("Hello World!");
```

このファイルがindex.jsという名前で作成されているとして、以下のコマンドを実行してください。

```
node index.js
```

nodeコマンドは、Node.jsを起動させるためのコマンドです。引数としてファイル名を与えることで、そのファイルをJavaScriptと解釈して実行します。

![Node.jsでHello World](images/image-6-1024x193.png)

Node.jsでHello World

おめでとうございます！Hello Worldと表示できました！

## JavaScriptでモジュール分割

Node.jsではexportsというオブジェクトが常に使用できます。このexportsオブジェクトのプロパティに対し適当な値を代入することで、JavaScriptを複数ファイルで使用することができます。

```
const lib = require("./lib");
lib.writeHello();
```

```
exports.writeHello = () => {
    console.log("Hello!");
};
```

lib.jsでは、exportsオブジェクトのwriteHelloメソッドを定義しています。lib.jsのexportsオブジェクトはindex.jsからrequire("./lib");の形で取り出すことができ、内部で定義されていたメソッドが実行できるようになります。

## npm: Node.jsのパッケージマネージャー

Node.jsでは、npmと呼ばれるパッケージマネージャーが使用できます。npmを用いると、世界中の開発者によって開発されている膨大な数のパッケージを、コマンド一つで簡単に導入することができるようになります。まずはプロジェクトディレクトリで以下のコマンドを実行してみましょう。

```
npm init -y
```

npmを使用するためには、まずnpmの管理下に置くディレクトリの直下でnpm initコマンドを実行する必要があります。このコマンドを実行すると、そのディレクトリにpackage.jsonが生成され、対象となるプロジェクトに関する詳細情報が記録できるようになります。package.jsonは他にもインストールされたパッケージの一覧を保存しておく役割もある重要なファイルです。

```
npm install mathjs
```

npm installコマンドを実行すると、パッケージをインターネットから自動的に取得してインストールします。npm installコマンドは（特殊なオプションを使用しない限り）package.jsonが配置されているディレクトリより外側には一切の影響を及ぼしません。上記コマンドを実行すると、package.jsonと同じディレクトリにnode\_modulesディレクトリが生成され、その中にmathjsパッケージとmathjsが依存している（＝内部的に使用している）パッケージがインストールされます。また、同時に生成されるpackage-lock.jsonには、依存先のパッケージを含めて全てのパッケージのバージョンが記録されます。

この時点で、package.jsonの中身は以下のようになりました。

```
{
  "name": "development",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

それでは早速mathjsパッケージを使用してみましょう。前の例と同じように、パッケージはrequire関数を用いることでインポートできます。

```
const mathjs = require("mathjs");
console.log(mathjs.evaluate("3 + sqrt(4 * 9)"));
```

npmによってインストールされたパッケージはパスを指定せずとも使用することができます。上記コードにより、コンソールに数値9が表示されます。

## 余談: Ubuntu標準のパッケージマネージャーapt

Linuxには、標準でパッケージマネージャーが付属している場合が多いです。パッケージマネージャーを使用すると、必要なソフトウェアを素早く、かつ安全にインストールすることができます。Ubuntuでは、標準のパッケージマネージャーにaptを採用しています。UbuntuのVPSを使用している場合は以下のコマンドを実行してみましょう。

```
apt install sl
```

slコマンドはLinuxの有名なジョークプログラムで、ls（ディレクトリの中身を一覧表示する）コマンドを打ち間違えた限界エンジニアの心を癒すためのものです。

## npmパッケージをコマンドとして実行する

npmパッケージの中には、コマンドとして実行できるものも存在します。代表的なものが[rimraf](https://www.npmjs.com/package/rimraf)です。Linuxではディレクトリをその子孫まで含めて強制的に削除するためにrm -rfコマンドを使用しますが、残念なことにrmコマンドはWindowsでは使用できません（忌々しきWindowsめ！）。rimrafは、WindowsとLinuxの差異を吸収するためのパッケージです。

```
npm i -D rimraf
npx rimraf [作業したいディレクトリ名]
```

npm iはnpm installの省略形になります。-Dオプションを付与することで、package.jsonに記録される際、対象パッケージが開発時のみに使用されるものであることを明示することができます。先ほどmathjsをインストールした際のpackage.jsonと比較してみてください。

npxコマンドは、npmによってインストールされたパッケージをコマンドとして実行するためのコマンドです。パッケージが既にインストールされている場合はインストールされたパッケージを実行し、インストールされていない場合はパッケージを一時的にインストールして実行します。

## モジュールバンドラ

ブラウザからJavaScriptを読み込む為には、通常scriptタグをHTMLに記述します。複数のJavaScriptファイルを実行させたい場合、ファイルの数だけscriptタグを記述する必要があります。scriptタグを忘れてしまえば、必要なファイルが読み込まれていないことが原因で、別のスクリプトの実行が失敗してしまうでしょう。一方、Node.jsではrequire関数によりJavaScriptから直接別のJavaScriptファイルを参照できます。この方法は、スクリプトがそのソースコード内に必要とするファイルを明示しているという点で、より優れた構成であるということができるでしょう。

**モジュールバンドラ**を使用すると、モジュール単位で分割されたJavaScriptファイルを一つにまとめる（**バンドル**）ことができます。これにより、ブラウザでもモジュール化されたJavaScriptを（あくまで最終的に出力されるファイルは単一ファイルですが）実行できるようになります。また、npmによりインストールされたパッケージもバンドルすることができるため、開発の幅が広がります。

スクリプトA・Bが存在し、 AはBで定義されている機能を呼び出していたとします。このとき、スクリプトAはスクリプトBに**依存**していると言います。スクリプトA・B・Cが存在し、AはBとCに、CはBに依存しているとします。このとき、スクリプトはB→C→Aの順で読み込まれる必要があります。このような処理を**依存関係の解決**といいます。モジュールバンドラの主な役割は依存関係の解決です。

JavaScriptのモジュールバンドラとして近年のスタンダードは[webpack](https://webpack.js.org/)です。

## トランスパイラ

プログラムを機械が実行できる形式に変換する作業のことをコンパイル、またそれを実行するためのソフトウェアをコンパイラと呼ぶことは有名です。Webの世界では、あるソースコードをHTML/CSS/JavaScriptの形式に変換するという作業が発生する場合があります。このような作業を**トランスパイル**と呼び、そのためのソフトウェアを**トランスパイラ**と呼びます。

### Pug: HTMLにトランスパイルされる言語

[Pug](https://pugjs.org/)は、HTMLをシンプルに記述することのできるマークアップ言語です。HTMLは比較的シンプルな言語ですが、開始タグと終了タグでタグ名を２回記述する必要がある点をはじめとして、いくつかの欠陥が指摘されます。Pugを利用すると、

```
<main class="contents">
  <header>Hello World</header>
  <p>Lorem ipsum.</p>
</main>
```

を、

```
main.contents
  header Hello World
  p Lorem ipsum.
```

のように記述できます。本カリキュラムではあまり使用しません。

### Sass: CSSを超絶便利にする言語

[Sass](https://sass-lang.com/)を使用すると、複雑なCSSをシンプルに記述することができます。[公式ガイド](https://sass-lang.com/guide)にできることが簡潔に纏まっているので詳しい説明は省略しますが、CSSに変数やループ、条件分岐、ネストなどの高度な抽象化概念を導入することができるようになります。本カリキュラムでも積極的に採用します。

### JavaScriptのトランスパイラ

JavaScriptのトランスパイラとして最も有名なものは[Babel](https://babeljs.io/)です。Babelは、JavaScriptをJavaScriptにトランスパイルします。どういうことでしょうか？

JavaScriptはブラウザで実行される言語です。そして、最も速く進化しているプログラミング言語の一つでもあります。JavaScriptは、[Ecma International](https://www.ecma-international.org/)と呼ばれる組織により、ECMAScriptという名前で標準化されています。最新のECMAScriptで使用できる機能が、ブラウザではまだ実装されていないという場合が頻繁に訪れます。最新のJavaScriptを、古いブラウザでも読み込める形式に変換するためのソフトウェアが、Babelになります。本カリキュラムでも、これ以降ブラウザ向けのJavaScriptはBabelによりトランスパイルされているものとします。

もう一つ、JavaScriptにトランスパイルされる言語として、[TypeScript](https://www.typescriptlang.org/)も重要です。TypeScriptは、比較的ルーズな言語仕様を持つJavaScriptに非常に強力で厳格な型システムを導入するための言語です。Ajaxの台頭以降加速度的に複雑さを増すJavaScriptにおいて、開発効率を大きく上昇させることができます。このカリキュラムでも今後扱う予定です。

BabelとTypeScriptは併用される場合が多いです。この場合、TypeScript→Babelの順でトランスパイルを実行することになります。

## Parcelの利用

[Parcel](https://parceljs.org)は、Babel、TypeScript、Sass、Pugなど有名どころのトランスパイラ全てと、モジュールバンドラ、そしてホットリロード（ソースコードの変更を検知して自動的にブラウザで表示される内容を更新すること）に対応するプレビューサーバーを全て内包する非常に強力なソフトウェアです。設定不要で動作することを売りにしており、実際に小規模なプロジェクトの場合ほとんどParcelのデフォルト設定で事足ります。学習用にも最適です。

```
npm i -D parcel-bundler
```

パッケージ[parcel-bundler](https://www.npmjs.com/package/parcel-bundler)を-Dオプションをつけてインストールしましょう。続いて、ソースコードを記述します。

```
doctype html
html(lang="ja")
  head
    meta(charset="utf-8")
    title Hello Parcel
    link(rel="stylesheet", href="style.scss")
  body
    h1 計算機
    input#expression(type="text")
    button#calculate 計算
    div#result
    script(src="script.js")
```

```
#expression {
    font-size: 2em;

    &:focus {
        border-color: red;
    }
}
```

```
const mathjs = require("mathjs");
document.getElementById("calculate").onclick = () => {
    document.getElementById("result").textContent = mathjs.evaluate(
        document.getElementById("expression").value
    );
};
```

トランスパイルやモジュールバンドル伴うプロジェクトの場合、ソースファイルとトランスパイル後のファイルが共存することになります。この時、プロジェクトのルートディレクトリにソースファイルを配置してしまうと、最終的に出力されたファイルを置く場所がなくなってしまいます。そのため、適当なディレクトリを作成し、その中でコードを書き進めると良いです。今回はsrcディレクトリ（よく使われるsourceの略語です）を使用しました。

![ディレクトリ構造](images/image-1.png)

ディレクトリ構造

Parcelコマンドは引数にエントリポイントをとります。src/index.pugを指定して、Parcelを実行しましょう。

```
npx parcel src/index.html
```

![Parcelを実行する](images/image-8-1024x84.png)

Parcelを実行する

Parcelは、index.htmlの中に記載されたscriptタグやlinkタグを自動的に認識し、それらの参照先ファイルがトランスパイルの対象であれば、自動的にトランスパイルし、バンドリングします。出力されたファイルはプロジェクトディレクトリ直下に自動的に生成されるdistディレクトリ（この挙動は変更可能です）に生成され、ブラウザから表示させることが可能です。また、Parcelにはホットリロード可能な開発用サーバーを起動する機能も標準で用意されているため、そのためのリンクが表示されます。

## 課題

- [japanese-holidaysパッケージ](https://www.npmjs.com/package/japanese-holidays)を使用すると、日本の祝日を取得することができます。ページを表示した年の全ての祝日を表示するシステムを作成してください。
- Sassを用いて簡単なスタイリングを施してみてください。
- Parcelがdistディレクトリに出力したHTML/CSS/JavaScriptを読んでみましょう。

### 注意

サンプルコード中で変数宣言にvarが使用されています。最新のJavaScriptではletまたはconstを使用するので注意してください（2019年12月現在）。
