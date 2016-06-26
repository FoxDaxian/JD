<?php
	header('Content-Type:text-plain;charset=UTF-8');
	$uname=$_REQUEST['uname'];
	$upwd=$_REQUEST['upwd'];
	$tel=$_REQUEST['tel'];
	$sql="INSERT INTO users VALUES(NULL,'$uname','$upwd','$tel')";
	$conn=mysqli_connect('127.0.0.1','root','','jd',3306);
	mysqli_query($conn,'SET NAMES UTF8');
	$result=mysqli_query($conn,$sql);
	if($result){
		echo "yes";
	}else{
		echo "no";
	};
?>