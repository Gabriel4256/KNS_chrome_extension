

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

for(startPoint of startPoints){
    /*while (shouldIncludeParentNode(startPoint)){
        startPoint = startPoint.parentNode;
        //console.log(startPoint);
    }*/
    if(!endPoints.includes(startPoint)){
        //TODO: 결과로 나온 endpoints들 합치기
        
        endPoints.push(startPoint);
    }
}
console.log("endPoints: ");
console.log(endPoints);
for(point of endPoints){
    if(!checkParents(point)){
        point.style.border = "5px solid crimson";
    }
}
console.log(getCommonAncestor(endPoints))
getCommonAncestor(endPoints).style.border = "5px solid cyan";

function shouldIncludeParentNode(currentNode){ //현재 노드가 중요한 본문일때 parentNode까지 중요한 본문에 포함이 되는지 확인 
    //should we go up to include parent node?
    for(node of currentNode.parentNode.childNodes){
        if (node === currentNode || node.nodeType !== 1){  //nodeType이 1=> element_node(p, div 태그 포함)라는 의미
            continue
        }
        if (checkChildren(node)){ //본문에 포함되면 안되는 것들이 있는지 확인, 있으면 올라갈수 없다.
            break;
        }
        else if(includeParagraph(node)){ //본문이 될 수 있는 text를 포함하는지 확인
            return true
        }
    }
    return false;
}

function includeParagraph(node){
    if (node.tagName[0] === 'H' || node.tagName[0] === 'P'){
        return true;
    }
    if(node.querySelectorAll('p, h1, h2, h3, h4, h5')[0] && node.querySelectorAll('p, h1, h2, h3, h4, h5')[0].textContent){
        return true;
    }
    if(node.querySelector('span')){
    }
    return false;
    //return node.tagName.includes('H') || node.tagName.includes('P') || node.querySelector('p');
}

function findParagraphNodes(doc){  //본문이라고 생각되는 태그들을 일차적으로 가져옴
    let paragraphNodes = [];
    let meantToBeRemoved = [];
    let docs = [doc];
    if(doc.querySelector('iframe, frame')){
        for(frameDoc of doc.querySelectorAll('iframe, frame')){
            if(frameDoc.contentDocument){
                docs.push(frameDoc.contentDocument);
            }
        }
    }
    for(targetDoc of docs){
        if (targetDoc.querySelector('h1, h2, h3, h4, h5, p')){
            for(node of targetDoc.querySelectorAll('h1, h2, h3, h4, h5, p')){
                if(function(node){
                    for (child of node.childNodes) {
                        if (child.tagName === "A" && (!child.nextSibling || (child.nextSibling.nodeType!=3))
                        ) {
                            console.log(child);
                            return false;
                        }
                    }
                    return true;
                }(node) && !node.querySelector('iframe') && !(!node.innerText || node.innerText.replace(/\s/g, '') === '')){
                    paragraphNodes.push(node);
                }
                else{
                    meantToBeRemoved.push(node.parentNode);
                    //node.remove();
                }
            }
        }
    }
    console.log("These nodes are meant to be removed")
    console.log(meantToBeRemoved);
    console.log('paragraph nodes: ')
    console.log(paragraphNodes);
    return paragraphNodes;
}

function filterNode(node, bannedList){
    for(prop in bannedList){
        if(prop === "classList" && node.classList){
            for(bannedClass of bannedList['classList']){
                if(node['classList'].contains(bannedClass)){
                    return false;
                }
            }
        }
        if(bannedList[prop].includes(node[prop])){
            return false;
        }
    }
    return true;
    //return !(bannedTagList.includes(node.tagName) || bannedIdList.includes(node.id))
}

function setStartPoints(doc){  //탐색을 시작할 가장 아랫단계의 시작점들을 선별
    points = [];
    for(node of findParagraphNodes(doc)){
        if(!points.includes(node.parentNode) && !checkParents(node)){
            console.log("this node is admitted")
            console.log(node);
            points.push(node.parentNode);
        }
    }
    console.log("start points: ");
    console.log(points);
    return points;
}

function checkParents(node){ //footer tag나 aside 태그 node를 부모로 가지고 있으면 거른다. => return true
    let bannedTagList = ['FORM','FOOTER', 'ASIDE', 'A', 'HEADER', 'NAV', 'INPUT', 'TEXTAREA']
    let bannedIdList = ['footer', 'sidebar', 'sidenav', 'topnav']
    let bannedClassList = ['sidesection', 'sidebar', 'footer', 'sidenav', 'title', 'top', 'hidden', 'trackback']
    let bannedRoleList = ['alert'];
    while(node){
        if(filterNode(node, {tagName: bannedTagList, id: bannedIdList, classList: bannedClassList, role : bannedRoleList})){
            node = node.parentNode;
        }
        else{
            return true;
        }
    }
    return false;
}


/**
 *
 * @description 이 node가 filtering되어야 하는지 검사
 * @param {Node} node
 * @returns {boolean} should this node to be filtered?
 */
function checkChildren(node){ //이 node가 filtering되어야 하는지 child를 검사 =>true면 걸러야됨
    let bannedTagList = ['form', 'footer', 'aside', 'header', 'nav', 'input', 'textarea'];
    let bannedIdList = ['footer', 'sidebar', 'topnav']
    let bannedClassList = ['.sidesection', '.sidebar','.footer', '.sidenav', '.title', '.top', '.hidden', '.trackback'];
    let bannedroleList = ['alert'];
    let queryString = arrayToDomQueryString(bannedTagList) + ', ' 
                    + arrayToDomQueryString(bannedClassList) + ', ' 
                    + arrayToDomQueryString(bannedIdList, 'id') + ', '
                    + arrayToDomQueryString(bannedroleList, 'role')

    //return bannedTagList.includes(node.tagName) || node.querySelectorAll('footer', 'aside', 'header', 'nav')[0] || node.querySelectorAll(...bannedClassList)[0];
    //return node.querySelectorAll(...bannedClassList)[0] || node.querySelectorAll(...bannedTagList)[0] || node.querySelectorAll('[id="footer, sidebar, topnav"]')[0]
    
    return node.querySelector(queryString);
}

function removeAds(node){
    let bannedList = {className: 'adsbygoogle'};
    for(node of node.querySelectorAll('.adsbygoogle')){
        while(!node.nextSibling){
            node = node.parentNode;
        }
        node.remove();
    }
}
/**
 *
 * @description get common ancestor of nodes
 * @param {Node[]} endPointList - nodes you wanna find the common ancestors of 
 * @returns {Node} common ancestor
 */
function getCommonAncestor(endPointList){
    console.log('getting common ancestor')
    let result = getLongestNode(endPointList);
    console.log("logest one: ");
    for(node of endPointList){

        if(!result){
            result = node;
            continue;
        }
        let tmp = result;
        while(!result.contains(node)){
            if(checkChildren(result.parentNode)){ //부모가 부적합하다고 판정되었을때
                console.log("inadequate parent");
                console.log(checkChildren(result.parentNode))
                result = tmp;
                break;
            }
            else{
                console.log(result);
                result = result.parentNode;
            }
        }
    }
    return result;
}

function arrayToDomQueryString(arr, attr){
    let result = '';
    if(attr){
        return arr.reduce((acc, cur, index)=>{
            return acc + `[${attr}="${cur}"], `  
        }).slice(0,-2)
    }
    else{
        return arr.reduce((acc, cur, index)=>{
            return acc + `${cur}, `
        }).slice(0,-2)
    }
}

function getLongestNode(arr){
    let count = 0;
    let result;
    for(node of arr){
        console.log(node.innerText.length);
        if(node.innerText && node.innerText.length > count){
            count = node.innerText.length;
            result = node;
        }
    }
    return result;
}