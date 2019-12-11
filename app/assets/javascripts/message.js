$(function(){
  function buildHTML(message){
    
    if (message.image) {
      var html = 
        `<div class="main-chat__contents__box" data-message-id="${message.id}">
          <div class="main-chat__contents__box__upper-message">
            <div class="main-chat__contents__box__upper-message__user-name">
              ${message.user_name}
            </div>
            <div class="main-chat__contents__box__upper-message__date">
              ${message.date}
            </div>
          </div>
          <div class="main-chat__contents__box__lower-message">
            <p class="main-chat__contents__box__lower-message__content">
              ${message.content}
            </p>
          </div>
          <img src="${message.image}" class: 'lower-message__image'>
        </div>`
      return html;
    } else {
      var html =
        `<div class="main-chat__contents__box" data-message-id="${message.id}">
          <div class="main-chat__contents__box__upper-message">
            <div class="main-chat__contents__box__upper-message__user-name">
              ${message.user_name}
            </div>
            <div class="main-chat__contents__box__upper-message__date">
              ${message.date}
            </div>
          </div>
          <div class="main-chat__contents__box__lower-message">
            <p class="main-chat__contents__box__lower-message__content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }
  $("#new_message").on("submit", function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action')
      last_message_id = $('.main-chat__contents__box').last().data('message-id');
      $.ajax({
        url: url,
        type: 'POST',  
        data: formData,  
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data){
        var html = buildHTML(data);
        $('.main-chat__contents').append(html);
        $('.form__submit').prop('disabled', false);
        $('.main-chat__contents').animate({scrollTop: $('.main-chat__contents')[0].scrollHeight},'fast');
        $('form')[0].reset();
      })
      .fail(function(){
        alert('error');
      })
     return false;
  })
  
  
  var reloadMessages = function () {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      last_message_id = $('.main-chat__contents__box').last().data('message-id');
      $.ajax({
        url: "api/messages",
        type: 'get',  
        data: {id: last_message_id},  
        dataType: 'json',
      })
      .done(function(messages) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main-chat__contents').append(insertHTML);
        $('.main-chat__contents').animate({scrollTop: $('.main-chat__contents')[0].scrollHeight},'fast');
      })
      .fail(function() {
        alert('error');
      });
    };
  };
  setInterval(reloadMessages, 7000);
});
