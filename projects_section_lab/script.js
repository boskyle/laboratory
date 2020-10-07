$(document).ready(function() {
   
    
    $('#btn-all').click(function(){
        $('.flex-item').show();
        $('.btn').removeClass('active');
        $('#btn-all').addClass('active');
      
    });

    // delete all with class that dont have react
    $('#btn-react').click(function(){
        
        $('.flex-item').hide();
        $('.btn').removeClass('active');

        if ($('.flex-item').hasClass('react')){
           $('.react').show();
           $('#btn-react').addClass('active');
        }
     });

     $('#btn-nodejs').click(function(){
        $('.flex-item').hide();
        $('.btn').removeClass('active');
        if ($('.flex-item').hasClass('nodejs')){
           $('.nodejs').show();
           $('#btn-nodejs').addClass('active');
        }
     
     });

     $('#btn-css').click(function(){
        $('.flex-item').hide();
        $('.btn').removeClass('active');
        if ($('.flex-item').hasClass('css')){
           $('.css').show();
           $('#btn-css').addClass('active');
        }
     });

     $('#btn-python').click(function(){
        $('.flex-item').hide();
        $('.btn').removeClass('active');

        if ($('.flex-item').hasClass('python')){
           $('.python').show();
            // add a bootstrap class when clicked 'active'
           $('#btn-python').addClass('active');
        }
     });
 
     



});