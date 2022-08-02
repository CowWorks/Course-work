let clicks = 0;

$(function(){
        $("button").click(function(){
                clicks++;
                $("#conunter").html(clicks);
        });
});