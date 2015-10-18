/*
    Hides all profile pictures on tweetdeck.twitter.com 

    Step 1:
        Open browser console in Chrome ( MAC OSX - CMD+Option+J )
        [ or right click anywhere on the page, 'Inspect Element' and hit esc]

    Step 2: 
        Paste code below in console. 

*/

var s_ajaxListener = new Object();
s_ajaxListener.tempOpen = XMLHttpRequest.prototype.open;
s_ajaxListener.tempSend = XMLHttpRequest.prototype.send;

s_ajaxListener.callback = function() {
    // runs on XHR events
    // to remove profile pics
    $('.tweet-avatar.avatar.pull-right').remove();
    $('.tweet').css({ 'padding-left': '5px' });
}

XMLHttpRequest.prototype.open = function(a, b) {
    if (!a) var a = '';
    if (!b) var b = '';
    s_ajaxListener.tempOpen.apply(this, arguments);
    s_ajaxListener.method = a;
    s_ajaxListener.url = b;
    if (a.toLowerCase() == 'get') {
        s_ajaxListener.data = b.split('?');
        s_ajaxListener.data = s_ajaxListener.data[1];
    }
}

XMLHttpRequest.prototype.send = function(a, b) {
    if (!a) var a = '';
    if (!b) var b = '';
    s_ajaxListener.tempSend.apply(this, arguments);
    if (s_ajaxListener.method.toLowerCase() == 'post') s_ajaxListener.data = a;
    s_ajaxListener.callback();
}