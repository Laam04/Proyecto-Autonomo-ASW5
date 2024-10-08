package com.finanzas.GestionGI.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finanzas.GestionGI.models.CategoriaGasto;
import com.finanzas.GestionGI.models.Gasto;
import com.finanzas.GestionGI.repositories.CategoriaGastoRepository;
import com.finanzas.GestionGI.repositories.GastoRepository;

@RestController
@RequestMapping("/api/gastos")
public class GastoController {

    @Autowired
    private GastoRepository gastoRepository;

    @Autowired
    private CategoriaGastoRepository categoriaGastoRepository;

    @GetMapping
    public List<Gasto> getAll() {
        return gastoRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Gasto> create(@RequestBody Gasto gasto) {
        Optional<CategoriaGasto> categoriaOpt = categoriaGastoRepository.findById(gasto.getCategoria().getId());
        
        if (!categoriaOpt.isPresent()) {
            return ResponseEntity.badRequest().build();
        }
        
        gasto.setCategoria(categoriaOpt.get());
        
        Gasto nuevoGasto = gastoRepository.save(gasto);
        return ResponseEntity.ok(nuevoGasto); 
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        gastoRepository.deleteById(id);
    }
}
