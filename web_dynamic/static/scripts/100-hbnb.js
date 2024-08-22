$(document).ready(() => {
    let selectedAmenities = {};
    let selectedStates = {};
    let selectedCities = {};

    // Handle checkbox changes for amenities, states, and cities
    $('input[type="checkbox"]').change(function() {
        let id = $(this).data('id');
        let name = $(this).data('name');
        
        if ($(this).closest('div.amenities').length > 0) {
            // Update selected amenities
            $(this).prop("checked") ? selectedAmenities[id] = name : delete selectedAmenities[id];
        } else if ($(this).closest('div.locations').length > 0 && $(this).closest('ul').parent().is('li')) {
            // Update selected states
            $(this).prop("checked") ? selectedStates[id] = name : delete selectedStates[id];
        } else if ($(this).closest('div.locations').length > 0 && $(this).closest('ul').parent().is('ul')) {
            // Update selected cities
            $(this).prop("checked") ? selectedCities[id] = name : delete selectedCities[id];
        }

        updateLocationsText();
    });

    function updateLocationsText() {
        let locationsText = $(".locations h4").css({
            "white-space": "nowrap",
            "text-overflow": "ellipsis" // Maintain consistent style
        }).text(""); // Clear existing text

        let initialWidth = locationsText.width();
        let textToDisplay = '';

        // Build text content for states and cities
        for (let id in selectedStates) {
            if (textToDisplay) textToDisplay += ", ";
            textToDisplay += selectedStates[id];
        }
        for (let id in selectedCities) {
            if (textToDisplay) textToDisplay += ", ";
            textToDisplay += selectedCities[id];
        }

        locationsText.text(textToDisplay); // Temporarily set text to check width

        // Check if overflow occurs
        if (locationsText.width() > initialWidth) {
            locationsText.text(textToDisplay.slice(0, -10) + '...'); // Remove last 10 chars and append '...'
        }
    }

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
            data: JSON.stringify({
                amenities: Object.keys(selectedAmenities),
                states: Object.keys(selectedStates),
                cities: Object.keys(selectedCities)
            }),
            success: function(data) {
                update_places_section(data);
            },
            error: function() {
                console.log("Error when fetching data");
            }
        });
    }

    $("button.submit_search").click(function () {
        fetch_places_with_amenities(); // Fetch data when button is clicked
    });
});