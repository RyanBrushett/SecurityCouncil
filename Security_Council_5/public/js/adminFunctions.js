$(function(){
	$('.subclauseList').each(function(){
		var subclauseList = $(this);
		var id = $(this).attr('id').split('_')[1];
		$.ajax({
			type: 'GET',
			data: {id: id},
			url: '/sc-admin/getClause',
		}).done(function(data){
			$.each(data, function(){
				subclauseList.append('<div id="subclause_'+$(this)[0].Id+'"><p>'+$(this)[0].Content+'</p><button onclick="editClause(\''+$(this)[0].Id+'\', \'sub\')">Edit</button>'+
						'<button onclick="removeClause(\''+$(this)[0].Id+'\', \'sub\')">Remove</button></div>');
			});
		});
	});
	
	$('form[name=clauseForm').submit(function(eve){
		eve.preventDefault();
		var $form = $(this).serialize();
		$.ajax({
			type: 'POST',
			data: $form,
			url: '/sc-admin/createClause',
		}).done(function(data){
			$('#clauseList').prepend('<div id="clause_'+data.Id+'"><p>'+data.Content+'</p>'
					+'<p><button onclick="addSubclause(\''+data.Id+'\')">Add operative clause</button> <button onclick="editClause(\'{{Id}}\')">'
					+'Edit</button> <button onclick="removeClause(\''+data.Id+'\', \'main\')">Remove</button></p><div id="subclauseList_'+data.Id+'" style="padding-left: 25px"></div>');
		});
	});	
});

function getUserInfo(user){
    var rec = {
        username: user
    };
    
    // The URL as defined in the app.js page.
    var r = "/sc-admin/manageusers/getuserinfo";
    var json = JSON.stringify(rec);
    ajax.ajax_req({
        method: "POST",
        url: r,
        mime: 'application/json',
        doc: json,
        // If we get a 200 response (e.g. The route in app.js works)
        ok: function(res){
            var main = document.getElementById(user);
            if(main.innerHTML == "")
                main.innerHTML = res.responseText;
            else
                main.innerHTML = "";
        },
        // If the URL is invalid or the request fails (404, 500, etc.)
        error: function(res){
            window.alert("It failed");
        }
    });    
}

//edit resolution
function editResolution(id)
{
	window.location.href = '/sc-admin/editResolution/'+id;
}

//display all clauses belonging to a resolution
function editClauses(id)
{
	window.location.href = '/sc-admin/editClauses/'+id;
}

function addSubclause(id, type)
{
	if (type === 'send'){
		$('form[name=subclauseForm]').each(function(index){
			$(this).submit(function(e){
				e.preventDefault();
				var $form = $(this).serialize();
				$.ajax({
					type: 'POST',
					data: $form,
					url: '/sc-admin/createSubclause',
				}).done(function(data){
					console.log(data);
					$('#subclauseList_'+data.Id).append('<div id="subclauseContent_'+data.Id+'"><div id="subclause_'+data.Id+'"><p>'+data.Content+'</p><button onclick="editClause(\''+data.Id+'\', \'sub\')">Edit</button>'+
							'<button onclick="removeClause(\''+data.Id+'\', \'sub\')">Remove</button></div></div>');
				});
			});
		});
	}
	if (type === 'create'){
		if($('#subclauseForm_'+id).length == 0)
		{
			$('#subclauseList_'+id).prepend('<form name="subclauseForm" id="subclauseForm_'+id+'">'+
	            	'<input type="hidden" value="'+id+'" name="clauseId">'+
	                '<textarea name="clausecontent" rows="5" cols="80">Text here...</textarea>'+
	                '<input type="submit" value="Post clause" onclick="addSubclause(\''+id+'\',\'send\')"/></form>');
		}
	}	
}

//edit a particular clause
function editClause(id, type)
{
	if (type == 'main'){
		$.ajax({
			type: 'GET',
			data: {id: id, amount: 'single', type: 'main'},
			url: '/sc-admin/getClause',
		}).done(function(data){
			console.log(data);
			$('#clauseContent_'+data.Id).html('<form name="clauseEditForm" id="clauseEditForm_'+data.id+'">'+
	            	'<input type="hidden" value="'+data.Id+'" name="clauseId">'+
	            	'<input type="hidden" value="main" name="type">'+
	                '<textarea name="clausecontent" rows="5" cols="80">'+data.Content+'</textarea>'+
	                '<input type="submit" value="Post clause" onclick="updateClause(\''+data.Id+'\',\'main\')"/></form>');
		});
	}
	else if (type == 'sub'){
		$.ajax({
			type: 'GET',
			data: {id: id, amount: 'single', type: 'sub'},
			url: '/sc-admin/getClause',
		}).done(function(data){
			$('#subclause_'+data.Id).html('<form name="subclauseEditForm" id="subclauseEditForm_'+data.Id+'">'+
	            	'<input type="hidden" value="'+data.Id+'" name="clauseId">'+
	            	'<input type="hidden" value="sub" name="type">'+
	                '<textarea name="clausecontent" rows="5" cols="80">'+data.Content+'</textarea>'+
	                '<input type="submit" value="Post clause" onclick="updateClause(\''+data.Id+'\',\'sub\')"/></form>');
		});
	}
}

//remove clauses
function removeClause(id, type)
{
	if (type == 'main'){
		$.ajax({
			type: 'POST',
			data: {id: id, type: 'main'},
			url: '/sc-admin/removeClause'
		}).done(function(data){
			$('#clause_'+id).html('');
		});
	}
	else if (type == 'sub'){
		$.ajax({
			type: 'POST',
			data: {id: id, type: 'sub'},
			url: '/sc-admin/removeClause'
		}).done(function(data){
			$('#subclause_'+id).html('');
		});
	}
}

//update clause
function updateClause(form, type)
{
	if (type === 'main'){
		$('form[name=clauseEditForm]').each(function(index){
			$(this).submit(function(e){
				e.preventDefault();
				var $form = $(this).serialize();
				$.ajax({
					type: 'POST',
					data: $form,
					url: '/sc-admin/updateClause',
				}).done(function(data){
					console.log(data);
					$('#clauseContent_'+data.Id).html('<p>'+data.Content+'</p>'
					+'<p><button onclick="addSubclause(\''+data.Id+'\')">Add operative clause</button> <button onclick="editClause(\'{{Id}}\')">'
					+'Edit</button> <button onclick="removeClause(\''+data.Id+'\', \'main\')">Remove</button></p>');
				});
			});
		});
	}
	if (type === 'sub'){
		$('form[name=subclauseEditForm]').each(function(index){
			$(this).submit(function(e){
				e.preventDefault();
				var $form = $(this).serialize();
				$.ajax({
					type: 'POST',
					data: $form,
					url: '/sc-admin/updateClause',
				}).done(function(data){
					console.log(data);
					$('#subclause_'+data.Id).html('<p>'+data.Content+'</p><button onclick="editClause(\''+data.Id+'\', \'sub\')">Edit</button>'+
							'<button onclick="removeClause(\''+data.Id+'\', \'sub\')">Remove</button>');
				});
			});
		});
	}	
}

function getResolutionInfo(id){
    var rec = {
        resolutionId: id
    };
    
    // The URL as defined in the app.js page.
    var r = "/sc-admin/manageresolutions/getresolutioninfo";
    var json = JSON.stringify(rec);
    ajax.ajax_req({
        method: "POST",
        url: r,
        mime: 'application/json',
        doc: json,
        // If we get a 200 response (e.g. The route in app.js works)
        ok: function(res){
            var main = document.getElementById(id);
            if(main.innerHTML == "")
                main.innerHTML = res.responseText;
            else
                main.innerHTML = "";
        },
        // If the URL is invalid or the request fails (404, 500, etc.)
        error: function(res){
            window.alert("It failed");
        }
    });     
}