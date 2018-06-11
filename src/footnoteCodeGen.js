// copies and select html code
function copyCode(objId){
  fnDeSelect();
  if (document.selection){
    var range = document.body.createTextRange();
    range.moveToElementText(document.getElementById(objId));
    range.select();
  } else if (window.getSelection){
    var range = document.createRange();
    range.selectNode(document.getElementById(objId));
    window.getSelection().addRange(range);
  }
  document.execCommand("copy");
}

function fnDeSelect(){
  if (document.selection)
  document.selection.empty();
  else if (window.getSelection)
  window.getSelection().removeAllRanges();
}


// generates the middle part of the code
// tableNum should be = "" if the user requested text footnotes.
// Else tableNum should be an integer with a dot after it in a string
function footnoteMiddleCode(numFootnotes, tableNum){
    var code = "";
    var insertText = '&lt;p><span class="insertText" contenteditable="true" >************INSERT TEXT HERE************</span>&lt;/p>';
    
  
    for(var i = 1; i <= numFootnotes; ++i){
      code += "&nbsp;&nbsp;&nbsp;&nbsp;" + '&lt;dt id="fn' + tableNum + i + '">Footnote ' + i + ' &lt;/dt>' 
        + '<br>&nbsp;&nbsp;&nbsp;&nbsp;' + '&lt;dd id="fn' + tableNum + i + '" tabindex="-1" aria-labelledby="fn' + tableNum + i + '-dt">' 
        + '<br>&nbsp;&nbsp;&nbsp;&nbsp;' + insertText 
        + '<br>&nbsp;&nbsp;&nbsp;&nbsp;' +  '&lt;p class="fn-rtn">&lt;a href="#fn' + tableNum + i + '-rf">&lt;span class="wb-inv">' 
        + 'Return to footnote &lt;/span>' + i + '&lt;span class="wb-inv"> referrer&lt;/span>&lt;/a>&lt;/p>'
        + '<br>&nbsp;&nbsp;&nbsp;&nbsp;' + '&lt;/dd>' 
        + "<br><br>";
 
    }
  
    $('#bottomFootnoteCode').html(code);
}


// generates the footnote code to put in text/table section
// tableNum should be = "" if the user requested text footnotes.
// Else tableNum should be an integer with a dot after it in a string
function footnoteTextCode(numFootnotes, tableNum){
  var textcode = "";
  for(var i = 1; i <= numFootnotes; ++i){
    textcode += '&lt;sup id="fn' + tableNum + i + '-rf">&lt;a class="fn-lnk" href="#fn' +  tableNum + i + '">&lt;span class="wb-inv">Footnote &lt;/span>' + i + '&lt;/a>&lt;/sup>' + "<br><br>";
  }
  
  $('#textFootnoteCode').html(textcode);
}


// make tableNumber section appear if user chose Table in the dropdown
function inputOption(){
  var TableText = document.getElementById("TableText");
  // gets the selected option in the drop down list
  var option = TableText.options[TableText.selectedIndex].text; 
  
  if (option === "Table"){
     $('#tableNumber').css("display","block"); // make tableNumber input appear
  } else if (option === "Text") {
     $('#tableNumber').css("display","none");
  }
}


// generates the complete code (Reference footnotes code and Text footnote code)
function GenerateCode(){
  // makes section visible
  $('#bottomFootnoteContainer').css("display","block");
  
  // gets the selected option in the drop down list
  var TableText = document.getElementById("TableText");
  var option = TableText.options[TableText.selectedIndex].text; 
   
  var numFootnotes = $('#FootNum').val();
  var tableNum = "";
  
  if(option === "Table"){
    var num = $('#tableNo').val();
    
    if(num.trim() !== ''){ // user has input a table num
      $('#alertTableNumber').css("display","none"); 
      tableNum += num.toString() + ".";
      
      // generates the complete reference code
      // set up the div class
      $('#bottomFootnoteClass').text("<div class=\"wb-fnote small wb-init wb-fnote-inited\" role=\"note\" id=\"wb-auto-8\"><dl>");

      footnoteMiddleCode(numFootnotes, tableNum);

      // closes div : the last part of the footnote code
      $('#bottomFootnoteEnd').text("</dl></div>");


      // generates all the text footnote codes
      footnoteTextCode(numFootnotes, tableNum);
      
    } else { // user did not input a table num
      Clear();
      $('#alertTableNumber').css("display","block");
    }
    
  } else if (option === "Text") {
    
    // generates the complete reference code
    // set up the div class
    $('#bottomFootnoteClass').text("<div class=\"wb-fnote small wb-init wb-fnote-inited\" role=\"note\" id=\"wb-auto-8\"><dl>");
    
    // middle code
    footnoteMiddleCode(numFootnotes, tableNum); 
    
    // closes div : the last part of the footnote code
    $('#bottomFootnoteEnd').text("</dl></div>");


    // generates all the text footnote codes
    footnoteTextCode(numFootnotes, tableNum);


  }
}


function Clear(){
  $('#bottomFootnoteContainer').css("display","none");
}



