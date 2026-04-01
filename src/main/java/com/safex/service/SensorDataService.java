package com.safex.service;

import com.safex.model.SensorData;
import com.safex.repository.SensorDataRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SensorDataService {

    private final SensorDataRepository repository;

    public SensorDataService(SensorDataRepository repository) {
        this.repository = repository;
    }

    public SensorData saveData(SensorData data) {

        // ✅ VALIDATION
        if (data.getGasLevel() < 0 || data.getHeartRate() < 0) {
            System.out.println("❌ Invalid sensor data");
            return null;
        }

        // ✅ TIMESTAMP
        if (data.getTimestamp() == null) {
            data.setTimestamp(LocalDateTime.now());
        }

        // ✅ STATUS
        if (data.getGasLevel() < 100) {
            data.setStatus("SAFE");
        } else if (data.getGasLevel() < 300) {
            data.setStatus("WARNING");
        } else {
            data.setStatus("DANGER");
        }

        // ✅ AQI
        if (data.getGasLevel() < 100) {
            data.setAqiStatus("GOOD");
        } else if (data.getGasLevel() < 300) {
            data.setAqiStatus("MODERATE");
        } else {
            data.setAqiStatus("HAZARDOUS");
        }

        // ✅ ADVANCED RISK
        if (data.getGasLevel() > 300 && data.getHeartRate() > 120) {
            data.setRiskLevel("CRITICAL");
        } else if (data.getGasLevel() > 200) {
            data.setRiskLevel("HIGH");
        } else if (data.getHeartRate() > 100) {
            data.setRiskLevel("MEDIUM");
        } else {
            data.setRiskLevel("LOW");
        }

        // ✅ HAZARD ZONE (GAS)
        if (data.getGasLevel() > 300) {
            data.setHazardZone(true);
        }

        // ✅ LOCATION-BASED HAZARD (EXAMPLE ZONE)
        if (data.getLatitude() > 12.9 && data.getLongitude() > 77.5) {
            data.setHazardZone(true);
        }

        // ✅ ALERT LEVEL
        if (data.isSos()) {
            data.setAlertLevel("CRITICAL");
        } else if (data.getGasLevel() > 300) {
            data.setAlertLevel("HIGH");
        } else {
            data.setAlertLevel("NORMAL");
        }

        // ✅ LOGS
        System.out.println("Worker: " + data.getWorkerId());
        System.out.println("Gas: " + data.getGasLevel());
        System.out.println("Risk: " + data.getRiskLevel());

        return repository.save(data);
    }

    public List<SensorData> getAllData() {
        return repository.findAll();
    }

    public SensorData getLatest() {
        List<SensorData> list = repository.findAll();
        return list.isEmpty() ? null : list.get(list.size() - 1);
    }

    // 🔥 HISTORY
    public List<SensorData> getHistory(String workerId) {
        return repository.findTop10ByWorkerIdOrderByTimestampDesc(workerId);
    }

    // 🔥 FILTER BY USER TYPE
    public List<SensorData> getByUserType(String type) {
        return repository.findByUserType(type);
    }
}