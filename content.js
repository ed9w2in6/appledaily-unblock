console.log("--- SCRIPT STARTED ---");
try {
	console.log("--- stopping DOM loading ---");
	
	// 01AUG2019 fix blank screen in v76 // stop();

	console.log("--- overwritting blocking JS ---");
	(function overwrite(link) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', link.href);
		xhr.onload = () => {
			// HK, US
			var html = xhr.responseText.replace('function uReadDisplayMsgBox(showdef){', 'function uReadDisplayMsgBox(showdef){}\nfunction xxx(showdef){');
			html = html.replace('function uReadDisplayMsgBox(showdef, atype){', 'function uReadDisplayMsgBox(showdef, atype){}\nfunction xxx(showdef, atype){');
			// HK mobile
			html = html.replace('function uReadPrompt(content,msgtype,vdoimg){', 'function uReadPrompt(content,msgtype,vdoimg){}\nfunction xxx(content,msgtype,vdoimg){');
			// TW
			html = html.replace('var effects = function(e,val){', 'var effects = function(e,val){$(".ndAritcle_headPic,.ndArticle_margin,.mediabox,#playerVideo,.articulum").show();};\nvar effectsx = function(e,val){');
			html = html.replace('.parent().remove();', '.parent();');
			html = html.replace('class="ndArticle_margin" style="display: none;"', 'class="ndArticle_margin"');
			// 04JUL2019
			html = html.replace(/visibility: hidden;/g, '');
			// nextmag
			html = html.replace('<div class="article-content">', '<div class="article-content" style="display:block!important">');
			// 果燃台
			if (link.href.substr(0, 49) == 'https://hk.feature.appledaily.com/goodestchannel/' && link.href.substr(-2) != '.js')
				html += "<script>function setBanPaidFalse(){if(document.querySelector('.videoPlayer')!=null && document.querySelector('.videoPlayer').__vue__.banPaid){document.querySelector('.videoPlayer').__vue__.banPaid = false;}} var r = setInterval(setBanPaidFalse, 1000);</script>";
			// 蘋果台
			if (link.href.substr(0, 43) == 'https://tw.feature.appledaily.com/applepie/' && link.href.substr(-2) != '.js')
				html += "<script>function setBanPaidFalse(){if(document.querySelector('.videoPlayer')!=null && document.querySelector('.videoPlayer').__vue__.banPaid){document.querySelector('.videoPlayer').__vue__.banPaid = false;}} var r = setInterval(setBanPaidFalse, 1000);</script>";
			// 飲食男女
			html = html.replace('function blockContent() {', 'function blockContent() {}\nfunction xxx() {');
			// 台灣會員專區
			html = html.replace(/hideContent:'nm-main-articles',/g, "hideContent:'nm-main-articlesxxx',");
			html = html.replace(".nm-main-articles {display:none;}", '');
			html = html.replace('id="video_player"', 'id="video_playerx"');
			html = html.replace('anvatoPlayerID = "video_player"', 'anvatoPlayerID = "video_playerx"');
			// 22JUL2019
			html = html.replace("anvpInstance.createInstance('video_player')", "anvpInstance.createInstance('video_playerx')");
			// 01SEP2019 蘋果馬網
			if (link.href.substr(0, 33) == 'https://racing.appledaily.com.hk/')
				html += "<style>html {overflow:initial!important;} .omo-blocking {display:none!important;}</style>";
			// 19SEP2019 nextplus
			html = html.replace("if(confirmSubscriptionOn() && (!anvp_omo_currentuser.isLoggedIn || !anvp_omo_userentitled)){", "if (false){");
			// 01OCT2019 TW, HK
			if (link.href.substr(0, 11) == 'https://tw.' || link.href.substr(0, 11) == 'https://hk.')
				html += "<style>#articleBody, .scroller-truncate {overflow-y:initial!important;max-height:initial!important;height: initial!important;} #articleOmo {display:none!important;}</style>";
			// 01OCT2019 Applehealth HK
			if (link.href.substr(0, 31) == 'https://www.applehealth.com.hk/')
				html += "<style>.article-container-block [id^=article] .col-lg-8 {overflow:initial!important;height:initial!important;} #contentblock-block {display:none!important;} .article-container-block [id^=article] .col-lg-8:before{background:none!important;}</style>";
			// 20DEC2019
			html += "<style>.paywall_fade {display: none;}</style>";
			
			document.open();
			document.write(html);
			document.close();
		};
		xhr.send();
	})(location);
} catch (ex) {
	console.log("--- SCRIPT Error: " + ex.message + " ---");
}
console.log("--- SCRIPT ENDED ---");
