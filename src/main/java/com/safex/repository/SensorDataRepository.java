package com.safex.repository;

import com.safex.model.SensorData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SensorDataRepository extends JpaRepository<SensorData, Long> {

    List<SensorData> findByWorkerId(String workerId);

    List<SensorData> findByUserType(String userType);

    List<SensorData> findTop10ByWorkerIdOrderByTimestampDesc(String workerId);

    // 🔥 ADD THIS LINE (IMPORTANT)
    List<SensorData> findByAlertLevel(String alertLevel);
}