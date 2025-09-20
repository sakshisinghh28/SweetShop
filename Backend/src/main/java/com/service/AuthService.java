package com.service;

import com.dto.AuthRequest;
import com.dto.AuthResponse;
import com.dto.RegisterRequest;
import com.entity.Role;
import com.entity.User;
import com.repository.RoleRepository;
import com.repository.UserRepository;
import com.security.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository, RoleRepository roleRepository,
                       PasswordEncoder passwordEncoder, JwtUtil jwtUtil,
                       UserDetailsService userDetailsService, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
        this.authenticationManager = authenticationManager;
    }

    public void register(RegisterRequest req){
        if (userRepository.existsByUsername(req.getUsername())){
            throw new RuntimeException("Username already exists");
        }
        User u = new User();
        u.setUsername(req.getUsername());
        u.setPassword(passwordEncoder.encode(req.getPassword()));
        Role role = roleRepository.findByName("ROLE_USER").orElseGet(() -> roleRepository.save(new Role(null, "ROLE_USER")));
        u.setRoles(Collections.singleton(role));
        userRepository.save(u);
    }

    public AuthResponse login(AuthRequest req){
        // authenticate
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(req.getUsername(), req.getPassword()));
        UserDetails ud = userDetailsService.loadUserByUsername(req.getUsername());
        String token = jwtUtil.generateToken(ud);
        return new AuthResponse(token);
    }
}
