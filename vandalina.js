var responseReceived = true;
//$(document).ready(function (e) {
//    console.log("1");

//    chrome.tabs.getSelected(null, function (tab) {
//        var url = tab.url;
//        var title = tab.title;

//        if (url.indexOf("http") !== 0) {
//            console.log("2");
//            //showEditor(url, title);
//            window.close();
//        }
//        else {
//            console.log("3");
//            responseReceived = false;

//            chrome.tabs.sendRequest(tab.id, "getSelection", function (selection) {
//                responseReceived = true;
//                //showEditor(url, title, selection);
//                window.close();
//            });

//            setTimeout(function () {
//                console.log("4");
//                if (!responseReceived) {
//                    console.log("5");
//                    //showEditor(url, title);
//                    console.log(url);
//                    window.close();
//                }
//            }, 1000);

//        }
//    });
//});

function showEditor(url, title, selection, image) {
    if (!url) url = "";
    if (!title) title = "";
    if (!selection) selection = "";
    if (!image) image = "";

    var editorUrl = "http://thefcn.net/wp-admin/press-this.php?l" + encodeURIComponent(url) + "&t=" + encodeURIComponent(title) + "&s=" + encodeURIComponent(selection) + "&i=" + encodeURIComponent(image);
    var editorWidth = 980;
    var editorHeight = 520;

    if (typeof chrome != 'undefined') {
        chrome.windows.create({ "url": editorUrl, "width": editorWidth, "height": editorHeight, "type": "popup" });
    }
    else {
        Services.wm.getMostRecentWindow("navigator:browser").open(editorUrl, "", "width=" + editorWidth + ",height=" + editorHeight + ",resizeable=1");
    }
}

$(document).ready(function (e) {
    var form1 = $('#loginPanel1');
    var form2 = $('#loginPanel2');
    form2.css({ 'display': 'none', 'opacity': 0 })
    $('.postLoginForm').submit(function () {
        var t = $(this);
        var id = t.attr("data-form-id");
        var domain = $('[name="domain"]');
        if (id == 1) {
            if (domainValidate(domain.val())) {
                form1.css({ 'position': 'absolute' }).animate({ 'left': -200, 'opacity': 0 }, 1500);
                form2.css({ 'display': 'block' }).animate({ 'opacity': 1 }, 1000);
                $('#domain span').html(domain.val());
            } else {
                domain.focus();
                t.append('<div class="bilgiBalonu bln_Orange formerror"><span>Geçersiz site adresi.</span></div>');
                setTimeout(function () {
                    $('.formerror').remove();
                }, 3500);
                return false;
            }
        }
        return false;
    });
});

function domainValidate(val) {
    if (/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(val)) {
        return true;
    }
    else {
        return false;
    }
}
