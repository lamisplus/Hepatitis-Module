package org.lamisplus.modules.hepatitis.domain.enums;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Arrays;

public class BiopsyStageValidator implements ConstraintValidator<BiopsyStageValidatorInterface, String> {
    @Override
    public void initialize(BiopsyStageValidatorInterface constraintAnnotation) {
    }
    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        String[] validBiopsyStageStates = { "NO_FIBROSIS", "MILD_FIBROSIS", "MODERATE_FIBROSIS","FIBROSIS","SEVERE_FIBROSIS", "NOT_DONE" };
        return value != null && isInArray(value, validBiopsyStageStates);
    }
    public boolean isInArray(String value, String[] arr){
        return Arrays.asList(arr).contains(value);
    }
}
