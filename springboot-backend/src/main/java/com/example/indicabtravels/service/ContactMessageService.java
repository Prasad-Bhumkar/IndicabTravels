package com.example.indicabtravels.service;

import com.example.indicabtravels.entity.ContactMessage;
import com.example.indicabtravels.repository.ContactMessageRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContactMessageService {

    private final ContactMessageRepository contactMessageRepository;

    public ContactMessageService(ContactMessageRepository contactMessageRepository) {
        this.contactMessageRepository = contactMessageRepository;
    }

    public ContactMessage createContactMessage(ContactMessage message) {
        return contactMessageRepository.save(message);
    }

    public List<ContactMessage> getAllContactMessages() {
        return contactMessageRepository.findAll();
    }

    public Optional<ContactMessage> getContactMessageById(String id) {
        return contactMessageRepository.findById(id);
    }

    public ContactMessage markMessageResolved(String id) {
        Optional<ContactMessage> optionalMessage = contactMessageRepository.findById(id);
        if (optionalMessage.isPresent()) {
            ContactMessage message = optionalMessage.get();
            message.setResolved(true);
            return contactMessageRepository.save(message);
        }
        return null;
    }
}
