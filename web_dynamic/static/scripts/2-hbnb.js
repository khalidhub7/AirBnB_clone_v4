$(document).ready(() => {
    let amenities = {};
    // check if input is checked to change ...
    // this code is changed by khalid
    $('input[type="checkbox"]').change(() => {
      amenities = {};
  
      $('input[type="checkbox"]:checked').each(function () {
        amenities[$(this).data("id")] = $(this).data("name");
      });
  
      let amenText = $(".amenities h4").html("&nbsp;");
      let initWidth = amenText.width();
  
      let i = 0;
      for (let key in amenities) {
        if (amenText.width() > initWidth) {
          amenText.append("...");
          break;
        }
  
        if (i >= 1) {
          amenText.append(", ");
        }
  
        let amen = amenities[key];
        for (let j = 0; j < amen.length; j++) {
          if (amenText.width() > initWidth) {
            amenText.append("...");
            break;
          }
          amenText.append(amen[j]);
        }
        i++;
      }
    });
  
    // Function to update the status
    function updateApiStatus() {
      $.get("http://127.0.0.1:5001/api/v1/status/", (data) => {
        if (data.status === "OK") {
          $("#api_status").addClass("available");
        } else {
          $("#api_status").removeClass("available");
        }
      }).fail(() => {
        $("#api_status").removeClass("available");
      });
    }

    // Initial status update
    updateApiStatus();
    setInterval(updateApiStatus, 30000);
  });
