package com.example.demo.contollers;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Message;

@RestController
public class MessageController {

	@MessageMapping("/message") // this message is for sending
	@SendTo("/topic/return-to") // this is for receiving
	public Message getContent(@RequestBody Message message) {

		try {
			Thread.sleep(1000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}

		return message;
	}
}
