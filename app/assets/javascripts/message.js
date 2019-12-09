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
})
