package com.finanzas.GestionGastosIngresos.Controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finanzas.GestionGastosIngresos.Entities.Ingreso;
import com.finanzas.GestionGastosIngresos.Repositories.IngresoRepository;


@RestController
@RequestMapping("/api/ingresos")
public class IngresoController {

    @Autowired
    private IngresoRepository ingresoRepository;

    @PostMapping
    public ResponseEntity<Ingreso> crearIngreso(@Valid @RequestBody Ingreso ingreso) {
        Ingreso nuevoIngreso = ingresoRepository.save(ingreso);
        return new ResponseEntity<>(nuevoIngreso, HttpStatus.CREATED);
    }

    @GetMapping
    public List<Ingreso> listarIngresos() {
        return ingresoRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ingreso> obtenerIngreso(@PathVariable Long id) {
        return ingresoRepository.findById(id)
                .map(ingreso -> new ResponseEntity<>(ingreso, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

}
