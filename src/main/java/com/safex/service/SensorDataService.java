package com.safex.service;

import com.safex.model.SensorData;
import com.safex.repository.SensorDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SensorDataService {

    @Autowired
    private SensorDataRepository repository;

    public SensorData getLatest() {
        return repository.findFirstByOrderByIdDesc();
    }

    public List<SensorData> getAllData() {
        return repository.findAll();
    }

    public List<SensorData> getHistory(String workerId) {
        return repository.findByWorkerId(workerId);
    }

    public List<SensorData> getByUserType(String userType) {
        return repository.findByUserType(userType);
    }

    public Double getAverageGas() {
        return repository.getAverageGas();
    }

    public Double getAverageHeartRate() {
        return repository.getAverageHeartRate();
    }

    public List<SensorData> getAlerts(String level) {
        return repository.findByAlertLevel(level);
    }

    // This fixes the MqttSubscriber error
    public void saveData(SensorData data) {
        repository.save(data);
    }
}