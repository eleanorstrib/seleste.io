//jquery client code
	

$(document).ready(function(){
	console.log(GDPartner);
	// START DETECTION SCRIPT
	// This is a jQuery browser detection script I downloaded
	// from http://stoimen.com/jquery.client.plugin/jquery.client.js.zip
			(function() {
			
			var BrowserDetect = {
				init: function () {
					this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
					this.version = this.searchVersion(navigator.userAgent)
						|| this.searchVersion(navigator.appVersion)
						|| "an unknown version";
					this.OS = this.searchString(this.dataOS) || "an unknown OS";
				},
				searchString: function (data) {
					for (var i=0;i<data.length;i++)	{
						var dataString = data[i].string;
						var dataProp = data[i].prop;
						this.versionSearchString = data[i].versionSearch || data[i].identity;
						if (dataString) {
							if (dataString.indexOf(data[i].subString) != -1)
								return data[i].identity;
						}
						else if (dataProp)
							return data[i].identity;
					}
				},
				searchVersion: function (dataString) {
					var index = dataString.indexOf(this.versionSearchString);
					if (index == -1) return;
					return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
				},
				dataBrowser: [
					{
						string: navigator.userAgent,
						subString: "Chrome",
						identity: "Chrome"
					},
					{ 	string: navigator.userAgent,
						subString: "OmniWeb",
						versionSearch: "OmniWeb/",
						identity: "OmniWeb"
					},
					{
						string: navigator.vendor,
						subString: "Apple",
						identity: "Safari",
						versionSearch: "Version"
					},
					{
						prop: window.opera,
						identity: "Opera"
					},
					{
						string: navigator.vendor,
						subString: "iCab",
						identity: "iCab"
					},
					{
						string: navigator.vendor,
						subString: "KDE",
						identity: "Konqueror"
					},
					{
						string: navigator.userAgent,
						subString: "Firefox",
						identity: "Firefox"
					},
					{
						string: navigator.vendor,
						subString: "Camino",
						identity: "Camino"
					},
					{		// for newer Netscapes (6+)
						string: navigator.userAgent,
						subString: "Netscape",
						identity: "Netscape"
					},
					{
						string: navigator.userAgent,
						subString: "MSIE",
						identity: "Explorer",
						versionSearch: "MSIE"
					},
					{
						string: navigator.userAgent,
						subString: "Gecko",
						identity: "Mozilla",
						versionSearch: "rv"
					},
					{ 		// for older Netscapes (4-)
						string: navigator.userAgent,
						subString: "Mozilla",
						identity: "Netscape",
						versionSearch: "Mozilla"
					}
				],
				dataOS : [
					{
						string: navigator.platform,
						subString: "Win",
						identity: "Windows"
					},
					{
						string: navigator.platform,
						subString: "Mac",
						identity: "Mac"
					},
					{
						string: navigator.userAgent,
						subString: "iPhone",
						identity: "iPhone/iPod"
				    },
					{
						string: navigator.platform,
						subString: "Linux",
						identity: "Linux"
					}
				]
			
			};
			
			BrowserDetect.init();
			
			window.$.client = { os : BrowserDetect.OS, browser : BrowserDetect.browser };
			
		})();
	// END DETECTION SCRIPT


	function validateCompany(input){
		if (input.length > 2 && input.length < 30) {
			var querycompany = $(input).val()
		} else {
			$(input).css('invalid');
		}
	}


var gdAPICompanyResults = [];
function gdAPICompany(company){
		company = company.toLowerCase()
		var userAgent=($.client.browser).toLowerCase();
		
		apiCall="http://api.glassdoor.com/api/api.htm?t.p="+GDPartner+"&t.k="+GDKey+"&userip="+tempIP+"&useragent="+userAgent+"&format=json&v=1&action=employers&q="+company
		if (company !== ""){
				$.ajax({
					url: apiCall,
					data: {
						format: 'json'
					},
					dataType: 'jsonp',
					success: function(data){
						var gdJSONResult = JSON.stringify(data.response);
						gdJSONResult = JSON.parse(gdJSONResult);
						console.log("this is employers after API call" + gdJSONResult.employers);
						if ((gdJSONResult.employers).length === 1){
							gdAPICompanyResults.push(gdJSONResult.employeers);
							console.log('gdAPICompanyResults updated!');
							return gdAPICompanyResults;
						} else {
							clarifyQuery(company, gdJSONResult);
						}
					},
					error: function(){
						console.log("didn't work");
					},
					type: 'GET'
				});
		};
};


	function clarifyQuery(company, gdJSONResult) {
		$('#queryNoMatchModal').modal('show');
		console.log(gdJSONResult.employers);
		jQuery.each(gdJSONResult.employers, function(i) {
			var option = gdJSONResult.employers[i].name;
			var addLine = "<tr><td><input type=\"radio\" class=\"company-clarified\" name=\"company-clarified\" value=\"" + option + "\" id=\"radio- " + option + "\"></td><td><label for= \"" + option + "\">&nbsp" + option + "</label></td></tr>";
			$('#company-clarify-select').append(addLine);
		});
	};

	
	$('#clarify-button').click(function(gdJSONResult){
		console.log($('.company-clarified:checked').val());
		$('#company-clarify-select').empty();
	});


	// run API query on validation when user gets out of the field
	$('#company1').blur(function(){
		gdAPICompany($('#company1').val());
	});

	$('#company2').blur(function(){
		gdAPICompany($('#company2').val());
	});

	$('#company3').blur(function(){
		gdAPICompany($('#company3').val());
	});


});