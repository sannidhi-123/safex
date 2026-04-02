package com.safex.repository;

import com.safex.model.SensorData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SensorDataRepository extends JpaRepository<SensorData, Long> {
    List<SensorData> findByWorkerId(String workerId);
    List<SensorData> findByUserType(String userType);
    List<SensorData> findByAlertLevel(String alertLevel);
    
    // Finds the very last entry saved to the database
    SensorData findFirstByOrderByIdDesc();

    @Query("SELECT AVG(s.gasLevel) FROM SensorData s")
    Double getAverageGas();

    @Query("SELECT AVG(s.heartRate) FROM SensorData s")
    Double getAverageHeartRate();
}