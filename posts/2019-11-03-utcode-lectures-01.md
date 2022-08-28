---
title: "ut.code(); 学習カリキュラム #1"
date: "2019-11-03"
categories: 
  - "internal"
---

ようこそ！ut.code();へ。

## VSCodeのインストール

[Visual Studio Code](https://code.visualstudio.com/)（以下VSCode）は、Microsoftのエディタです。様々なプログラミング言語を軽快に扱えることで有名な、今最も人気のソフトウェアです。

![VSCodeの公式サイト](images/image-1-1024x593.png)

VSCodeの公式サイト

インストールが終わったら、「Remote: SSH」プラグインを追加しておきましょう。

![Remote - SSHプラグイン](images/image-5-1024x366.png)

Remote - SSHプラグイン

## PCとサーバー・VPSの利用

インターネット上でサービスを提供するためのコンピューターを**サーバー**といいます。また、それを利用するソフトウェアを、サーバーと対比させて**クライアント**と呼びます。皆さんが使用しているコンピューターに搭載されているOSはWindowsやmacOSでしょうが、サーバーの世界では**Linux**を搭載しているものを使用する場合が多いです。したがって、エンジニアとしての技術を高めるためには、Linuxに親しんでおく必要があります。

タンスの奥に眠っているもう使われなくなったPCを引っ張り出し、Linuxをインストールして実験するのが最も力の付く方法ですが、なかなかそこまでの余裕はないものです。インターネット上には、仮想的なサーバーを貸し出してくれる、**VPS**（Virtual Private Server）と呼ばれるサービスがあります。

サーバーの貸し出し、などというとお金がかかりそうなイメージですが、まあ御察しの通り実際かかってしまうのですが、最近では低価格化が一気に進み、月々500〜600円（実際には時間単位で課金なので使う分だけ使うようにすれば1円弱/h）程度でそこそこのスペックのサーバーが使えるようになりました。

今回はVultrというアメリカのサービスを利用します。海外製のため低価格で使用できるにも関わらず、サーバーの物理的な場所として東京が指定できるので、日本からでも非常に快適に利用できます。

[こちら](https://www.vultr.com/?ref=8284679-4F)から登録すると、ut.code();の公式サイトを運営するためのアカウントからの紹介としてカウントされるため、（広告のようで心苦しいのですが）$10の入金で一ヶ月間使える$50分のクーポンがもらえます。

[![Vultr公式サイト](images/image-1024x372.png)](https://www.vultr.com/?ref=8284679-4F)

Vultr公式サイト

日本で使えるVPSサービスとして、他にもConoHaというサービスもあります。どちらを使っても大して変わりませんが萌えキャラが好きな方はConoHaを使いましょう（詳しくはググりましょう）。

## Vultrで新しいサーバーを立ち上げる

以下の内容はVultrに特有の内容ですが、基本的にどのVPSを利用しても同じです。

![Vultrの管理画面トップページ](images/image-2-1024x208.png)

Vultrの管理画面トップページ

Vultrの管理画面はシンプルで大変使いやすいデザインになっています。新しいサーバーを立ち上げる場合は、「＋」ボタンを押してください。

![Vultrサーバーの設定画面](images/image-4-1024x689.png)

Vultrサーバーの設定画面（画面は簡略化のために一部編集しています）

今回は上の画像のように設定してみましょう。OSの種類はUbuntu 18.04としています。実はLinuxには様々な種類があり、Ubuntuはその中でも世界中で最も有名なものです。トラブルになった時にも情報が得られやすいので、ut.code();では基本的にUbuntuを利用していきます。

下のServer Typeではサーバーのスペックを指定しています。一番安いものでもよほど問題にならないのでそれでいきましょう。一時間あたり$0.007です。安いですね。

設定が終わったら、「Deploy Now」を押してサーバーを立ち上げましょう。

## サーバーとIPアドレス

![IPアドレス](images/image-3-1024x177.png)

IPアドレス

リストに戻ると、4つの数字がドット記号で区切られている部分があります。これを**IPアドレス**と呼びます。IPアドレスとは、一般的なネットワークに接続されているコンピューターを区別するための番号です。ネットワークに接続する全ての端末に、重複しないように割り当てられます。今皆さんが目の前にしているPCやスマホにも、もちろん割り当てられていますよ！

![サーバーの詳細情報](images/image-6-1024x385.png)

サーバーの詳細情報

サーバーの詳細情報を表示させると、ログイン用のIDやパスワードも表示できます。

## VSCodeで作成したサーバにアクセスする

ここからはどのVPSでも同じ操作になります。

VSCodeを起動して、\[Cmd / Ctrl\] + \[Shift\] + \[P\]を押してください。このショートカットキーは、現在利用可能なすべての機能を一覧表示（コマンドパレット）し、素早くアクセスするためのショートカットキーです。VSCodeは、このショートカットキーさえ覚えてしまえばどこに何の機能があるのかを全く覚えなくても使用できます。面倒くさがり屋のためのショートカットキーですね笑

![コマンドパレット](images/image-7-1024x208.png)

コマンドパレット

コマンドパレットから、「Remote-SSH: Connect Current Window to Host...」を実行します。実際には適当に入力して絞り込みをかけると素早くアクセスできます。

![ユーザー名とホスト名の指定](images/image-8-1024x213.png)

ユーザー名とホスト名の指定

先ほど確認したユーザー名とIPアドレスを、「ユーザー名@IPアドレス」の形式で指定します。続いてパスワードの入力も求められるので、同じように入力しましょう。途中で「Continue / Cancel」の選択を求められた場合は「Continue」を押して続行してください。

何もメッセージが表示されなければ成功です！お疲れ様でした。

## 演習問題

- サーバーとクライアントの関係について説明してください。
- IPアドレスとは何でしょうか。
- 一般向けに使用されるOSとしては、PCであればWindowsやmacOS、スマートフォンであればiOSやAndroidが有名です。それでは、サーバーにおいて一般的に使用されるOSに用いられるソフトウェアは何でしょうか。