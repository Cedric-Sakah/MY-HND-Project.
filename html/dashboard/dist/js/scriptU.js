
$(document).ready(function() {
    $.ajax({
        url: 'http://localhost:3000/api/users', // Update this with your API endpoint
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            // Check if response contains data
            if (response.length > 0) {
                // Loop through each data object and populate the table
                response.forEach(function(data) {
                    var row = '<tr class="tr-shadow" >';
                    row += '<td>' + data.user_id + '</td>';
                    row += '<td>' + data.username + '</td>';
                    row += '<td>' + data.email + '</td>';
                    row += '<td>' + data.address + '</td>';
                    row += '<td>' + data.phone_number + '</td>';
                    row += '</tr>';
                    
                    $('#table-users').append(row); // Update 'orders-table' with your table ID
                });
            } else {
                // Handle case where no data is returned
                $('#table-users').append('<tr><td colspan="11">No Data Available</td></tr>'); // Update 'orders-table' with your table ID
            }
        },
        error: function(xhr, status, error) {
            console.error('Error:', error);
            alert('Failed to fetch data. Please try again.');
        }
    });
});