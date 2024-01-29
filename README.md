# リンガポルタ完全自動化・補助ツール【難しいインストールなし】
![Screenshot](https://raw.githubusercontent.com/Raptor-zip/LINGUAPORTA/main/image/readme.png)
COCET 2600(理工系学生のための必須英単語 2600)のLINGUAPORTA(リンガポルタ)を自動化または、補助をするツール(ボット)です。  
# 機能
## 自動化
獲得するスコア、回答入力遅延、正答率、単元を選んで、スタートボタンをクリックすると、自動で問題を解きます。  
## 補助
単語の意味で、`回答する`を押す必要をなくするために、選択肢を押すだけで、回答できるようします。  
空所補充で、`回答する`を押す必要をなくすために、エンターキーを押すだけで、回答できるようにします。  
自動で書籍、学習ユニットを選択します。  
正解後に表示される画面で、`次の問題へ`を自動でクリックします。  
スマホで使用するときに、スクロールする必要がなくなります。  
# 必須環境
`Android` **[Kiwi Browser](https://play.google.com/store/apps/details?id=com.kiwibrowser.browser)**  
※Google ChromeやSafariだと拡張機能を実行できないので、Kiwi Browserなどの拡張機能が実行できるアプリが必要  
`Windows` Google Chrome または Edge  
`Mac` Google Chrome または Edge  
# 導入方法
## PCの場合
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
※LINGUAPORTA.crxはAndroidのみ使用していて、PCでは使用していない
## Androidの場合
```
右上の「Go to file」をタップする  
「LINGUAPORTA.crx」をタップする  
右上の「・・・」をタップする
「Download」をタップする  
Kiwi Browserを開く  
右上の・・・をタップする  
「拡張機能」をタップする  
右上の「デベロッパー モード」をオンにする  
「+ (from .zip/.crx/.user.js)」をタップする  
ダウンロードした「LINGUAPORTA.crx」を選択する  
```
# 使い方
## 実行するとき
[リンガポルタ レッドゲートのログイン画面](https://w5.linguaporta.jp/user/seibido/)を開く  
IDとパスワードを入力する(保存されるので、2回目以降は入力済み)  
獲得したいスコアと回答までの遅延と正答率をスライダーを動かして設定する  
`スタート`ボタンをクリックする
### 一時的にOFFにするとき
ログイン画面の「獲得するスコア」のスライダーを一番左にする
### 完全にOFFにするとき
Chromeの右上の・・・をクリックする  
`拡張機能`をクリックする  
`拡張機能を管理`をクリックする  
`リンガポルタ自動化`のスイッチをオフにする  
#### 再びONにするとき
`リンガポルタ自動化`のスイッチをオンにする
## バージョンアップするとき
導入方法と同じように操作する。
# 仕組み
Webブラウザの拡張機能を使用している。  
サーバーに保存してある答えを取得して、回答している。サーバーに問題の答えが存在しない場合、問題を1回間違えると、正解を見ることができるので、それを取得し、サーバーに保存している。  
`拡張機能の管理`画面で以下のエラーが表示されるが、ページ遷移時のセキュリティ上の仕様なので、問題ない。
> Refused to run the JavaScript URL because it violates the following Content Security Policy directive: "script-src 'self' 'wasm-unsafe-eval' 'inline-speculation-rules' http://localhost:* http://127.0.0.1:*". Either the 'unsafe-inline' keyword, a hash ('sha256-...'), or a nonce ('nonce-...') is required to enable inline execution. Note that hashes do not apply to event handlers, style attributes and javascript: navigations unless the 'unsafe-hashes' keyword is present.
## 管理者にばれない仕組み
学習時間が管理者に報告されるので、回答するまでに、遅延を加えたり、正答率を下げたりすることができる。  
<sub>利用者と関連付けられた問題の情報と使用状況が製作者に送信されます。パスワードが製作者に送信されることはありません。</sub>
