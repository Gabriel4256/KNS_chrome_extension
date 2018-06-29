function removeAds(node) {
    let bannedList = { className: 'adsbygoogle' };
    for (node of node.querySelectorAll('.adsbygoogle')) {
        node.remove();
    }
    for (node of node.querySelectorAll('[id^=google_ads]')){
        node.remove();
    }
}

removeAds(document);