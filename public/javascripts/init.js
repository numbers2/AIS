(function(){
    var inputGroupAddon  = $('#tab-content .selectGroup input[type="checkbox"]'),dropdownMenu  = $('#tab-content .selectGroup ul[role="menu"]'),addInputMeta = $('#meta .add'),addInputCss = $('#css .add'),addInputJs = $('#javascript .add'),btnCreate = $("#btn-create"),typeData = $("#myTab a"),inputCheck = $('#meta .form-control:input'),jsIndex=1;cssIndex=1;
    inputCheck.on('keyup',function(){
      if($(this).val() != ""){
        if($(this).parent('.input-group').hasClass('has-error')){
          $(this).parent('.input-group').removeClass('has-error has-feedback').find('.glyphicon ').remove()
        }
      };
    })
     dropdownMenu.on('click',function(event){
        var onText = $(event.target).html();
        $(this).prev().val(onText);
        if($(this).prev().val() != ""){
          if($(this).parent('.input-group').hasClass('has-error')){
            $(this).parent('.input-group').removeClass('has-error has-feedback').find('.glyphicon ').remove()
          }
        };
      });
     inputGroupAddon.on('click',function(){
        var inputParent = $(this).parents('.selectGroup').find('input[type!="checkbox"]')
          if($(this).attr('checked')!='checked'){
            inputParent.attr("disabled",true) 
          }else{
            inputParent.removeAttr("disabled",true) 
          }
     });
     addInputMeta.on('click',function(){
      var copy = $(this).parents('.show-grid').next().clone(true)
        copy.appendTo($(this).parents('.rowGroup'));
      
     });
     addInputCss.on('click',function(){
        var copy = $(this).parents('.show-grid').next().clone(true)
        copy.find('input[type="radio"]').attr('name','css'+cssIndex)
        cssIndex++;
        copy.appendTo($(this).parents('.rowGroup'));
     });
     addInputJs.on('click',function(){
        var copy = $(this).parents('.show-grid').next().clone(true)
        copy.find('input[type="radio"]').attr('name','javascript'+jsIndex)
        jsIndex++;
        copy.appendTo($(this).parents('.rowGroup'));
     });
     btnCreate.on('click',function(){
        if($("#meta .form-control:input[value='']").length == 0){
          var checkData = [],data={},selectVal = $('#tab-content .selectGroup input:checkbox:checked').parents('.selectGroup')
          selectVal.each(function(i){
            var type,key,val,cdn,o={};
            $(this).find('input').each(function(){
              
              if($(this).attr('type') == 'checkbox'){
                type = $(this).attr('data-type')
              };

              if($(this).attr('data-type')=='key'){
                key = $(this).val();
              }

              if($(this).attr('data-type')=='val'){
                val = $(this).val();
              }

              if($(this).attr('type')=='radio'){
                if($(this).is(':checked')){
                  cdn = $(this).val();
                }else{
                  cdn = '1'
                }
              }
            });
              o['type'] = type;
              o['key'] = key;
              o['val'] = val;
              o['cdn'] = cdn;
              checkData.push(o)
          });
          data['data']=checkData
          $.ajax({
            url: '/init/data',
            contentType:'application/json',
            type: 'POST',
            data:JSON.stringify(data),
            processData:false,
            dataType: 'json'
          });
        }else{
          $("#meta .form-control:input[value='']").parent('.input-group').addClass(' has-error has-feedback').append('<span class="glyphicon glyphicon-remove form-control-feedback"></span>')
        };
      });
  })()