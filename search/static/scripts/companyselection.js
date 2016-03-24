//jquery client code
console.log(localStorage);
$(document).ready(function(){
	
	//CSRF settings for every Ajax call
	function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
	    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
	}
	$.ajaxSetup({
	    beforeSend: function(xhr, settings) {
	        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
	            xhr.setRequestHeader("X-CSRFToken", csrftoken);
	        }
	    }
	});
	//
	var priorities = JSON.parse(localStorage.getItem('priorities'));
	var finalCompanyData = [priorities];
	console.log(finalCompanyData);
	console.log(typeof(priorities));
	var csrftoken = Cookies.get('csrftoken');
	console.log(csrftoken);

	$('#company1').blur(function(){
		var searchBoxID = "company1";
		gdAPICompany($('#company1').val(), function(data, selectedCompanyIndex){
			if (data === null) {
				$('#gd-error-modal').modal('show');
			} else {
				writeData(data, searchBoxID, selectedCompanyIndex);
			}
		});	

	});

	$('#company2').blur(function(){
		var searchBoxID = "company2";
		gdAPICompany($('#company2').val(), function(data, selectedCompanyIndex){
			if (data === null) {
				$('#gd-error-modal').modal('show');
			} else {
				writeData(data, searchBoxID, selectedCompanyIndex);
			}
		});	
	});

	$('#company3').blur(function(){
		var searchBoxID = "company3";
		gdAPICompany($('#company3').val(), function(data, selectedCompanyIndex){
			if (data === null) {
				$('#gd-error-modal').modal('show');
			} else {
				console.log("no errors!");
				writeData(data, searchBoxID, selectedCompanyIndex);
				console.log(finalCompanyData);
				console.log(JSON.stringify(finalCompanyData));
				console.log(typeof(JSON.stringify(finalCompanyData)));
			}
		});		

	});

	$("#companies-submit").on('click',function(e){
		e.preventDefault();
		postDataToServer(finalCompanyData, function(data){
			if (data === undefined) {
				alert("there was an error!");
			}
		});
		
	});

	// manages data fetching from glassdoor API
	function gdAPICompany(company, callback){
		var gdAPIData = glassdoorAPIData(company, callback);
	};


	// shows company logo on screen, hides search box
	function writeData(gdAPIData, searchBoxID, selectedCompanyIndex) {

		$('#' + searchBoxID).val(gdAPIData.employers[selectedCompanyIndex].name);
		$('#' + searchBoxID).prop('disabled', true);
		var logoURL = gdAPIData.employers[selectedCompanyIndex].squareLogo
		var sector = gdAPIData.employers[selectedCompanyIndex].sectorName
		var industry = gdAPIData.employers[selectedCompanyIndex].industryName
		var website = gdAPIData.employers[selectedCompanyIndex].website
		$('#' + searchBoxID + '-img').prepend('<img src="' + logoURL + '" width="100" class="company-logo"/> <br />');
		$('#' + searchBoxID + '-img').prepend('<h6>' + sector + '  |  ' + industry +'</h3><br/>');
		$('#' + searchBoxID + '-img').prepend('<h6><a href="http://' + website + '" target="_blank">' + website + '</a></h6><br />');
	}; 


	// calls Glassdoor API and returns JSON results
    function glassdoorAPIData(company, callback) {
    	company = company.toLowerCase()
		var userAgent='chrome';
			
		apiCall="http://api.glassdoor.com/api/api.htm?t.p="+GDPartner+"&t.k="+GDKey+"&userip="+tempIP+"&useragent="+userAgent+"&format=json&v=1&action=employers&q="+company
		if (company !== ""){
				$.ajax({
					url: apiCall,
					data: {
						format: 'json'
					},
					dataType: 'jsonp',
					success: function(data){

						console.log("API Call ok");
						var gdJSONResult = JSON.stringify(data.response);
						gdJSONResult = JSON.parse(gdJSONResult);
						
						
						var selectedCompanyIndex = 0;
						
						if (gdJSONResult.employers.length === 1){
							callback(gdJSONResult, selectedCompanyIndex);
							companyData = gdJSONResult.employers[selectedCompanyIndex];
							for (i in companyData) {
								if (companyData[i] === true) {
									companyData[i] = "True"
								} 
								if (companyData[i] === false){
									companyData[i] = "False"
								}
							}
							finalCompanyData.push(companyData);
							console.log(finalCompanyData);
							
						} else {
							clarifyQueryModal(company, gdJSONResult);
							console.log(gdJSONResult);
							clarifySelect(function(selectedCompanyIndex){
								console.log("selectedCompanyIndex after callback is ", selectedCompanyIndex);
								if (selectedCompanyIndex != null) {
									callback(gdJSONResult, selectedCompanyIndex);
								}
								finalCompanyData.push(gdJSONResult.employers[selectedCompanyIndex]);
								console.log(finalCompanyData);
								localStorage.setItem("gdCompanyData", JSON.stringify(finalCompanyData));
								console.log(localStorage);
							});
							cancelClarify();
						}
					},
					error: function(){
						$('#gd-error-modal').modal('show');
						return null;
					},
						type: 'GET'
				});
		}
	};


	// this function shows a modal with all fo the employer 
	// names from GD API call
	function clarifyQueryModal(company, gdJSONResult) {
		$('#queryNoMatchModal').modal('show');
		jQuery.each(gdJSONResult.employers, function(i) {
			var option = gdJSONResult.employers[i].name;
			var addLine = "<tr><td><input type=\"radio\" class=\"company-clarified\" name=\"company-clarified\" value=\"" + i + "\" id=\"radio- " + option + "\"></td><td><label for= \"" + option + "\">&nbsp" + option + "</label></td></tr>";
			$('#company-clarify-select').append(addLine);
		});
	};



	function clarifySelect(callback) {
		$('#clarify-button').click(function(){
			selectedCompanyIndex = $('.company-clarified:checked').val();
			console.log(selectedCompanyIndex);
			console.log(typeof(selectedCompanyIndex));
			callback(selectedCompanyIndex);
			$('#company-clarify-select').empty();
			$('#clarify-button').unbind('click');
			
		});
	};


	function cancelClarify(){
		$('#cancel-button').click(function(){
			$('#company-clarify-select').empty();
		});
	}


	function postDataToServer(finalCompanyData, callback){
		var allDataStr = JSON.stringify(finalCompanyData);
		console.log(allDataStr);
		alert("allDataStr");
		$.ajax({
			type: "POST",
			contentType: "application/JSON",
			url: "/results/",
			data: allDataStr,
			dataType: JSON,
		});
	}


});

	
	