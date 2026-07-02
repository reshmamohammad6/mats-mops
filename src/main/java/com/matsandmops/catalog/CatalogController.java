package com.matsandmops.catalog;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class CatalogController {
  private final CatalogService catalogService;

  public CatalogController(CatalogService catalogService) {
    this.catalogService = catalogService;
  }

  @GetMapping("/catalog")
  public CatalogResponse catalog() {
    return catalogService.getCatalog();
  }

  @GetMapping("/categories")
  public List<Category> categories() {
    return catalogService.getCatalog().categories();
  }

  @GetMapping("/premium-mats")
  public List<Product> premiumMats() {
    return catalogService.getCatalog().premiumMats();
  }

  @GetMapping("/mops-cleaning-tools")
  public List<Product> mopsCleaningTools() {
    return catalogService.getCatalog().mopsCleaningTools();
  }

  @GetMapping("/storage-solutions")
  public List<Product> storageSolutions() {
    return catalogService.getCatalog().storageSolutions();
  }

  @GetMapping("/bottles")
  public List<Product> bottles() {
    return catalogService.getCatalog().bottles();
  }

  @GetMapping("/decor")
  public List<Product> decor() {
    return catalogService.getCatalog().decor();
  }
}
