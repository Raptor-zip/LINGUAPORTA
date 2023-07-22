# リンガポルタ完全自動化ツール【1クリックで完結】
COCET 2600(理工系学生のための必須英単語 2600)のLINGUAPORTA(リンガポルタ)を自動化するボット(BOT)です。  
書籍(COCET 2600)の選択、学習する単元の選択、問題の回答をすべて自動化します。  
「単語の意味」と「空所補充」の問題を自動で解きます。Webブラウザの拡張機能を使用しています。
# 必須環境
## スマホの場合
android(動作確認済み)  
[Kiwi Browser](https://play.google.com/store/apps/details?id=com.kiwibrowser.browser)
※Google ChromeやSafariだと拡張機能を実行できないので、Kiwi Browserなどの拡張機能が実行できるアプリが必要
## PCの場合(Windows,Macで動作確認済み)  
Google Chrome または Edge
# 導入方法
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
※LINGUAPORTA.crx以外はPCのみ使用していて、Androidでは使用していない
## PCの場合
```
右上の「Code」をクリックする  
「Download ZIP」をクリックする  
ダウンロードしたファイルを展開する  
Chromeを開く  
右上の・・・をクリックする  
「拡張機能」をクリックする  
「拡張機能を管理」をクリックする  
右上の「デベロッパー モード」をオンにする  
左上の「パッケージ化されていない拡張機能を読み込む」をクリックする  
展開したフォルダーを選択する  
「フォルダーの選択」をクリックする
```
※LINGUAPORTA.crxはAndroidのみ使用していて、PCでは使用していない
# 使い方
## 実行するとき
[リンガポルタ レッドゲートのログイン画面](https://w5.linguaporta.jp/user/seibido/)を開く  
IDとパスワードを入力する(2回目以降は入力済み)  
獲得したい点数と回答までの遅延をスライダーを動かして設定する  
「スタート」ボタンをクリックする
### 一時的にOFFにするとき
ログイン画面の「獲得するスコア」のスライダーを一番左にする
### 完全にOFFにするとき
Chromeの右上の・・・をクリックする  
「拡張機能」をクリックする  
「拡張機能を管理」をクリックする  
「リンガポルタ自動化」のスイッチをオフにする  
#### 再びONにするとき
「リンガポルタ自動化」のスイッチをオンにする
## バージョンアップするとき
導入方法と同じように操作する。
# 仕組み
データベースサーバーに保存してある答えを取得して、回答している。  
サーバーに問題の答えが存在しない場合、問題を1回間違えると、正解を見ることができるので、1回目に解くときは故意に間違え、正解を取得し、サーバーに保存している。
## 管理者にばれない仕組み
学習時間が管理者に報告されるので、回答するまでに、設定した遅延を加えることができる。  
※チャレンジ回数と学習した問題数が管理者に報告されるので、正答率100%だとばれます。手作業で、故意に間違え、正答率を下げることを推奨。  

他のLINGUAPORTAツールを同時に使用することはできません。  
<sub>利用者と関連付けられた問題の情報と使用状況が製作者に送信されます。パスワードが製作者に送信されることはありません。</sub>
