package com.finanzas.GestionGastosIngresos.Services;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finanzas.GestionGastosIngresos.Entities.CategoriaGasto;
import com.finanzas.GestionGastosIngresos.Repositories.CategoriaGastoRepository;

@Service
public class CategoriaDeGastosService {

    @Autowired
    public CategoriaGastoRepository categoriaGastoRepository;

    public CategoriaGasto crearCategoriaGasto(CategoriaGasto categoriaGasto) {
        return categoriaGastoRepository.save(categoriaGasto);
    }

    public List<CategoriaGasto> obtenerCategoriasDeGasto() {
        return categoriaGastoRepository.findAll();
    }

    public CategoriaGasto obtenerCategoriaDeGastoPorId(Long id) {
        return categoriaGastoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Categoría de gasto no encontrada con id: " + id));
    }

    public CategoriaGasto actualizarCategoriaDeGasto(Long id, CategoriaGasto categoriaGasto) {

        CategoriaGasto categoriaExistente = obtenerCategoriaDeGastoPorId(id);
        
        
        categoriaExistente.setNombre(categoriaGasto.getNombre());
        
        return categoriaGastoRepository.save(categoriaExistente);
    }

    public void eliminarCategoriaDeGasto(Long id) {
        Optional<CategoriaGasto> categoria = categoriaGastoRepository.findById(id);
        if (categoria.isPresent()) {
            categoriaGastoRepository.deleteById(id);
        } else {
            throw new EntityNotFoundException("Categoría de gasto no encontrada con id: " + id);
        }
    }
}
