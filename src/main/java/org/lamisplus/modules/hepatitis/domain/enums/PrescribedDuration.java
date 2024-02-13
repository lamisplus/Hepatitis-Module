package org.lamisplus.modules.hepatitis.domain.enums;

public enum PrescribedDuration {
    EIGHT(8),
    TWELVE(12),
    TWENTY_FOUR(24);

    private final int value;

    PrescribedDuration(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
