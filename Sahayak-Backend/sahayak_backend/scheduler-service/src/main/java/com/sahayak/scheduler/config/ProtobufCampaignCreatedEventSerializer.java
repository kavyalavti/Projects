package com.sahayak.scheduler.config;

import com.sahayak.proto.kafka.entity.CampaignCreatedEvent;
import org.apache.kafka.common.serialization.Serializer;
import com.google.protobuf.InvalidProtocolBufferException;

public class ProtobufCampaignCreatedEventSerializer implements Serializer<CampaignCreatedEvent> {

    @Override
    public byte[] serialize(String topic, CampaignCreatedEvent data) {
        if (data == null) {
            return null;
        }
        return data.toByteArray(); // Protobuf provides a method to get byte array
    }
}
