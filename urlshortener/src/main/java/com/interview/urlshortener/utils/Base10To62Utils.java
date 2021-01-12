package com.interview.urlshortener.utils;


public class Base10To62Utils {

    final static String base62Reference = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    final static int base62Value = 62;

    public static String encode(long base10) {
        StringBuilder stringBuilder = new StringBuilder();

        while(base10 > 0) {
            long reminder = base10 % base62Value;
            base10 = base10 / base62Value;
            char charResult = base62Reference.charAt((int)reminder);
            stringBuilder.append(charResult);
        }
        return stringBuilder.toString();
    }

}


