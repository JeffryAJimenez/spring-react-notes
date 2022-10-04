package com.jeffryjimenez.NotesService.service;

import com.jeffryjimenez.NotesService.domain.Note;
import com.jeffryjimenez.NotesService.exception.NotAllowedException;
import com.jeffryjimenez.NotesService.exception.ResourceNotFoundException;
import com.jeffryjimenez.NotesService.payload.NoteRequest;
import com.jeffryjimenez.NotesService.repository.NoteRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class NoteServiceUnitTest {

    @InjectMocks
    NoteService noteService;

    @Mock
    NoteRepository noteRepository;

    @Test
    @DisplayName("Create Note")
    public void testCreatNote(){

        String message = "this is a message";
        String user = "johndoe";

        NoteRequest request = new NoteRequest();
        request.setMessage(message);

        Note expected = new Note(1L, message, user);
        when(noteRepository.save(any(Note.class))).thenReturn(new Note(1L, message, user));

        Note actual = noteService.createNode(request, user);

        assertEquals(expected, actual);
    }

    @Test
    @DisplayName("Delete Note")
    public void testDeleteNote_SUCCESS(){

        long id = 1L;
        String username = "johndoe";
        Note note = new Note(1L, "this is a test", username);

        when(noteRepository.findById(id)).thenReturn(Optional.of(note));

        assertDoesNotThrow(() -> noteService.deleteNote(id, username));
    }

    @Test
    @DisplayName("Delete Note Not Allowed Exception")
    public void testDeleteNote_NOT_ALLOWED(){

        long id = 1L;
        String username = "johndoe";
        Note note = new Note(1L, "this is a test", "notJohn");

        when(noteRepository.findById(id)).thenReturn(Optional.of(note));

        assertThrows(NotAllowedException.class, () -> noteService.deleteNote(id, username));
    }

    @Test
    @DisplayName("Delete Note Not Found Exception")
    public void testDeleteNote_NOT_FOUND(){

        long id = 1L;
        String username = "johndoe";


        when(noteRepository.findById(id)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> noteService.deleteNote(id, username));
    }

    @Test
    @DisplayName("Find by username found!")
    public void testFindByUsername(){

        String username = "johndoe";
        Note note = new Note(1L, "Message", username);

        List<Note> notes = Arrays.asList(note);

        when(noteRepository.findByUsername(username)).thenReturn(notes);

        int expected = 1;
        int actual = noteService.notesByUsernames(username).size();
        assertEquals(expected, actual);
    }
}
