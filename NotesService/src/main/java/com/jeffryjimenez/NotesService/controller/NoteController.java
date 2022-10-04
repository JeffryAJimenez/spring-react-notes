package com.jeffryjimenez.NotesService.controller;

import com.jeffryjimenez.NotesService.domain.Note;
import com.jeffryjimenez.NotesService.payload.NoteRequest;
import com.jeffryjimenez.NotesService.service.NoteService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/notes")
public class NoteController {

    private NoteService noteService;

    public NoteController(NoteService noteService){
        this.noteService = noteService;
    }

    @PostMapping("/")
    public ResponseEntity<?> createNote(@RequestBody NoteRequest noteRequest, Principal principal){
        log.info("recieved a request to create a note for {}", principal.getName());

        Note note = noteService.createNode(noteRequest, principal.getName());

        return new ResponseEntity<Note>(note, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteNote(@PathVariable("id") Long id, Principal principal){
        noteService.deleteNote(id, principal.getName());
    }

    @GetMapping("/me")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> findCurrentUserNotes(Principal principal){
        log.info("retrieving notes for user {}", principal.getName());

        List<Note> notes = noteService.notesByUsernames(principal.getName());
        log.info("found {} notes for user {}", notes.size(), principal.getName());

        return ResponseEntity.ok(notes);
    }

    @GetMapping("/{username}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> findUserNotes(@PathVariable("username") String username){
        log.info("retrieving notes for user {}", username);

        List<Note> notes = noteService.notesByUsernames(username);
        log.info("found {} notes for user {}", notes.size(), username);

        return ResponseEntity.ok(notes);
    }




}
