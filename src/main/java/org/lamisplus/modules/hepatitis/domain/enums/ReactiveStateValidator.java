package org.lamisplus.modules.hepatitis.domain.enums;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Arrays;

public class ReactiveStateValidator implements ConstraintValidator<ValidatorInterface, String> {
    @Override
    public void initialize(ValidatorInterface constraintAnnotation) {
    }
    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        String[] validReactiveStates = { "REACTIVE", "NON REACTIVE", "NOT DONE" };
        return value != null && isInArray(value, validReactiveStates);
    }
    public boolean isInArray(String value, String[] arr){
        return Arrays.asList(arr).contains(value);
    }
}
