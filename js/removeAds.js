function removeAds(node) {
    for (adNode of node.querySelectorAll('.adsbygoogle, [id^=google_ads]')) {
        while(!adNode.nextSibling){
            adNode = adNode.parentNode;
        }
        adNode.remove();
    }
}

removeAds(document);