
$(document).ready(function() {
    $.ajax({
        url: 'http://localhost:3000/api/orders', // Update this with your API endpoint
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            console.log(response)
            // Check if response contains data
            if (response.length > 0) {
                // Loop through each data object and populate the table
                response.forEach(function(data) {
                    var row = '<tr class="tr-shadow">';
                    row += '<td>' + data.order_id + '</td>';
                    row += '<td>' + data.user_id + '</td>';
                    row += '<td>' + data.origin_address + '</td>';
                    row += '<td>' + data.pickup_address + '</td>';

                    row += '<td>' + data.destination_address + '</td>';
                    row += '<td>' + data.delivery_address + '</td>';

                    row += '<td>' + data.goods_description + '</td>';
                    row += '<td>' + data.pickup_date + '</td>';
                    row += '<td>' + data.delivery_date + '</td>';
                    row += '<td>' + data.receiver_email + '</td>';
                    row += '<td>' + data.receiver_phone + '</td>';
                    row += '<td>' + data.receiver_name + '</td>';
                    row += '<td>' + data.sender_name + '</td>';
                    row += '</tr>';
                    $('#orders-table-tbody').append(row); // Update 'orders-table' with your table ID
                });
            } else {
                // Handle case where no data is returned
                $('#orders-table-tbody').append('<tr><td colspan="11">No Data Available</td></tr>'); // Update 'orders-table' with your table ID
            }
        },
        error: function(xhr, status, error) {
            console.error('Error:', error);
            alert('Failed to fetch data. Please try again.');
        }
    });
});