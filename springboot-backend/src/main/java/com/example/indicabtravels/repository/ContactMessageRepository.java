package com.example.indicabtravels.repository;

import com.example.indicabtravels.entity.ContactMessage;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactMessageRepository extends MongoRepository<ContactMessage, String> {
}
