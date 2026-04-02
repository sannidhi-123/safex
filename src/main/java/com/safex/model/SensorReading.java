

package com.safex.model;

import lombok.Data;

@Data // This automatically creates Getters and Setters
public class SensorReading {
    private String floorName;
    private double gasLevel;
    private double temperature;
    private String status;

    public SensorReading(String name, double gas, double temp, String status) {
        this.floorName = name;
        this.gasLevel = gas;
        this.temperature = temp;
        this.status = status;
    }
}