$(document).ready(function(){
//	$(".btn1").click(function(){
//		$(".word").slideUp("slow");
//		$(".logincon").slideDown("slow");
//	})
//	$(".btn2").click(function(){
//		$(".word").slideDown("slow");
//		$(".logincon").slideUp("slow");
//	})
	$(".btn1").click(function(){
		$(".word").slideToggle("slow");
		$(".logincon").slideToggle("slow");
	})
	
	$(".btna").click(function(){
		$(".txt").animate({
			width:"200px",
			height:"200px",
		},10)
	})
	$(".btnb").click(function(){
		$(".txt").animate({
			width:"200px",
			height:"50px",
		},10)
	})
	$(".btnc").click(function(){
		$(".txt").animate({
			height:"-=15px",
		},10,)
	})
	$(".btnd").click(function(){
		$(".txt").animate({
			height:"+=15px",
		},10,)
	})
	
	
	
	
	
	
	
})
