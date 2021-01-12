package com.interview.urlshortener.security;

public class SecurityConstants {
    public static final String SECRET = "MySuperUniqueJWTSecret";
    public static final long EXPIRATION_TIME = 864_000_000; // 10 days
    public static final String TOKEN_PREFIX = "";
    public static final String BEARER_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String TOKEN_STRING = "token";
    public static final String SIGN_UP_URL = "/user/sign-up";
}
