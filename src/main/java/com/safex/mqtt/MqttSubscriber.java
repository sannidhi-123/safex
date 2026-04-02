package com.safex.mqtt;
import com.safex.service.SensorDataService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.safex.model.SensorData;

import org.eclipse.paho.client.mqttv3.*;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class MqttSubscriber {

    private final SensorDataService service;

    public MqttSubscriber(SensorDataService service) {
        this.service = service;
        connect();
    }

    private void connect() {
        try {
            String broker = "tcp://broker.hivemq.com:1883";
            String clientId = MqttClient.generateClientId();

            MqttClient client = new MqttClient(broker, clientId);

            MqttConnectOptions options = new MqttConnectOptions();
            options.setCleanSession(true);

            System.out.println("Connecting to MQTT broker...");
            client.connect(options);
            System.out.println("Connected to MQTT broker!");

            String topic = "safex/data";

            client.subscribe(topic, (topicReceived, message) -> {

                String payload = new String(message.getPayload());

                System.out.println("📡 Received MQTT Data: " + payload);

                try {
                    ObjectMapper mapper = new ObjectMapper();

                    SensorData data = mapper.readValue(payload, SensorData.class);

                    // Add timestamp
                    data.setTimestamp(LocalDateTime.now());

                    // Debug logs
                    System.out.println("Worker ID: " + data.getWorkerId());
                    System.out.println("Gas Level: " + data.getGasLevel());
                    System.out.println("Heart Rate: " + data.getHeartRate());

                    // Save to DB (and trigger logic)
                    service.saveData(data);

                    System.out.println("✅ Data saved successfully\n");

                } catch (Exception e) {
                    System.out.println("❌ Error parsing MQTT data!");
                    e.printStackTrace();
                }
            });

            System.out.println("Subscribed to topic: " + topic);

        } catch (Exception e) {
            System.out.println("❌ MQTT Connection Failed!");
            e.printStackTrace();
        }
    }
}