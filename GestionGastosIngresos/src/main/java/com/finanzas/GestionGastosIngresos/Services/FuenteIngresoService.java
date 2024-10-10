package com.finanzas.GestionGastosIngresos.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finanzas.GestionGastosIngresos.Entities.FuenteIngreso;
import com.finanzas.GestionGastosIngresos.Repositories.FuenteIngresoRepository;

@Service
public class FuenteIngresoService {

    @Autowired
    private FuenteIngresoRepository fuenteIngresoRepository;

    public List<FuenteIngreso> findAll() {
        return fuenteIngresoRepository.findAll();
    }

    public FuenteIngreso findById(Long id) {
        return fuenteIngresoRepository.findById(id).orElse(null);
    }

    public FuenteIngreso save(FuenteIngreso fuenteIngreso) {
        return fuenteIngresoRepository.save(fuenteIngreso);
    }

    public FuenteIngreso update(Long id, FuenteIngreso fuenteIngreso) {
        FuenteIngreso existingFuente = findById(id);
        if (existingFuente != null) {
            existingFuente.setNombre(fuenteIngreso.getNombre());
            return fuenteIngresoRepository.save(existingFuente);
        }
        return null;
    }

    public void delete(Long id) {
        fuenteIngresoRepository.deleteById(id);
    }
}
