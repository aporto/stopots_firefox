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
            e.srcElement.value = value;
            e.srcElement.defaultValue = value;   
            //sendStringToClipBoard(value);
        };
        input.onfocusout = function() {
            //e.srcElement.value = value;
            //e.srcElement.defaultValue = value;   
            //sendStringToClipBoard(value);
        };
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
