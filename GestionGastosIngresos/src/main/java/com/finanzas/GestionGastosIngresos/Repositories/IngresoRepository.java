package com.finanzas.GestionGastosIngresos.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.finanzas.GestionGastosIngresos.Entities.Ingreso;

@Repository
public interface IngresoRepository extends JpaRepository<Ingreso, Long> {
}
