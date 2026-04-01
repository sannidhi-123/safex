package com.safex.controller;

import com.safex.model.SensorData;
import com.safex.service.SensorDataService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ApiController {

    private final SensorDataService service;

    public ApiController(SensorDataService service) {
        this.service = service;
    }

    @GetMapping("/latest")
    public SensorData getLatest() {
        return service.getLatest();
    }

    @GetMapping("/all")
    public List<SensorData> getAll() {
        return service.getAllData();
    }

    // 🔥 HISTORY API
    @GetMapping("/history/{workerId}")
    public List<SensorData> getHistory(@PathVariable String workerId) {
        return service.getHistory(workerId);
    }

    // 🔥 MULTI-USER FILTER
    @GetMapping("/user/{type}")
    public List<SensorData> getByUserType(@PathVariable String type) {
        return service.getByUserType(type);
    }
}