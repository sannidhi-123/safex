package com.safex.service;

import com.safex.model.SensorData;
import com.safex.repository.SensorDataRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SensorDataService {

    private final SensorDataRepository repository;

    // Constructor Injection
    public SensorDataService(SensorDataRepository repository) {
        this.repository = repository;
    }

    // SAVE DATA + ALERT LOGIC
    public SensorData saveData(SensorData data) {

        // ALERT CONDITIONS
        if (data.getGasLevel() > 300) {
            System.out.println("⚠️ GAS ALERT!");
        }

        if (data.getHeartRate() > 120) {
            System.out.println("❤️ HEALTH ALERT!");
        }

        if (data.isSos()) {
            System.out.println("🚨 EMERGENCY SOS!");
        }

        return repository.save(data);
    }

    // GET ALL DATA
    public List<SensorData> getAllData() {
        return repository.findAll();
    }

    // GET LATEST DATA
    public SensorData getLatest() {
        List<SensorData> list = repository.findAll();
        return list.isEmpty() ? null : list.get(list.size() - 1);
    }
}