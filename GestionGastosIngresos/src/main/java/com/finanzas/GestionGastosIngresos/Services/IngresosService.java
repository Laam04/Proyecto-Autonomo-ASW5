package com.finanzas.GestionGastosIngresos.Services;

import java.util.List;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finanzas.GestionGastosIngresos.Entities.Ingreso;
import com.finanzas.GestionGastosIngresos.Repositories.IngresoRepository;

@Service
public class IngresosService {

    @Autowired
    private IngresoRepository ingresoRepository;

    public Ingreso crearIngreso(Ingreso ingreso) {
        return ingresoRepository.save(ingreso);
    }

    public List<Ingreso> obtenerIngresos() {
        return ingresoRepository.findAll();
    }

    public Ingreso obtenerIngresoPorId(Long id) {
        return ingresoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Ingreso no encontrado con id " + id));
    }

    public Ingreso actualizarIngreso(Long id, Ingreso ingreso) {
        Ingreso ingresoExistente = obtenerIngresoPorId(id);
        ingresoExistente.setFecha(ingreso.getFecha());
        ingresoExistente.setMonto(ingreso.getMonto());
        ingresoExistente.setFuenteId(ingreso.getFuenteId());
        return ingresoRepository.save(ingresoExistente);
    }

    public void eliminarIngreso(Long id) {
        ingresoRepository.deleteById(id);
    }
}
