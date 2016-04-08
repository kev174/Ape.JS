<!-- Randomly place a .jpg on a 3 * 3 <form> every three seconds-->

<html>
<head>
<meta http-equiv="refresh">
<style>
tr { width: 300px; height: 100px }
td { width: 100px; height: 100px }
img { width: 100px; height: 100px }
</style>
<script language=Javascript>

	setInterval(function() {
          window.location.reload();
          }, 3000); 
				
	var apeLoc = 0, count = 0;
	var imagelist = new Array("http://graemehobbs93.files.wordpress.com/2012/01/ape-1.jpg", "grass.jpg", "grass.jpg", "grass.jpg", "grass.jpg", "grass.jpg", "grass.jpg", "grass.jpg", "grass.jpg");
	//var imagelist = new Array("http://graemehobbs93.files.wordpress.com/2012/01/ape-1.jpg", "biscuits.jpg", "candy.jpg", "cola.jpg", "grass.jpg", "grass.jpg", "grass.jpg", "grass.jpg", "grass.jpg");
	var firstImageElement = document.getElementByTagName("img")[0];
	
       function moveImgRandomly() {          
          whichImage = Math.floor(Math.random()*imagelist.length);	  
          document.write('<img src="' +imagelist[whichImage]+ '">');
		  
		  // Remove image from list so diplicates do not occur.
		  imagelist.splice(whichImage,1); 	
		  
		  // whichImage[0] will always contain the ape.jpg.
		  if(whichImage == 0 && count == 0) {		  
		  document.write("var 'apeLoc' #" + whichImage);	  
		  		  
		  // Var 'apeLoc' now contains the location of the ape-1.jpg 
		  apeLoc = whichImage; 
		  count = 1;
		  
		  imagelist[0].addEventListener("click", success, true);
		  }		  	  
       }
	function getImage(){
		document.getElementById("img1").src = "images/candy.jpg";
		return "images/cola.jpg";
	}

	function success(){
		window.alert(" Caught!");
	}

</script>
</head>
<body>
<table>
   <tr>
    <!--<td><img id="img1" src="images/biscuits.jpg" onload="this.onload=null; this.src=getImage();" onClick="success()"></td>-->
	<td><script>moveImgRandomly();</script></td>
	<td><script>moveImgRandomly();</script></td>
	<td><script>moveImgRandomly();</script></td>
   </tr>
   <tr>
    <td><script>moveImgRandomly();</script></td>
	<td><script>moveImgRandomly();</script></td>
	<td><script>moveImgRandomly();</script></td>
   </tr>
   <tr>
    <td><script>moveImgRandomly();</script></td>
	<td><script>moveImgRandomly();</script></td>
	<td><script>moveImgRandomly();</script></td>
   </tr>
 </tr>
</table>
</body>
</html>
