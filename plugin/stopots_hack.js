/*
Just draw a border round the document.body.
*/

/*
function hackClick(click)
{
    window.alert("click");
}


function sendStringToClipBoard(str)
{
    el = document.createElement("input");
    
    // Does not work:
    // dummy.style.display = "none";
    el.style.height = '1px';
    // Does not work:
    // el.style.width = '0px';
    el.style.width = '1px';
    
    document.body.appendChild(el);
    el.value = str;
    el.select();
    document.execCommand("copy");
    
    document.body.removeChild(el);
    
}
*/ 

function fillFieldIfIsCategory(letter, node)
{
    var category = node.childNodes[0].innerHTML;    
    var input = node.childNodes[1];
    
    var isInputText = input instanceof HTMLInputElement && input.type == 'text';
    var value = "";
    
    if (isInputText) {  
        //var old_element = document.getElementById("btn");
        //var input = oldInput.cloneNode(true);
        //oldInput.parentNode.replaceChild(input, oldInput);    
        
        //alert(1);
        //alert(getEventListeners(input));
        //alert(2);
        
        if (category.indexOf("<") > 0) {
            category = category.substring(0, category.indexOf("<"));
        }
        if (category.indexOf(":") > 0) {
            // Remove dicas iniciadas com":" ecolocadas por esse proprio script em execucoes anteriors
            category = category.substring(0, category.indexOf(":"));
        }
        category = category.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        category = category.toUpperCase();
        
        
        value = "";        
        if (category in stopCheats) {
            if (stopCheats[category][letter]) {                
                //value = stopCheats[category][letter];
                value = stopCheats[category][letter][Math.floor(Math.random()*stopCheats[category][letter].length)];
            }                
        }
                
        //input.value = value;
        //input.defaultValue = value;   
        input.onclick = function(e) {
            //alert(10);
            e.srcElement.value = value;
            e.srcElement.defaultValue = value;   
            //alert(11);
            //sendStringToClipBoard(value);
        }
        
        input.onfocus = function(e) {
            //alert(1);
            e.srcElement.value = value;
            e.srcElement.defaultValue = value;   
            //alert(2);
        };
        input.onblur = function(e) {
            //alert(3);
            e.srcElement.value = value;
            e.srcElement.defaultValue = value;   
            //alert(5);
            //alert(1);
            //e.srcElement.value = value;
            //e.srcElement.defaultValue = value;   
            //sendStringToClipBoard(value);
        };
        
        /*input.addEventListener("onblur", function(){
            e.srcElement.value = value;
            e.srcElement.defaultValue = value;   
        }, false);*/
        
        //input.addEventListener("onblur", hackClick, false); //where func is your function name
        //sendStringToClipBoard
        //input.addEventListener("click", hackClick, false); //where func is your function name
        
        //if (value != "") {
        node.childNodes[0].innerHTML = category + ':<font color="red">' + value + '</font>';
        //}
    }
}

function executeGameCheat(document)
{
    var letterId = document.getElementById('letter');    
    var letter = letterId.childNodes[1].innerHTML.toUpperCase();    
    
    var categoriesDiv = document.getElementsByClassName('ct answers');
    if (categoriesDiv != null) {        
        categoriesDiv = categoriesDiv[0].firstChild;      
    }   
    
    node = categoriesDiv.firstChild;
    while (node) {
        fillFieldIfIsCategory(letter, node);
        node = node.nextSibling;
    }

    document.body.style.border = "5px solid red";    
}

function cheat()
{
   // alert(1);
    executeGameCheat(document);    
    //alert(2);
}
/*
function keyPressHandler(e) 
{
    // this would test for whichever key is 40 and the ctrl key at the same time
    //if (e.ctrlKey && e.keyCode == 40) {
        // call your function to do the thing
      //  executeGameCheat(document);
    //}
    e = e || window.event;
    keycode = e.which || e.keyCode;
    if(keycode == 13){     
        window.alert("Press");
    }
}*/

var element = document.getElementById('letter');
if (element != null && element.value == '') {
    document.body.style.border = "5px solid white";
    
    //alert(1);
    /*var topWindow = document.createElement("div");
    //alert(2);
    topWindow.setAttribute("position", "absolute");
    topWindow.setAttribute("left", "0px");
    topWindow.setAttribute("top", "0px");
    topWindow.setAttribute("width", "300px");
    topWindow.setAttribute("height", "200px");
    //topWindow.setAttribute("z-index", 10000000);
    topWindow.style.zIndex = "1000000";
    topWindow.setAttribute("visibility", "visible");     
    topWindow.setAttribute("background-color", "blue");
    
    //alert(3);
    
    var header = document.getElementById('header');
    //alert(header.textContent);
    
    //var parentDiv = document.getElementsByClassName('root')[0];    
    var parentDiv = document.getElementById('root');    
    //alert(4);
    document.body.appendChild(topWindow); 
    //parentDiv.insert(topWindow);
        
    alert(5);
    
    */
    headerLogo = document.getElementsByClassName('logo')[0];       
    //alert(headerLogo);
    headerLogo.innerHTML = '<input id="btnCheat" type="button" value="Cheat" />' 
    document.getElementById ("btnCheat").addEventListener ("click", cheat, false);
    //'<button onclick="executeGameCheat(document)"> Cheat</button>';
    //"<strong>Teste</strong>";
    
    //var button = document.createElement("input");
    //button.setAttribute("type", "button");
    //button.setAttribute("value", "valore");
    //button.setAttribute("name", "nome");
    //header.appendChild(btn);
    //alert(6);
    
    //window.alert(1);
    /*var button = document.createElement("input");
    button.setAttribute("type", "button");
    button.setAttribute("value", "valore");
    button.setAttribute("name", "nome");
    window.alert(3);
    var brotherElement = document.getElementsByClassName('screensContainer')[0];    
    window.alert(brotherElement);
    window.alert(4);
    var parentDiv = brotherElement.parentNode;
    window.alert(5);
    if (parentDiv) {
        parentDiv.insertBefore(button, brotherElement);
        window.alert(6);
    } else {
        window.alert(7);
    }*/
    
    

// register the handler 
    //document.onkeydown = keyPressHandler;
    //document.addEventListener('keyup', doc_keyUp, false);
    
    executeGameCheat(document);
}
