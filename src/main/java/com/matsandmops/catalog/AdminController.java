package com.matsandmops.catalog;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Value;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final java.nio.file.Path uploadPath;

    public AdminController(
            CategoryRepository categoryRepository,
            ProductRepository productRepository,
            @Value("${app.upload-dir:uploads}") String uploadDir) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.uploadPath = java.nio.file.Paths.get(uploadDir);
    }

    @PostMapping("/categories")
    public Category addCategory(@RequestBody Category category) {
        return categoryRepository.save(category);
    }

    @GetMapping("/categories")
    public Iterable<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @PostMapping("/products")
    public Product addProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }

    @GetMapping("/products")
    public Iterable<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @org.springframework.web.bind.annotation.DeleteMapping("/products/{id}")
    public void deleteProduct(@org.springframework.web.bind.annotation.PathVariable Long id) {
        productRepository.deleteById(id);
    }

    @PostMapping("/upload")
    public java.util.Map<String, String> uploadImage(@org.springframework.web.bind.annotation.RequestParam("file") org.springframework.web.multipart.MultipartFile file) {
        try {
            if (!java.nio.file.Files.exists(uploadPath)) {
                java.nio.file.Files.createDirectories(uploadPath);
            }
            
            String originalName = org.springframework.util.StringUtils.cleanPath(file.getOriginalFilename());
            String fileName = System.currentTimeMillis() + "_" + originalName;
            
            java.nio.file.Path filePath = uploadPath.resolve(fileName);
            java.nio.file.Files.copy(file.getInputStream(), filePath, java.nio.file.StandardCopyOption.REPLACE_EXISTING);
            
            return java.util.Collections.singletonMap("url", "/uploads/" + fileName);
        } catch (java.io.IOException ex) {
            throw new RuntimeException("Could not store file.", ex);
        }
    }
}
