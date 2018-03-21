<!DOCTYPE HTML>
<html>
<head>
    <meta charset="UTF-8"> 
    <title>SMP</title>

    <style>

      .legend {
        font-size: 12px;
      }
      rect {
        stroke-width: 2;
      }

    </style>

    <script src="https://d3js.org/d3.v4.min.js"></script>

</head>
<body>

	<div id="chart" align="center"></div>

		<script>
			var stakeholder_detailinfo = <?php 
					echo file_get_contents('http://www3.llinxx.com:3150/stakeholderhh/stakeholders?fields=*');  
			?>  
		</script>

		<script src="main.js"></script>

</body> 
</html>
