(function($, window, document, undefined){

function SendEmail() {}

SendEmail.prototype = {
  
  init: function(opt) {
    var self = this;
    self.prm = {
      wrapper: null
    }
    $.extend( self.prm, opt );
    
    if( !self.prm.wrapper ) return self;
    
    self.$wrapper = $( self.prm.wrapper );
    
    return self;
  },
  
  
  start: function() {
    var self = this;
    
    
  }
  
}

window.SendEmail = SendEmail;

})(jQuery, this, this.document);