package com.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SweetDto {
    @NotBlank
    private String name;
    @NotBlank
    private String category;
    @Min(0)
    private Double price;
    @Min(0)
    private Integer quantity;
}
