package org.lamisplus.modules.hepatitis.domain.enums;
import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = ReactiveStateValidator.class)
public @interface ValidatorInterface {
    String message() default "Invalid reactive state";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}