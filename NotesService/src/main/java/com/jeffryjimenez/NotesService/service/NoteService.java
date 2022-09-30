package com.jeffryjimenez.NotesService.service;

import com.jeffryjimenez.NotesService.domain.Note;
import com.jeffryjimenez.NotesService.exception.NotAllowedException;
import com.jeffryjimenez.NotesService.exception.ResourceNotFoundException;
import com.jeffryjimenez.NotesService.payload.NoteRequest;
import com.jeffryjimenez.NotesService.repository.NoteRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class NoteService {

    @Autowired
    private NoteRepository noteRepository;

    public Note createNode(NoteRequest noteRequest, String username){

        log.info("creating not...");

        Note note = new Note();
        note.setMessage(noteRequest.getMessage());
        note.setUsername(username);

        note = noteRepository.save(note);

        log.info("Note {} i saves successfully for user {}", note.getId(), note.getUsername());

        return note;
    }

    public void deleteNote(Long noteId, String username){

        log.info("deleting note {}", noteId);

        noteRepository.findById(noteId)
                .map(note -> {

                    if(!note.getUsername().equals(username)){
                        log.warn("user {} is not allowed to delet note with id {}", username, noteId);
                        throw new NotAllowedException(username, "note id " + noteId, "delete");
                    }

                    noteRepository.delete(note);
                    return note;
                }).orElseThrow(() -> {
                    log.warn("note not found id {}", noteId);
                    return new ResourceNotFoundException(Long.toString(noteId));
                });
    }

    public List<Note> notesByUsernames(String username){
        return noteRepository.findByUsername(username);
    }


}
