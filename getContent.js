

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

//중요한 부분에 포함되어도 되지만 부모로 가지면 안되는 태그: a

//아예 포함되면 안되는 태그: nav, footer, aside, header

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
    if(checkParents){
        point.style.border = "5px solid cyan";
    }
}

function shouldIncludeParentNode(currentNode){ //현재 노드가 중요한 본문일때 parentNode까지 중요한 본문에 포함이 되는지 확인 
    //should we go up to include parent node?
    console.log(currentNode.parentNode.childNodes);
    for(node of currentNode.parentNode.childNodes){
        if (node === currentNode || node.nodeType !== 1){  //nodeType이 1=> element_node(p, div 태그 포함)라는 의미
            continue
        }
        if (!checkChildren(node)){ //본문에 포함되면 안되는 것들이 있는지 확인, 있으면 올라갈수 없다.
            break;
        }
        else if(includeParagraph(node)){ //본문이 될 수 있는 text를 포함하는지 확인
            console.log(node);
            return true
        }
    }
    return false;
}

function includeParagraph(node){
    if (node.tagName[0] === 'H' || node.tagName[0] === 'P'){
        return true;
    }
    console.log(node);
    console.log(node.querySelectorAll('p, h1, h2, h3, h4, h5'));
    if(node.querySelectorAll('p, h1, h2, h3, h4, h5')[0] && node.querySelectorAll('p, h1, h2, h3, h4, h5')[0].textContent){
        return true;
    }
    if(node.querySelector('span')){
    }
    return false;
    //return node.tagName.includes('H') || node.tagName.includes('P') || node.querySelector('p');
}

function findParagraphs(doc){  //본문이라고 생각되는 태그들을 일차적으로 가져옴
    let paragraphNodes = [];
    /*if (doc.querySelector('main p')) {
        paragraphNodes.push(doc.querySelectorAll('main p'));
    }
    if (doc.querySelector('[role="main"] p')) {
        paragraphNodes.push(doc.querySelectorAll('[role="main"] p'));
    }
    if (doc.querySelector('.content p')) {
        paragraphNodes.push(doc.querySelectorAll('.content p'));
    }
    if (doc.querySelector('article p')) {
        paragraphNodes.push(doc.querySelectorAll('article p'));
    }
    if (doc.querySelector('#main p')) {
        paragraphNodes.push(doc.querySelectorAll('#main p'));
        //throw new Error('noop');
    }*/
    if (doc.querySelector('h1, h2, h3, h4, h5, p')){
        paragraphNodes.push(doc.querySelectorAll('h1, h2, h3, h4, h5, p'))
    }
    console.log(paragraphNodes);
    return paragraphNodes;
}

function setStartPoints(doc){  //탐색을 시작할 가장 아랫단계의 시작점들을 선별
    points = [];
    for(nodes of findParagraphs(doc)){
        for(node of nodes){
            if(!points.includes(node.parentNode) && checkParents(node)){
                points.push(node.parentNode);
            }
        }
    }
    console.log(points);
    return points;
}

function checkParents(node){ //footer tag나 aside 태그 node를 부모로 가지고 있으면 거른다.
    let banlist = ['FOOTER', 'ASIDE', 'A', 'HEADER', 'NAV', 'SPAN']
    while(node){
        if(banlist.includes(node.tagName)){
            return false;
        }
        node = node.parentNode;
    }
    return true;
}

function checkChildren(node){ //이 node가 본문에 포함되도 상관이 없는가?
    let banlist = ['FOOTER', 'ASIDE', 'HEADER', 'NAV', 'SPAN'];
    return banlist.includes(node.tagName) || node.querySelectorAll('footer', 'aside', 'header', 'nav')[0];
}