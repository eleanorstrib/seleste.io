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
	function gdAPICompany(company, companyID){
			var searchID = companyID;
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

							if ((gdJSONResult.employers).length === 1) {
								gdAPICompanyResults.push(gdJSONResult.employers[0]);
								console.log('gdAPICompanyResults updated!');
								console.log(gdAPICompanyResults);
								return gdAPICompanyResults;
							} else {
								clarifyQueryModal(company, gdJSONResult);
								selectedCompany(company, companyID, gdJSONResult, gdAPICompanyResults);
								cancelClarify();
							}
						},
						error: function(){
							console.log("didn't work");
						},
						type: 'GET'
					});
			};
	};


	function clarifyQueryModal(company, gdJSONResult) {
		$('#queryNoMatchModal').modal('show');
		jQuery.each(gdJSONResult.employers, function(i) {
			var option = gdJSONResult.employers[i].name;
			var addLine = "<tr><td><input type=\"radio\" class=\"company-clarified\" name=\"company-clarified\" value=\"" + i + "\" id=\"radio- " + option + "\"></td><td><label for= \"" + option + "\">&nbsp" + option + "</label></td></tr>";
			$('#company-clarify-select').append(addLine);
		});
	};


	function selectedCompany(company, companyID, gdJSONResult, gdAPICompanyResults){
		$('#clarify-button').click(function(){
			var clarifySelectionIndex = parseInt($('.company-clarified:checked').val());
			var clarifySelectionName = gdJSONResult.employers[clarifySelectionIndex].name;
			console.log("checking ");
			console.log(gdJSONResult.employers[clarifySelectionIndex]);
			var clarifySelectionLogo = gdJSONResult.employers[clarifySelectionIndex].squareLogo;
			var addToArray = gdJSONResult.employers[clarifySelectionIndex];
			if (addToArray != undefined) {
				gdAPICompanyResults.push(addToArray);
			}
			$(companyID).val(clarifySelectionName);
			$(companyID).attr("disabled", "disabled"); 
			console.log(gdJSONResult + " gdJSONRESULT CLEAR?");
			$('#company-clarify-select').empty();
		});
	};


	function cancelClarify(){
		$('#cancel-button').click(function(){
			var clarifySelection = $('.company-clarified:checked').val('');
			$('#company-clarify-select').empty();
		});
	}

	// run API query on validation when user gets out of the field
	$('#company1').blur(function(){
		gdAPICompany($('#company1').val(), '#company1');
	});

	$('#company2').blur(function(){
		gdAPICompany($('#company2').val(), '#company2');
	});

	$('#company3').blur(function(){
		gdAPICompany($('#company3').val(), '#company3');
	});


});