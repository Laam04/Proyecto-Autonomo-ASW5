package com.finanzas.GestionGI.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.finanzas.GestionGI.models.Gasto;

public interface GastoRepository extends JpaRepository<Gasto, Long> {
}
