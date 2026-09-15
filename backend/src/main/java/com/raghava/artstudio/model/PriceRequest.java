package com.raghava.artstudio.model;

import jakarta.validation.constraints.NotBlank;

public record PriceRequest(
    @NotBlank String medium,
    @NotBlank String size
) {}