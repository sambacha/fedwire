function validateFedwire() {
    return $("#searchFormFedwire").validate().element("#updatedSinceFedwire");
}

function validateACH() {
    return $("#searchForm").validate().element("#updatedSince");
}

$(function () {
    $("#cityMenu").select();
});

function load_cities() {
    $('<input>').attr({
        type: 'hidden',
        id: 'updateCity',
        name: 'updateCity',
        value: 'true'
    }).appendTo('#searchForm');
    $("#searchForm").submit();
};

$(function () {

    $("#stateMenu").select();

    $('#results_table').DataTable();

    $('#format-wire-table').DataTable({
        paging: false,
        searching: false,
        ordering: false,
        info: false
    });

    $('#format-ach-table').DataTable({
        paging: false,
        searching: false,
        ordering: false,
        info: false
    });

    $('#results_table').DataTable();

    $("#updatedSinceFedwire").keydown(function (event) {
        if (event.which == 13) {
            event.preventDefault();
            $("#searchFormFedwire").submit();
        }
    });

    $("#updatedSince").keydown(function (event) {
        if (event.which == 13) {
            event.preventDefault();
            $("#searchForm").submit();
        }
    });

    $("#updatedSinceFedwire").datepicker({
        onSelect: function (date) {
            validateFedwire(date);
        }
    });

    $("#updatedSince").datepicker({
        onSelect: function (date) {
            validateACH(date);
        }
    });

    $("#searchForm").validate({
        rules: {
            updatedSince: {
                required: true,
                date: true
            }
        },
        messages: {
            updatedSince: {
                date: "Please enter a valid date.",
                required: "Please enter a valid date."
            }
        }
    });

    $("#searchFormFedwire").validate({
        rules: {
            updatedSinceFedwire: {
                required: true,
                date: true
            }
        },
        messages: {
            updatedSinceFedwire: {
                date: "Please enter a valid date.",
                required: "Please enter a valid date."
            }
        }
    });
});
