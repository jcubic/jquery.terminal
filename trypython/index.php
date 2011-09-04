<?php // -*- mode: nxml -*-
if (strcmp($_SERVER['HTTP_HOST'], 'localhost') != 0) {
  require('utils.php');
  hit();
  header("X-Powered-By: ");
}
?>
<!DOCTYPE HTML>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="utf-8" />
    <title>Try Python - Interactive AJAX Python Interpreter</title>
    <meta name="Description" content="Try python directly in you browser with this ajax driven interactive interpreter appliction."/>
    <meta name="Keywords" content="python ajax web2.0 interpreter browser terminal JSON-RPC"/>
    <link rel="shortcut icon" href="favicon.ico"/>
    <!--[if IE]>
    <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
<?php if (strcmp($_SERVER['HTTP_HOST'], 'localhost') != 0) { ?>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js"></script>
    <script src="http://terminal.jcubic.pl/js/jquery.mousewheel-min.js"></script>
    <script src="http://terminal.jcubic.pl/js/jquery.terminal-min.js"></script>
<?php } else { ?>
    <script src="../js/jquery-1.5.min.js"></script>
    <script src="../js/jquery.mousewheel-min.js"></script>
    <script src="../js/jquery.terminal-dev.js"></script>
<?php } ?>
    <script src="js/main.js"></script>
    <link href="css/style.css" rel="stylesheet"/>
    <script></script>
</head>
<body>
  <section>
    <header><img src="css/python.png"/><h1>Try Python</h1></header>
    <div id="terminal"></div>
    <p>This is interactive AJAX driven online interpeter for <a href="http://www.python.org">Python</a> Programming language. It use <a href="http://terminal.jcubic.pl">JQuery terminal Emulator Plugin</a>.</p>
  </section>
  <div id="wrapper">
    <div id="shadow"></div>
  </div>
<?php  if (strcmp($_SERVER['HTTP_HOST'], 'localhost') != 0) {  ?>
  <aside> 
    <a id="html5" href="http://www.w3.org/html/logo/">
      <img src="http://www.w3.org/html/logo/badge/html5-badge-v-css3-graphics-semantics.png" width="38" height="170" alt="HTML5 Powered with CSS3 / Styling, Graphics, 3D &amp; Effects, and Semantics" title="HTML5 Powered with CSS3 / Styling, Graphics, 3D &amp; Effects, and Semantics">
</a>
    <div id="share">
      <a href="http://twitter.com/share" class="twitter-share-button" data-url="http://trypython.jcubic.pl" data-text="Check out this #AJAX Interactive #Python interpreter #web2.0" data-count="vertical" data-via="jcubic">Tweet</a>
      <script type="text/javascript" src="http://platform.twitter.com/widgets.js" async="true"></script>
      <script src="http://widgets.digg.com/buttons.js" async="true"></script>
      <a class="DiggThisButton DiggMedium"></a>
      <iframe src="http://www.facebook.com/plugins/like.php?href=http%3A%2F%2Ftrypython.jcubic.pl&amp;layout=box_count&amp;show_faces=true&amp;action=like&amp;colorscheme=light&amp;locale=en_US" scrolling="no" frameborder="0" style="border:none; margin-right:-2px; overflow:hidden; width:55px; height:65px;" allowTransparency="true"></iframe>
    </div>
     <?php } ?>
  </aside>
  <footer>Copyright &copy; 2011 <a href="http://jcubic.pl">Jakub Jankiewicz</a></footer>

</body>
</html>
