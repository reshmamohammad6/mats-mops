package com.matsandmops.catalog;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CatalogService {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    public CatalogService(CategoryRepository categoryRepository, ProductRepository productRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
    }

    @PostConstruct
    public void initData() {
        if (categoryRepository.count() == 0) {
            categoryRepository.saveAll(List.of(
                new Category("Mats", "Premium Quality Mats", "https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&w=500&q=80"),
                new Category("Mops", "Durable & Easy Cleaning", "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&w=500&q=80"),
                new Category("Cleaning Tools", "Smart Cleaning Solutions", "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=500&q=80"),
                new Category("Storage", "Organize Your Home", "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=500&q=80"),
                new Category("Bottles", "Stay Hydrated", "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=500&q=80"),
                new Category("Decor", "Beautiful Spaces", "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=500&q=80")
            ));
        }

        if (productRepository.count() == 0) {
            productRepository.saveAll(List.of(
                new Product("Luxury Door & Floor Mats", "₹599", "Premium quality mats for home & office.", "https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?auto=format&fit=crop&w=520&q=80", "premiumMats"),
                new Product("Welcome Door Mats", "₹399", "Stylish welcome mats for your entrance.", "https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&w=520&q=80", "premiumMats"),
                new Product("Floor Cleaning Mats", "₹699", "Super absorbent & anti-slip mats.", "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&w=520&q=80", "premiumMats"),
                new Product("Bath Mats Set", "₹799", "Soft & comfortable bath mat sets.", "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=520&q=80", "premiumMats"),
                new Product("Runner Mats", "₹549", "Elegant runner mats for hallways.", "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=520&q=80", "premiumMats"),
                new Product("Microfiber Flat Mop", "₹699", "360° rotating flat mop.", "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&w=520&q=80", "mopsCleaningTools"),
                new Product("Cotton Flat Mop", "₹699", "High absorbent cotton mop.", "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=520&q=80", "mopsCleaningTools"),
                new Product("Premium String Mop", "₹599", "Durable string mop.", "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=520&q=80", "mopsCleaningTools"),
                new Product("Sponge Roller Mop", "₹999", "Sponge roller for easy cleaning.", "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=520&q=80", "mopsCleaningTools"),
                new Product("Cleaning Brushes Set", "₹499", "Multipurpose brush set.", "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=520&q=80", "mopsCleaningTools"),
                new Product("Storage Containers Set", "₹799", "Airtight & durable containers.", "https://images.unsplash.com/photo-1598991108448-5fcf1e75ea8d?auto=format&fit=crop&w=520&q=80", "storageSolutions"),
                new Product("Kitchen Storage Bins", "₹599", "Space saving kitchen bins.", "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=520&q=80", "storageSolutions"),
                new Product("Buckets & Pails", "₹299", "Strong & durable buckets.", "https://images.unsplash.com/photo-1627308595216-439c00adefd6?auto=format&fit=crop&w=520&q=80", "storageSolutions"),
                new Product("Storage Baskets", "₹499", "Multi-purpose storage baskets.", "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=520&q=80", "storageSolutions"),
                new Product("Organizers & Racks", "₹699", "Smart organizers & racks.", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=520&q=80", "storageSolutions"),
                new Product("Kids Water Bottles", "₹299", "Fun & safe bottles for kids.", "https://images.unsplash.com/photo-1625708458528-802ec79b1ed8?auto=format&fit=crop&w=520&q=80", "bottles"),
                new Product("Plastic Bottles", "₹199", "Lightweight plastic bottles.", "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=520&q=80", "bottles"),
                new Product("Steel Bottles", "₹399", "Durable stainless steel bottles.", "https://images.unsplash.com/photo-1605274280925-9dd1baacb4e4?auto=format&fit=crop&w=520&q=80", "bottles"),
                new Product("Glass Bottles", "₹299", "Premium quality glass bottles.", "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=520&q=80", "bottles"),
                new Product("Insulated Bottles", "₹599", "Keep hot or cold longer.", "https://images.unsplash.com/photo-1544003484-3cd181d17917?auto=format&fit=crop&w=520&q=80", "bottles"),
                new Product("Artificial Plants", "₹499", "Real look artificial plants.", "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=520&q=80", "decor"),
                new Product("Artificial Flowers", "₹399", "Beautiful artificial flowers.", "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=520&q=80", "decor"),
                new Product("Grass & Wall Decor", "₹699", "Premium grass & wall panels.", "https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=520&q=80", "decor")
            ));
        }
    }

    public CatalogResponse getCatalog() {
        return new CatalogResponse(
            categoryRepository.findAll(),
            productRepository.findByCategoryKey("premiumMats"),
            productRepository.findByCategoryKey("mopsCleaningTools"),
            productRepository.findByCategoryKey("storageSolutions"),
            productRepository.findByCategoryKey("bottles"),
            productRepository.findByCategoryKey("decor")
        );
    }
}
