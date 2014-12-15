/*
# jsonpでphpにフォームのデータを送って送信してもらう感じのやつ
# 作者 yuta kanayama ( kanayama.work@gmail.com )
*/
(function($, window, document, undefined){

function SendEmail( opt ) {
  var self = this;
  self.prm = {
    wrapper: null,
    result: null,
    submit: null,
    async: true
  }
  $.extend( self.prm, opt );
  
  if( !self.prm.wrapper ) return;
  
  self.$wrapper = $( self.prm.wrapper );
  self.$result = $( self.prm.result );
  self.$submit = self.$wrapper.find( self.prm.submit );
  self.$input = self.$wrapper.find('input, textarea');
  self.$SOV = self.$input.filter('[date-validate="1"]');//Subject to verification //検証の対象
  self.$cache = self.$input.filter('[data-cache="1"]');
  
  self.$submit.click(function() {
    var sendOK = true;
    self.$SOV.each(function(){
      var $me = $(this),
          type = $me.attr('type'),
          value = $me.val(),
          result = false;
      result = self.validate( type, value );
      if( !result ) sendOK = false;
    });
    if( sendOK ) {
      self.send()
        .then(function( reply ){
          self.result( reply );
        });
    }
    return false;
  });
  
  self.url = self.$wrapper.attr('action');
  self.cookieName = self.prm.wrapper.replace('#','');
  
  self.$SOV.change(function(){
    var $me = $(this),
        type = $me.attr('type'),
        value = $me.val();
    self.validate( type, value );
    self.save();
  });
  
  self.load();
}


SendEmail.prototype = {
  
  
  load: function() {
    var self = this,
        data = $.cookie( self.cookieName );
    console.log( data );
    
    if( !data ) return;
    
    data = self.parse( data );
    console.log( data );
    
    var key, value;
    for( key in data ) {
      $( '#' + key ).val( data[key] );
    }
  },
  
  
  save: function() {
    var self = this,
        data = '';
    
    self.$cache.each(function(){
      var $me = $(this),
          key = $me.attr('id'),
          value = $me.val();
      //obj[name] = value;
      if( !key ) key = $me.attr('name');
      data += ',' + key + '=' + value;
    });
    data = data.replace(',','');
    
    console.log( data, typeof data, 'saved' );
    $.cookie( self.cookieName, data );
  },
  
  
  getDataObj: function() {
    var self = this,
        obj = {};
    
    self.$input.each(function(){
      var $me = $(this),
          key = $me.attr('id'),
          value = $me.val();
      if( !key ) key = $me.attr('name');
      obj[key] = value;
    });
    
    return obj;
  },
  
  
  validate: function( type, value ) {
    var self = this,
        result = true;
    
    console.log( 'validate', type, value );
    
    return result;
  },
  
  
  parse: function( data ){
    //var result = $.parseJSON( data );
    var result = {},
        ary1 = data.split(','),
        ary2 = [];
    for( var i = 0, len = ary1.length; i < len; i++ ) {
      ary2 = ary1[i].split('=');
      result[ ary2[0] ] = ary2[1];
    }
    return result;
  },
  
  
  result: function( reply ) {
    var self = this,
        message = '';
    
    switch( reply.status ) {
      case 0:
        message = 'エラーが発生して送信できませんでした。';
        break;
      case 1:
        message = '正しく送信されました。ありがとうございました。';
        break;
    }
    
    self.$result.text( message );
  },
  
  
  send: function() {
    var self = this,
        dfd = $.Deferred();
    
    if( !self.url ) return;
    
    var data = self.getDataObj();
    data.page = window.location.href;
    
    $.ajax({
      type: 'POST',
      dataType: 'jsonp',
      url: self.url,
      data: data,
      cache: false,
      async: self.prm.async,
      timeout: 5000,
      success: function( reply ) {
        console.log( reply );
        dfd.resolve( reply );
      },
      error: function( XMLHttpRequest, textStatus, errorThrown ) {
        console.log('ajax error');
        console.log( XMLHttpRequest );
        console.log( textStatus );
        console.log( errorThrown );
        dfd.reject();
      }
    });
    
    return dfd.promise();
  }
  
  
}

window.SendEmail = SendEmail;

})(jQuery, this, this.document);