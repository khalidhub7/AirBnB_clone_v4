$(document).ready(() => {
    let selectedAmenities = {};

    $('input[type="checkbox"]').change(function() {
        // Get checkbox data
        let amenityId = $(this).data('id');
        let amenityName = $(this).data('name');
        
        // Update selected amenities
        $(this).prop("checked") ? selectedAmenities[amenityId] = amenityName : delete selectedAmenities[amenityId];

        let amenitiesText = $(".amenities h4").css({
            "white-space": "nowrap",
            "text-overflow": "ellipsis" // Added to maintain consistent style
        }).text(""); // Clear existing text

        let initialWidth = amenitiesText.width();
        let textToDisplay = '';

        // Build text content
        for (let id in selectedAmenities) {
            if (textToDisplay) textToDisplay += ", "; // Add comma if not first item

            textToDisplay += selectedAmenities[id];

            amenitiesText.text(textToDisplay); // Temporarily set text to check width

            // Check if overflow occurs
            if (amenitiesText.width() > initialWidth) {
                amenitiesText.text(textToDisplay.slice(0, -10) + '...'); // Remove last 4 chars and append '...'
                break;
            }
        }
    });








    function create_place_article(place) {
        let article = $("<article>", {
            html: `
            <div class="title_box">
                <h2>${place.name}</h2>
                <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
                <div class="max_guest">${place.max_guest} Guests</div>
                <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                <div class="number_bathrooms">${place.number_bathrooms} Bathroom</div>
            </div>
            <div class="description">
                ${place.description}
            </div>
            `,
        });
        return article;
    }

    function update_places_section(places) {
        let places_section = $("section.places");
        places_section.empty();

        let i = 0;
        while (i < places.length) {
            let place = create_place_article(places[i]);
            places_section.append(place);
            i++;
        }
    }



    function fetch_places_with_amenities() {
        $.ajax({
            url: "http://127.0.0.1:5001/api/v1/places_search",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ amenities: Object.keys(selectedAmenities) }),
            success: function(data) {
                update_places_section(data);
            },
            error: function() {
                console.log("Error when fetching data");
            }
        });
      }


    $("button.submit_search").click(function () {
      fetch_places_with_amenities();
    });
    fetch_places_with_amenities();
  });