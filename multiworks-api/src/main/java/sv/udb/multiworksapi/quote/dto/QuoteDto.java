package sv.udb.multiworksapi.quote.dto;

import jakarta.validation.constraints.*;
import sv.udb.multiworksapi.enums.QuoteStatus;

import java.time.LocalDateTime;
import java.util.UUID;

public record QuoteDto(

        @NotNull(message = "El cliente es obligatorio")
        UUID clientId,

        @Positive(message = "Las horas deben ser mayores que 0")
        Integer estimatedHours,

        @FutureOrPresent(message = "La fecha de inicio no puede ser pasada")
        LocalDateTime startDate,

        @Future(message = "La fecha de fin debe ser futura")
        LocalDateTime endDate,

        @DecimalMin(value = "0.0", message = "El costo adicional no puede ser negativo")
        Double additionalCosts,

        QuoteStatus status
) {
}
