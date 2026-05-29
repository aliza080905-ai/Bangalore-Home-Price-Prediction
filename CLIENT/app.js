// 1. BHK ki value nikalne ka function
function getBHKValue() {
    var uiBHK = document.getElementsByName("uiBHK");
    for(var i in uiBHK) {
        if(uiBHK[i].checked) {
            return parseInt(i) + 1; // 1, 2, 3 ya 4 return karega
        }
    }
    return -1; // Invalid case
}

// 2. Bathrooms ki value nikalne ka function
function getBathValue() {
    var uiBathrooms = document.getElementsByName("uiBathrooms");
    for(var i in uiBathrooms) {
        if(uiBathrooms[i].checked) {
            return parseInt(i) + 1;
        }
    }
    return -1;
}

// 3. Jab user "Estimate Price" button par click kare
function onEstimatePriceClicked() {
    console.log("Estimate Price button clicked");

    // UI elements se values uthana
    var sqft = document.getElementById("uiSqft").value;
    var bhk = getBHKValue();
    var bathrooms = getBathValue();
    var location = document.getElementById("uiLocations").value;
    var estPrice = document.getElementById("uiEstimatedPrice");

    // Flask Server ka API URL (Predict endpoint)
    var url = "http://127.0.0.1:5000/predict_home_price";

    // Server ko POST request ke zariye data bhejiyen (Form Data format mein)
    $.post(url, {
        total_sqft: parseFloat(sqft),
        bhk: bhk,
        bath: bathrooms,
        location: location
    }, function(data, status) {
        console.log(data.estimated_price);
        // Server se aane wale result ko UI par dikhana
        estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh Rupees</h2>";
        console.log(status);
    });
}

// 4. Page load hote hi Locations dropdown fill karne ke liye
function onPageLoad() {
    console.log("document loaded");

    // Flask Server ka API URL (Get locations endpoint)
    var url = "http://127.0.0.1:5000/get_location_names";

    // Server se GET request ke zariye locations mangwana
    $.get(url, function(data, status) {
        console.log("got response for get_location_names request");
        if(data) {
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty(); // Purani khali fields clear karein

            // Loop chala kar dropdown mein saare naam add karna
            for(var i in locations) {
                var opt = new Option(locations[i]);
                $('#uiLocations').append(opt);
            }
        }
    });
}

// Windows load event par onPageLoad function chalana
window.onload = onPageLoad;