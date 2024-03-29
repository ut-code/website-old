---
title: "ut.code(); 学習カリキュラム #12"
date: "2019-12-22"
categories: 
  - "internal"
---

辛い回が続きます・・・もう少しの辛抱です！

## 環境構築

今回のカリキュラムは、前回の続きでVultrのVPS上で

```
curl -fsSL https://raw.githubusercontent.com/chelproc/utcode-lectures-setup/master/lamp-on-docker/init.sh | sh
```

が実行されていることを前提としています。すでに実施済みの方は再度実行する必要はありません。

## データベース

前回の課題で実装した商品検索システムは大分本格的なものになっては来ましたが、せっかくデータの検索ができても、データの追加や編集、削除ができなければ実用性は皆無ですね。では、ユーザーが自由にデータを編集できるようにするために、何が必要でしょうか。まず考え得るのは、編集されたデータをどのように保存しておくかという点です。もっとも単純な方法は、データをJSON形式等にしてファイルに保存しておく点です。この方法であれば、複雑な操作は必要ありませんし、JSONですので非常に複雑なデータ構造でも簡単に処理できます。

しかしながら、このような実装とした場合、複数人で同時に編集操作が行われると、困ったことが起こります。あとから編集するユーザーが、先に編集していたユーザーのデータを上書きしてしまう可能性があるということですね。

検索機能を追加したいという要望が出てきたらどうでしょうか。一般に、n件のデータを全て検索するためには、O(n)の計算時間がかかります。データが数万件、数十万件と増えてきたら大変ですね。そこで一般的には、データをあらかじめ小さい順に並べておき、計算量をO(log n)に抑えるといった手法がとられます。

これらを全て自らの手で実装しようとすれば、膨大な工数がかかってしまうのが目に見えていますね。そこで利用するのが、**データベース**です。

## RDBMS

現代のデータベースは、大きく分けて二種類に分類することができます。**RDBMS**と**NoSQL**です。前者のRDBMSは、**リレーショナルデータベース**（関係データベース）とも呼ばれ、Excelのように行（＝**レコード**）と列（＝**カラム**）の形式でデータを管理します。今回扱う**MySQL**は、オープンソースで開発されているRDBMSの代表的な製品です。

### データベースを作成する

一般的なデータベースは、データベースサーバーの形式で使用します。RDBを操作するための言語をSQLと呼び、SQLを用いることでデータベースに関する全ての操作を行うことができます。今回は説明の簡略化のため、SQLを直接扱わず、phpMyAdminと呼ばれるWebアプリケーションを用いて操作していきます。

phpMyAdminは、その名の通りPHP上で動作するMySQLクライアントです。冒頭のスクリプトにより自動的にインストールされているはずなので、追加でインストールする必要はありません。55556番ポートで接続を受ける設定になっているので、このポートにアクセスしてみてください。

![phpMyAdminの初期画面](images/image-1024x453.png)

phpMyAdminの初期画面

MySQLにおいて、最も大きなまとまりを「データベース」と呼びます。データベースの中には、複数の「テーブル」と呼ばれるデータ構造が存在し、「テーブル」は同じ種類のデータの集まりです。

MySQLにおいて、現在存在している全てのデータベースの一覧を取得するためには、以下のSQLを実行します。phpMyAdminはこのSQLを自動的に発行してデータベースの一覧を取得しています。

```
SHOW DATABASES
```

初期状態で表示されている４つのデータベースは内部処理用に使用されるものですので、直接操作することは避けた方が無難です。

それでは、「新規作成」ボタンを押下し、新しいデータベースを作成しましょう。

![データベースの新規作成](images/image-1-1024x453.png)

データベースの新規作成

今回は、データベース名を「superamarket」に設定しました。隣のセレクトボックスは照合順序です。検索をかける際に影響が出るので、上の図のように設定しておくのが良いでしょう。入力が終わったら、「作成」ボタンを押してください。この操作によって発行されるSQLは、おおよそ以下のようになります。

```
CREATE DATABASE supermarket
```

### テーブルを設計する

続いて、データベース「supermarket」に対してテーブルを作成しましょう。

![テーブルの作成](images/image-3-1024x194.png)

テーブルの作成

３つのカラム（＝列）を持つテーブル「products」を作成しましょう。

![テーブルの設計](images/image-2-1024x397.png)

テーブルの設計

RDBMSは、テーブルの単位でデータを管理するため、使用する前にテーブルの設計が必要不可欠です。今回は、商品リストを管理するためのテーブルを作成します。テーブルの設計とは、そのテーブルでどのような種類のデータが使用されるかを定義することです。今回は商品リストを管理するため、識別用ID、商品名、消費価格を設定してみました。

右側の「インデックス」を使用すると、インデックスを指定したカラムでの検索を高速化することができます。便利なオプションですが、乱用しすぎるとストレージを圧迫するため、ほどほどにするようにしましょう。A\_IはAUTO\_INCREMENTの略で、指定しておくとレコードの追加の際に自動的に連番を割り当ててくれます。

以上の設定を施して実行すると、以下のようなSQLが発行されます。

```
CREATE TABLE `supermarket`.`products` (
    `id`    INT NOT NULL auto_increment,
    `name`  VARCHAR(30) NOT NULL,
    `price` INT NOT NULL,
    PRIMARY KEY (`id`)
)
```

### レコードを追加する

![テーブルの作成直後](images/image-4-1024x422.png)

テーブルの作成直後

テーブルが作成されると、以上のような画面になります。「挿入」ボタンから、早速新しいレコードを追加してみましょう。

![新しいレコードの追加](images/image-5-1024x993.png)

新しいレコードの追加

idカラムにはAUTO\_INCREMENTが指定されているので、ここで指定する必要はありません。これを実行すると、以下のようなSQLが発行されます。

```
INSERT INTO `products` (`id`, `name`, `price`) VALUES (NULL, 'りんご', '100'), (NULL, 'みかん', '200'), (NULL, 'メロン', '400')
```

## PHPからMySQLにアクセスする

PHPからMySQLにアクセスするための方法はいくつかありますが、最も単純なものとして、[mysqliクラス](https://www.php.net/manual/ja/class.mysqli.php)を使用する方法があります。mysqliクラスを利用して、データベースからデータを取得してみましょう。

```
<?php
$mysqli = new mysqli('mysql', 'root', 'utcode2019', 'supermarket');
$mysqli->set_charset('utf8');
$result = $mysqli->query('SELECT * FROM products');
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <title>データベース</title>
</head>
<body>
    <table>
        <tr><td>ID</td><td>商品名</td><td>価格</td></tr>
        <?php foreach ($result as $row): ?>
            <tr>
                <td><?= $row['id'] ?></td>
                <td><?= $row['name'] ?></td>
                <td><?= $row['price'] ?>円</td>
            </tr>
        <?php endforeach; ?>
    </table>
</body>
</html>
```

2行目では、mysqliクラスのインスタンスを生成しています。コンストラクタの引数は順にホスト名、ユーザー名、パスワード、データベース名です。set\_charsetメソッドで文字コードを指定したうえで、queryメソッドを実行します。queryメソッドに指定したSQLが成功すると、[mysql\_resultオブジェクト](https://www.php.net/manual/ja/class.mysqli-result.php)が得られます。このオブジェクトは[列挙可能（＝イテラブル）](https://www.php.net/manual/ja/language.oop5.iterations.php)であるため、foreach文を用いて各行を取得することができます。

なお、コード中央の

```
<?= $row['id'] ?>
```

は、[式の値をそのまま出力するための書き方](https://www.php.net/manual/ja/function.echo.php)です。

### SQLインジェクション

INSERT文を用いてユーザーが入力したデータをデータベースに追加することを考えます。しかしながら、次のコードは**重大な脆弱性**を含んでいます。何が問題なのか考えてみましょう。

```
<?php
$mysqli = new mysqli('mysql', 'root', 'utcode2019', 'supermarket');
$mysqli->set_charset('utf8');

$name = $_POST['name'];
$price = $_POST['price'];
$result = $mysqli->query("INSERT INTO products (name, price) VALUES ('$name', '$price')");
```

上記のサンプルプログラムの問題点は、SQLの中にユーザーの入力を直接埋め込んでいることです。この例の場合、もしユーザーがシングルクォートを含む文字列を入力したとしたら、どうなるでしょうか。SQLの文法が乱され、予期しないクエリが発行されてしまう可能性がありますね。この脆弱性のことを**SQLインジェクション**と呼びます。非常に有名な脆弱性なので、必ず頭の中に入れておきましょう。

#### 対策1: エスケープ関数を使用する

mysqliクラスのreal\_escape\_stringメソッドを使用すると、ユーザーが入力した文字列を安全な形式にエスケープすることができます。このメソッドを使用した例が以下になります。

```
$name = $mysqli->real_escape_string($_POST['name']);
```

これにより、$name変数はSQLとして安全な文字列になります。しかしながら、この方法ではプログラマのミスが生まれやすいため、あまり積極的に利用することはお勧めしません。

#### 対策2: プリペアードステートメントを利用する

プリペアードステートメントを利用すると、より安全にSQLを構築することができます。

```
$stmt = $mysqli->prepare('INSERT INTO products (name, price) VALUES (?, ?)');
$stmt->bind_param('si', $name, $price);
$stmt->execute();
```

mysqliクラスの[prepareメソッド](https://www.php.net/manual/ja/mysqli.prepare.php)を使用すると、事前にSQLのテンプレートを用意しておくことができます。この際、ユーザー入力を扱う部分をクエスチョンマークにしておきます。クォーテーションは勝手にやってくれるので必要ありません。

prepareメソッドの戻り値は[mysqli\_stmtオブジェクト](https://www.php.net/manual/ja/class.mysqli-stmt.php)です。[bind\_paramメソッド](https://www.php.net/manual/ja/mysqli-stmt.bind-param.php)を使用して先ほどの空白部分に割り当てる値を指定します。この際、第一引数はデータ形式を指定してください。今回は文字列型、整数型の順番なのでsiと指定しています。最後に[executeメソッド](https://www.php.net/manual/ja/mysqli-stmt.execute.php)を実行してSQLを実行してください。SQLの結果が必要な場合は[get\_resultメソッド](https://www.php.net/manual/ja/mysqli-stmt.get-result.php)により取得できます。

#### 対策3: ライブラリを使用する

データベースをより安全に扱うためのライブラリが多数存在します。今回は扱いません。

## 課題

前回の課題で作成した商品検索システムを改変し、名前が入力されたらデータベースから対応する商品を探し出してその価格を表示するシステムを構築してください。
