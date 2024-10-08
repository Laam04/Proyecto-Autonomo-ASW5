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

import com.finanzas.GestionGI.models.CategoriaGasto;
import com.finanzas.GestionGI.repositories.CategoriaGastoRepository;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaGastoController {
    @Autowired
    private CategoriaGastoRepository categoriaGastoRepository;

    @GetMapping
    public List<CategoriaGasto> getAll() {
        return categoriaGastoRepository.findAll();
    }

    @PostMapping
    public CategoriaGasto create(@RequestBody CategoriaGasto categoriaGasto) {
        return categoriaGastoRepository.save(categoriaGasto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        categoriaGastoRepository.deleteById(id);
    }
}

