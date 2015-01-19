var data = null;
window.onload = function(){
	window.Users={};
	Users.initList = function(){
		$.ajax({
			url: '/users/list',
			type: 'GET',
			dataType: 'json',
			success: function(req) {
				if(req.code==0){
					data = req.data;
					var compileText = $('#userItemTpl').text();
					var compile = jade.compile(compileText,{compileDebug:false});
					var outputText = compile(data);
					$('#userContainer').html(outputText);
					data = null;
				}
			}
		});
	}

	$('#btn-saveUser').click(function(){

		var ajaxData = {'name':$('#inputName').val(),'email':$('#inputEmail3').val(),'password':$('#inputPassword3').val(),'regDate':new Date(),'_id':$("#inputId").val()};

		$.ajax({
			url: '/users/save',
			type: 'POST',
			data:ajaxData,
			dataType: 'json',
			success: function(req) {
				if(req.code==0){
					// data = req.data;
					// var compileText = $('#userItemTpl').text();
					// var compile = jade.compile(compileText,{compileDebug:false});
					// var outputText = compile(data);
					// $('#userContainer').append(outputText);
					// $('[data-dismiss="modal"]').click();
					// $('#myModal input').each(function(key,val){
					// 	$(val).val('');
					// });
					// data = null;
					$("#myModal").modal('hide');
					Users.initList();
				}
			}
		});
	});

	$('#btnAddUser').click(function(){
		$("#myModalLabel","#myModal").html("添加新用户");
		$(".form-control,#inputId","#myModal").val('');
		User.add();
	});

	$('#userContainer').click(function(evt){
		if(evt.target.tagName=='A'){
			var userId = $(evt.target).attr('userId');
			var item_str = $(evt.target).attr('item');
			var item = JSON.parse(item_str);
			if($(evt.target).attr('type')=='edit'){
				User.edit(item);
			}
			else
				User.delete(userId,item.name);
		}
	});
	Users.initList();
}

var User = (function(exports){
	return{
		add:function(){
			$("#myModal").modal('show');
		},
		delete:function(userId,name){
			if(confirm('你确定删除用户【'+name+'】吗？')) {
				$.ajax({
					url:'/users/del',
					type:'POST',
					data:{id:userId},
					dataType:'json',
					success:function(data){
						if(data.code == 0){
							alert("删除成功！");
							Users.initList();
						}else{
							alert("删除失败:"+data.msg);
						}
					}
				});
			}
		},
		edit:function(item){
			$("#myModalLabel","#myModal").html("修改用户信息");
			$('#inputName','#myModal').val(item.name);
			$('#inputEmail3','#myModal').val(item.email);
			$('#inputPassword3','#myModal').val(item.password);
			$('#inputrPassword3','#myModal').val(item.password);
			$('#inputId','#myModal').val(item['_id']);
			$("#myModal").modal('show');
		}
	}

})(window);