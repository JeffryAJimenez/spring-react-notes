package com.jeffryjimenez.NotesService.config;

import com.jeffryjimenez.NotesService.domain.Note;
import com.jeffryjimenez.NotesService.repository.NoteRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataConfig {

    @Bean
    public CommandLineRunner commandLineRunner(NoteRepository noteRepository){

        return args -> {
            Note note1 = new Note("Note from john! hello world", "johndoe");
            Note note2 = new Note( "Note from Marta, What should i eat tomorrow", "johndoe");
            Note note3 = new Note("Note from Jotaro! ZA WARDU!", "johndoe");

            noteRepository.save(note1);
            noteRepository.save(note2);
            noteRepository.save(note3);

        };
    }
}
