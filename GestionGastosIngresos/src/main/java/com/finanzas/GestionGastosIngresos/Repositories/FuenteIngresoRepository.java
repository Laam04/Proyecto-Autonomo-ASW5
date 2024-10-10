package com.finanzas.GestionGastosIngresos.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.finanzas.GestionGastosIngresos.Entities.FuenteIngreso;

@Repository
public interface FuenteIngresoRepository extends JpaRepository<FuenteIngreso, Long> {
}
