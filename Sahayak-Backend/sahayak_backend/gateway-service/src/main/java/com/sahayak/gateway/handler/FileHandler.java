package com.sahayak.gateway.handler;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Component
public class FileHandler {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Value("${server.base-url}")
    private String serverBaseUrl;  // Add this to application.properties

    public String processFileUpload(MultipartFile file, String fileType) throws IOException {
        if (file == null) {
            return null;  // No file uploaded
        }

        // Create the directory if it doesn't exist
        Path dirPath = Paths.get(uploadDir);
        if (!Files.exists(dirPath)) {
            Files.createDirectories(dirPath);
        }

        // Create a unique file name
        String fileName = fileType + "_" + System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path filePath = dirPath.resolve(fileName);

        // Save the file
        // Save the file (replace if already exists)
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);


        // Now return the public URL
        return serverBaseUrl + "/assets/" + fileName;
    }
}
