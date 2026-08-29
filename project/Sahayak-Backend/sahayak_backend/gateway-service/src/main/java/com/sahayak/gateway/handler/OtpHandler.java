package com.sahayak.gateway.handler;

import com.sahayak.gateway.config.Twilioconfig;
import com.sahayak.proto.model.entity.*;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class OtpHandler {
    @Autowired
    private Twilioconfig twilioconfig;
    Map<String, String> otpStorage = new HashMap<>();
    private final Random random = new Random();

    public OtpResponse sendOtp(OtpRequest otpRequest){
        OtpResponse.Builder otpResponse = OtpResponse.newBuilder();
        try {
            PhoneNumber to = new PhoneNumber(otpRequest.getPhoneNumber());
            PhoneNumber from = new PhoneNumber(twilioconfig.getPhoneNumber());
            String otp = generateOtp();
            String otpMessage = "Your otp is: " + otp;
            Message message = Message.
                    creator(to, from,
                            otpMessage)
                    .create();
            otpStorage.put(to.toString(), otp);
            otpResponse.setOtpStatus(OtpStatus.DELIVERED);
            otpResponse.setMessage(otpMessage);

        } catch (Exception e) {
            e.printStackTrace();
            otpResponse.setOtpStatus(OtpStatus.FAILED);
            otpResponse.setMessage(e.getMessage());
        }

        return otpResponse.build();
    }

    public OtpValidationResponse verifyOtp(OtpValidationRequest otpValidationRequest){
        try {
            String otp = otpStorage.get(otpValidationRequest.getPhoneNumber());
            if (otpValidationRequest.getOtpNumber().equals(otp)) {
                otpStorage.remove(otpValidationRequest.getPhoneNumber(),otp);
                OtpValidationResponse.Builder otpValidationResponse = OtpValidationResponse.newBuilder();
                otpValidationResponse.setOtpValidationStatus(OtpValidationStatus.SUCCESS);
                otpValidationResponse.setMessage("Otp is Valid");
                return otpValidationResponse.build();
            } else {
                OtpValidationResponse.Builder otpValidationResponse = OtpValidationResponse.newBuilder();
                otpValidationResponse.setOtpValidationStatus(OtpValidationStatus.FAIL);
                otpValidationResponse.setMessage("Otp is Not Valid");
                return otpValidationResponse.build();
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

    private String generateOtp() {
        int otpInt = 100000 + random.nextInt(900000); // 6-digit OTP
        return String.valueOf(otpInt);
    }
}
