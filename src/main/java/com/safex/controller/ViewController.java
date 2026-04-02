package com.safex.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {

    @GetMapping("/")
    public String index() {
        return "dashboard";
    }

    @GetMapping("/analytics")
    public String analytics() {
        // Future-proofing for a second page
        return "analytics";
    }
}