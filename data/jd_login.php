<?php
	header('Content-Type:text-plain;charset=UTF-8');
	$output=['upid'=>0,'msg'=>''];
	$uname=$_REQUEST['uname'];
	$upwd=$_REQUEST['upwd'];
	$sql="SELECT pid,uname FROM users WHERE uname='$uname' AND password='$upwd'";
	$conn=mysqli_connect('127.0.0.1','root','','jd',3306);
	mysqli_query($conn,'SET NAMES UTF8');
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_assoc($result);
	if($row){
		$output['upid']=intval($row['pid']);
		$output['msg']=$row['uname'];
	}else{
		$output['upid']=-404;
		$output['msg']='您的用户名账号不存在';
	}
	echo json_encode($output);
?>