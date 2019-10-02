$('#city').on('change', function () {
    // Do a async request to get the temperature
    $.ajax({
        url: "./home/getweather",
        method: "POST",
        data: "city=" + this.value,
        success: function (r) {
            var table = "#city-body";

            // Fill the table with the retrieved data
            $(table).append("<tr data-id='" + r.id + "'>");
                $(table + " tr[data-id='" + r.id + "']").append("<td>" + r.name + "</td>");
                $(table + " tr[data-id='" + r.id + "']").append("<td>" + r.main.temp + "&deg;C</td>");
            $(table).append("</tr>");

            // Now order the table alphabetically
            var listitems = $(table).find('tr');
            listitems.sort(function (a, b) {
                return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());
            });

            // Append all the ordered data again
            $.each(listitems, function (idx, itm) {
                $(table).append(itm);
            });
        }
    });
});