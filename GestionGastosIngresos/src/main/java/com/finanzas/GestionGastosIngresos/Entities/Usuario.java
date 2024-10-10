package com.finanzas.GestionGastosIngresos.Entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "usuarios") 
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre no puede estar vacío.")
    @Column(name = "nombre", nullable = false)
    private String nombre;

    @NotBlank(message = "El correo no puede estar vacío.")
    @Email(message = "Formato de correo inválido.")
    @Column(name = "correo", nullable = false, unique = true)
    private String correo;

    @NotBlank(message = "La clave no puede estar vacía.")
    @Size(min = 6, message = "La clave debe tener al menos 6 caracteres.")
    @Column(name = "clave", nullable = false)
    private String clave;

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getClave() {
        return clave;
    }

    public void setClave(String clave) {
        this.clave = clave;
    }
}
