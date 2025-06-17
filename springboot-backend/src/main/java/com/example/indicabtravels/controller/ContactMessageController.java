package com.example.indicabtravels.controller;

import com.example.indicabtravels.entity.ContactMessage;
import com.example.indicabtravels.service.ContactMessageService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact-messages")
public class ContactMessageController {

    private final ContactMessageService contactMessageService;

    public ContactMessageController(ContactMessageService contactMessageService) {
        this.contactMessageService = contactMessageService;
    }

    @PostMapping
    public ResponseEntity<ContactMessage> createContactMessage(@Valid @RequestBody ContactMessage message) {
        ContactMessage createdMessage = contactMessageService.createContactMessage(message);
        return ResponseEntity.ok(createdMessage);
    }

    @GetMapping
    public ResponseEntity<List<ContactMessage>> getAllContactMessages() {
        List<ContactMessage> messages = contactMessageService.getAllContactMessages();
        return ResponseEntity.ok(messages);
    }

    @PatchMapping("/{id}/resolve")
    public ResponseEntity<ContactMessage> markMessageResolved(@PathVariable String id) {
        ContactMessage updatedMessage = contactMessageService.markMessageResolved(id);
        if (updatedMessage == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedMessage);
    }
}
