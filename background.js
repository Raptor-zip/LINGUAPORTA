const gasUrl = "https://script.google.com/macros/s/AKfycbxY8Jfgd3cbQcpMn189u-GBNH4Qw9z7WEuM0OqnEF9QLgNUEi6oJiLOhtsBkr2lEOKWZw/exec";

chrome.runtime.onMessage.addListener(
    function (request, sender, callback) {
        console.log(request);
        var json_asocc = request;
        fetch(gasUrl, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify(json_asocc)
        })
            .then(response => response.json())
            .then(data => {
                console.log(JSON.stringify(data));
                callback(data);
            });
        // 非同期を同期的に扱うためのtrue
        return true;
    }
);