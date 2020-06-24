<script type="text/javascript">
var date = new Date();
var date = date.getHours();
if (date < 7 && date > 20) {
    var file = "/assets/styles/style-night.css"
    var link = document.createElement( "link" );
    link.href = file
    link.type = "text/css";
    link.rel = "stylesheet";
    link.media = "screen,print";
    document.getElementsByTagName( "head" )[0].appendChild( link );
}
</script>