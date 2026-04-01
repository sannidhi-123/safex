package com.safex.controller;

import com.safex.service.SensorDataService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DashboardController {

    private final SensorDataService service;

    public DashboardController(SensorDataService service) {
        this.service = service;
    }

    @GetMapping("/")
    public String dashboard(Model model) {
        model.addAttribute("data", service.getLatest());
        return "dashboard";
    }
}