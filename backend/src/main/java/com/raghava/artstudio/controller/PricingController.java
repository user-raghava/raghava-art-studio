package com.raghava.artstudio.controller;

import com.raghava.artstudio.model.PriceRequest;
import com.raghava.artstudio.service.PricingService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/paintings")
public class PricingController {
    private final PricingService pricingService;

    public PricingController(PricingService pricingService) {
        this.pricingService = pricingService;
    }

    @PostMapping("/calculate")
    public Map<String,Object> calculate(@Valid @RequestBody PriceRequest request) {
        int price = pricingService.calculate(request.medium(), request.size());
        return Map.of("medium",request.medium(),"size",request.size(),
                "estimatedPrice",price,"currency","INR",
                "delivery","Additional - quoted by destination");
    }
}