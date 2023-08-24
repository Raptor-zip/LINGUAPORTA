//chrome.storage.local.clear();
console.log("status:拡張機能作動");
console.log("version:" + chrome.runtime.getManifest().version);
let page_transition = 1;
if (page_transition == 0) {
    console.log("ページ遷移オフ");
}
//ローカルストレージを取得する
chrome.storage.local.get(null, function (data) {
    //ローカルストレージを表示する
    console.info(JSON.stringify(data));

    let question_number;
    let question_type;
    let question_number_array = [];

    if (window.screen.width < 481) {
        //スマホ以下の画面サイズなら、いらない情報を非表示にする
        if (document.querySelector("#content") != null) {
            document.querySelector("#content").style.padding = "0px";
        }

        if (document.querySelector("#content-inner") != null) {
            document.querySelector("#content-inner").style.padding = "0px";
        }

        if (document.querySelector("#sound_flash") != null) {
            //ディクテーションの時の使うかもしれないから要検証
            document.querySelector("#sound_flash").style.display = "none";
        }
    }

    if (document.querySelector("#question_td") != null) {
        document.querySelector("#question_td").innerHTML = document.querySelector("#question_td").innerHTML.replace(/<br>/g, '');
    }



    //問題出題画面なら、問題の形式を取得する
    if (document.querySelector("#content-study > table > tbody > tr:nth-child(2) > td > div.bloc-resp.bloc-resp-lessonname") != null) {
        question_type = document.querySelector("#content-study > table > tbody > tr:nth-child(2) > td > div.bloc-resp.bloc-resp-lessonname").innerText.split(")")[1];
        if (window.innerWidth < 481) { //タブレット以下の画面サイズなら
            //いらない情報を非表示にする
            document.querySelector("#content-study > table > tbody > tr:nth-child(1)").style.display = "none";
            //いらない情報を非表示にする
            document.querySelector("#content-study > table > tbody > tr:nth-child(2) > td > div.bloc-resp.bloc-resp-lessonname").style.display = "none";
            //いらない情報を非表示にする
            document.querySelector("#content-study > table > tbody > tr:nth-child(3) > td").style.display = "none";
        }

        if (question_type == "単語の意味") {
            document.querySelector("#question_td > form > div.audioplayer-box").style.display = "none";
            document.querySelector("#qu01").style.display = "none";
        }

        if (document.getElementById("question_area") != null) {
            document.getElementById("question_area").style.margin = "";
        }
        if (document.querySelector("#true_msg") != null) {
            //GIF画像を非表示にする
            document.querySelector("#true_msg > img").style.display = "none";
        }
    } else {
        question_type = "一覧";
    }

    //ログイン画面の動作
    if (document.querySelector("#content-login > form > table > tbody > tr:nth-child(1) > td > input[type=text]") != null) {
        console.log("location:ログイン画面");
        //idとパスワードのテキストボックスの長さを合わせる
        document.querySelector("#content-login > form > table > tbody > tr:nth-child(1) > td > input[type=text]").style = "";
        document.querySelector("#content-login > br").remove();

        //設定画面が変更されたとき、または、初めに表示されたときの処理
        document.getElementById("content-login").onchange = () => {
            //スライダーのラベルを書き換える
            document.getElementById('current-value_late').innerText = document.getElementById('slider_late').value + "秒";
            document.getElementById('current-value_score').innerText = document.getElementById('slider_score').value + "点";
            document.getElementById('current-value_correct_answer_rate').innerText = Math.round(25 / (150 - document.getElementById('slider_correct_answer_rate').value) * 100) + "%";

            //正答率を取得する
            let set_wrong_question = [];
            for (let i = 0; i < Math.floor((125 - document.getElementById('slider_correct_answer_rate').value) / 25); i++) {
                set_wrong_question.push(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25);
            }
            for (let i = 1; i <= Math.floor((125 - document.getElementById('slider_correct_answer_rate').value) % 25); i++) {
                set_wrong_question.push(i);
            }

            //単元を取得する
            let set_run_unit = [];
            document.querySelectorAll('input[type=radio][name="unit_selection"]').forEach(radio => {
                if (radio.checked) {
                    if (radio.value == "word_meaning_selection_and_empty_replenishment") {
                        set_run_unit = ["単語の意味", "空所補充"];
                    } else if (radio.value == "empty_replenishment") {
                        set_run_unit = ["空所補充"];
                    } else if (radio.value == "word_meaning_selection") {
                        set_run_unit = ["単語の意味"];
                    } else {
                        console.error("エラー");
                    }
                }
            });
            //モードを取得する
            let set_score = -2;
            document.querySelectorAll('input[type=radio][name="mode_selection"]').forEach(radio => {
                if (radio.checked) {
                    //自動なら設定を表示する
                    if (radio.value == "auto") {
                        //classを付与して、隠すor表示する
                        document.getElementById("table_setting").removeAttribute("class");
                        document.getElementById("tr_setting_score").removeAttribute("class");
                        document.getElementById("tr_setting_late").removeAttribute("class");
                        document.getElementById("tr_setting_rate").removeAttribute("class");
                        set_score = Number(document.getElementById('slider_score').value);
                        //半自動なら設定を表示する
                    } else if (radio.value == "assist") {
                        document.getElementById("table_setting").removeAttribute("class");
                        document.getElementById("tr_setting_score").setAttribute("class", "display-none");
                        document.getElementById("tr_setting_late").setAttribute("class", "display-none");
                        document.getElementById("tr_setting_rate").setAttribute("class", "display-none");
                        set_score = -1;
                        //オフなら設定を表示しない
                    } else if (radio.value == "OFF") {
                        document.getElementById("table_setting").setAttribute("class", "display-none");
                        set_score = -2;
                    }
                }
            });
            chrome.storage.local.set({
                "id": document.querySelector("#content-login > form > table > tbody > tr:nth-child(1) > td > input[type=text]").value,
                "password": document.querySelector('#content-login > form > table > tbody > tr:nth-child(2) > td > input[type=password]').value,
                "set_score": set_score,
                "set_late": Number(document.getElementById('slider_late').value) * 1000,
                "set_wrong_question": set_wrong_question,
                "set_run_unit": set_run_unit
            }, function () { });
        };
        document.querySelector("#content-login > form > table > tbody > tr:nth-child(3)").remove();
        document.querySelector("#header").remove();

        let new_element;

        new_element = null;
        new_element = document.createElement("div");
        new_element.id = "mode_selection_div";
        new_element.style = "text-align: left;";
        new_element.innerHTML = "<p>学習状況</p><table style='table-layout:fixed;'><tr><th>スコア</th><th>全期間順位</th><th>正答率</th><th>時間/問</th></tr><tr><td id='score'>--</td><td id='rank'>--</td><td id='rate'>--</td><td id='score_per_min'>--</td></tr></table>";
        document.querySelector("#content-login").appendChild(new_element);

        new_element = null;
        new_element = document.createElement("div");
        new_element.id = "mode_selection_div";
        new_element.style = "text-align: left;";
        new_element.innerHTML = "<p title='全自動、半自動、OFF、スコア、遅延、正答率、単元を設定します'>設定</p><table style='table-layout:fixed; border:none;'><tr><td style='border:none;  text-align:center;'><label><input type='radio' name='mode_selection' value='auto' title='全自動' checked>全自動</label></td><td style='border:none; text-align:center;'><label><input type='radio' name='mode_selection' value='assist' title='補助(半自動)'>補助(半自動)</label></td><td style='border:none; text-align:center;'><label><input type='radio' name='mode_selection' value='OFF' title='OFF'>OFF</label</td></tr></table>";
        document.querySelector("#content-login").appendChild(new_element);

        new_element = null;
        new_element = document.createElement("div");
        new_element.id = "setting_div";
        new_element.innerHTML = "<table id='table_setting'><tr id='tr_setting_score'><th style='width:7em;'>獲得するスコア</th><td id='current-value_score'style='width:3em; border-right:none;'></td><td><input type='range' id='slider_score' min='25' max='300' step='25' value='100' style='width:100%' title='自動実行で獲得するスコアを選択します'></input></td></tr><tr id='tr_setting_late'><th>回答入力遅延</th><td id='current-value_late' style='border-right:none;'></td><td><input type='range' id='slider_late' min='0' max='20' step='1' value='8' style='width:100%' title='回答入力時の遅延を選択します(管理者に自動化ツールと判断されないようにするため)'></input></td></tr><tr id='tr_setting_rate'><th>正答率</th><td id='current-value_correct_answer_rate' style='border-right:none;'></td><td><input type='range' id='slider_correct_answer_rate' min='50' max='125' step='1' value='115' style='width:100%' title='正答率を選択します(サーバー上に答えがない場合は50%になります)(管理者に自動化ツールと判断されないようにするため)'></input></td></tr><tr><th>単元</th><td colspan='2' style='text-align:left !important;'><label><input type='radio' name='unit_selection' value='word_meaning_selection_and_empty_replenishment' title='単語の意味と空所補充' checked=''>単語の意味と空所補充</label><label><input type='radio' name='unit_selection' value='word_meaning_selection' title='単語の意味のみ'>単語の意味のみ</label><label><input type='radio' name='unit_selection' value='empty_replenishment' title='空所補充のみ'>空所補充のみ</label></td></tr></table>";
        document.querySelector("#content-login").appendChild(new_element);

        new_element = null;
        new_element = document.createElement("button");
        new_element.id = "start_button";
        new_element.innerText = "スタート";
        new_element.setAttribute('onclick', "document.querySelector('#content-login > form').submit();");
        document.querySelector("#content-login").appendChild(new_element);

        new_element = null;
        new_element = document.createElement("div");
        new_element.id = "github_link_div";
        new_element.style = "text-align: left;";
        new_element.innerHTML = "<a href='https://github.com/Raptor-zip/LINGUAPORTA/tree/main' class='bookmark source'><div class='bookmark-info'><div class='bookmark-text'><div class='bookmark-title'>《使い方》【Android・PC対応】リンガポルタ自動化ツール</div></div><div class='bookmark-href'><img src='https://github.com/fluidicon.png' class='icon bookmark-icon'>https://github.com/Raptor-zip/LINGUAPORTA/tree/main</div></div></a>";
        document.querySelector("#content-login").appendChild(new_element);

        if (data.id != null) {
            document.querySelector("#content-login > form > table > tbody > tr:nth-child(1) > td > input[type=text]").value = data.id;
        }
        if (data.password != null) {
            document.querySelector("#content-login > form > table > tbody > tr:nth-child(2) > td > input[type=password]").value = data.password;
        }
        if (data.score != null) {
            document.getElementById("score").innerText = data.score + "点";
        }
        if (data.rank != null) {
            document.getElementById("rank").innerText = data.rank + "位";
        }
        if (data.score != null && data.challenge_times != null) {
            document.getElementById("rate").innerText = Math.round(data.score / data.challenge_times * 100) + "%";
        }
        if (data.learning_time != null & data.score != null) {
            document.getElementById("score_per_min").innerText = Math.round(data.learning_time * 10 / data.score) / 10 + "秒";
        }
        if (data.configured_score != null) {
            document.querySelector("#slider_score").value = Math.round(data.learning_time * 10 / data.score) / 10 + "秒";
        }
        if (data.configured_late != null) {
            document.querySelector("#slider_late").value = Math.round(data.learning_time * 10 / data.score) / 10 + "秒";
        }
        if (data.configured_rate != null) {
            document.querySelector("#slider_correct_answer_rate").value = Math.round(data.learning_time * 10 / data.score) / 10 + "秒";
        }
        //onchangeイベントを発火させて、ラベルを表示させる
        document.getElementById("content-login").onchange();
    } else if (document.querySelector("#menu2 > dl > dd:nth-child(2)") != null) {
        //ホーム画面の処理
        console.log("location:ホーム画面");
        organize_chrome_storage_local();
        if (data.set_score > -2) {
            chrome.storage.local.set({
                "rank": document.querySelector("#minfo > table:nth-child(2) > tbody > tr:nth-child(3) > td > dl > dd:nth-child(2)").innerText.slice(0, -1)
            }, function () {
                //ログイン後に、得点・正答率・学習時間を取得するためにPORTFOLIOに移動する
                if (page_transition == 1) {
                    document.querySelector("#menu > ul > li:nth-child(3) > form").submit();
                }
            });
        }


    } else if (document.querySelector("#content-study > form > div > div:nth-child(2) > div.table-resp-col.study-col-button > input") != null) {
        //書籍選択画面の処理
        console.log("location:書籍選択画面");
        if (data.set_score > -2) {
            document.querySelector("#content-study > form > div > div:nth-child(2) > div.table-resp-col.study-col-button > input").click();
        }
    } else if (document.querySelector("#content-study > div.table-resp.table-unit-list") != null) {
        //学習ユニット選択画面の処理-----------------------------------------------------------------------------
        console.log("location:学習ユニット選択画面");
        organize_chrome_storage_local();
        if ("set_score" in data) {
            if (data.set_score == -1 || data.set_score > 0) {
                chrome.storage.local.set({
                    "wrong_question_queue": data.set_wrong_question,
                    "rank": document.querySelector("#rank_table_reference > tbody > tr:nth-child(2) > td:nth-child(2)").innerText.slice(0, -1),
                    "score": document.querySelector("#point_table_reference > tbody > tr > td:nth-child(2)").innerText.split("点")[0]
                    //rankとscoreはやる意味があんまりないけど、途中で切られると、rankとscoreが更新されないため、必要
                }, function () {
                    let i = 2;
                    let k = 0;
                    let l = 0;
                    while (i < 12 && k == 0) {
                        if (document.querySelector("#content-study > div.table-resp.table-unit-list > div:nth-child(" + i + ") > div.table-resp-col.col-unitname > div").innerText == "終了") { } else if (document.querySelector("#content-study > div.table-resp.table-unit-list > div:nth-child(" + i + ") > div.table-resp-col.col-unitname > div").innerHTML.indexOf("学習") != -1) {
                            let unit_name = document.querySelector("#content-study > div.table-resp.table-unit-list > div:nth-child(" + i + ") > div.table-resp-col.col-unitname > div > input").parentNode.parentNode.innerText;

                            function click_run_unit() {
                                k = 1;
                                l = i;
                                let j = Number(unit_name.split("-")[0].slice(1));
                                while (Number(unit_name.split("-")[1].split(")")[0]) >= j) {
                                    question_number_array.push(j);
                                    j++;
                                }
                                chrome.runtime.sendMessage({
                                    "id": data.id,
                                    "request_type": "get",
                                    "question_number": question_number_array
                                }, response => {
                                    console.log(JSON.stringify(response));
                                    loop();

                                    function setStorage(key, value) {
                                        return new Promise(function (resolve, reject) {
                                            chrome.storage.local.set({
                                                [key]: value
                                            }, function () {
                                                resolve();
                                            });
                                        });
                                    }
                                    async function loop() {
                                        if (response != undefined) {
                                            for (let m = 0; m < response.content.length; m++) {
                                                if (response.content[m][0] != "") {
                                                    //{a問題番号:[英語,日本語,空所補充の英語,単語並び替え,ディクテーション]}となるようにローカルストレージに連想配列を挿入する
                                                    await setStorage("a" + response.content[m][0], [response.content[m][1], response.content[m][2], response.content[m][3], response.content[m][4], response.content[m][5]]);
                                                }
                                            }
                                        }
                                        chrome.storage.local.set({
                                            //解き終わるまでにかかった時間を計算するために現在時刻を取得する
                                            "start_time": Date.now(),
                                            //解いた問題数を取得するために、解答済みの問題数を取得する
                                            "start_score": Number(document.querySelector("#content-study > div.table-resp.table-unit-list > div:nth-child(8) > div.table-resp-col.col-points").innerText.split("点")[0]),
                                            //間違えた問題数を取得するために、変数を定義する。
                                            "incorrect_answer_times": 0
                                        }, function () {
                                            //ローカルストレージの書き込みが終わったら、「学習」ボタンをクリックする
                                            document.querySelector("#content-study > div.table-resp.table-unit-list > div:nth-child(" + l + ") > div.table-resp-col.col-unitname > div > input").click();
                                        });
                                    }
                                });
                            }
                            if (data["set_run_unit"].includes("単語の意味") && unit_name.split(")")[1] == "単語の意味") {
                                //ログイン画面で、設定した単元に単語の意味が含まれている かつ 単元名が単語の意味ならclick_run_unit()を実行する
                                click_run_unit();
                            } else if (data["set_run_unit"].includes("空所補充") && unit_name.split(")")[1] == "空所補充") {
                                //ログイン画面で、設定した単元に空所補充が含まれている かつ 単元名が空所補充ならclick_run_unit()を実行する
                                click_run_unit();
                            }
                        } else {
                            console.error("エラー");
                        }
                        i++;
                    }
                    if (k == 0) {
                        let page_number = Number(document.querySelector("#content-study > div.pagination.unit_list_page").innerText.slice(9).split("/")[0].slice(0, -1));
                        document.querySelector("#content-study > div.pagination.unit_list_page > a:nth-child(" + (page_number + 1) + ")").click();
                    }
                });
            } else if (data.set_score == 0) {
                //ログアウトする前に、正答率を取得するためにPORTFOLIOに移動する
                if (page_transition == 1) {
                    document.querySelector("#menu > ul > li:nth-child(3) > form").submit();
                }
            }
        } else {
            console.error("エラー");
        }
    } else if (document.querySelector("#content-history > h2") != null) {
        //学習結果表示画面(PORTFOLIO)の処理------------------------------------------------------------------------------------
        console.log("location:学習結果表示画面");
        const [hours, minutes, seconds] = document.querySelector("#content-history > div:nth-child(5) > div.hist-resp-row.tr_ref > div.hist-resp-col.td_study_time").innerText.split(':');
        chrome.storage.local.set({
            "score": Number(document.querySelector("#content-history > div:nth-child(5) > div.hist-resp-row.tr_ref > div.hist-resp-col.td_point").innerText.split("/")[0]),
            "challenge_times": Number(document.querySelector("#content-history > div:nth-child(5) > div.hist-resp-row.tr_ref > div.hist-resp-col.td_challenge").innerText.slice(0, -1)),
            "learning_time": Number(hours) * 60 * 60 + Number(minutes) * 60 + Number(seconds)
        }, function () {
            chrome.runtime.sendMessage({
                "id": data.id,
                "request_type": "portfolio_record",
                "score": Number(document.querySelector("#content-history > div:nth-child(5) > div.hist-resp-row.tr_ref > div.hist-resp-col.td_point").innerText.split("/")[0]),
                "rank": data.rank,
                "challenge_times": Number(document.querySelector("#content-history > div:nth-child(5) > div.hist-resp-row.tr_ref > div.hist-resp-col.td_challenge").innerText.slice(0, -1)),
                "learning_time": Number(hours) * 60 * 60 + Number(minutes) * 60 + Number(seconds)
            }, response => {
                console.log(JSON.stringify(response));
                if (data.set_score > 0 || data.set_score == -1) {
                    //STUDYに移動する
                    if (page_transition == 1) {
                        document.querySelector("#menu > ul > li:nth-child(2) > form").submit();
                    }
                } else if (data.set_score == 0) {
                    //ログアウトする
                    if (page_transition == 1) {
                        document.querySelector("#btn-logout").click();
                    }
                } else if (data.set_score != -2) {
                    console.error("エラー");
                }
            });
        });
    } else if (question_type == "空所補充" && document.querySelector("#false_msg") == null && document.querySelector("#question_area > div.qu03 > input[type=text]") == null && document.querySelector("#question_td > form") != null && document.querySelector("#true_msg") == null) {
        console.log("location:空所補充,status:問題出題画面");
        if (data.set_score > 0) {
            question_number = document.querySelector("#question_td > form:nth-child(1) > b").innerHTML.slice(5) - 1 + Number(document.querySelector("#content-study > table > tbody > tr:nth-child(2) > td > div.bloc-resp.bloc-resp-lessonname").innerText.split(")")[0].slice(1).split("-")[0]);
            let unit_score = Number(document.querySelector("#content-study > table > tbody > tr:nth-child(2) > td > div:nth-child(6)").innerText.split("点")[0].slice(0, -1));

            //ランダムな8字の文字列を発生させる
            const c = "abcdefghijklmnopqrstuvwxyz";
            let r = "";
            for (var i = 0; i < 8; i++) {
                r += c[Math.floor(Math.random() * 26)];
            }
            //正答率を下げるためなら
            if (data["wrong_question_queue"].includes(unit_score + 1) == true) {
                //間違える
                document.querySelector("#tabindex1").value = r;
                setTimeout(() => {
                    if (page_transition == 1) {
                        document.querySelector("#question_td > form").submit();
                    }
                }, data.set_late);
            } else {
                key = "a" + question_number;
                if ([key] in data && data[key][2] != null && data[key][2] != "") {
                    document.querySelector("#tabindex1").value = data[key][2];
                } else {
                    document.querySelector("#tabindex1").value = r;
                }
                setTimeout(() => {
                    if (page_transition == 1) {
                        document.querySelector("#question_td > form").submit();
                    }
                }, data.set_late);
            }
        } else if (data.set_score == -1) {
            //半自動なら
            document.querySelector("#tabindex1").addEventListener('keypress', test_Event);

            function test_Event(e) {
                if (e.keyCode === 13) {
                    //エンターキーが押されたら
                    if (page_transition == 1) {
                        document.querySelector("#question_td > form").submit();
                    }
                }
                return false;
            }
        }
    } else if (question_type == "空所補充" && document.querySelector("#question_area") != null && document.querySelector("#ans_submit") != null) {
        console.log("location:空所補充,status:不正解画面");
        if (data.set_score > 0) {
            let unit_score = Number(document.querySelector("#content-study > table > tbody > tr:nth-child(2) > td > div:nth-child(6)").innerText.split("点")[0].slice(0, -1));
            let wrong_question_queue = data["wrong_question_queue"];
            wrong_question_queue.splice(data["wrong_question_queue"].indexOf(unit_score + 1), 1);
            chrome.storage.local.set({
                "incorrect_answer_times": data.incorrect_answer_times + 1,
                "wrong_question_queue": wrong_question_queue
            }, function () {
                if (data.set_score > 0) {
                    if (page_transition == 1) {
                        document.querySelector("#under_area > form:nth-child(2)").submit();
                    }
                }
            });
        }
    } else if (question_type == "空所補充" && document.querySelector("#question_area > div.qu03 > input[type=text]") != null) {
        console.log("location:空所補充,status:正解表示画面");
        question_number = document.querySelector("#question_td > form:nth-child(1) > b").innerHTML.slice(5) - 1 + Number(document.querySelector("#content-study > table > tbody > tr:nth-child(2) > td > div.bloc-resp.bloc-resp-lessonname").innerText.split(")")[0].slice(1).split("-")[0]);
        key = "a" + String(question_number);
        let answer_en = document.querySelector("#question_area > div.qu03 > input[type=text]").value.trim();
        if (key in data) {
            chrome.storage.local.set({
                [key]: [data[key][0], data[key][1], answer_en, data[key][3], data[key][4]]
            }, function () {
                if (data.set_score > -1) {
                    if (page_transition == 1) {
                        document.querySelector("#under_area > form").submit();
                    }
                }
            });
        } else {
            chrome.storage.local.set({
                [key]: [null, null, answer_en, null, null]
            }, function () {
                if (data.set_score > -1) {
                    if (page_transition == 1) {
                        document.querySelector("#under_area > form").submit();
                    }
                }
            });
        }
    } else if (question_type == "空所補充" && document.querySelector("#true_msg") != null && document.querySelector("#question_td > form:nth-child(1) > div.audioplayer-box") == null && document.querySelector("#under_area").innerText.indexOf("全問終了") == -1) {
        console.log("location:空所補充,status:正解後の画面");
        question_number = document.querySelector("#question_td > form:nth-child(1) > b").innerHTML.slice(5) - 1 + Number(document.querySelector("#content-study > table > tbody > tr:nth-child(2) > td > div.bloc-resp.bloc-resp-lessonname").innerText.split(")")[0].slice(1).split("-")[0]);
        chrome.runtime.sendMessage({
            "id": data.id,
            "request_type": "set",
            "content": [{
                "question_number": question_number,
                "question_type": question_type,
                "question_answer_1": document.querySelector("#drill_form > b").innerText.slice(1, -1),
                "question_answer_2": null,
            }]
        }, response => {
            console.log(JSON.stringify(response));
            if (data.set_score > -2) {
                if (page_transition == 1) {
                    document.querySelector("#under_area > form").submit();
                }
            }
        });
    } else if (question_type == "空所補充" && document.querySelector("#under_area").innerText.indexOf("全問終了") != -1) {
        console.log("location:空所補充,status:全問題終了画面");
        question_number = document.querySelector("#question_td > form:nth-child(1) > b").innerHTML.slice(5) - 1 + Number(document.querySelector("#content-study > table > tbody > tr:nth-child(2) > td > div.bloc-resp.bloc-resp-lessonname").innerText.split(")")[0].slice(1).split("-")[0]);
        chrome.runtime.sendMessage({
            "id": data.id,
            "request_type": "set",
            "content": [{
                "question_number": question_number,
                "question_type": question_type,
                "question_answer_1": document.querySelector("#drill_form > b").innerText.slice(1, -1),
                "question_answer_2": null,
            }]
        }, response => {
            console.log(JSON.stringify(response));
            const ua = window.navigator.userAgent.toLowerCase();
            let browser = "";
            if (ua.indexOf("edge") !== -1 || ua.indexOf("edga") !== -1 || ua.indexOf("edgios") !== -1) {
                browser = "Edge";
            } else if (ua.indexOf("opera") !== -1 || ua.indexOf("opr") !== -1) {
                browser = "Opera";
            } else if (ua.indexOf("samsungbrowser") !== -1) {
                browser = "Samsung Internet Browser";
            } else if (ua.indexOf("ucbrowser") !== -1) {
                browser = "UC";
            } else if (ua.indexOf("chrome") !== -1 || ua.indexOf("crios") !== -1) {
                browser = "Chrome";
            } else if (ua.indexOf("firefox") !== -1 || ua.indexOf("fxios") !== -1) {
                browser = "Firefox";
            } else if (ua.indexOf("safari") !== -1) {
                browser = "Safari";
            } else if (ua.indexOf("msie") !== -1 || ua.indexOf("trident") !== -1) {
                browser = "IE";
            } else {
                browser = "error";
            }
            let os = "";
            if (ua.indexOf("windows nt") !== -1) {
                os = "Windows";
            } else if (ua.indexOf("android") !== -1) {
                os = "Android";
            } else if (ua.indexOf("iphone") !== -1 || ua.indexOf("ipad") !== -1) {
                os = "iOS";
            } else if (ua.indexOf("mac os x") !== -1) {
                os = "Mac";
            } else {
                os = "error";
            }
            //設定をスプレッドシートに保存するために、データをbackground.jsに送信する
            chrome.runtime.sendMessage({
                "id": data.id,
                "request_type": "result_setting_record",
                "version": chrome.runtime.getManifest().version,
                "set_score": data.set_score,
                "set_late": data.set_late / 1000,
                "set_wrong_question": data.set_wrong_question.length,
                "set_run_unit": data.set_run_unit.join(),
                "run_unit": document.querySelector("#content-study > table > tbody > tr:nth-child(2) > td > div.bloc-resp.bloc-resp-lessonname").innerText.split(")")[1],
                "run_question_number": document.querySelector("#content-study > table > tbody > tr:nth-child(2) > td > div.bloc-resp.bloc-resp-lessonname").innerText.split("-")[0].slice(1),
                "get_score": (25 - data.start_score),
                "incorrect_answer_times": data.incorrect_answer_times,
                "duration": Math.round((Date.now() - data.start_time) / 1000),
                "browser": browser,
                "os": os,
                "user_agent": ua
            }, response => {
                console.log(JSON.stringify(response));
                if (data.set_score > -2) {
                    if ("set_score" in data) {
                        chrome.storage.local.set({
                            "configured_score": data.set_score,
                            "configured_late": data.set_late,
                            "configured_rate": data.set_wrong_question.length,
                            "set_score": data.set_score - 25
                        }, function () {
                            if (page_transition == 1) {
                                document.querySelector("#question_td > form:nth-child(3)").submit();
                            }
                        });
                    } else {
                        chrome.storage.local.set({
                            "configured_score": data.set_score,
                            "configured_late": data.set_late,
                            "configured_rate": data.set_wrong_question.length,
                            "set_score": 0
                        }, function () {
                            if (page_transition == 1) {
                                document.querySelector("#question_td > form:nth-child(3)").submit();
                            }
                        });
                        console.error("エラー");
                    }
                }
            });
        });
    } else if (question_type == "単語の意味" && document.querySelector("#drill_form") != null && document.querySelector("#commentary") == null && document.querySelector("#drill_form > font") == null) {
        console.log("location:単語の意味,status:問題出題画面");
        if (data.set_score > 0) {
            question_number = document.querySelector("#question_td > form:nth-child(1) > b").innerHTML.slice(5) - 1 + Number(document.querySelector("#content-study > table > tbody > tr:nth-child(2) > td > div.bloc-resp.bloc-resp-lessonname").innerText.split(")")[0].slice(1).split("-")[0]);
            let unit_score = Number(document.querySelector("#content-study > table > tbody > tr:nth-child(2) > td > div:nth-child(6)").innerText.split("点")[0].slice(0, -1));
            if (data["wrong_question_queue"].includes(unit_score + 1) == true) {
                //間違える
                document.querySelector("#answer_0_0").checked = true;
                setTimeout(() => {
                    if (page_transition == 1) {
                        document.querySelector("#question_td > form").submit();
                    }
                }, data.set_late);
            } else {
                key = "a" + question_number;
                if (data[key] != null) {
                    if (data[key][1] != null) {
                        let array = [document.querySelector("#answer_0_0").value, document.querySelector("#answer_0_1").value, document.querySelector("#answer_0_2").value, document.querySelector("#answer_0_3").value, document.querySelector("#answer_0_4").value];
                        if (array.indexOf(data[key][1]) == -1) {
                            document.querySelector("#answer_0_0").checked = true;
                        } else {
                            document.querySelector("#answer_0_" + array.indexOf(data[key][1])).checked = true;
                        }
                    } else {
                        document.querySelector("#answer_0_0").checked = true;
                    }
                } else {
                    document.querySelector("#answer_0_0").checked = true;
                }
                setTimeout(() => {
                    if (page_transition == 1) {
                        document.querySelector("#question_td > form").submit();
                    }
                }, data.set_late);
            }
        } else if (data.set_score == -1) {
            document.getElementsByName("answer[0]").forEach(
                r => r.addEventListener("change", e => {
                    if (page_transition == 1) {
                        document.querySelector("#question_td > form").submit();
                    }
                })
            );
        }
    } else if (question_type == "単語の意味" && document.querySelector("#drill_form > font") != null && document.querySelector("#true_msg") == null) {
        console.log("location:単語の意味,status:不正解画面");
        if (data.set_score > 0) {
            let unit_score = Number(document.querySelector("#content-study > table > tbody > tr:nth-child(2) > td > div:nth-child(6)").innerText.split("点")[0].slice(0, -1));
            let wrong_question_queue = data["wrong_question_queue"];
            wrong_question_queue.splice(data["wrong_question_queue"].indexOf(unit_score + 1), 1);
            chrome.storage.local.set({
                "incorrect_answer_times": data.incorrect_answer_times + 1,
                "wrong_question_queue": wrong_question_queue
            }, function () {
                if (page_transition == 1) {
                    document.querySelector("#under_area > form:nth-child(2)").submit();
                }
            });
        } else if (data.set_score == -1) {
            document.getElementsByName("answer[0]").forEach(
                r => r.addEventListener("change", e => {
                    if (page_transition == 1) {
                        document.querySelector("#question_td > form").submit();
                    }
                })
            );
        }
    } else if (question_type == "単語の意味" && document.querySelector("#drill_form") != null && document.querySelector("#true_msg") == null && document.querySelector("#under_area").innerText.indexOf("全問終了") == -1) {
        console.log("location:単語の意味,status:正解表示画面");
        question_number = document.querySelector("#question_td > form:nth-child(1) > b").innerHTML.slice(5) - 1 + Number(document.querySelector("#content-study > table > tbody > tr:nth-child(2) > td > div.bloc-resp.bloc-resp-lessonname").innerText.split(")")[0].slice(1).split("-")[0]);
        key = "a" + String(question_number);
        let answer_en = document.querySelector("#qu02").innerText;
        let answer_jp = document.querySelector("#drill_form").innerText.slice(3, -2);
        if (key in data) {
            chrome.storage.local.set({
                [key]: [answer_en, answer_jp, data[key][2], data[key][3], data[key][4]]
            }, function () {
                if (data.set_score > 0) {
                    if (page_transition == 1) {
                        document.querySelector("#under_area > form").submit();
                    }
                }
            });
        } else {
            chrome.storage.local.set({
                [key]: [answer_en, answer_jp, null, null, null]
            }, function () {
                if (data.set_score > 0) {
                    if (page_transition == 1) {
                        document.querySelector("#under_area > form").submit();
                    }
                }
            });
        }
    } else if (question_type == "単語の意味" && document.querySelector("#drill_form > font") != null && document.querySelector("#under_area").innerText.indexOf("全問終了") == -1) {
        console.log("location:単語の意味,status:正解画面");
        let answer_en = document.querySelector("#qu02").innerText;
        let answer_jp = document.querySelector("#drill_form").innerText.slice(4, -2);
        question_number = document.querySelector("#question_td > form:nth-child(1) > b").innerHTML.slice(5) - 1 + Number(document.querySelector("#content-study > table > tbody > tr:nth-child(2) > td > div.bloc-resp.bloc-resp-lessonname").innerText.split(")")[0].slice(1).split("-")[0]);
        key = "a" + String(question_number);
        chrome.runtime.sendMessage({
            "id": data.id,
            "request_type": "set",
            "content": [{
                "question_number": question_number,
                "question_type": question_type,
                "question_answer_1": answer_en,
                "question_answer_2": answer_jp
            }]
        }, response => {
            console.log(JSON.stringify(response));
            if (data.set_score > -2) {
                if (page_transition == 1) {
                    document.querySelector("#under_area > form").submit();
                }
            }
        });
    } else if (question_type == "単語の意味" && document.querySelector("#under_area").innerText.indexOf("全問終了") != -1) {
        console.log("location:単語の意味,status:全問題終了画面");
        let answer_en = document.querySelector("#qu02").innerText;
        let answer_jp = document.querySelector("#drill_form").innerText.slice(4);
        question_number = document.querySelector("#question_td > form:nth-child(1) > b").innerHTML.slice(5) - 1 + Number(document.querySelector("#content-study > table > tbody > tr:nth-child(2) > td > div.bloc-resp.bloc-resp-lessonname").innerText.split(")")[0].slice(1).split("-")[0]);
        chrome.runtime.sendMessage({
            "id": data.id,
            "request_type": "set",
            "content": [{
                "question_number": question_number,
                "question_type": question_type,
                "question_answer_1": answer_en,
                "question_answer_2": answer_jp
            }]
        }, response => {
            console.log(JSON.stringify(response));
            const ua = window.navigator.userAgent.toLowerCase();
            let browser = "";
            if (ua.indexOf("edge") !== -1 || ua.indexOf("edga") !== -1 || ua.indexOf("edgios") !== -1) {
                browser = "Edge";
            } else if (ua.indexOf("opera") !== -1 || ua.indexOf("opr") !== -1) {
                browser = "Opera";
            } else if (ua.indexOf("samsungbrowser") !== -1) {
                browser = "Samsung Internet Browser";
            } else if (ua.indexOf("ucbrowser") !== -1) {
                browser = "UC";
            } else if (ua.indexOf("chrome") !== -1 || ua.indexOf("crios") !== -1) {
                browser = "Chrome";
            } else if (ua.indexOf("firefox") !== -1 || ua.indexOf("fxios") !== -1) {
                browser = "Firefox";
            } else if (ua.indexOf("safari") !== -1) {
                browser = "Safari";
            } else if (ua.indexOf("msie") !== -1 || ua.indexOf("trident") !== -1) {
                browser = "IE";
            } else {
                browser = "error";
            }
            let os = "";
            if (ua.indexOf("windows nt") !== -1) {
                os = "Windows";
            } else if (ua.indexOf("android") !== -1) {
                os = "Android";
            } else if (ua.indexOf("iphone") !== -1 || ua.indexOf("ipad") !== -1) {
                os = "iOS";
            } else if (ua.indexOf("mac os x") !== -1) {
                os = "Mac";
            } else {
                os = "error";
            }
            //設定をスプレッドシートにPOSTするために、background.jsに送信する
            chrome.runtime.sendMessage({
                "id": data.id,
                "request_type": "result_setting_record",
                "version": chrome.runtime.getManifest().version,
                "set_score": data.set_score,
                "set_late": data.set_late / 1000,
                "set_wrong_question": data.set_wrong_question.length,
                "set_run_unit": data.set_run_unit.join(),
                "run_unit": document.querySelector("#content-study > table > tbody > tr:nth-child(2) > td > div.bloc-resp.bloc-resp-lessonname").innerText.split(")")[1],
                "run_question_number": document.querySelector("#content-study > table > tbody > tr:nth-child(2) > td > div.bloc-resp.bloc-resp-lessonname").innerText.split("-")[0].slice(1),
                "get_score": (25 - data.start_score),
                "incorrect_answer_times": data.incorrect_answer_times,
                "duration": Math.round((Date.now() - data.start_time) / 1000),
                "browser": browser,
                "os": os,
                "user_agent": ua
            }, response => {
                console.log(JSON.stringify(response));
                if (data.set_score > -2) {
                    if ("set_score" in data) {
                        chrome.storage.local.set({
                            "configured_score": data.set_score,
                            "configured_late": data.set_late,
                            "configured_rate": data.set_wrong_question.length,
                            "set_score": data.set_score - 25
                        }, function () {
                            if (page_transition == 1) {
                                document.querySelector("#question_td > form:nth-child(3)").submit();
                            }
                        });
                    } else {
                        chrome.storage.local.set({
                            "configured_score": data.set_score,
                            "configured_late": data.set_late,
                            "configured_rate": data.set_wrong_question.length,
                            "set_score": 0
                        }, function () {
                            if (page_transition == 1) {
                                document.querySelector("#question_td > form:nth-child(3)").submit();
                            }
                        });
                        console.error("エラー");
                    }
                }
            });
        });
    } else {
        console.error("エラー");
        console.log(document.querySelector("html").innerText);
    }

    function organize_chrome_storage_local() {
        //ローカルストレージの内容をリセットする(いらないデータを削除する)
        for (let key in data) {
            if (key !== "id" && key !== "password" && key !== "set_score" && key !== "set_late" && key !== "set_wrong_question" && key !== "set_run_unit" && key !== "score" && key !== "rank" && key !== "challenge_times" && key !== "learning_time" && key !== "wrong_question_queue") {
                chrome.storage.local.remove(key);
            }
        }
    }
});
