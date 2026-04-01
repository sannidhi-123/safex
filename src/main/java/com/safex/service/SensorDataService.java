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

    // ================= 🔥 SAVE DATA (CORE LOGIC) =================

    public SensorData saveData(SensorData data) {

        // ✅ Validation
        if (data.getGasLevel() < 0 || data.getHeartRate() < 0) {
            System.out.println("Invalid sensor data");
            return null;
        }

        // ✅ Timestamp
        if (data.getTimestamp() == null) {
            data.setTimestamp(LocalDateTime.now());
        }

        // ✅ Status (SAFE / WARNING / DANGER)
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

        // ✅ Risk Prediction
        if (data.getGasLevel() > 300 && data.getHeartRate() > 120) {
            data.setRiskLevel("CRITICAL");
        } else if (data.getGasLevel() > 200) {
            data.setRiskLevel("HIGH");
        } else if (data.getHeartRate() > 100) {
            data.setRiskLevel("MEDIUM");
        } else {
            data.setRiskLevel("LOW");
        }

        // ✅ Hazard Zone (Gas + Geo-fencing)
        if (data.getGasLevel() > 300 ||
            (data.getLatitude() > 12.9 && data.getLongitude() > 77.6)) {
            data.setHazardZone(true);
        } else {
            data.setHazardZone(false);
        }

        // ✅ Alert Level
        if (data.isSos()) {
            data.setAlertLevel("CRITICAL");
        } else if (data.getGasLevel() > 300) {
            data.setAlertLevel("HIGH");
        } else {
            data.setAlertLevel("LOW");
        }

        // ✅ Debug Logs
        System.out.println("Worker: " + data.getWorkerId());
        System.out.println("Gas: " + data.getGasLevel());
        System.out.println("Risk: " + data.getRiskLevel());

        return repository.save(data);
    }

    // ================= BASIC DATA =================

    public SensorData getLatest() {
        List<SensorData> list = repository.findAll();
        return list.isEmpty() ? null : list.get(list.size() - 1);
    }

    public List<SensorData> getAllData() {
        return repository.findAll();
    }

    public List<SensorData> getHistory(String workerId) {
        return repository.findTop10ByWorkerIdOrderByTimestampDesc(workerId);
    }

    public List<SensorData> getByUserType(String type) {
        return repository.findByUserType(type);
    }

    // ================= 🔥 ANALYTICS =================

    public double getAverageGas() {
        return repository.findAll()
                .stream()
                .mapToDouble(SensorData::getGasLevel)
                .average()
                .orElse(0);
    }

    public double getAverageHeartRate() {
        return repository.findAll()
                .stream()
                .mapToInt(SensorData::getHeartRate)
                .average()
                .orElse(0);
    }

    // ================= 🔥 ALERT HISTORY =================

    public List<SensorData> getAlerts(String level) {
        return repository.findByAlertLevel(level);
    }
}