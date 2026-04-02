package com.safex.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(Customizer.withDefaults())
            
            .authorizeHttpRequests(auth -> auth
                // Allow public access to auth pages and static resources
                .requestMatchers("/login", "/signup", "/css/**", "/js/**", "/images/**").permitAll()
                // Protect everything else
                .requestMatchers("/api/**", "/dashboard/**").authenticated()
                .anyRequest().authenticated()
            )
            
            .formLogin(form -> form
                .loginPage("/login")
                .loginProcessingUrl("/login") // The URL where the form POSTs to
                .usernameParameter("username") // Must match <input name="username">
                .passwordParameter("password") // Must match <input name="password">
                .defaultSuccessUrl("/dashboard", true)
                .failureUrl("/login?error")    // Where to go on failure
                .permitAll()
            )
            
            .logout(logout -> logout
                .logoutUrl("/logout")
                .logoutSuccessUrl("/login?logout")
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID")
                .permitAll()
            );

        return http.build();
    }
}