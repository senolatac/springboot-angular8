package com.sha.serverside.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Table(name="course")
public class Course implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="name")
    private String name;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="instructor_id", referencedColumnName = "id")
    private User instructor;
}
