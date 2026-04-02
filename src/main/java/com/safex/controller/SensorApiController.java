package com.safex.controller;

import com.safex.model.SensorReading;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;

@RestController
@RequestMapping("/api") // All URLs will start with /api
public class SensorApiController {

    @GetMapping("/sensors")
    public List<SensorReading> getSensorData() {
        List<SensorReading> readings = new ArrayList<>();
        
        // Later, you will get this data from your Database or MQTT
        readings.add(new SensorReading("Floor 1", 45.0, 24.5, "Safe"));
        readings.add(new SensorReading("Floor 2", 120.0, 31.0, "Warning"));
        
        return readings;
    }
}