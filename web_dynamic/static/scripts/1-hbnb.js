$(document).ready(function() {
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
});
