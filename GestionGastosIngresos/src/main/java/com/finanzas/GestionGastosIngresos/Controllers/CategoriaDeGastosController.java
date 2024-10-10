package com.finanzas.GestionGastosIngresos.Controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finanzas.GestionGastosIngresos.Entities.CategoriaGasto;
import com.finanzas.GestionGastosIngresos.Repositories.CategoriaGastoRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/categorias-de-gastos")
public class CategoriaDeGastosController {

    @Autowired
    private CategoriaGastoRepository categoriaGastoRepository;

    @PostMapping
    public ResponseEntity<CategoriaGasto> crearCategoriaGasto(@Valid @RequestBody CategoriaGasto categoriaGasto) {
        CategoriaGasto nuevaCategoria = categoriaGastoRepository.save(categoriaGasto);
        return new ResponseEntity<>(nuevaCategoria, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<CategoriaGasto>> obtenerTodasLasCategorias() {
        List<CategoriaGasto> categorias = categoriaGastoRepository.findAll();
        return new ResponseEntity<>(categorias, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoriaGasto> obtenerCategoriaPorId(@PathVariable Long id) {
        Optional<CategoriaGasto> categoria = categoriaGastoRepository.findById(id);
        if (categoria.isPresent()) {
            return new ResponseEntity<>(categoria.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoriaGasto> actualizarCategoriaDeGasto(
            @PathVariable Long id, 
            @RequestBody CategoriaGasto categoriaActualizada) {

        Optional<CategoriaGasto> categoriaExistente = categoriaGastoRepository.findById(id);
        if (categoriaExistente.isPresent()) {
            CategoriaGasto categoria = categoriaExistente.get();
            categoria.setNombre(categoriaActualizada.getNombre());
            categoriaGastoRepository.save(categoria);
            return new ResponseEntity<>(categoria, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); 
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarCategoriaDeGasto(@PathVariable Long id) {
        Optional<CategoriaGasto> categoria = categoriaGastoRepository.findById(id);
        if (categoria.isPresent()) {
            categoriaGastoRepository.deleteById(id); 
            return ResponseEntity.ok("Categoria de Gasto Eliminada Exitosamente");
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); 
        }
    }
}
