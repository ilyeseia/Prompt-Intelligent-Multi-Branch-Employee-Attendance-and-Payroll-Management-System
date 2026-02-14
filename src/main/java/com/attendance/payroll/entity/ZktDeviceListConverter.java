package com.attendance.payroll.entity;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.Converter;
import jakarta.persistence.AttributeConverter;

import java.util.List;
import java.util.ArrayList;

/**
 * JPA converter for List<ZktDevice> to JSON string for database storage
 */
@Converter
public class ZktDeviceListConverter implements AttributeConverter<List<ZktDevice>, String> {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(List<ZktDevice> deviceList) {
        if (deviceList == null || deviceList.isEmpty()) {
            return "[]";
        }
        
        try {
            return objectMapper.writeValueAsString(deviceList);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error converting ZKTeco device list to JSON", e);
        }
    }

    @Override
    public List<ZktDevice> convertToEntityAttribute(String jsonString) {
        if (jsonString == null || jsonString.trim().isEmpty()) {
            return new ArrayList<>();
        }
        
        try {
            return objectMapper.readValue(jsonString, new TypeReference<List<ZktDevice>>() {});
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error converting JSON to ZKTeco device list", e);
        }
    }
}