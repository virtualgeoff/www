/**
 * @description	Adds background-attachment:fixed to background images
 * @author		Geoff Pack
 * @usage		use via bookmarklet: javascript:(function(){document.body.appendChild(document.createElement('script')).src='http://nmdev.abc.net.au/innovation/tools/bookmarklets/background-fixed.js?'+Math.floor(new%20Date().getTime()/(2*60*1000));})();
 *				- has 2 minute cache buster form: http://newsdev.corp.abc.net.au/forum/index.php?p=/discussion/228/bookmarklet-template
 */

var backgroundFixed = function() {
	alert('Check console to see tags/ids fixed.');
	
	var host = location.host;
	if (location.host.indexOf('www.') == 0) host = location.host.substring(4); // strip leading www. 

	function fixByTag(tag, position) {
		document.getElementsByTagName(tag)[0].style.backgroundAttachment = 'fixed'; // !important';
		if (position) {
			document.getElementsByTagName(tag)[0].style.backgroundPosition = position; // + ' !important';
		}
		if (window.console) {	
			console.info("fixByTag:  %s", tag);
		}		
	}
	
	function fixByID(id, position) {
		document.getElementById(id).style.backgroundAttachment = 'fixed !important';
		if (position) {
			document.getElementById(id).style.backgroundPosition = position + ' !important';		
		}
		if (window.console) {	
			console.info("fixByID:  %s", id);
		}		
	}
	
	switch (host) {
		case 'abcdigmusic.net.au':
		case 'abccountry.net.au':
		case 'abcjazz.net.au':
			fixByID('content_background','0 30px');
			//fixByID('bg_top_left','0 30px');
			//fixByID('bg_top_right','0 30px');
			break;
	
		default:	
			switch (abcDirectories[1]) {
				// News
				case 'am':
				case 'pm':
				case 'worldtoday':
				case 'correspondents':
					fixByTag('html');
					fixByTag('body');
					break;
		
				case 'foreign':
				case 'landline':
				case 'insidebusiness':
					fixByID('wrapper');
					break;
		
				case 'sport':
					fixByID('bodyWrapper','center 29px');
					fixByTag('body');
					break;

				// TV		
				case 'tv':
					switch (abcDirectories[2]) {
						case 'adamhillsIGST':
							fixByTag('html');
							break;
						case 'rake':
							fixByTag('html');
							fixByTag('body');				
							break;
						default:
							fixByTag('body');
					}
					break;			
					
				case 'atthemovies':
					fixByID('outerWrap','center 31px');
					fixByTag('body');
					break;

				// Radio				
				case 'radio':
					fixByID('wrapperOuter','center 31px');
					break;
		
				case 'rn':
					if (abcDirectories[2] != '') {
						fixByID('wrapper','center 30px');						
					} else {
						fixByTag('body');			
					}
					break;

				case 'newsradio':
					fixByTag('html');
					break;
		
				// Innovation										
				case 'environment':
					fixByID('nonFooter');
					break;		
				
				case 'services':
					fixByID('nonFooter');
					fixByID('pageWrapper','center 35px');
					break;		
				
				case 'thebigdiary':
					fixByID('pageBG');
					fixByID('header','center 30px');
					break;
					
				case 'science':
					fixByID('wrapperBody','center 30px');
					break;

				case 'innovation':
					switch (abcDirectories[2]) {
						case 'bluebird':
							document.getElementById('body-background').style.position = 'fixed !important';
							document.getElementById('body-background').style.zIndex = "-1";
							if (window.console) {	
								console.info("custom:  %s", 'body-background');
							}		

							break;
						default:
							fixByTag('body');
					}
					break;			
			
				default:
					fixByTag('body');
			}
	}

	//return {
	//}
}();


