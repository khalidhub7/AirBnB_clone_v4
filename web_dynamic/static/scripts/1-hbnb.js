$(document).ready(function() {
    let amenities = {};

    $('input[type="checkbox"]').change(function() {
        amenities = {}; // Clear existing data

        $('input[type="checkbox"]:checked').each(function() {
            let id = $(this).data('id');
            let name = $(this).data('name');
            amenities[id] = name;
        });

        let amenText = $(".amenities h4");
        amenText.html("&nbsp;");

        let initWidth = amenText.width();
        let i = 0, b = 0;

        for (let key in amenities) {
            if (amenText.width() > initWidth) {
                amenText.append('...');
                break;
            }
            if (i >= 1) {
                amenText.append(", ");
            }
            let amen = amenities[key];
            for (let j = 0; j < amen.length; j++) {
                if (amenText.width() > initWidth) {
                    amenText.append('...');
                    b = 1;
                    break;
                }
                amenText.append(amen[j]);
            }
            if (b) { break; }
            i++;
        }
    });
});
