<!-- mathjax config similar to math.stackexchange -->
<script async type="text/x-mathjax-config">
MathJax.Hub.Config({
    extensions: ["tex2jax.js","TeX/AMSmath.js","TeX/AMSsymbols.js"],
    jax: ["input/TeX", "output/HTML-CSS"],
    tex2jax: {
        inlineMath: [ ['$', '$'] ],
        displayMath: [ ['$$', '$$']],
        processEscapes: true,
        skipTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code']
    },
    messageStyle: "none",
    "HTML-CSS": {
        preferredFont: "TeX",
        availableFonts: ["STIX","TeX"],
        scale: {%- if page.mathjax.scale -%}{{page.mathjax.scale}}{%- else -%}100{%- endif -%}
    },
});
</script>
<script async src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML" type="text/javascript"></script>