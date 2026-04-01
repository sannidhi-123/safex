package com.safex.controller;

import com.safex.service.SensorDataService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.security.core.Authentication;

@Controller
public class DashboardController {

    private final SensorDataService service;

    public DashboardController(SensorDataService service) {
        this.service = service;
    }

    @GetMapping("/dashboard")
    public String dashboard(Model model, Authentication auth) {

        String role = auth.getAuthorities().toString();

        model.addAttribute("data", service.getLatest());
        model.addAttribute("role", role);

        return "dashboard";
    }
}