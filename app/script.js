
var el = document.createElement('input');

el.setAttribute('search', 'return;');

// tests if browser supports search event. will return 'function' if it does and undefined if it does not
var canSearch = typeof el.onsearch;


$(function() {
	var $search = $('#search'),
			$link = $('.search-link'),
			$results = $('#results'),
			search;
	
	var wikiSearch = function() {
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
	};
	
	
	if (canSearch) {
		$search.on('search', function() {
			wikiSearch();
		});
	} else {
		$search.on('keypress', function(e) {
			if (e.which == 13) {
				wikiSearch();
			}
		});	
	}
	
	// clear search entries when erasing text in input
	$search.on('keypress', function(e) {
		if (e.which == 8) {
			$this = $(this);
			setTimeout(function() {
				if ($this.val() == '') {
					$results.css({
						opacity: 0,
						top: '9999px'
					});
				}
			},100);
		}
	});
	
	// clears search entries when clicking 'x' on search input
	$search.on('mouseup', function() {
		var $this = $(this);
		var oldVal = $this.val();
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