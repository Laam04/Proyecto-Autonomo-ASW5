package com.finanzas.GestionGastosIngresos.Controllers;
import java.util.List;

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

import com.finanzas.GestionGastosIngresos.Entities.FuenteIngreso;
import com.finanzas.GestionGastosIngresos.Services.FuenteIngresoService;

@RestController
@RequestMapping("/api/fuentes-de-ingresos")
public class FuenteDeIngresosController {

    @Autowired
    private FuenteIngresoService fuenteIngresoService;

    @PostMapping
    public ResponseEntity<FuenteIngreso> crearFuenteIngreso(@RequestBody FuenteIngreso fuenteIngreso) {
        FuenteIngreso nuevaFuente = fuenteIngresoService.save(fuenteIngreso);
        return new ResponseEntity<>(nuevaFuente, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<FuenteIngreso>> obtenerFuentesDeIngreso() {
        List<FuenteIngreso> fuentes = fuenteIngresoService.findAll();
        return new ResponseEntity<>(fuentes, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FuenteIngreso> obtenerFuenteDeIngresoPorId(@PathVariable Long id) {
        FuenteIngreso fuente = fuenteIngresoService.findById(id);
        return new ResponseEntity<>(fuente, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FuenteIngreso> actualizarFuenteDeIngreso(@PathVariable Long id, @RequestBody FuenteIngreso fuenteIngreso) {
        FuenteIngreso fuenteActualizada = fuenteIngresoService.update(id, fuenteIngreso);
        return new ResponseEntity<>(fuenteActualizada, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarFuenteDeIngreso(@PathVariable Long id) {
        fuenteIngresoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
