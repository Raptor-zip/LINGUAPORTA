# リンガポルタ完全自動化ツール【簡単インストール】

![Screenshot](https://raw.githubusercontent.com/Raptor-zip/LINGUAPORTA/main/image/readme.png)
COCET 2600(理工系学生のための必須英単語 2600)のLINGUAPORTA(リンガポルタ)を自動化するツール(ボット)です。  
# ✨機能
## 自動化
獲得するスコア、回答入力遅延、正答率、単元を選んで、スタートボタンをクリックすると、自動で問題を解きます。  
# 必須環境
`Windows` Google Chrome または Edge  
`Mac` Google Chrome または Edge  
# 🛠️導入方法🛠️
## 💻PCの場合
```
右上の「Code」をクリックする  
「Download ZIP」をクリックする  
ダウンロードしたファイル「LINGUAPORTA-main.zip」を右クリックして「すべて展開...」をクリックする  
Chromeを開く  
右上の・・・をクリックする  
「拡張機能」をクリックする  
「拡張機能を管理」をクリックする  
右上の「デベロッパー モード」をオンにする  
左上の「パッケージ化されていない拡張機能を読み込む」をクリックする  
展開したフォルダーを選択する  
「フォルダーの選択」をクリックする
※ここで「エラーマニフェスト ファイルが見つからないか、読み取ることができません」と表示された場合、選択したフォルダーが間違っているので、よく確認してください
```
# 🏄使い方
## 実行するとき
[リンガポルタ レッドゲートのログイン画面](https://w5.linguaporta.jp/user/seibido/)を開く  
IDとパスワードを入力する(保存されるので、2回目以降は入力済み)  
獲得したいスコアと回答までの遅延と正答率をスライダーを動かして設定する  
`スタート`ボタンをクリックする
### 中断するとき
`ログアウト`ボタンをクリックする
### 一時的にOFFにするとき
ログイン画面の「獲得するスコア」のスライダーを一番左にする
### 完全にOFFにするとき
Chromeの右上の・・・をクリックする  
`拡張機能`をクリックする  
`拡張機能を管理`をクリックする  
`リンガポルタ自動化・補助`のスイッチをオフにする  
#### 再びONにするとき
`リンガポルタ自動化・補助`のスイッチをオンにする
## バージョンアップするとき
導入方法と同じように操作する。
# 仕組み
## Q. どうして答えがわかるの?
A. 解答を共有しているから  
一番最初にその問題を正解した人はサーバーに答えを送信します。  
二番目以降の人は、サーバーから答えを受信して答えを取得します。
### 詳細
Webブラウザの拡張機能を使用している。  
サーバーに保存してある答えを取得して、回答している。サーバーに問題の答えが存在しない場合、問題を1回間違えると、正解を見ることができるので、それを取得し、サーバーに保存している。  
`拡張機能の管理`画面で以下のエラーが表示されるが、ページ遷移時のセキュリティ上の仕様なので、問題ない。
> Refused to run the JavaScript URL because it violates the following Content Security Policy directive: "script-src 'self' 'wasm-unsafe-eval' 'inline-speculation-rules' http://localhost:* http://127.0.0.1:*". Either the 'unsafe-inline' keyword, a hash ('sha256-...'), or a nonce ('nonce-...') is required to enable inline execution. Note that hashes do not apply to event handlers, style attributes and javascript: navigations unless the 'unsafe-hashes' keyword is present.
## 管理者にばれない仕組み
学習時間が管理者に報告されるので、回答するまでに、遅延を加えたり、正答率を下げたりすることができる。  
<sub>利用者と関連付けられた問題の情報と使用状況が製作者に送信されます。パスワードが製作者に送信されることはありません。</sub>
