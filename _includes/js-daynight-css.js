<script type="text/javascript">
var date = new Date();
var date = date.getHours();
if (date < 7 || date > 20) {
    var link = document.createElement( "link" );
    link.href = "/assets/styles/style-night.css"
    link.type = "text/css";
    link.rel = "stylesheet";
    link.media = "screen,print";
    link.id = "theme";
    document.getElementsByTagName( "head" )[0].appendChild( link );
}
</script>