package com.safex.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "sensor_data")
public class SensorData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 🔹 Core Sensor Data
    private double gasLevel;
    private int heartRate;
    private double temperature;

    // 🔹 Location
    private double latitude;
    private double longitude;

    // 🔹 Emergency
    private boolean sos;

    // 🔹 Multi-user support
    private String workerId;
    private String userType;

    // 🔹 Smart Analysis
    private String status;       // SAFE / WARNING / DANGER
    private String aqiStatus;    // GOOD / MODERATE / HAZARDOUS
    private String riskLevel;    // LOW / MEDIUM / HIGH / CRITICAL
    private boolean hazardZone;

    // 🔹 Alert system
    private String alertLevel;   // NORMAL / HIGH / CRITICAL

    // 🔹 Time
    private LocalDateTime timestamp;

    // ================= GETTERS & SETTERS =================

    public Long getId() {
        return id;
    }

    public double getGasLevel() {
        return gasLevel;
    }

    public void setGasLevel(double gasLevel) {
        this.gasLevel = gasLevel;
    }

    public int getHeartRate() {
        return heartRate;
    }

    public void setHeartRate(int heartRate) {
        this.heartRate = heartRate;
    }

    public double getTemperature() {
        return temperature;
    }

    public void setTemperature(double temperature) {
        this.temperature = temperature;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public boolean isSos() {
        return sos;
    }

    public void setSos(boolean sos) {
        this.sos = sos;
    }

    public String getWorkerId() {
        return workerId;
    }

    public void setWorkerId(String workerId) {
        this.workerId = workerId;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getAqiStatus() {
        return aqiStatus;
    }

    public void setAqiStatus(String aqiStatus) {
        this.aqiStatus = aqiStatus;
    }

    public String getRiskLevel() {
        return riskLevel;
    }

    public void setRiskLevel(String riskLevel) {
        this.riskLevel = riskLevel;
    }

    public boolean isHazardZone() {
        return hazardZone;
    }

    public void setHazardZone(boolean hazardZone) {
        this.hazardZone = hazardZone;
    }

    public String getAlertLevel() {
        return alertLevel;
    }

    public void setAlertLevel(String alertLevel) {
        this.alertLevel = alertLevel;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}