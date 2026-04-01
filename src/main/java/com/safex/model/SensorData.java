package com.safex.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class SensorData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double gasLevel;
    private int heartRate;
    private double temperature;
    private double latitude;
    private double longitude;
    private LocalDateTime timestamp;
    private boolean sos;

    // Getters
    public Long getId() { return id; }
    public double getGasLevel() { return gasLevel; }
    public int getHeartRate() { return heartRate; }
    public double getTemperature() { return temperature; }
    public double getLatitude() { return latitude; }
    public double getLongitude() { return longitude; }
    public LocalDateTime getTimestamp() { return timestamp; }
    public boolean isSos() { return sos; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setGasLevel(double gasLevel) { this.gasLevel = gasLevel; }
    public void setHeartRate(int heartRate) { this.heartRate = heartRate; }
    public void setTemperature(double temperature) { this.temperature = temperature; }
    public void setLatitude(double latitude) { this.latitude = latitude; }
    public void setLongitude(double longitude) { this.longitude = longitude; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
    public void setSos(boolean sos) { this.sos = sos; }
}