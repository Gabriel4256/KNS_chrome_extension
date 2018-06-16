

/*if(document.getElementsByTagName('article')[0]){
    document.getElementsByTagName("ARTICLE")[0].style.border = "5px solid gold"; 
}
if(document.getElementsByTagName('main')[0]){
    document.getElementsByTagName("main")[0].style.border = "5px solid orange"
}
if(document.getElementById('mainbar')){
    document.getElementById('mainbar').style.border = "5px solid silver"
}

if(document.getElementById('content')){
    document.getElementById('content').style.border = "5px solid red"
}
if(document.querySelector('[role="main"]')){
    document.querySelector('[role="main"]').style.border = "5px solid pink"
}

if(document.getElementsByTagName('p')[0]){
    document.getElementsByTagName('p')[-1].parentNode.style.border = "5px solid cyan"
}*/

let startPoints = setStartPoints(document);
let endPoints = [];

for(point of startPoints){
    while (shouldIncludeParentNode(point)){
        point = point.parentNode;
        //console.log(startPoint);
    }
    if(!endPoints.includes(point)){
        endPoints.push(point);
    }
}
console.log(endPoints);
for(point of endPoints){
    point.style.border = "5px solid cyan";
}

function shouldIncludeParentNode(currentNode){
    //should we go up to include another node?
    console.log(currentNode.parentNode.childNodes);
    for(node of currentNode.parentNode.childNodes){
        if (node === currentNode || node.nodeType !== 1){
            continue
        }
        else if(isParagraph(node)){
            console.log(node);
            return true
        }
    }
    return false;
}

function isParagraph(node){
    if (node.tagName[0] === 'H' || node.tagName[0] === 'P'){
        return true;
    }
    if(node.querySelector('p') && node.querySelector('p').textContent){
        return true; 
    }
    if(node.querySelector('span'))
    return false;
    //return node.tagName.includes('H') || node.tagName.includes('P') || node.querySelector('p');
}

function findParagraphs(doc){
    if (doc.querySelector('main p')) {
        return doc.querySelectorAll('main p');
    }
    else if (doc.querySelector('[role="main"] p')) {
        return doc.querySelectorAll('[role="main"] p');
    }
    else if (doc.querySelector('.content p')) {
        return doc.querySelectorAll('.content p');
    }
    else if (doc.querySelector('article p')) {
        return doc.querySelectorAll('article p');
    }
    else if (doc.querySelector('#main p')) {
        return doc.querySelectorAll('#main p');
        //throw new Error('noop');
    }    
}

function setStartPoints(doc){
    points = [];
    for(node of findParagraphs(doc)){
        if(!points.includes(node.parentNode)){
            points.push(node.parentNode);
        }
    }
    console.log(points);
    return points;
}