$(document).ready(function() {
    $('#delete-offer').click(function() {
        let offerId = $(this).attr('offer-id');
        $.ajax({
            method: 'DELETE',
            url: '/offers/' + offerId,
            success: function(data) {
                window.location.href = '/offers';
            },
            error: function(err) {
                // TODO toastr
            }
        });
    });
});