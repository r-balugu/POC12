define({
  
  validateform : function()
  {
  	if(this.view.txtPushMessage.text === ""){
  	alert("Please enter message in the text field.");
   }else{
       pushMessage(this.view.txtPushMessage.text);
   }
}
});