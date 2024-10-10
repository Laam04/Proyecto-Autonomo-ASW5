package com.finanzas.GestionGastosIngresos;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.finanzas.GestionGastosIngresos.Repositories") // Asegúrate de que esto apunte al paquete correcto
public class GestionGastosIngresosApplication {
    public static void main(String[] args) {
        SpringApplication.run(GestionGastosIngresosApplication.class, args);
    }
}
