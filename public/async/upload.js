$(document).ready(function(){
  $('#upload_btn').on('click', function() {
    $('#upload_file').click();
  });

  $('#upload_file').on('change', function(){
    var uploadInput = $('#upload_file');

    if(uploadInput.val() !== ''){
      var formData = new FormData();

      formData.append('upload', uploadInput[0].files[0]);

      $.ajax({
        url: '/uploadFile',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(){
          uploadInput.val('');
        }
      })
    }
  })
})