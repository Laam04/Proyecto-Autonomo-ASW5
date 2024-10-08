package com.finanzas.GestionGI.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finanzas.GestionGI.models.Ingreso;
import com.finanzas.GestionGI.repositories.IngresoRepository;

@RestController
@RequestMapping("/api/ingresos")
public class IngresoController {
    @Autowired
    private IngresoRepository ingresoRepository;

    @GetMapping
    public List<Ingreso> getAll() {
        return ingresoRepository.findAll();
    }

    @PostMapping
    public Ingreso create(@RequestBody Ingreso ingreso) {
        return ingresoRepository.save(ingreso);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        ingresoRepository.deleteById(id);
    }
}
