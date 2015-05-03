(function() {
	var musicOptions = [
		's7L2PVdrb_8',
		'4MD4BPAp4jo',
		'REqz9D7OWZE'	
	],
	youtubeBaseUrl = 'https://www.youtube.com/embed/<%= songId %>?autoplay=1&amp;controls=0' + 
		'&amp;modestbranding=1&amp;playlist=s7L2PVdrb_8&amp;showinfo=0&amp;start=0&amp;loop=1&amp;enablejsapi=1&amp;';
		
	$(function() {
		playThatFunkyMusic();
		
		function playThatFunkyMusic() {
			var youtubeLink = _.template(youtubeBaseUrl)({
				songId: _.sample(musicOptions)
			});
			$('#player').attr('src', youtubeLink);	
		}
	})	
})();
