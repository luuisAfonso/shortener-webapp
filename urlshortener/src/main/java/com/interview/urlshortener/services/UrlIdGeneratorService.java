package com.interview.urlshortener.services;

import com.interview.urlshortener.utils.Base10To62Utils;
import com.sun.tools.jconsole.JConsoleContext;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class UrlIdGeneratorService extends Random {
    public static int offset = 6137952;

    public UrlIdGeneratorService() { }

    public int getPositiveRandomIntegerFromId(long id) {
        setSeed(id + offset);
        //returns only positive integers
        return next(Integer.SIZE - 1);
    }

    public String generateStringIdFromInteger(long id) {
        long randomFromId = getPositiveRandomIntegerFromId(id);

        return Base10To62Utils.encode(randomFromId);
    }

    public String generateStringRandomString() {
        //returns only positive integers
        return Base10To62Utils.encode(next(Integer.SIZE - 1));
    }

}
