$(function(){
    $('#sortable').sortable();
    $('#sortable').disableSelection();

    var map = 
    [{
        name :"card-a",
        group :"a",
        componentPath : "./card-a.html"
    },{
        name :"card-b",
        group :"a",
        componentPath : "./card-b.html"
    }];

    // add-btn click
    $('#add-btn button').on('click',function(){
        $this = $(this);
        let matched = map.filter(function(itm,ix){
            if ($this.attr('data-name') == itm.name) return true;
        });
        let path = matched[0].componentPath;

        $.ajax({
            method: "GET",
            url : path,
            dataType : "html"
        }).done(function(html){
            $('#sortable').append(html);
        });
    });

    // remove-btn click
    $(document).on('click','#remove-btn',function(){
        $(this).parent().parent().remove();
    });
});