package com.safex.controller;

import com.safex.model.SensorData;
import com.safex.service.SensorDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/sensors")
public class SensorDataController {

    @Autowired
    private SensorDataService sensorDataService;

    @GetMapping("/all")
    public List<SensorData> getAllData() {
        // Changed from getAllSensorData() to getAllData() to match your Service
        return sensorDataService.getAllData();
    }

    @PostMapping("/update")
    public void receiveUpdate(@RequestBody SensorData data) {
        // Changed from saveSensorData() to saveData() to match your Service
        sensorDataService.saveData(data);
    }
}