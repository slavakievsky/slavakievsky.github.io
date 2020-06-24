<script async type="text/javascript">
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://api.github.com/users/pushsla/repos?type=all&sort=updated", false );
    xmlHttp.send( null );
    let data = JSON.parse(xmlHttp.response);
    for(let i = 0; i < 3; i++){
        let tag = `<a href=${data[i].html_url}>${data[i].full_name}</a>`;
        let target = document.getElementById(   `gitactivity${i}`);
        target.innerHTML = tag;
    }
</script>
<noscript>

</noscript>