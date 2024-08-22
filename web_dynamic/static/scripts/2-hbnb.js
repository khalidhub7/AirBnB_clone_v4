$(document).ready(() => {
    function updateApiStatus() {
        $.get("http://0.0.0.0:5001/api/v1/status/", (data) => {
            const $apiStatus = $("#api_status");

            if (data.status === "OK") {
                $apiStatus.addClass("available").removeAttr('id');
            } else {
                $apiStatus.removeClass("available").attr('id', 'api_status');
            }
        });
    }

    updateApiStatus();
    /* setInterval(updateApiStatus, 30000);  Update every 30 seconds */
});