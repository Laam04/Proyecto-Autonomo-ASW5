package com.finanzas.GestionGI.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.finanzas.GestionGI.models.CategoriaGasto;

public interface CategoriaGastoRepository extends JpaRepository<CategoriaGasto, Long> {
}
