package sv.udb.multiworksapi.assignment.dto;

import jakarta.validation.constraints.*;
import java.time.LocalDateTime;
import java.util.UUID;

public record AssignmentDto(

        @NotNull(message = "El empleado es obligatorio")
        UUID employeeId,

        @NotBlank(message = "El título es obligatorio")
        String title,

        @NotNull(message = "Fecha de inicio requerida")
        LocalDateTime startDatetime,

        @NotNull(message = "Fecha de fin requerida")
        LocalDateTime endDatetime,

        @Positive(message = "Horas deben ser mayor que 0")
        Integer estimatedHours,

        @DecimalMin(value = "0.0", message = "Costo base inválido")
        Double baseCost,

        @DecimalMin(value = "0.0", message = "Porcentaje extra inválido")
        Double extraPercentage
) {}
