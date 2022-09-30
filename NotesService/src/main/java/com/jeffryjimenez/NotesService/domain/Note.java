package com.jeffryjimenez.NotesService.domain;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;

@Data
@Entity
public class Note {

    @Id
    private Long id;

    @NotBlank
    String message;

    @NotBlank
    private String username;
}
