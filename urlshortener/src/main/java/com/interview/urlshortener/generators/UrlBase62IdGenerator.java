package com.interview.urlshortener.generators;

import com.interview.urlshortener.entities.Url;
import com.interview.urlshortener.services.UrlIdGeneratorService;
import org.hibernate.HibernateException;
import org.hibernate.MappingException;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.enhanced.SequenceStyleGenerator;
import org.hibernate.service.ServiceRegistry;
import org.hibernate.type.LongType;
import org.hibernate.type.Type;


import java.io.Serializable;
import java.util.Properties;

public class UrlBase62IdGenerator extends SequenceStyleGenerator {

    UrlIdGeneratorService urlIdGenerator = new UrlIdGeneratorService();

    @Override
    public Serializable generate(SharedSessionContractImplementor session, Object object) throws HibernateException {
        return urlIdGenerator.generateStringIdFromInteger((long) super.generate(session, object));
    }

    @Override
    public void configure(Type type, Properties params, ServiceRegistry serviceRegistry) throws MappingException {
        super.configure(LongType.INSTANCE, params, serviceRegistry);
    }

}
