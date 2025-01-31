# リンガポルタ完全自動化ツール【簡単インストール】

![Screenshot](https://raw.githubusercontent.com/Raptor-zip/LINGUAPORTA/main/image/readme.png)

COCET 2600(理工系学生のための必須英単語 2600)のLINGUAPORTA(リンガポルタ)を自動化するツール(ボット)です。

# ✨機能
獲得するスコア、回答入力遅延、正答率、単元を選んで、スタートボタンをクリックすると、自動で問題を解きます。

# 💻動作環境
- Google ChromeやMicrosoft EdgeなどのWebブラウザ

# 🛠️導入方法
1. [GitHubからZIPファイルをダウンロード](https://github.com/Raptor-zip/LINGUAPORTA/archive/refs/heads/main.zip)する。
2. ダウンロードしたファイル「LINGUAPORTA-main.zip」を右クリックして「すべて展開...」をクリックする。
3. Webブラウザを開く。
4. 右上のその他アイコン(…) > [拡張機能] > [[拡張機能の管理](chrome://extensions)] を選択する。
5. 右上の「デベロッパー モード」をオンにする。
6. 左上の「パッケージ化されていない拡張機能を読み込む」をクリックする。
7. 展開したフォルダーを選択する。
8. 「フォルダーの選択」をクリックする。

> ※「エラーマニフェスト ファイルが見つからないか、読み取ることができません」と表示された場合、選択したフォルダーが間違っているので、よく確認してください。

# 🏄使い方
## 実行するとき
1. [リンガポルタ レッドゲートのログイン画面](https://w5.linguaporta.jp/user/seibido/)を開く。
2. IDとパスワードを入力する（ブラウザに保存されるので、2回目以降は入力不要）。
3. 獲得したいスコアと回答までの遅延と正答率をスライダーを動かして設定する。
4. `スタート`ボタンをクリックする。

### 中断するとき
- `ログアウト`ボタンをクリックする。

### 一時的にOFFにするとき
- ログイン画面の「獲得するスコア」のスライダーを一番左にする。

### 完全にOFFにするとき
1. 右上のその他アイコン(…) > [拡張機能] > [[拡張機能の管理](chrome://extensions)] を選択する。
2. `リンガポルタ自動化・補助`のスイッチをオフにする。

## バージョンアップするとき
- 導入時と同じように操作する。
- バージョンは、「拡張機能の管理」から確認できる。

# ⚙️答えがわかる仕組み
- クラウドベースの解答共有システム  
  拡張機能の利用者は、解答をクラウド上で共有しています。最初に問題を解いたユーザーの正解がサーバーに保存され、  
  その後のユーザーはその保存された正解を参照して解答を得ることができます。

> `拡張機能の管理`画面で以下のエラーが表示されるが、ページ遷移時のセキュリティ上の仕様なので、問題ない。
> Refused to run the JavaScript URL because it violates the following Content Security Policy directive: "script-src 'self' 'wasm-unsafe-eval' 'inline-speculation-rules' http://localhost:* http://127.0.0.1:*". Either the 'unsafe-inline' keyword, a hash ('sha256-...'), or a nonce ('nonce-...') is required to enable inline execution. Note that hashes do not apply to event handlers, style attributes and javascript: navigations unless the 'unsafe-hashes' keyword is present.

## 管理者にばれない仕組み
- 学習時間が管理者に報告されるので、回答するまでに、遅延を加えたり、正答率を下げたりすることができる。  
<sub>利用者と関連付けられた問題の情報と使用状況が製作者に送信されます。パスワードが製作者に送信されることはありません。</sub>