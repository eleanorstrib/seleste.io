//jquery client code
$(document).ready(function(){
	$('#companies-submit').prop('disabled', true);
	$('#results').hide();
	//CSRF settings for every Ajax call -- from real python gh
	$(function() {


    // This function gets cookie with a given name
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    var csrftoken = getCookie('csrftoken');

    /*
    The functions below will create a header with csrftoken
    */

    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    function sameOrigin(url) {
        // test that a given url is a same-origin URL
        // url could be relative or scheme relative or absolute
        var host = document.location.host; // host + port
        var protocol = document.location.protocol;
        var sr_origin = '//' + host;
        var origin = protocol + sr_origin;
        // Allow absolute or scheme relative URLs to same origin
        return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
            (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
            // or any other URL that isn't scheme relative or absolute i.e relative.
            !(/^(\/\/|http:|https:).*/.test(url));
    }

     $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
                // Send the token to same-origin, relative URLs only.
                // Send the token only if the method warrants CSRF protection
                // Using the CSRFToken value acquired earlier
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });

});

	//
	var priorities = JSON.parse(localStorage.getItem('priorities'));
	var finalCompanyData = [priorities];

	var csrftoken = Cookies.get('csrftoken');


	$('#company1').blur(function(){
		var searchBoxID = "company1";
		gdAPICompany($('#company1').val(), function(data, selectedCompanyIndex){
			if (data === null) {
				$('#gd-error-modal').modal('show');
			} else {
				writeData(data, searchBoxID, selectedCompanyIndex);
				checkInputsActivateButton();
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
				checkInputsActivateButton();
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
				checkInputsActivateButton();
				// var allDataStr= JSON.stringify(finalCompanyData)
				// console.log(allDataStr);/// THIS IS BEING EXECUTED
				// console.log(typeof(JSON.stringify(finalCompanyData)));
			}
		});		

	});

	// executes when button is clicked, calls function that posts data to server
		$("#companies-form").on('submit', function(e, callback){
			e.preventDefault();
			postDataToServer(finalCompanyData, callback);
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
		$('#' + searchBoxID + '-img').prepend('<h6>' + sector + '  |  ' + industry +'</h3>');
		$('#' + searchBoxID + '-img').prepend('<h6><a href="http://' + website + '" target="_blank">' + website + '</a></h6> ');
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
								localStorage.setItem("gdCompanyData", finalCompanyData);
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
		alert(cancelClarify);
		$('#cancel-button').click(function(){
			$('#company-clarify-select').empty();
		});
	}


	function postDataToServer(finalCompanyData, callback){
		var finalCompanyData = finalCompanyData;
		$.ajax({
			contentType: 'application/JSON',
			type: 'POST',
			url: '/results/',
			data: JSON.stringify(finalCompanyData),
			success: function(json, finalCompanyData,jqXHR){
					console.log(json);
					$('#select-companies').animate({opacity:'0.3'}, "slow").slideUp();
					$('#results').show();
					companya=json.sorted_scores['gd_data'][0]['name']
					companya=json.sorted_scores['gd_data'][1]['name']
					companyc=json.sorted_scores['gd_data'][2]['name']
					$('#company-rankings').append('<div class="col-md-3"><h3>' +  '<br />' + json.sorted_scores[2][0] + '<br />' + json.sorted_scores[2][1] + '</h3></div>' + 
												'<div class="col-md-3"><h3>' + json.sorted_scores[1][0] + '<br />' + json.sorted_scores[1][1] + '</h3></div>' + 
												'<div class="col-md-3"><h3>' + json.sorted_scores[0][0] + '<br />' + json.sorted_scores[0][1] + '</h3></div>'
												);
				},
			error: function(xhr, msg, error, data) {
				alert(msg, error);
			}
		});
	}

	function checkInputsActivateButton(data){
		if ($('#company1').val() != '' && $('#company1').val()!= '' && $('#company3').val() != ''){
			$('#companies-submit').prop('disabled', false);

		}
	};

});

	
	