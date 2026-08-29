package com.sahayak.gateway.controller;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.sahayak.proto.model.entity.OtpRequest;
import com.sahayak.proto.model.entity.OtpResponse;
import com.sahayak.proto.model.entity.OtpStatus;
import com.sahayak.proto.model.entity.OtpValidationRequest;
import com.sahayak.proto.model.entity.OtpValidationResponse;
import com.google.protobuf.InvalidProtocolBufferException;
import com.google.protobuf.util.JsonFormat;
import com.sahayak.gateway.handler.OtpHandler;
//import com.sahayak.proto.model.entity.OtpRequest;
//import com.sahayak.model.entity.OtpResponse;
//import com.sahayak.model.entity.OtpValidationRequest;
//import com.sahayak.model.entity.OtpValidationResponse;
import com.sahayak.proto.model.entity.OtpValidationStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/otp")

@Service

public class OTPController {
    private static final Logger log = LoggerFactory.getLogger(OTPController.class);
    @Autowired
    private OtpHandler loginHandler;

    @GetMapping("/process")
    public String process() {
        return "SMS SENT";
    }

    @PostMapping("/send-otp")
    public ObjectNode sendOtp(@RequestBody JsonNode jsonNode) throws InvalidProtocolBufferException, JsonProcessingException {
        OtpRequest.Builder otpRequest = OtpRequest.newBuilder();
        JsonFormat.parser().merge(String.valueOf(jsonNode),otpRequest);
//        OtpResponse otpResponse = loginHandler.sendOtp(otpRequest.build());
        OtpResponse otpResponse = OtpResponse.newBuilder()
            .setOtpStatus(OtpStatus.DELIVERED)
            .setMessage("Otp sent successfully")
            .build();
        String json = JsonFormat.printer().includingDefaultValueFields().print(otpResponse);
        return new ObjectMapper().readValue(json, ObjectNode.class);
    }

    @PostMapping("/validate-otp")
    public ObjectNode validateOtp(@RequestBody JsonNode jsonNode) throws InvalidProtocolBufferException, JsonProcessingException {
        OtpValidationRequest.Builder otpValidationRequest = OtpValidationRequest.newBuilder();
        JsonFormat.parser().merge(String.valueOf(jsonNode),otpValidationRequest);
//        OtpValidationResponse otpValidationResponse = loginHandler.verifyOtp(otpValidationRequest.build());
        OtpValidationResponse otpValidationResponse = OtpValidationResponse.newBuilder().setOtpValidationStatus(
            OtpValidationStatus.SUCCESS).setMessage("Login successfully").build();
        String json = JsonFormat.printer().includingDefaultValueFields().print(otpValidationResponse);
        return new ObjectMapper().readValue(json, ObjectNode.class);
    }


}
