/*
	fill the film panel with searched details
	*/
	function findFilm()
	{
		$("form#search").one('submit', function(e){e.preventDefault(); alert('Please find a match before continuing'); return false;});
		$('input#name').on('keyup', function(){
			if($('input#name').val().length > 1)
			{
				console.log("Searching for:", $('input#name').val());
				$.ajax({
					url: "http://www.omdbapi.com/?" + $.param({
						t: $('input#name').val()
					})

				}).then(function(data) {
					if(data.Response !== 'False')
					{
						$("form#search").off('submit');
						$("form#search").one('submit', function(e)
						{
							e.preventDefault();
							$.ajax({
								type: "POST",
								url: '/films',
								data: { //send to API endpoint
									Title: data.Title,
									Year: data.Year,
									Runtime: data.Runtime,
									Genre: data.Genre,
									Actors: data.Actors,
									Poster: data.Poster,
									imdbID: data.imdbID								
								},
								success: function()
								{
									console.log('New film imported');
									//movie sent to API
									window.location.href  = '/films/render';
								},
								dataType: 'json'
							});
						});
						$('#results').removeClass('hidden');
						$('#results').html("Found title:<strong>" + data.Title + "</strong> (" + data.Year + ") " + data.Genre );
					}
					else
					{
						$('#results').removeClass('hidden');
						$('#results').text(data.Error);
						$("form#search").off('submit');
						$("form#search").one('submit', function(e){e.preventDefault(); alert('Please find a match before continuing'); return false;});
						
					}
				});
			}
		});
	}
	function newUpdateHandler(data, x)
	{
		return function(event){
			$('#stars').val(data[x].stars);
			$('#review').val(data[x].review);
			$('#saveReview').off('submit');
			$('#saveReview').on('submit', function(e) { e.preventDefault(); writeReview(x);} );
			$('#save').text('update review');
		};
	}
	function newDeleteHandler(reviewId)
	{
		return function(event){
			$.ajax({
			type: "DELETE",
			url: $(location).attr('pathname').split('/render')[0] + '/reviews/' + reviewId
			}).then(res=>{
				if(!res.success)
				{
					$('#reviews').append(res.message);
				}
			});
			refresh();
		};
	}
	function refresh()
	{	
		$('#save').text('save new');
		$('#saveReview').off();
		$('#saveReview').on('submit', function(e)
		{
			e.preventDefault()
			writeReview();
		});
		$.ajax({
			url: $(location).attr('pathname').split('/render')[0] + '/reviews'
		}).then(function(data) {
			$('#reviews').empty();
			for(var x =0; x < data.length; x++)
			{
				var updateButton = document.createElement('input');
				updateButton.type = "button";
				updateButton.value = "update review";  
				updateButton.addEventListener('click', newUpdateHandler(data, x));
				var delButton = document.createElement('input');
				delButton.type = "button";
				delButton.value = "delete review";  
				delButton.addEventListener('click', newDeleteHandler(x));
				var newReview  = document.createElement('div');
				newReview.class = "panel panel-default";
				newReview.id="review_" + x;
				newReview.innerHTML = '<b>Stars:</b>' + data[x].stars + '/5 <br><b>Review:</b>' + data[x].review + " <br>" + data[x].createdAt + "<br><br>";
				$('#reviews').append(newReview);
				$('#review_' + x).append(updateButton);
				$('#review_' + x).append(delButton);
			}
		});
	}

	function writeReview(reviewId)
	{
		$.ajax({
			type: (reviewId === undefined) ? "POST" : "PUT",
			url: $(location).attr('pathname').split('/render')[0] + '/reviews/' + ((reviewId === undefined) ? "" : reviewId),
			data: { //send to API endpoint
				stars: $('#stars').val(),
				review:$('#review').val()						
			},
			success: function(res) {
				if(!res.success)
				{
					$('#reviews').append("ISSUE:", res.message);
				}
				refresh();
				$('#saveReview').trigger('reset');
			},
			dataType: 'json'
		}); 
		
	}

	