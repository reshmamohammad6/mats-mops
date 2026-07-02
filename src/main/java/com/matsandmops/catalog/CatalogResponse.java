package com.matsandmops.catalog;

import java.util.List;

public record CatalogResponse(
    List<Category> categories,
    List<Product> premiumMats,
    List<Product> mopsCleaningTools,
    List<Product> storageSolutions,
    List<Product> bottles,
    List<Product> decor
) {
}
