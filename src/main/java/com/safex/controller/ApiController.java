package com.safex.controller;

import com.safex.model.SensorData;
import com.safex.service.SensorDataService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import org.springframework.security.core.Authentication;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ApiController {

    private final SensorDataService service;

    public ApiController(SensorDataService service) {
        this.service = service;
    }

    // ================= BASIC =================

    @GetMapping("/latest")
    public SensorData getLatest() {
        return service.getLatest();
    }

    @GetMapping("/all")
    public List<SensorData> getAll() {
        return service.getAllData();
    }

    @GetMapping("/history/{workerId}")
    public List<SensorData> getHistory(@PathVariable String workerId) {
        return service.getHistory(workerId);
    }

    // ================= ROLE-BASED =================

    @GetMapping("/secure-data")
    public List<SensorData> getDataByRole(Authentication auth) {

        String role = auth.getAuthorities().toString();
        String userType = role.replace("ROLE_", "")
                              .replace("[", "")
                              .replace("]", "");

        return service.getByUserType(userType);
    }

    // ================= 🔥 STREAMING =================

    @GetMapping("/stream")
    public SseEmitter streamData() {

        SseEmitter emitter = new SseEmitter();

        new Thread(() -> {
            try {
                while (true) {
                    emitter.send(service.getLatest());
                    Thread.sleep(3000);
                }
            } catch (Exception e) {
                emitter.complete();
            }
        }).start();

        return emitter;
    }

    // ================= 🔥 ANALYTICS =================

    @GetMapping("/stats/gas")
    public double avgGas() {
        return service.getAverageGas();
    }

    @GetMapping("/stats/heart")
    public double avgHeart() {
        return service.getAverageHeartRate();
    }

    // ================= 🔥 ALERT HISTORY =================

    @GetMapping("/alerts/{level}")
    public List<SensorData> getAlerts(@PathVariable String level) {
        return service.getAlerts(level);
    }

    // ================= 🔥 HEALTH =================

    @GetMapping("/health")
    public String health() {
        return "SafeX Backend Running ✅";
    }
}