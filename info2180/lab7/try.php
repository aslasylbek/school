
        <script src="//ajax.googleapis.com/ajax/libs/prototype/1.7.1.0/prototype.js"></script>
<ul id="fruits">
  <li id="apples">
    <h3 title="yummy!">Apples</h3>
    <ul id="list-of-apples">
      <li id="golden-delicious" title="yummy!" >Golden Delicious</li>
      <li id="mutsu" title="yummy!">Mutsu</li>
      <li id="mcintosh">McIntosh</li>
      <li id="ida-red">Ida Red</li>
    </ul>
    <p id="saying">An apple a day keeps the doctor away.</p>
  </li>
</ul>
<script>
    window.onload = function(){
         var a = $('apples').select('[title="disgusting!"]');
        alert(a);
    }
</script>