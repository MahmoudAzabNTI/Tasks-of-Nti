// var search_input = document.querySelector('#search_input');

// search_input.addEventListener('keyup', function(e) {
//     console.log(e.target.value);
//     var search_item = e.target.value.toLowerCase();
//     var span_items = document.querySelectorAll('.table_body .name td')
//     console.log(span_items);
//     span_items.forEach(function(item){
//         if(item.textContent.toLowerCase().indexOf(search_item) != -1){
//             item.closest("tr").style.display = "block"
//         }else{
//             item.closest("tr").style.display = "none"
//         }
//     })
// })
var myArray = [
    {"id":"1629037986903","name":"mohamedt","accNum":"65555","balance":"3005","status":"true"},
    {"id":"1629041542002","name":"ahmed","accNum":"69655","balance":"500","status":"true"},
    {"id":"1629059584688","name":"mostafa","accNum":"55555","balance":"4500","status":"false"},
    {"id":"1629066654672","name":"amir","accNum":"123","balance":"5000","status":"true"}]

    // var arr = fetch()
$("#search_input").on('keyup', function() {
    var value = $(this).val();
    console.log(value);
    var data = searchTalble(value, myArray)
    console.log(data);

})

function searchTalble(value, data){
    var fillterData = [];
    for(var i=0; i < data.length; i++){
        value = value.toLowerCase()
        var name = data[i].name.toLowerCase();
        if(name.includes(value)){
            fillterData.push(data[i])
        }
    }
    
    return fillterData;
}