package com.finanzas.GestionGastosIngresos;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.finanzas.GestionGastosIngresos.Entities.Usuario;
import com.finanzas.GestionGastosIngresos.Repositories.UsuarioRepository;
import com.finanzas.GestionGastosIngresos.Services.UsuarioService;

class UsuarioServiceTest {

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private BCryptPasswordEncoder passwordEncoder;

    @InjectMocks
    private UsuarioService usuarioService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this); // Inicializa los mocks
    }

    @Test
    void testRegistrarUsuario() {
        Usuario usuario = new Usuario();
        usuario.setNombre("John");
        usuario.setCorreo("john@example.com");
        usuario.setClave("password");

        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
        when(usuarioRepository.save(any(Usuario.class))).thenReturn(usuario);

        Usuario resultado = usuarioService.registrarUsuario(usuario);

        assertEquals("John", resultado.getNombre());
        assertEquals("john@example.com", resultado.getCorreo());
        verify(usuarioRepository, times(1)).save(usuario);
    }
}
