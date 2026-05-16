package com.itda.backend.dog.domain;

public class DogSizeCalculator {

    public static Size calculate(Double weight) {
        if (weight == null) return Size.SMALL;
        if (weight < 7) return Size.SMALL;
        if (weight < 15) return Size.MEDIUM;
        return Size.LARGE;
    }
}