require([
	'gbook',
	'jquery'
], function(gbook, $) {

	var refer = getReferrer(); // 访客来源
	var timeIn = new Date(); // 进入时间

	$.ajax({
		url: 'http://pv.sohu.com/cityjson?ie=utf-8',
		dataType: "script",
		success: function() {
			console.log(returnCitySN);
			returnCitySN = returnCitySN;
		}
	});

	/**
	 * 时间格式化
	 * @param {Date} date
	 * @param {String} fmt 可选参数,默认yyyy-MM-dd hh:mm:ss
	 */
	function formatDate(date, fmt) {
		if (typeof date == 'string') {
			return date;
		}

		if (!fmt) fmt = "yyyy-MM-dd hh:mm:ss";

		if (!date || date == null) return null;
		var o = {
			'M+': date.getMonth() + 1, // 月份
			'd+': date.getDate(), // 日
			'h+': date.getHours(), // 小时
			'm+': date.getMinutes(), // 分
			's+': date.getSeconds(), // 秒
			'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
			'S': date.getMilliseconds() // 毫秒
		}
		if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
		for (var k in o) {
			if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' +
				o[
					k]).substr(('' + o[k]).length)))
		}
		return fmt
	}

	/**
	 * 访问时长
	 * @param {Object} duration
	 */
	function browsingDuration(duration) {
		//相差的总秒数
		var totalSeconds = parseInt(duration / 1000);
		//天数
		var days = Math.floor(totalSeconds / (60 * 60 * 24));
		//取模（余数）
		var modulo = totalSeconds % (60 * 60 * 24);
		//小时数
		var hours = Math.floor(modulo / (60 * 60));
		modulo = modulo % (60 * 60);
		//分钟
		var minutes = Math.floor(modulo / 60);
		//秒
		var seconds = modulo % 60;
		//输出到页面
		var result = days + "天" + hours + "小时" + minutes + "分钟" + seconds + "秒";
		return result;
	}

	/**
	 * 获取浏览器类型
	 */
	function myBrowser() {
		var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
		var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
		var isIE = userAgent.indexOf("compatible") > -1 &&
			userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
		var isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
		var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
		var isSafari = userAgent.indexOf("Safari") > -1 &&
			userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
		var isChrome = userAgent.indexOf("Chrome") > -1 &&
			userAgent.indexOf("Safari") > -1; //判断Chrome浏览器

		if (isIE) {
			var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
			reIE.test(userAgent);
			var fIEVersion = parseFloat(RegExp["$1"]);
			if (fIEVersion == 7) {
				return "IE7";
			} else if (fIEVersion == 8) {
				return "IE8";
			} else if (fIEVersion == 9) {
				return "IE9";
			} else if (fIEVersion == 10) {
				return "IE10";
			} else if (fIEVersion == 11) {
				return "IE11";
			} else {
				return "0";
			} //IE版本过低
			return "IE";
		}
		if (isOpera) {
			return "Opera";
		}
		if (isEdge) {
			return "Edge";
		}
		if (isFF) {
			return "FF";
		}
		if (isSafari) {
			return "Safari";
		}
		if (isChrome) {
			return "Chrome";
		}
	}

	/**
	 * 利用原生Js获取操作系统版本
	 */
	function getOS() {
		var sUserAgent = navigator.userAgent;
		var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
		var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform ==
			"Macintosh") || (navigator.platform == "MacIntel");
		if (isMac) return "Mac";
		var isUnix = (navigator.platform == "X11") && !isWin && !isMac;
		if (isUnix) return "Unix";
		var isLinux = (String(navigator.platform).indexOf("Linux") > -1);
		if (isLinux) return "Linux";
		if (isWin) {
			var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
			if (isWin2K) return "Win2000";
			var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1;
			if (isWinXP) return "WinXP";
			var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
			if (isWin2003) return "Win2003";
			var isWinVista = sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
			if (isWinVista) return "WinVista";
			var isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
			if (isWin7) return "Win7";
			var isWin10 = sUserAgent.indexOf("Windows NT 10") > -1 || sUserAgent.indexOf("Windows 10") > -1;
			if (isWin10) return "Win10";
		}
		return "other";
	}

	/**
	 * 获取上一个跳转页面
	 */
	function getReferrer() {
		var referrer = '';
		try {
			referrer = window.top.document.referrer;
		} catch (e) {
			if (window.parent) {
				try {
					referrer = window.parent.document.referrer;
				} catch (e2) {
					referrer = '';
				}
			}
		}
		if (referrer === '') {
			referrer = document.referrer;
		}
		return referrer;
	}

	function pushMsg(url, data) {
		// 本地调试不发送推动
		// if ('localhost' === window.location.hostname || '127.0.0.1' === window.location.hostname) {
		// 	return;
		// }
		var postparam = {
			"url": url,
			"data": data
		}
		$.ajax({
			type: 'POST',
			url: "https://www.54dxs.cn/apibridge/bot/post",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			data: JSON.stringify(postparam),
			success: function(data, textStatus, jqXHR) {
				console.log('hahaha')
				// console.log('data=' + data + 'textStatus=' + textStatus + 'jqXHR=' + jqXHR);
			},
			error: function() {
				console.log('error')
			}
		});
	}

	function pushMsgDingtalk(jObj) {
		var url = jObj.url;
		var at = jObj.at;
		if (!url) {
			return;
		}
		var data = {
			"msgtype": "markdown",
			"markdown": {
				"title": "预警类型",
				"text": "**进入时间:** " + formatDate(timeIn) +
					"\n\n**离开时间:** " + formatDate(new Date()) +
					"\n\n**访问时长:** " + (browsingDuration(new Date() - timeIn)) +
					"\n\n**访客地域:** " + (returnCitySN ? returnCitySN["cname"] : '未知地域') +
					"\n\n**访客IP:** " + (returnCitySN ? returnCitySN["cip"] : '未知IP') +
					"\n\n**浏览器:** " + myBrowser() +
					"\n\n**操作系统:** " + getOS() +
					"\n\n**分辨率:** " + window.screen.width + 'x' + window.screen.height +
					"\n\n**访客来源:** " + (refer ? refer : '直接访问') +
					"\n\n**入口页面:** " + location.href
			},
			"at": at
		}
		pushMsg(url, data);
	}

	function pushMsgWeixin(jObj) {
		var url = jObj.url;
		var at = jObj.at;
		if (!url) {
			return;
		}
		var data = {
			"msgtype": "markdown",
			"markdown": {
				"content": "**进入时间:** " + formatDate(timeIn) +
					"\n\n**离开时间:** " + formatDate(new Date()) +
					"\n\n**访问时长:** " + (browsingDuration(new Date() - timeIn)) +
					"\n\n**访客地域:** " + (returnCitySN ? returnCitySN["cname"] : '未知地域') +
					"\n\n**访客IP:** " + (returnCitySN ? returnCitySN["cip"] : '未知IP') +
					"\n\n**浏览器:** " + myBrowser() +
					"\n\n**操作系统:** " + getOS() +
					"\n\n**分辨率:** " + window.screen.width + 'x' + window.screen.height +
					"\n\n**访客来源:** " + (refer ? refer : '直接访问') +
					"\n\n**入口页面:** " + location.href
			}
		}
		pushMsg(url, data);
	}

	var dingtalk;
	var weixin;

	window.onbeforeunload = function() {

		if (dingtalk) {
			pushMsgDingtalk(dingtalk);
		}
		if (weixin) {
			pushMsgWeixin(weixin);
		}

	}
	gbook.events.bind('start', function(e, config) {
		if (!config.bot) {
			return;
		}
		dingtalk = config.bot.dingtalk;
		weixin = config.bot.weixin;
	});
})
