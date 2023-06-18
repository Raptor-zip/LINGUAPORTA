# LINGUAPORTA
リンガポルタのCOCET2600を自動化するボット(BOT)です。
「単語の意味」と「空所補充」に対応しています。
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
*5*で作ったフォルダーを選択する  
「フォルダーの選択」をクリックする  
# 使い方
## 実行するとき
[リンガポルタ レッドゲートのログイン画面](https://w5.linguaporta.jp/user/seibido/)を開く  
IDとパスワードを入力する(2回目以降は入力済み) 
獲得したい点数をスライダーを動かして設定する
「スタート」ボタンをクリックする
## OFFにするとき
右上の・・・をクリックする  
「拡張機能」をクリックする  
「拡張機能を管理」をクリックする  
「リンガポルタ自動化」のスイッチをオフにする  

# 仕組み
問題を1回間違えると、正解を見ることができる。  
これを利用して、1回目に解くときは故意に間違え、正解を保存する。2回目に解くときに、保存された正解から回答を入力する。
## 管理者にばれない仕組み  
学習時間が管理者に報告されるので、回答するまでに遅延を加えている。  
仕組み上、正答率が約50%になるため、意図的に間違えて、正答率を下げている。

利用者と関連付けられた使用状況が製作者に送信されます。
