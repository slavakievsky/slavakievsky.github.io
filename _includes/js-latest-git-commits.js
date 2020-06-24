<script async type="text/javascript">
    let fallbacks = [
        {'html_url':"https://github.com/pushsla/VkDa", "full_name":"pushsla/VkDa"},
        {'html_url':"https://github.com/pushsla/torodofi", "full_name":"pushsla/torodofi"},
        {'html_url':"https://github.com/pushsla/pushsla.github.io", "full_name":"pushsla/pushsla.github.io"}]
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://api.github.com/users/pushsla/repos?type=all&sort=updated", false );
    xmlHttp.send( null );
    let data = JSON.parse(xmlHttp.response);
    for(let i = 0; i < 3; i++){
        let tag = "";
        try {
            tag = `<a href=${data[i].html_url}>${data[i].full_name}</a>`;
        }catch(e){
            tag = `<a href=${fallbacks[i]["html_url"]}>${fallbacks[i]["full_name"]}</a>`
        }
        let target = document.getElementById(   `gitactivity${i}`);
        target.innerHTML = tag;
    }
</script>
<noscript>

</noscript>