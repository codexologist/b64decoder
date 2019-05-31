// ==UserScript==
// @name Snahp Automatic Base64 Decoder
// @namespace Violentmonkey Scripts
// @match *://forum.snahp.it/*
// @match *://*/*
// @version 0.0.0
// @updateURL https://github.com/codexologist/b64decoder/raw/master/auto_b64_decoder.user.js
// @downloadURL https://github.com/codexologist/b64decoder/raw/master/auto_b64_decoder.user.js
// ==/UserScript==

var SB64D = {};

SB64D.re_megaurl = /[^a-z0-9\+\=\:\/\n\.\#\!\-\_\t]/i;

SB64D.validateUrl = function(word)
{
    return SB64D.re_megaurl.exec(word)===null;
}

SB64D.decode64 = function(word)
{
    try
    { 
        var decoded = atob(word);
        console.log(word);
        console.log(decoded);
        if (!SB64D.validateUrl(decoded)) return false;
        console.log(1);
        var recoded = btoa(decoded);
        if (recoded == word) return decoded;
        return false;
    }
    catch (err) { return false; }
}

SB64D.decode = function(word)
{
    var decoded = SB64D.decode64(word);
    if (decoded)
    {
        return SB64D.decode(decoded);
    }
    return word;
}

$content = $(".content");
$content.each((index)=>{
    post = $content[index];
    for (const word of post.innerText.split(/\s|\n|:/))
    {
        if (word.length < 16) { continue; }
        var decoded = SB64D.decode(word);
        post.innerHTML = post.innerHTML.replace(word, decoded);
    }
})

