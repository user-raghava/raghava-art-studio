package com.raghava.artstudio;

import com.raghava.artstudio.service.PricingService;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

class PricingServiceTest {
    @Test
    void acrylicA3Is2500() {
        assertEquals(2500, new PricingService().calculate("Acrylic", "A3"));
    }
}