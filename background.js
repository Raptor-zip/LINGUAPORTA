const gasUrl = "https://script.google.com/macros/s/AKfycbw7HtwqpXNQ-MHIjurYNrbCZR9pVZ5kdprn2SpH8VDDW_cfozMLGHKMguFCfY2wClCbVg/exec";

chrome.runtime.onMessage.addListener(
    function (request, sender, callback) {
        console.log(request);
        console.info(JSON.stringify(request));

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
                console.log(data);
                console.log(JSON.stringify(data));
                callback(data);
            })
            .catch(error => {
                // ネットワークエラーでも !response.ok でもここで処理できる
                console.error(error);
                console.error(error.toString());
                callback(error.toString());
            });
        // 非同期を同期的に扱うためのtrue
        return true;
    }
);
