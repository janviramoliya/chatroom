var stompClient=null

function connect(){
	
	let socket = new SockJS("/server1");
	stompClient=Stomp.over(socket);
	stompClient.connect({},function(frame){
		console.log("connected"+frame);
		
		$("#name-form").addClass("d-none")
		$("#chat-room").removeClass("d-none")
		
		// subscribe
		stompClient.subscribe("/topic/return-to",function(response){
			showMessage(JSON.parse(response.body))
		})
	})
}

function sendMessage(){
	
	let jsonObj={
		name:localStorage.getItem('name'),
		content:$("#message").val()
	}
	
	console.log(jsonObj)
	
	stompClient.send("/app/message",{},JSON.stringify(jsonObj))
}

function showMessage(message){
	console.log(message)
	$("#message-container-table").prepend('<tr><td><b>'+message.name+' :</b> '+message.content+'</td></tr>')
}

function logout(){
	
	console.log("logging out")
	
	$("#chat-room").addClass("d-none")
	$("#name-form").removeClass("d-none")
}

$(document).ready((e)=>{
	
	$("#login").click(()=>{
		
		let name=$("#name-value").val();
		localStorage.clear()
		localStorage.setItem("name",name);
		connect();
	});
	
	$("#send-btn").click(()=>{
		sendMessage()
	})
	
	$("#logout").click(()=>{
		logout();
	})
});