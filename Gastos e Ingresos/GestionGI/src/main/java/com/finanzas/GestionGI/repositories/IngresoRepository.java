package com.finanzas.GestionGI.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.finanzas.GestionGI.models.Ingreso;

public interface IngresoRepository extends JpaRepository<Ingreso, Long> {
}
