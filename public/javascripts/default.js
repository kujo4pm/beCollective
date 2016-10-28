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
	findFilm();