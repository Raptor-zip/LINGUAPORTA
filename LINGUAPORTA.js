console.log("status:拡張機能作動");
chrome.storage.local.get(null, function (data) { console.info(data) });
let id;
let question_number;
let question_type;
let question_number_array = [];

const c = "abcdefghijklmnopqrstuvwxyz";
let r = "";
for (var i = 0; i < 8; i++) {
    r += c[Math.floor(Math.random() * 26)];
}

//{a問題番号:[英語,日本語,空所補充の英語,単語並び替え,ディクテーション]}

//chrome.storage.local.clear();

if (document.querySelector("#content-login > form > table > tbody > tr:nth-child(1) > td > input[type=text]") != null) {
    console.log("location:ログイン画面");
    chrome.storage.local.get(null, function (data) {
        if (data.id != null) {
            document.querySelector("#content-login > form > table > tbody > tr:nth-child(1) > td > input[type=text]").value = data.id;
        }
    });
    chrome.storage.local.get(null, function (data) {
        if (data.password != null) {
            document.querySelector("#content-login > form > table > tbody > tr:nth-child(2) > td > input[type=password]").value = data.password;
        }
    });
    document.querySelector("#content-login > form > table > tbody > tr:nth-child(3)").remove();

    let new_element = document.createElement("p");
    new_element.id = "current-value_score";
    new_element.innerText = "獲得するスコア: 50点";
    new_element.title = "自動実行で獲得するスコアを選択します";
    document.querySelector("#content-login").appendChild(new_element);

    new_element = document.createElement("input");
    new_element.type = "range";
    new_element.id = "slider_score";
    new_element.min = "0";
    new_element.max = "300";
    new_element.step = "25";
    new_element.value = "50";
    new_element.style = "width:100%;";
    new_element.title = "自動実行で獲得するスコアを選択します";
    document.querySelector("#content-login").appendChild(new_element);

    chrome.storage.local.set({ earn_plan_score: 50 }, function () { });

    new_element = null;
    new_element = document.createElement("p");
    new_element.id = "current-value_late";
    new_element.innerText = "回答入力遅延: 3秒";
    new_element.title = "回答入力時の遅延を選択します(管理者にロボットによる操作と判断されないようにするため)";
    document.querySelector("#content-login").appendChild(new_element);

    new_element = null;
    new_element = document.createElement("input");
    new_element.type = "range";
    new_element.id = "slider_late";
    new_element.min = "1";
    new_element.max = "10";
    new_element.step = "0.5";
    new_element.value = "3";
    new_element.style = "width:100%;";
    new_element.title = "回答入力時の遅延を選択します(管理者にロボットによる操作と判断されないようにするため)";
    document.querySelector("#content-login").appendChild(new_element);

    new_element = null;
    new_element = document.createElement("input");
    new_element.type = "button";
    new_element.id = "start_button";
    new_element.value = "スタート";
    new_element.setAttribute('onclick', "document.querySelector('#content-login > form').submit();");
    document.querySelector("#content-login").appendChild(new_element);

    document.querySelector("#content-login > form > table > tbody > tr:nth-child(1) > td > input[type=text]").onchange = () => {
        chrome.storage.local.set({ id: document.querySelector("#content-login > form > table > tbody > tr:nth-child(1) > td > input[type=text]").value }, function () { });
        id = document.querySelector("#content-login > form > table > tbody > tr:nth-child(1) > td > input[type=text]").value;
    };

    document.querySelector('#content-login > form > table > tbody > tr:nth-child(2) > td > input[type=password]').onchange = () => {
        chrome.storage.local.set({ password: document.querySelector('#content-login > form > table > tbody > tr:nth-child(2) > td > input[type=password]').value }, function () { });
    };
    document.getElementById("slider_score").onchange = () => {
        if (document.getElementById('slider_score').value != 0) {
            document.getElementById('current-value_score').innerText = "獲得するスコア: " + document.getElementById('slider_score').value + "点";
            chrome.storage.local.set({ earn_plan_score: Number(document.getElementById('slider_score').value) }, function () { });
        } else {
            document.getElementById('current-value_score').innerText = "自動実行なし";
            chrome.storage.local.set({ earn_plan_score: -1 }, function () { });
        }
    };
    document.getElementById("slider_late").onchange = () => {
        document.getElementById('current-value_late').innerText = "回答入力遅延: " + document.getElementById('slider_late').value + "秒";
        chrome.storage.local.set({ late: Number(document.getElementById('slider_late').value) * 1000 }, function () { });
    };
}


if (document.querySelector("#menu2 > dl > dd:nth-child(2)") != null) {
    console.log("location:ホーム画面");
    chrome.storage.local.get(null, function (data) {
        if (data.earn_plan_score != -1) {
            document.querySelector("#menu > ul > li:nth-child(2) > form").submit();
        }
    });
}

if (document.querySelector("#content-study > form > div > div:nth-child(2) > div.table-resp-col.study-col-button > input") != null) {
    console.log("location:書籍選択画面");
    chrome.storage.local.get(null, function (data) {
        if (data.earn_plan_score != -1) {
            document.querySelector("#content-study > form > div > div:nth-child(2) > div.table-resp-col.study-col-button > input").click();
        }
    });
}

if (document.querySelector("#content-study > div.table-resp.table-unit-list") != null) {
    console.log("location:学習ユニット選択画面");
    chrome.storage.local.get(null, function (data) {
        for (let key in data) {
            if (key !== "id" && key !== "password" && key !== "earn_plan_score" && key !== "late") {
                chrome.storage.local.remove(key);
            }
        }
        chrome.runtime.sendMessage({
            "id": data.id,
            "request_type": "record",
            "rank": document.querySelector("#rank_table_reference > tbody > tr:nth-child(2) > td:nth-child(2)").innerText.slice(0, -1),
            "score": document.querySelector("#point_table_reference > tbody > tr > td:nth-child(2)").innerText.split("点")[0]
        }, response => {
            console.log(JSON.stringify(response));
            if ("earn_plan_score" in data) {
                if (data.earn_plan_score != -1 && data.earn_plan_score != 0) {
                    let i = 2;
                    let k = 0;
                    let l = 0;
                    while (i < 12 && k == 0) {
                        if (document.querySelector("#content-study > div.table-resp.table-unit-list > div:nth-child(" + i + ") > div.table-resp-col.col-unitname > div").innerText == "終了") { } else if (document.querySelector("#content-study > div.table-resp.table-unit-list > div:nth-child(" + i + ") > div.table-resp-col.col-unitname > div").innerHTML.indexOf("学習") != -1) {
                            let unit_name = document.querySelector("#content-study > div.table-resp.table-unit-list > div:nth-child(" + i + ") > div.table-resp-col.col-unitname > div > input").parentNode.parentNode.innerText;
                            if (unit_name.split(")")[1] == "単語の意味" || unit_name.split(")")[1] == "空所補充") {
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
                                        for (let m = 0; m < response.content.length; m++) {
                                            if (response.content[m][0] != "") {
                                                await setStorage("a" + response.content[m][0], [response.content[m][1], response.content[m][2], response.content[m][3], response.content[m][4], response.content[m][5]]);
                                            }
                                        }
                                        document.querySelector("#content-study > div.table-resp.table-unit-list > div:nth-child(" + l + ") > div.table-resp-col.col-unitname > div > input").click();
                                    }
                                });
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
                } else if (data.earn_plan_score != -1) {
                    document.querySelector("#btn-logout").click();
                }
            } else {
                console.error("エラー");
            }
        });
    });
}

if (document.querySelector("#content-study > table > tbody > tr:nth-child(2) > td > div.bloc-resp.bloc-resp-lessonname") != null) {
    question_type = document.querySelector("#content-study > table > tbody > tr:nth-child(2) > td > div.bloc-resp.bloc-resp-lessonname").innerText.split(")")[1];
} else {
    question_type = "一覧";
}

if (question_type == "空所補充" && document.querySelector("#false_msg") == null && document.querySelector("#question_area > div.qu03 > input[type=text]") == null && document.querySelector("#question_td > form") != null && document.querySelector("#true_msg") == null) {
    console.log("location:空所補充,status:問題出題画面");
    chrome.storage.local.get(null, function (data) {
        question_number = document.querySelector("#question_td > form:nth-child(1) > b").innerHTML.slice(5) - 1 + Number(document.querySelector("#content-study > table > tbody > tr:nth-child(2) > td > div.bloc-resp.bloc-resp-lessonname").innerText.split(")")[0].slice(1).split("-")[0]);
        key = "a" + question_number;
        if ([key] in data && data[key][2] != null && data[key][2] != "") {
            document.querySelector("#tabindex1").value = data[key][2];
        } else {
            document.querySelector("#tabindex1").value = r;
        }
        setTimeout(() => {
            document.querySelector("#question_td > form").submit();
        }, data.late);
    });
} else if (question_type == "空所補充" && document.querySelector("#question_area") != null && document.querySelector("#ans_submit") != null) {
    console.log("location:空所補充,status:不正解画面");
    document.querySelector("#under_area > form:nth-child(2)").submit();
} else if (question_type == "空所補充" && document.querySelector("#question_area > div.qu03 > input[type=text]") != null) {
    console.log("location:空所補充,status:正解表示画面");
    question_number = document.querySelector("#question_td > form:nth-child(1) > b").innerHTML.slice(5) - 1 + Number(document.querySelector("#content-study > table > tbody > tr:nth-child(2) > td > div.bloc-resp.bloc-resp-lessonname").innerText.split(")")[0].slice(1).split("-")[0]);
    key = "a" + String(question_number);
    let answer_en = document.querySelector("#question_area > div.qu03 > input[type=text]").value.trim();
    chrome.storage.local.get(null, function (data) {
        if (key in data) {
            chrome.storage.local.set({
                [key]: [data[key][0], data[key][1], answer_en, data[key][3], data[key][4]]
            }, function () {
                document.querySelector("#under_area > form").submit();
            });
        } else {
            chrome.storage.local.set({
                [key]: [null, null, answer_en, null, null]
            }, function () {
                document.querySelector("#under_area > form").submit();
            });
        }
    });
} else if (question_type == "空所補充" && document.querySelector("#true_msg") != null && document.querySelector("#question_td > form:nth-child(1) > div.audioplayer-box") == null && document.querySelector("#under_area").innerText.indexOf("全問終了") == -1) {
    console.log("location:空所補充,status:正解後の画面");
    question_number = document.querySelector("#question_td > form:nth-child(1) > b").innerHTML.slice(5) - 1 + Number(document.querySelector("#content-study > table > tbody > tr:nth-child(2) > td > div.bloc-resp.bloc-resp-lessonname").innerText.split(")")[0].slice(1).split("-")[0]);
    chrome.storage.local.get(null, function (data) {
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
            document.querySelector("#under_area > form").submit();
        });
    });
} else if (question_type == "空所補充" && document.querySelector("#under_area").innerText.indexOf("全問終了") != -1) {
    console.log("location:空所補充,status:全問題終了画面");
    chrome.storage.local.get(null, function (data) {
        if ("earn_plan_score" in data) {
            chrome.storage.local.set({
                earn_plan_score: data.earn_plan_score - 25
            }, function () {
                document.querySelector("#question_td > form:nth-child(4)").submit();
            });
        } else {
            chrome.storage.local.set({
                earn_plan_score: 0
            }, function () {
                document.querySelector("#question_td > form:nth-child(4)").submit();
            });
            console.error("エラー");
        }

    });
} else if (question_type == "単語の意味" && document.querySelector("#drill_form") != null && document.querySelector("#commentary") == null && document.querySelector("#drill_form > font") == null) {
    console.log("location:単語の意味,status:問題出題画面");
    chrome.storage.local.get(null, function (data) {
        question_number = document.querySelector("#question_td > form:nth-child(1) > b").innerHTML.slice(5) - 1 + Number(document.querySelector("#content-study > table > tbody > tr:nth-child(2) > td > div.bloc-resp.bloc-resp-lessonname").innerText.split(")")[0].slice(1).split("-")[0]);
        key = "a" + question_number;
        if ([key] in data && data[key][1] != null) {
            let array = [document.querySelector("#answer_0_0").value, document.querySelector("#answer_0_1").value, document.querySelector("#answer_0_2").value, document.querySelector("#answer_0_3").value, document.querySelector("#answer_0_4").value];
            if (array.indexOf(data[key][1]) == -1) {
                document.querySelector("#answer_0_0").checked = true;
            } else {
                document.querySelector("#answer_0_" + array.indexOf(data[key][1])).checked = true;
            }
        } else {
            document.getElementById("answer_0_0").checked = true;
        }
        setTimeout(() => {
            document.querySelector("#question_td > form").submit();
        }, data.late);
    });
} else if (question_type == "単語の意味" && document.querySelector("#drill_form > font") != null && document.querySelector("#true_msg") == null) {
    console.log("location:単語の意味,status:不正解画面");
    document.querySelector("#under_area > form:nth-child(2)").submit();
} else if (question_type == "単語の意味" && document.querySelector("#drill_form") != null && document.querySelector("#true_msg") == null && document.querySelector("#under_area").innerText.indexOf("全問終了") == -1) {
    console.log("location:単語の意味,status:正解表示画面");
    question_number = document.querySelector("#question_td > form:nth-child(1) > b").innerHTML.slice(5) - 1 + Number(document.querySelector("#content-study > table > tbody > tr:nth-child(2) > td > div.bloc-resp.bloc-resp-lessonname").innerText.split(")")[0].slice(1).split("-")[0]);
    key = "a" + String(question_number);
    let answer_en = document.querySelector("#qu02").innerText;
    let answer_jp = document.querySelector("#drill_form").innerText.slice(3, -2);
    chrome.storage.local.get(null, function (data) {
        if (key in data) {
            chrome.storage.local.set({
                [key]: [answer_en, answer_jp, data[key][2], data[key][3], data[key][4]]
            }, function () {
                document.querySelector("#under_area > form").submit();
            });
        } else {
            chrome.storage.local.set({
                [key]: [answer_en, answer_jp, null, null, null]
            }, function () {
                document.querySelector("#under_area > form").submit();
            });
        }
    });
} else if (question_type == "単語の意味" && document.querySelector("#drill_form > font") != null && document.querySelector("#under_area").innerText.indexOf("全問終了") == -1) {
    console.log("location:単語の意味,status:正解画面");
    let answer_en = document.querySelector("#qu02").innerText;
    let answer_jp = document.querySelector("#drill_form").innerText.slice(4, -2);
    question_number = document.querySelector("#question_td > form:nth-child(1) > b").innerHTML.slice(5) - 1 + Number(document.querySelector("#content-study > table > tbody > tr:nth-child(2) > td > div.bloc-resp.bloc-resp-lessonname").innerText.split(")")[0].slice(1).split("-")[0]);
    key = "a" + String(question_number);
    chrome.storage.local.get(null, function (data) {
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
            document.querySelector("#under_area > form").submit();
        });
    });
} else if (question_type == "単語の意味" && document.querySelector("#under_area").innerText.indexOf("全問終了") != -1) {
    console.log("location:単語の意味,status:全問題終了画面");
    chrome.storage.local.get(null, function (data) {
        if ("earn_plan_score" in data) {
            chrome.storage.local.set({
                earn_plan_score: data.earn_plan_score - 25
            }, function () {
                document.querySelector("#question_td > form:nth-child(4)").submit();
            });
        } else {
            console.error("エラー");
            chrome.storage.local.set({
                earn_plan_score: 0
            }, function () {
                document.querySelector("#question_td > form:nth-child(4)").submit();
            });
        }
    });
}