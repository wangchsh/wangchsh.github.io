window.onload = function() {
    waterfall("main", "box");

    //假数据
    var dataInt = {"data":[{"src":'1.jpg'},{"src":'2.jpg'},{"src":'0.jpg'},{"src":'3.jpg'}]}
    window.onscroll = function(){
        if(checkScrollSlide){
            //将数据渲染到尾部
            //
            var oParent = document.getElementById('main');
            for (var i = 0; i < dataInt.data.length; i++) {
                var oBox = document.createElement('div');
                oBox.className = 'box';
                oParent.appendChild(oBox);
                var opic = document.createElement('div');
                opic.className = 'pic';
                oBox.appendChild(opic);
                var oImg =document.createElement('img');
                oImg.src= "images/"+dataInt.data[i].src;
                opic.appendChild(oImg);
            }
            waterfall("main", "box");
        }
    }
}


function waterfall(parent, box) {
    //将main下的所有class为box的元素取出来
    var oParent = document.getElementById(parent);
    var oBoxs = getByClass(oParent,box);
    //计算整个页面的列数（页面宽、box的宽）
    
    var oBoxW = oBoxs[0].offsetWidth;
    var cols = Math.floor(window.screen.width / oBoxW);
    oParent.style.cssText = "width:" + oBoxW * cols + "px;margin:0 auto";
    var hArr = [];
    for (var i = 0; i < oBoxs.length; i++) {
        if (i<cols) {
            hArr.push(oBoxs[i].offsetHeight);
        }else{
            var minH = Math.min.apply(null,hArr);
            var index = getMinhIndex(hArr,minH);
            oBoxs[i].style.position='absolute';
            oBoxs[i].style.top=minH+'px';
            oBoxs[i].style.left=oBoxW*index+'px';
            hArr[index]+=oBoxs[i].offsetHeight;
        }
    }

}

function getByClass(parent, clsName) {
    var boxArr = new Array(),
        oElements = parent.getElementsByTagName("*");
    for (var i = 0; i < oElements.length; i++) {
        if (oElements[i].className == clsName) {
            boxArr.push(oElements[i]);
        }
    }
    return boxArr;
}

function getMinhIndex(arr,val){
    for (var i in arr){
        if (arr[i] == val) {
            return i;
        }
    }

}
//检测是否具备了滚动加载数据库的条件
function checkScrollSlide(){
    var oParent = document.getElementById("main");
    var oBoxs = getByClass(oParent,'box');
    var lastBoxH = oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
    var scrollTop = document.body.scrollTop || document.documentElemnt.scrollTop; 
    var height = document.body.chientHeight || document.documentElemnt.chientHeight; 
    return (lastBoxH<scrollTop+height)?true:false;
}