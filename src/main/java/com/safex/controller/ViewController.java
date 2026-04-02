package com.safex.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {

    // This will now be your ONLY way to access the site.
    // When you go to http://localhost:8080/ the dashboard loads.
    @GetMapping("/")
    public String index() {
        return "dashboard"; // Looks for dashboard.html in /templates
    }

    // REMOVED: @GetMapping("/dashboard") to prevent the Ambiguous Mapping error.
}