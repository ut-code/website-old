---
title: "2019A・第一回「エンジニアになろう」講習会記録"
date: "2019-10-03"
categories: 
  - "events"
---

2019/10/2（水）、2019/10/5（土）に実施された[第一回「エンジニアになろう」講習会](https://utcode.net/2019/info/2019a-first-lecture/)の講義スライドを書き起こした資料です。説明の簡略化のため、一部不正確な書き方をしている部分がありますが、ご了承ください。東京大学の学生がAセメスターで学習することを想定しています。

## この講座の方針

### 作りたいものを自分で調べて作れるようにする

「作りたい」という気持ちが生まれた時、それを実現するために必要な技術は一つであることは稀です。そのため、この講習会では、一つの技術を突き詰めることはせず、様々な技術の扱い方を幅広く学び、より多くの知識への「引き出し」を持つことに重点を置きます。

### 「面倒なこと」に積極的に取り組む

素晴らしい製品の裏には、数多くの苦労が存在しています。それがあるからこそ、完成した時の喜びはひとしおです。

## C#

今回メインで扱うプログラミング言語です。Microsoftが開発した言語で、古き良きCの文法を踏襲しつつも、モダンで堅牢な書き方ができます。

### 開発環境の構築 (上級者向け)

Visual Studio Codeをブラウザ上で利用するためのサービスである[Coder](https://coder.com)のバックエンドで利用されているOSS、code-serverの公式Dockerイメージに、C#のSDKと開発用のプラグイン、雛形となるプロジェクトファイル、実行・共有のための幾つかのスクリプトを加え、VPS上で人数分のコンテナを起動しました。講習会中のみインスタンスを起動していれば良いだけなので料金はほとんどかかりません。

## 初めてのC#

```
Console.WriteLine("Hello World!");
```

こちらは画面にHello World!と表示するためのプログラムです。授業でもよく取り扱われるPythonであれば

```
print("Hello World!");
```

と書けるので、煩わしいと感じるかもしれません。しかしながら、基本的な文法はどの言語もそこまで差はありません。動作を変更する時は、カッコの中身を書き換えるだけです。

```
Console.WriteLine("日本語もおk");
// コメントも書けます
Console.WriteLine(100 * 15);
/* 複数行に
渡ってもいいです。 */
```

ただし、

- 文の終わりにはセミコロンがつく
- 改行・インデントは文法的意味を持たない

という差があるので注意しましょう。

## エディタ補完の利用

最近のエディタ（プログラムを編集するためのソフトウェア）では、プログラマの支援のための豊富な機能が搭載されています。その中でも最も使用頻度が高いのがこのエディタの補完と呼ばれる機能で、曖昧な知識をコンピューターが自動的に補ってくれます。

![補完が表示されている様子](images/image.png)

補完が表示される様子

C#は比較的「厳しい」言語なので、コンピューターにより容易にプログラムが解析できます。したがってエディタ上で表示される候補は（今回の環境では）「完璧」な候補であり、補完に従って書いている限りエラーになることはありませんし、補完に現れない書き方をしたらエラーとなります。

表示されている補完候補を選択する際は、入力の高速化のためにも必ずキーボードを用いて選択し、正しい候補のところで\[Tab\]キーを押しましょう。なお、Macのユーザーは\[control\]+\[P/N\]で上下選択ができます。覚えるだけで編集効率が飛躍的に上昇するので、ぜひマスターしましょう。

## 変数とデータ型

PythonとC#の最も大きな違いの一つとして、「データ型」の概念があることが挙げられます。

```
int age = 20; // ageは整数(int)型
string name = "鈴木 一郎"; // nameは文字列(string)型
bool isCute = false; // isCuteは真偽値(bool)型
```

C#において、変数を利用する際は、必ず「**宣言**」をする必要があります。宣言の際、変数名の前にデータ型を指定するので、その変数に意図しない値が入ることはありません。

### 色々なデータ型

- int ... 整数型
- double ... 浮動小数点数型（要するに普通の小数）
- string ... 文字列型
- bool ... 真偽値型（true / false）
- char ... 文字型
- decimal ... 10進型（10進数を誤差なく計算できる）

上の4つだけ覚えておけばなんとかならないことはほぼ無いです。

## よくある文法

### if文

```
int age = 19;
if (age >= 20)
{
  Console.WriteLine("ようこそオトナの世界へ");
}
else if (age >= 18)
{
  Console.WriteLine("ちょっと背伸びしちゃお");
}
else
{
  Console.WriteLine("まだまだ");
}
```

### while文

```
int count = 0;
while (count < 10)
{
  Console.WriteLine(count);
  // count += 1 もしくは
  // count = count + 1 と同義
  count++;
}
```

++をインクリメント演算子（変数の値に１を加える）、--をデクリメント演算子（変数の値に１を減じる）と呼びます。

### for文

```
for (int i = 0; i < 10; i++)
{
  Console.WriteLine($"{i + 1}回目");
}
```

Pythonのfor文とかなり異なっていますが、基本的にfor文はwhile文で置き換えることができ、上の例の場合はほとんど以下のコードと同義です。

```
int i = 0;
while (i < 10)
{
  Console.WriteLine($"{i + 1}回目");
  i++;
}
```

for文は複雑ではありますが、基本的に例とほぼ同じようなコードで利用されることが大半なので、「型」として覚えてしまいましょう。なお、この例のように$に続いて文字列を書く方法を文字列補間と呼び、{}で括った部分を式として評価（≒プログラムとして実行）します。

## データ型を意識しよう

```
string input = Console.ReadLine();
Console.WriteLine(input + 3);
```

Console.ReadLineは、標準入力（≒キーボード）から一行読み出します。このプログラムを実行し、「4」を入力すると、「43」と出力されます。期待していた結果は7かもしれませんが、inputは文字列であるため、input + 3は文字列の結合とみなされるため、「4」+ 3 ＝「43」となるのです。

## 演習問題１

問: endが入力されるまで数値を入力させ、その平均を表示するプログラムを作ってください。（配列等は使いません）

### ポイント

- 入力された文字列はstring型ですが、計算に使用するためdouble型に変換します。double.Parseを利用してください。
- while (true) {} により無限ループを作成し、適切な条件のもとbreak文を実行してwhile文を途中で抜けます。
- 現在入力された値の数とその合計を記録するint/double型の変数を用意しましょう。

### 解答例

```
int count = 0;
double sum = 0;
while (true)
{
    string input = Console.ReadLine();
    if (input == "end")
    {
        break;
    }
    count++;
    sum += double.Parse(input);
}
double average = sum / count;
Console.WriteLine($"平均は{average}です。");
```

## 美しいコードを書こう

以下のコードの問題点を指摘してください。

```
for(int i=0;i<10;i++)
{
Console.WriteLine(i);
}
```

### インデントを正しく利用する

インデントとは字下げのことです。ブロックの内部に適切なインデントを加えることで、プログラムの階層構造が把握しやすくなります。

### スペースの使い方に気を配る

基本的には英文を書く際と同じです。

- if, for, whileなどのキーワードの後
- ほとんどの演算子の前後
- コンマ、コロン、セミコロンの後

面倒でもスペースは適切に入れましょう。

### フォーマッタにかけてみる

![フォーマッターの起動の様子](images/image-1-1024x197.png)

\[Command / Ctrl\] + \[Shift\] + \[P\]に続いて、「Format Document」を選択しましょう。コードが正しければ、変化はほとんどないはずです。自分が書いたコードと見比べて、どのように直すべきなのか考えましょう。

## メソッド（関数）の定義

```
using System;
namespace project
{
    class Program
    {
        static double CalculateBmi(double weight, double height)
        {
            return weight / Math.Pow(height, 2);
        }
        static void Main(string[] args)
        {
            Console.WriteLine(CalculateBmi(60, 1.6));
        }
    }
}
```

メソッドは

\[戻り値の型\] \[関数名\](\[引数の型\] \[引数名\], ...)

の形で定義します。戻り値を持たない場合は、voidキーワードを指定します。

## さっそく練習！

問題: 自然数の階乗を求めるメソッドを作成してください。ただし、0! = 1を考慮する必要はありません。

### 模範解答

```
double Factorial(int number)
{
    int result = 1;
    for (int i = 1; i <= number; i++)
    {
        result *= i;
    }
    return result;
}
```

## 命名規則

- 現代のプログラムは、簡潔さよりも読みやすさを重視します。

### 大文字・小文字の使い方

- キャメルケース → 変数名等で利用
    - ２つ目以降の各単語の最初の文字を大文字にする表記法
    - 例: whatAreYouDoing / programmingIsFunny
- パスカルケース（アッパーキャメルケース）→ メソッド名等で利用
    - 全ての単語の最初の文字を大文字にする表記法
    - 例: WhatAreYouDoing / ProgrammingIsFunny

### 変数名の付け方

- 変数は値を格納するためのものなので、通常、名詞形で表記します。
    - 例: int currentState; string userName; bool birthRate;
- bool型の変数のみ特殊な名前の付け方をします。
    - 例: bool isActive / bool canPlay / bool userExits
- 操作を表すメソッドは動詞で始まることが多いです。

## オブジェクト指向を学ぼう

- オブジェクト指向: データと動作を一つの「まとまり」と捉える考え方
- 現代のプログラミング言語の基礎をなす考え方
- C#はオブジェクト指向を学ぶために適した言語です。

### 実世界に例えてみよう

![](images/image-2-1024x452.png)

「犬」という現実世界の物体を考えてみましょう。犬を特徴できる要素として、「名前」「年齢」「体調」といった値があるのに対し、「鳴く」「吠える」「走る」といった動作も存在しています。これらをまとめて「犬」を抽象化した「定義」を作成します。

この定義をもとに作成された実体を、「インスタンス」と呼びます。これをプログラムで表現してみましょう。

```
class Dog
{
    public int Age;
    public void Bark()
    {
        if (this.Age < 5)
        {
            Console.WriteLine("キャンキャン！");
        }
        else
        {
            Console.WriteLine("バウバウ！");
        }
    }
}

Dog pochi = new Dog();
pochi.Age = 3;
pochi.Bark();

Dog hachi = new Dog();
hachi.Age = 10;
hachi.Bark();
```

このプログラムの要点をまとめると、以下のようになります。

- class Dog {} により新しくDogという名前のクラスが定義される。
- new Dog();によりDogクラスの**インスタンス**が生成される。
- DogクラスのインスタンスはC#ではあたかもDog型のように扱える
- ドットを使用すると、インスタンスのメンバ（フィールドやメソッドなど）にアクセスできる。
- pochi.Age= 3; によりDogクラスのインスタンスであるpochiの**フィールド**に値がセットされる。
- pochi.Bark(); によりDogクラスのメソッドであるBarkメソッドがpochiに対して実行される。（定義内のthisはインスタンス自身を表す）

### アクセス修飾子

```
class Car
{
    public string Color;
    public int Price;
    private string ProductId;
}

Car myCar = new Car();
myCar.Color = "red";
myCar.Price = 1000000;

// エラー
// myCar.ProductId = "xxx-yy-z";
```

クラスのフィールドやメソッドの定義の前には、「private」や「public」などの**アクセス修飾子**がつきます。アクセス修飾子とは、フィールドやメソッドなどにアクセスできる場所を制限するためのキーワードです。

上記の例では、CarクラスのColorとPriceフィールドはpublic修飾子が付いているので、プログラムの下部からアクセスすることができています。しかしながら、ProductIdフィールドはprivate扱いになっているので、myCar.ProductIdなどとすることはできません。

### コンストラクタ

```
class Car
{
    public string Color;
    public int Price;
    private string ProductId;
    public Car(string color, int price)
    {
        this.Color = color; this.Price = price;
        this.ProductId = $"{color}-{price}";
    }
}

Car myCar = new Car("red", 1000000);
```

C#において、クラス名と同名で定義されたメソッドは「コンストラクタ」と呼ばれ、特別な意味を持つようになります。コンストラクタはインスタンスが生成される時、すなわちnew演算子をつけてクラスが指定された時に実行され、主にフィールドを初期化するために利用されます。

## 本日の最終課題

以下の要件を満たすクラスPersonを定義してください。また、作ったクラスを実際に利用してみてください。

- 以下のフィールドを持ちます。
    - Name: 文字列型
    - Age: 整数型
- コンストラクタに渡された引数により、NameフィールドとAgeフィールドが初期化できます。
- 以下のメソッドを持ちます。
    - canDrinkAlcohol: 引数を取らず、20歳以上ならtrue、そうでなければfalseを返すメソッド
    - introduceSelf: 引数を取らず、自分の名前と年齢についての簡単な自己紹介文を出力するメソッド

### 模範解答

```
class Person
{
    public string Name;
    public int Age;
    public Dog(string name, int age)
    {
        this.Name = name;
        this.Age = age;
    }
    public bool canDrinkAlcohol()
    {
        return age >= 20;
    }
    public void introduceSelf()
    {
        Console.WriteLine($"私は{this.Name}です。{this.Age}歳です。");
    }
}
Person person = new Person(19, "田中");
Console.WriteLine(person.canDrinkAlcohol());
Console.WriteLine(person.introduceSelf());
```

## 次回までに

以下のソフトをインストールしておいてください。

- Visual Studio Code
- Docker Desktop

Windows環境の方は、Docker Desktopのインストールの前に、OSのエディションを確認してみてください。Windows 10 Homeでは、CPUの仮想化支援機能であるHyper-Vが無効化されているため、Docker Desktopのインストールができません。[東京大学のライセンスを利用](https://utcode.net/2019/blog/utokyo/windows-home-to-education/ )し、Docker Desktopをインストールしておいてください。
