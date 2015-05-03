(function() {
	var musicOptions = [
			's7L2PVdrb_8',
			'4MD4BPAp4jo',
			'REqz9D7OWZE',
			'sbzvLgvvXa8'
		],
		subreddits = [
			'onetruegod'
		],
	youtubeBaseUrl = 'https://www.youtube.com/embed/<%= songId %>?autoplay=1&amp;controls=0' + 
		'&amp;modestbranding=1&amp;playlist=s7L2PVdrb_8&amp;showinfo=0&amp;start=0&amp;loop=1&amp;enablejsapi=1&amp;';
		
	$(function() {
		playThatFunkyMusic();
		getRedditImages();
		
		function playThatFunkyMusic() {
			var youtubeLink = _.template(youtubeBaseUrl)({
				songId: _.sample(musicOptions)
			});
			$('#player').attr('src', youtubeLink);	
		}
		
		function getRedditImages() {
			var jsonUrl = _.template('http://www.reddit.com/r/<%= subreddit %>.json')({
				subreddit: _.sample(subreddits)
			});
			
		    $.ajax({
	            url: jsonUrl,
	            dataType: 'json',
	            success: onSuccess,
				error: function(err) {
					console.log('TOTAL DESTRUCTION', err);
				},
	            timeout: 5000
	        });
			
			function onSuccess(response) {
				var jqTaintGrid = $('#taint-grid'),
					getChildElemStr = _.template('<li><img src="<%= url %>"/></li>');
				
				var urls = _(response.data.children)
					.map(function(child) {
						return child.data.url;	
					})
					.filter(function(url) {
						return _.includes(url, 'imgur') && !_.includes(url, 'gallery');	
					})
					.map(function ensureExtension(url) {
						var extensionRegexp = /\.[a-z]+$/,
							match = extensionRegexp.exec(url);
							
						if (match) {
							return url;
						}
						
						return url + '.png';
					})
					.compact()
					.valueOf();
				
				_.forEach(urls, function(url) {
					jqTaintGrid.append(
						getChildElemStr({url: url})
					);
				});
			}
		}
	});	
})();
