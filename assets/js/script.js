
$("#add_course").on("submit", function(event){
    alert("Course Added Successfully!");
});




$("#update_course").on("submit", function(event){
    event.preventDefault();
    
    var unindexed_array = $(this).serializeArray();
    var data = {};

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    });

    // JSON.parse(obj);

    alert(`type is ${data.fees + 5}`)

    var request = {
        "url" : `http://localhost:3000/update/${data.id}`,
        "method" : "PATCH",
        "data" : data
    };

    alert(`Course updated successfully!`);

    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!");
    });
    window.location.href = "http://localhost:3000/";

});