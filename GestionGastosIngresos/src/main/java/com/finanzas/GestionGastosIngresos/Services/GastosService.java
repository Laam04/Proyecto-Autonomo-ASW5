package com.finanzas.GestionGastosIngresos.Services;
import java.util.List;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finanzas.GestionGastosIngresos.Entities.Gasto;
import com.finanzas.GestionGastosIngresos.Repositories.GastoRepository;

@Service
public class GastosService {

    @Autowired
    private GastoRepository gastoRepository;

    public Gasto crearGasto(Gasto gasto) {
        return gastoRepository.save(gasto);
    }

    public List<Gasto> obtenerGastos() {
        return gastoRepository.findAll();
    }

    public Gasto obtenerGastoPorId(Long id) {
        return gastoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Gasto no encontrado con id " + id));
    }

    public Gasto actualizarGasto(Long id, Gasto gasto) {
        Gasto gastoExistente = obtenerGastoPorId(id);
        gastoExistente.setFecha(gasto.getFecha());
        gastoExistente.setMonto(gasto.getMonto());
        gastoExistente.setCategoria(gasto.getCategoria());
        return gastoRepository.save(gastoExistente);
    }

    public void eliminarGasto(Long id) {
        gastoRepository.deleteById(id);
    }
}
