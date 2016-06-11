$(function() {
	var $search = $('#search'),
			$link = $('.search-link');
			$results = $('#results');
			search;
	$search.on('search', function() {
		search = $search.val();
		$.ajax({
		  url: '//en.wikipedia.org/w/api.php',
		  data: { action: 'opensearch', format: 'json', search: search },
		  dataType: 'jsonp',
		  success: function (x) {
		  	if ($search.val() == '') return;
		    $link.each(function(i) {
		    	var $this = $(this);
		    	$this.find('h2').text(x[1][i]);
		    	$this.find('p').text(x[2][i]);
		    	$this.attr('href', x[3][i]);
		    });
		    $results.animate({
		    	opacity: 1,
		    	top: 0
		    }, 500);
		  }
		});
	});

	$search.on('mouseup', function() {
		var $this = $(this);
		var oldVal = $this.val();
		console.log(oldVal);
		if (oldVal == '') return;

		var newVal;
		setTimeout(function() {
			newVal = $this.val();
			if (newVal == '') {
				$results.css({
					opacity: 0,
					top: '9999px'
				});
			}
		}, 100);
		
	});
	
});