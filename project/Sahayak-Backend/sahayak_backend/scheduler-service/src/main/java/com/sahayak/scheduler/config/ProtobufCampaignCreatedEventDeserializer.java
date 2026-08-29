package com.sahayak.scheduler.config;

import com.sahayak.proto.kafka.entity.CampaignCreatedEvent;
import org.apache.kafka.common.serialization.Deserializer;
import com.google.protobuf.InvalidProtocolBufferException;

public class ProtobufCampaignCreatedEventDeserializer  implements Deserializer<CampaignCreatedEvent> {

    @Override
    public CampaignCreatedEvent deserialize(String topic, byte[] data) {
        if (data == null) {
            return null;
        }
        try {
            return CampaignCreatedEvent.parseFrom(data); // Deserialize to CampaignCreatedEvent
        } catch (InvalidProtocolBufferException e) {
            throw new RuntimeException("Error deserializing CampaignCreatedEvent", e);
        }
    }
}
