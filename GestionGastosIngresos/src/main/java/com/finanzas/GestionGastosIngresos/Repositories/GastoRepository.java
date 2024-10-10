package com.finanzas.GestionGastosIngresos.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.finanzas.GestionGastosIngresos.Entities.Gasto;

@Repository
public interface GastoRepository extends JpaRepository<Gasto, Long> {
}
