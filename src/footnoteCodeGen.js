//copies html code
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
function footnoteReferenceCode(numFootnotes, tableNum, language){
    var code = "";
    var insertText = '&lt;p><span class="insertText" onclick="this.select();" contenteditable="true" >************INSERT TEXT HERE************</span>&lt;/p>';
  var header = "";
  var footnote = "";
  var reference = "";
  var referrer = "";
  
  // pick language
  if(language == "French"){
    header = "Note de bas de page";
    footnote = "Note de bas de page";
    reference = "Retour à la référence de la note de bas de page";
    
  } else if (language == "English"){
    header = "Footnotes";
    footnote = "Footnote";
    reference = "Return to footnote";
    referrer = '&lt;span class="wb-invisible"> referrer&lt;/span>';
  }
    
	
	// set up the div class
	code += '&lt;div class="wb-fnote" role="note">&lt;dl><br> ';
	
	if(tableNum == ""){ // user selected text
		code += '&lt;h2 id="fn">' + header  + '&lt;/h2><br>'; // only text footnotes reference has h2 heading
	}
	
  
    for(var i = 1; i <= numFootnotes; ++i){
      code += "&nbsp;&nbsp;&nbsp;&nbsp;" + '&lt;dt>' + footnote  + ' ' + i +'&lt;/dt>' 
        + '<br>&nbsp;&nbsp;&nbsp;&nbsp;' + '&lt;dd id="fn' + tableNum + i + '">' 
        + '<br>&nbsp;&nbsp;&nbsp;&nbsp;' + insertText 
        + '<br>&nbsp;&nbsp;&nbsp;&nbsp;' +  '&lt;p class="fn-rtn">&lt;a href="#fn' + tableNum + i + '-rf">&lt;span class="wb-invisible">' + reference  + ' &lt;/span>' 
		+ i + referrer + '&lt;/a>&lt;/p>'
        + '<br>&nbsp;&nbsp;&nbsp;&nbsp;' + '&lt;/dd>' 
        + "<br>";
 
    }
	
	// closes div : the last part of the footnote code	
	code += "&lt;/dl>&lt;/div>";
	
    $('#bottomFootnoteCode').html(code);
 
}


// generates the footnote code to put in text/table section
// tableNum should be = "" if the user requested text footnotes.
// Else tableNum should be an integer with a dot after it in a string
function footnoteTextCode(numFootnotes, tableNum, language){
  var textcode = "";
  var footnote = "";
  
  // pick language
  if(language === "French"){
    footnote = "Note de bas de page";
  } else if (language === "English") {
    footnote = "Footnote";         
  }
  
  for(var i = 1; i <= numFootnotes; ++i){
    textcode += '&lt;sup id="fn' + tableNum + i + '-rf">&lt;a class="fn-lnk" href="#fn' +  tableNum + i + '">&lt;span class="wb-inv">' + footnote  + ' &lt;/span>' + i + '&lt;/a>&lt;/sup>' + "<br><br>";
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
  var Language = document.getElementById("Language");
  var option = TableText.options[TableText.selectedIndex].text; 
  var language = Language.options[Language.selectedIndex].text;
   
  var numFootnotes = $('#FootNum').val();
  var tableNum = "";
  
  if(option === "Table"){
    var num = $('#tableNo').val();
    
    if(num.trim() !== ''){ // user has input a table num
      $('#alertTableNumber').css("display","none"); 
      tableNum += num.toString() + ".";
      
      // generates the complete reference code
      footnoteReferenceCode(numFootnotes, tableNum, language);
      
      // generates all the text footnote codes
      footnoteTextCode(numFootnotes, tableNum, language);

    } else { // user did not input a table num
      Clear();
      $('#alertTableNumber').css("display","block");
    }
    
  } else if (option === "Text") {
    
    // generates the complete reference code
    // Reference code
    footnoteReferenceCode(numFootnotes, tableNum, language); 
    
    
    // generates all the text footnote codes
    footnoteTextCode(numFootnotes, tableNum, language);


  }
  
}


function Clear(){
  $('#bottomFootnoteContainer').css("display","none");
}



