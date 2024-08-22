$(document).ready(function() {
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

    $.ajax({
        url: "http://127.0.0.1:5001/api/v1/places_search",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({}),
        success: function(data) {
            update_places_section(data);
        },
        error: function() {
            console.log("Error when fetching data");
        }
    });
});