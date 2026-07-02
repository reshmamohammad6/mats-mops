# Mats & Mops

Spring Boot storefront for Mats & Mops. The frontend is plain HTML, CSS, and JavaScript served from `src/main/resources/static`, and the backend is Java with PostgreSQL through Spring Data JPA.

## Project Structure

```text
src/main/java/com/matsandmops/          Java backend
src/main/resources/static/             HTML, CSS, JS, images
src/main/resources/application.properties  Environment based app config
uploads/                               Runtime uploaded product images
Dockerfile                             Container build for hosting
render.yaml                            Render web service + PostgreSQL config
```

`target/`, `uploads/`, `data/`, IDE folders, and local env files are ignored because they should not be deployed as source.

## Local Setup

Create a PostgreSQL database:

```sql
CREATE DATABASE mats_and_mops;
```

Run locally with defaults:

```bash
mvn spring-boot:run
```

Open:

```text
http://localhost:8080
```

If your database username/password are different:

```bash
$env:SPRING_DATASOURCE_URL="jdbc:postgresql://localhost:5432/mats_and_mops"
$env:SPRING_DATASOURCE_USERNAME="postgres"
$env:SPRING_DATASOURCE_PASSWORD="your_password"
mvn spring-boot:run
```

Build and run the jar:

```bash
mvn package -DskipTests
java -jar target/mats-and-mops-0.0.1-SNAPSHOT.jar
```

## Hosting

### Render

1. Push this project to GitHub.
2. In Render, create a new Blueprint and select this repo.
3. Render will read `render.yaml`, create the PostgreSQL database, and deploy the Docker web service.
4. After deploy, open the generated Render URL.

### Manual Docker Host

Set these environment variables on the hosting provider:

```text
DATABASE_URL=postgres://user:password@host:5432/database
PORT=8080
UPLOAD_DIR=uploads
SPRING_JPA_HIBERNATE_DDL_AUTO=update
```

Then deploy using the included `Dockerfile`.

## API

- `GET /api/catalog` returns all storefront lists.
- `GET /api/categories` returns shop-by-category items.
- `GET /api/premium-mats` returns premium mat products.
- `GET /api/mops-cleaning-tools` returns mops and cleaning tools.
- `GET /api/storage-solutions` returns storage products.
- `GET /api/bottles` returns bottle products.
- `GET /api/decor` returns artificial plants and decor products.
- `GET /api/admin/products` returns admin products.
- `POST /api/admin/products` creates a product.
- `POST /api/admin/upload` uploads a product image.
