# リンガポルタ自動化ボット
リンガポルタのCOCET2600を自動化するボット(BOT)です。
「単語の意味」と「空所補充」に対応しています。
スマホ非対応 新しくソフトをインストールする必要なし
# 必須環境
Windows or Mac  
Google Chrome(以下Chrome)
# 初期設定
*上のファイルをダウンロードする*  
Chromeを開く  
右上の・・・をクリックする  
「拡張機能」をクリックする  
「拡張機能を管理」をクリックする  
右上の「デベロッパー モード」をオンにする  
左上の「パッケージ化されていない拡張機能を読み込む」をクリックする  
_5_ で作ったフォルダーを選択する  
「フォルダーの選択」をクリックする  
# 使い方
## 実行するとき
[リンガポルタ レッドゲートのログイン画面](https://w5.linguaporta.jp/user/seibido/)を開く  
IDとパスワードを入力する(2回目以降は入力済み)  
獲得したい点数をスライダーを動かして設定する  
「スタート」ボタンをクリックする
## OFFにするとき
### OFFにするとき
ログイン画面の「獲得するスコア」のスライダーを一番左にする
### 完全にOFFにするとき
Chromeの[拡張機能を管理](chrome://extensions/)を開く(以下の方法でも開ける)
右上の・・・をクリックする  
「拡張機能」をクリックする  
「拡張機能を管理」をクリックする  
「リンガポルタ自動化」のスイッチをオフにする  
## 再びONにするとき
「リンガポルタ自動化」のスイッチをオンにする
## 更新するとき



# 仕組み
単語の意味と空所補充では、問題を1回間違えると、正解を見ることができる。  
これを利用して、1回目に解くときは故意に間違え、正解をデータベースに保存し、2回目に解くときに、保存された正解から回答を入力する。
サーバーにあるデータベースに保存し、データベースに既に答えがあるときは、それを使用する。
## 管理者にばれない仕組み  
学習時間が管理者に報告されるので、回答するまでに遅延を加えることができる。
遅延は設定で変更できる。

利用者と関連付けられた問題の情報と使用状況が製作者に送信されます。
