package com.raghava.artstudio.service;

import org.springframework.stereotype.Service;
import java.util.Map;

@Service
public class PricingService {
    private final Map<String, Map<String, Integer>> prices = Map.of(
        "Color Pencil", Map.of("A5",500,"A4",1000,"A3",1500,"A2",2000,"A1",2500),
        "Charcoal", Map.of("A5",100,"A4",600,"A3",1100,"A2",1600,"A1",2100),
        "Acrylic", Map.of("A5",1500,"A4",2000,"A3",2500,"A2",3000,"A1",3500),
        "Watercolor", Map.of("A5",1500,"A4",2000,"A3",2500,"A2",3000,"A1",3500),
        "Oil", Map.of("A5",2500,"A4",3000,"A3",3500,"A2",4000,"A1",4500),
        "Soft Pastel", Map.of("A5",1000,"A4",1500,"A3",2000,"A2",2500,"A1",3000)
    );

    public int calculate(String medium, String size) {
        Map<String,Integer> mediumPrices = prices.get(medium);
        if (mediumPrices == null || !mediumPrices.containsKey(size)) {
            throw new IllegalArgumentException("Unsupported medium or size");
        }
        return mediumPrices.get(size);
    }
}