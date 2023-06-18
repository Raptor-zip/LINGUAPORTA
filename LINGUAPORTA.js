console.log("status:拡張機能作動");
//コンソールを装飾する

//const id = "e72304";
//const password = "Opmxpj2789";

const id = "e72306";
const password = "bY6CjhEQ";

//ログイン画面
if (document.querySelector("#content-login > form > table > tbody > tr:nth-child(1) > td > input[type=text]") != null) {
    document.querySelector("#content-login > form > table > tbody > tr:nth-child(1) > td > input[type=text]").value = id;
    document.querySelector("#content-login > form > table > tbody > tr:nth-child(2) > td > input[type=password]").value = password;

    setTimeout(() => {
        document.querySelector("#content-login > form").submit();
    }, 1500);
}

//STUDYをホーム画面
if (document.querySelector("#menu2 > dl > dd:nth-child(2)") != null) {
    setTimeout(() => {
        document.querySelector("#menu > ul > li:nth-child(2) > form").submit();
    }, 1500);
}

//COSET 2600を選択する画面
if (document.querySelector("#content-study > form > div > div:nth-child(2) > div.table-resp-col.study-col-button > input") != null) {
    setTimeout(() => {
        document.querySelector("#content-study > form > div > div:nth-child(2) > div.table-resp-col.study-col-button > input").click();
    }, 1500);
}



//学習する項目を選択
if (document.querySelector("#content-study > div.table-resp.table-unit-list") != null) {
    for (let i = 2; i < 12; i++) {
        if (document.querySelector("#content-study > div.table-resp.table-unit-list > div:nth-child(" + i + ") > div.table-resp-col.col-unitname > div").innerText == "終了") {
            //終了なら
        } else if (document.querySelector("#content-study > div.table-resp.table-unit-list > div:nth-child(" + i + ") > div.table-resp-col.col-unitname > div").innerHTML.indexOf("学習") != -1) {
            let learning_unit_name = document.querySelector("#content-study > div.table-resp.table-unit-list > div:nth-child(" + i + ") > div.table-resp-col.col-unitname > div > input").parentNode.parentNode.innerText.split(")")[1];
            console.log(learning_unit_name);
            if (learning_unit_name == "単語の意味" || learning_unit_name == "空所補充") {
                setTimeout(() => {
                    document.querySelector("#content-study > div.table-resp.table-unit-list > div:nth-child(" + i + ") > div.table-resp-col.col-unitname > div > input").click();
                }, 1500);
            } else {
                //次のページに行く
            }
        } else {
            console.error("エラー");
        }
    }
    //ページ数を取得する
    let page_number = Number(document.querySelector("#content-study > div.pagination.unit_list_page").innerText.slice(9).split("/")[0].slice(0, -1));
    console.log(page_number);
    setTimeout(() => {
        document.querySelector("#content-study > div.pagination.unit_list_page > a:nth-child(" + (page_number + 1) + ")").click();
    }, 1500);
}
//155問目解答なしかもしれない

//ランダムな文字列を生成する
// 生成する文字列の長さ
var l = 8;
// 生成する文字列に含める文字セット
var c = "abcdefghijklmnopqrstuvwxyz";

var cl = c.length;
var r = "";
for (var i = 0; i < l; i++) {
    r += c[Math.floor(Math.random() * cl)];
}

chrome.storage.local.get(null, function (data) { console.info(data) });

/*
配列の中身
[英語,日本語,空所補充の英語,単語並び替え,ディクテーション]
  0    1     2           3           4
*/


/*
chrome.storage.local.set({ [question_number]: answer }).then(() => {
    console.log("Value is set");
});
*/

//chrome.storage.local.clear();
//chrome.storage.sync.clear();

let question_number;
let answer;
/*
if (document.querySelector("#content-study > font") != null) {
    console.log("status:学習ユニット選択画面");
    if (document.querySelector("#content-study > div.table-resp.table-unit-list > div:nth-child(3) > div.table-resp-col.col-unitname > div").innerText == "終了") {

    } else {
        document.querySelector("#content-study > div.table-resp.table-unit-list > div:nth-child(3) > div.table-resp-col.col-unitname > div > input").click();
    }
}


chrome.storage.local.set({ question_has_answer: 25 }, function () {
});
*/

//現在位置取得
let question_type;
if (document.querySelector("#content-study > table > tbody > tr:nth-child(2) > td > div.bloc-resp.bloc-resp-lessonname") != null) {
    question_type = document.querySelector("#content-study > table > tbody > tr:nth-child(2) > td > div.bloc-resp.bloc-resp-lessonname").innerText.split(")")[1];
    console.log(question_type);
} else {
    question_type = "一覧";
}

/*
if (document.querySelector("#content-study > table > tbody > tr:nth-child(2) > td > div.bloc-resp.bloc-resp-lessonname") == null) {
    alert("やばい");
}
*/

if (question_type == "空所補充" && document.querySelector("#false_msg") == null && document.querySelector("#question_area > div.qu03 > input[type=text]") == null && document.querySelector("#question_td > form") != null && document.querySelector("#true_msg") == null) {
    console.log("location:空所補充");
    console.log("status:問題出題画面");
    chrome.storage.local.get(null, function (data) {
        console.log("残り問題数:" + data.question_has_answer);
    });
    //console.log("答え未揃い:");
    setTimeout(() => {
        chrome.storage.local.get(null, function (data) {
            //問題番号を取得する
            question_number = document.querySelector("#question_td > form:nth-child(1) > b").innerHTML.slice(5) - 1 + Number(document.querySelector("#content-study > table > tbody > tr:nth-child(2) > td > div.bloc-resp.bloc-resp-lessonname").innerText.split(")")[0].slice(1).split("-")[0]);
            key = "a" + question_number;
            if ([key] in data && data[key][2] != null) {
                console.log("答えと一致");
                document.querySelector("#tabindex1").value = data[key][2];
            } else {
                //テキストボックスに文字を入力
                document.querySelector("#tabindex1").value = r;
            }
            //解答ボタンを押す&POSTリクエスト送信
            document.querySelector("#question_td > form").submit();
        });
    }, 4000);
} else if (question_type == "空所補充" && document.querySelector("#question_area") != null && document.querySelector("#ans_submit") != null) { //不正解画面なら
    console.log("location:空所補充");
    console.log("status:不正解画面");
    setTimeout(() => {
        //正解を見るボタンを押す&POSTリクエスト送信
        document.querySelector("#under_area > form:nth-child(2)").submit();
    }, 1500);
} else if (question_type == "空所補充" && document.querySelector("#question_area > div.qu03 > input[type=text]") != null) { //正解表示画面なら
    console.log("location:空所補充");
    console.log("status:正解表示画面");

    //問題番号を取得する
    question_number = document.querySelector("#question_td > form:nth-child(1) > b").innerHTML.slice(5) - 1 + Number(document.querySelector("#content-study > table > tbody > tr:nth-child(2) > td > div.bloc-resp.bloc-resp-lessonname").innerText.split(")")[0].slice(1).split("-")[0]);
    question_number = "a" + question_number;
    console.log("問題番号:" + question_number);
    //答え取得
    let answer_en = document.querySelector("#question_area > div.qu03 > input[type=text]").value.trim();
    console.log("英語答え:" + answer_en);


    chrome.storage.local.get(null, function (data) {
        if ("a" + question_number in data) {
            //存在するなら
            chrome.storage.local.set({
                [question_number]: [data["a" + question_number][0], data["a" + question_number][1], answer_en, data["a" + question_number][3], data["a" + question_number][4]]
            }, function () { });
        } else {
            //存在しないなら
            chrome.storage.local.set({
                [question_number]: [null, null, answer_en, null, null]
            }, function () { });
        }
    });

    chrome.storage.local.get(null, function (data) {
        chrome.storage.local.set({ question_has_answer: Number(data.question_has_answer - 1) }, function () { });
    });
    setTimeout(() => {
        //次の問題に行くボタンを押す&POSTリクエスト送信
        document.querySelector("#under_area > form").submit();

    }, 1000);
} else if (question_type == "空所補充" && document.querySelector("#true_msg") != null && document.querySelector("#question_td > form:nth-child(1) > div.audioplayer-box") == null && document.querySelector("#under_area").innerText.indexOf("全問終了") == -1) { //正解した次の画面なら
    console.log("location:空所補充");
    console.log("status:正解後の画面");
    setTimeout(() => {
        //次の問題に行くボタンを押す&POSTリクエスト送信
        //document.querySelector("#under_area > form").submit();
        //document.querySelector("#question_td > form:nth-child(4)").submit();
        document.querySelector("#under_area > form").submit();
    }, 0);
    //}, 500);
} else if (question_type == "空所補充" && document.querySelector("#under_area").innerText.indexOf("全問終了") != -1) { //一番最後の画面なら
    console.log("location:空所補充");
    console.log("status:全ての問題が終了した画面");
    setTimeout(() => {
        document.querySelector("#question_td > form:nth-child(4)").submit();
    }, 500);

} else if (question_type == "ディクテーション" && document.querySelector("#question_td > form > div.audioplayer-box") != null && document.querySelector("#qu01") == null) {
    console.log("location:ディクテーション");
    console.log("status:問題出題画面");
    //ディクテーションの問題画面なら
    document.querySelector("#tabindex1").value = r;
    setTimeout(() => {
        //次の問題に行くボタンを押す&POSTリクエスト送信
        document.querySelector("#question_td > form").submit();
    }, 500);
} else if (question_type == "単語の意味" && document.querySelector("#drill_form") != null && document.querySelector("#commentary") == null && document.querySelector("#drill_form > font") == null) {
    console.log("location:単語の意味");
    console.log("status:問題出題画面");
    //単語の意味-問題出題画面なら
    chrome.storage.local.get(null, function (data) {
        //問題番号を取得する
        question_number = document.querySelector("#question_td > form:nth-child(1) > b").innerHTML.slice(5) - 1 + Number(document.querySelector("#content-study > table > tbody > tr:nth-child(2) > td > div.bloc-resp.bloc-resp-lessonname").innerText.split(")")[0].slice(1).split("-")[0]);
        key = "a" + question_number;
        if ([key] in data && data[key][1] != null) {
            console.log("答えと一致");
            let array = [document.querySelector("#answer_0_0").value, document.querySelector("#answer_0_1").value, document.querySelector("#answer_0_2").value, document.querySelector("#answer_0_3").value, document.querySelector("#answer_0_4").value];
            console.log("#answer_0_" + array.indexOf(data[key][1]));
            console.log(data[key][1]);
            console.log(array);
            if (array.indexOf(data[key][1]) == -1) {
                alert("おかしい");
            } else {
                document.querySelector("#answer_0_" + array.indexOf(data[key][1])).checked = true;
            }
        } else {
            console.log("答えと不一致");
            //テキストボックスに文字を入力
            document.getElementById("answer_0_0").checked = true;
        }
        //解答ボタンを押す&POSTリクエスト送信
    });
    setTimeout(() => {
        document.querySelector("#question_td > form").submit();
    }, 2000);
} else if (question_type == "単語の意味" && document.querySelector("#drill_form > font") != null && document.querySelector("#true_msg") == null) {
    console.log("location:単語の意味");
    console.log("status:不正解画面");
    //単語の意味-間違えた画面なら
    setTimeout(() => {
        document.querySelector("#under_area > form:nth-child(2)").submit();
    }, 1000);

} else if (question_type == "単語の意味" && document.querySelector("#drill_form") != null && document.querySelector("#true_msg") == null && document.querySelector("#under_area").innerText.indexOf("全問終了") == -1) {
    console.log("location:単語の意味");
    console.log("status:答え表示画面");
    setTimeout(() => {
        //問題番号を取得する
        question_number = document.querySelector("#question_td > form:nth-child(1) > b").innerHTML.slice(5) - 1 + Number(document.querySelector("#content-study > table > tbody > tr:nth-child(2) > td > div.bloc-resp.bloc-resp-lessonname").innerText.split(")")[0].slice(1).split("-")[0]);
        question_number = "a" + question_number;
        console.log("問題番号:" + question_number);
        //答えを取得する

        let answer_en = document.querySelector("#qu02").innerText;
        console.log("英語答え:" + answer_en);
        let answer_jp = document.querySelector("#drill_form").innerText.slice(3, -2);
        console.log("日本語答え:" + answer_jp);


        chrome.storage.local.get(null, function (data) {
            if ("a" + question_number in data) {
                //存在するなら
                chrome.storage.local.set({
                    [question_number]: [answer_en, answer_jp, data["a" + question_number][2], data["a" + question_number][3], data["a" + question_number][4]]
                }, function () { });
            } else {
                //存在しないなら
                chrome.storage.local.set({
                    [question_number]: [answer_en, answer_jp, null, null, null]
                }, function () { });
            }
            document.querySelector("#under_area > form").submit();
        });
    }, 1000);
} else if (question_type == "単語の意味" && document.querySelector("#drill_form > font") != null && document.querySelector("#under_area").innerText.indexOf("全問終了") == -1) {
    console.log("location:単語の意味");
    console.log("status:正解画面");
    //正解画面なら
    let answer_en = document.querySelector("#qu02").innerText;
    console.log("英語答え:" + answer_en);
    let answer_jp = document.querySelector("#drill_form").innerText.slice(4, -2);
    console.log("日本語答え:" + answer_jp);
    chrome.storage.local.get(null, function (data) {
        if ("a" + question_number in data) {
            //存在するなら
            chrome.storage.local.set({
                [question_number]: [answer_en, answer_jp, data["a" + question_number][2], data["a" + question_number][3], data["a" + question_number][4]]
            }, function () { });
        } else {
            //存在しないなら
            chrome.storage.local.set({
                [question_number]: [answer_en, answer_jp, null, null, null]
            }, function () { });
        }
    });
    setTimeout(() => {
        document.querySelector("#under_area > form").submit();
    }, 1000);
} else if (question_type == "単語の意味" && document.querySelector("#under_area").innerText.indexOf("全問終了") != -1) { //一番最後の画面なら
    console.log("location:単語の意味");
    console.log("status:全ての問題が終了した画面");
    setTimeout(() => {
        document.querySelector("#question_td > form:nth-child(4)").submit();
    }, 1000);
}
