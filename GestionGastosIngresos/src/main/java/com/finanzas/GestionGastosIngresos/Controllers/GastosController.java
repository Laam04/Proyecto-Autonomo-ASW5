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

import com.finanzas.GestionGastosIngresos.Entities.Gasto;
import com.finanzas.GestionGastosIngresos.Repositories.GastoRepository;


@RestController
@RequestMapping("/api/gastos")
public class GastosController {

    @Autowired
    private GastoRepository gastoRepository;

    @PostMapping
    public ResponseEntity<Gasto> crearGasto(@Valid @RequestBody Gasto gasto) {
        Gasto nuevoGasto = gastoRepository.save(gasto);
        return new ResponseEntity<>(nuevoGasto, HttpStatus.CREATED);
    }

    @GetMapping
    public List<Gasto> listarGastos() {
        return gastoRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Gasto> obtenerGasto(@PathVariable Long id) {
        return gastoRepository.findById(id)
                .map(gasto -> new ResponseEntity<>(gasto, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

}
