-- DROP existing tables if you want a clean slate
DROP TABLE IF EXISTS museum_dinosaur, habitat, museum, city, country, continent, dinosaur CASCADE;

-- 1. Continent table
CREATE TABLE continent (
    continent_id SERIAL PRIMARY KEY,
    continent_name VARCHAR(50) NOT NULL
);

-- 2. Country table
CREATE TABLE country (
    country_id SERIAL PRIMARY KEY,
    country_name VARCHAR(100) NOT NULL,
    continent_id INT REFERENCES continent(continent_id)
);

-- 3. City table
CREATE TABLE city (
    city_id SERIAL PRIMARY KEY,
    city_name VARCHAR(100) NOT NULL,
    country_id INT REFERENCES country(country_id)
);

-- 4. Dinosaur table
CREATE TABLE dinosaur (
    dinosaur_id SERIAL PRIMARY KEY,
    dinosaur_name VARCHAR(100) NOT NULL,
    diet VARCHAR(20) NOT NULL,
    common_name VARCHAR(100),
    time_period VARCHAR(50) NOT NULL,
    wiki_link TEXT
);

-- 5. Museum table
CREATE TABLE museum (
    museum_id SERIAL PRIMARY KEY,
    museum_name VARCHAR(200) NOT NULL,
    city_id INT REFERENCES city(city_id)
);

-- 6. Museum-Dinosaur junction table (many-to-many)
CREATE TABLE museum_dinosaur (
    museum_id INT REFERENCES museum(museum_id),
    dinosaur_id INT REFERENCES dinosaur(dinosaur_id),
    PRIMARY KEY (museum_id, dinosaur_id)
);

-- 7. Habitat table (dino ↔ country)
CREATE TABLE habitat (
    dinosaur_id INT REFERENCES dinosaur(dinosaur_id),
    country_id INT REFERENCES country(country_id),
    PRIMARY KEY (dinosaur_id, country_id)
);

-- INSERTS
-- Continents
INSERT INTO continent (continent_id, continent_name)
VALUES
(1, 'North America'),
(2, 'South America'),
(3, 'Europe'),
(4, 'Asia'),
(5, 'Africa'),
(6, 'Oceania'),
(7, 'Antarctica');

-- Countries
INSERT INTO country (country_id, country_name, continent_id)
VALUES
(1, 'United States of America', 1),
(2, 'Canada', 1),
(3, 'Great Britain', 3),
(4, 'Brazil', 2),
(5, 'China', 4),
(6, 'Australia', 6),
(7, 'Egypt', 5),
(8, 'Nigeria', 5),
(9, 'Antarctica', 7),
(10, 'Mexico', 1),
(11, 'Argentina', 2),
(12, 'Germany', 3),
(13, 'France', 3),
(14, 'India', 4),
(15, 'Japan', 4),
(16, 'South Korea', 4),
(17, 'New Zealand', 6),
(18, 'South Africa', 5),
(19, 'Kenya', 5),
(20, 'Chile', 2),
(21, 'Belgium', 3),
(22, 'Thailand', 4),
(26, 'Mongolia', 4),
(27, 'Portugal', 3),
(28, 'Tanzania', 5),
(29, 'Switzerland', 3),
(30, 'Niger', 5),
(31, 'Morocco', 5),
(32, 'Russia', 4),
(33, 'Cameroon', 5),
(34, 'Netherlands', 3);

-- Cities
INSERT INTO city (city_id, city_name, country_id)
VALUES
(1, 'New York', 1),
(2, 'London', 3),
(3, 'Chicago', 1),
(4, 'Drumheller', 2),
(5, 'Washington D.C.', 1),
(6, 'Atlanta', 1),
(7, 'Berlin', 12),
(8, 'Sydney', 6),
(9, 'Toronto', 2),
(10, 'Jensen', 1),
(11, 'Denver', 1),
(12, 'New Haven', 1),
(13, 'Brussels', 21),
(14, 'Tokyo', 15),
(15, 'Cape Town', 18),
(16, 'Los Angeles', 1),
(17, 'Houston', 1),
(18, 'Pittsburgh', 1),
(19, 'Dallas', 1),
(20, 'Katsuyama', 15),
(21, 'Trelew', 11),
(22, 'Leiden', 34);

-- Dinosaur table (with and without common name)
-- ... Paste your long dinosaur INSERTS here exactly as you have them! ...
INSERT INTO dinosaur (dinosaur_id, dinosaur_name, diet, common_name, time_period, wiki_link)
VALUES
(1, 'Tyrannosaurus Rex', 'carnivore', 'T-Rex', 'Cretaceous', 'https://en.wikipedia.org/wiki/Tyrannosaurus'),
(2, 'Velociraptor', 'carnivore', 'Raptor', 'Cretaceous', 'https://en.wikipedia.org/wiki/Velociraptor'),
(15, 'Apatosaurus', 'herbivore', 'Brontosaurus', 'Jurassic', 'https://en.wikipedia.org/wiki/Apatosaurus'),
(19, 'Oviraptor', 'omnivore', 'Raptor', 'Cretaceous', 'https://en.wikipedia.org/wiki/Oviraptor'),
(28, 'Utahraptor', 'carnivore', 'Raptor', 'Cretaceous', 'https://en.wikipedia.org/wiki/Utahraptor'),
(13, 'Microraptor', 'carnivore', 'Raptor', 'Cretaceous', 'https://en.wikipedia.org/wiki/Microraptor'),
(31, 'Pachyrhinosaurus', 'herbivore', 'Pachy', 'Cretaceous', 'https://en.wikipedia.org/wiki/Pachyrhinosaurus'),
(36, 'Psittacosaurus', 'herbivore', 'Parrot Lizard', 'Cretaceous', 'https://en.wikipedia.org/wiki/Psittacosaurus'),
(37, 'Sauroposeidon', 'herbivore', 'Titan Neck', 'Cretaceous', 'https://en.wikipedia.org/wiki/Sauroposeidon'),
(38, 'Suchomimus', 'carnivore', 'Croc Jaws', 'Cretaceous', 'https://en.wikipedia.org/wiki/Suchomimus');

INSERT INTO dinosaur (dinosaur_id, dinosaur_name, diet, time_period, wiki_link)
VALUES
(3, 'Brachiosaurus', 'herbivore', 'Jurassic', 'https://en.wikipedia.org/wiki/Brachiosaurus'),
(4, 'Gallimimus', 'omnivore', 'Cretaceous', 'https://en.wikipedia.org/wiki/Gallimimus'),
(5, 'Stegosaurus', 'herbivore', 'Jurassic', 'https://en.wikipedia.org/wiki/Stegosaurus'),
(6, 'Triceratops', 'herbivore', 'Cretaceous', 'https://en.wikipedia.org/wiki/Triceratops'),
(7, 'Ankylosaurus', 'herbivore', 'Cretaceous', 'https://en.wikipedia.org/wiki/Ankylosaurus'),
(8, 'Giganotosaurus', 'carnivore', 'Cretaceous', 'https://en.wikipedia.org/wiki/Giganotosaurus'),
(9, 'Dilophosaurus', 'carnivore', 'Jurassic', 'https://en.wikipedia.org/wiki/Dilophosaurus'),
(10, 'Pachycephalosaurus', 'herbivore', 'Cretaceous', 'https://en.wikipedia.org/wiki/Pachycephalosaurus'),
(11, 'Allosaurus', 'carnivore', 'Jurassic', 'https://en.wikipedia.org/wiki/Allosaurus'),
(12, 'Iguanodon', 'herbivore', 'Cretaceous', 'https://en.wikipedia.org/wiki/Iguanodon'),
(14, 'Camarasaurus', 'herbivore', 'Jurassic', 'https://en.wikipedia.org/wiki/Camarasaurus'),
(16, 'Spinosaurus', 'carnivore', 'Cretaceous', 'https://en.wikipedia.org/wiki/Spinosaurus'),
(17, 'Mosasaurus', 'carnivore', 'Cretaceous', 'https://en.wikipedia.org/wiki/Mosasaurus'),
(18, 'Ornithomimus', 'omnivore', 'Cretaceous', 'https://en.wikipedia.org/wiki/Ornithomimus'),
(20, 'Therizinosaurus', 'omnivore', 'Cretaceous', 'https://en.wikipedia.org/wiki/Therizinosaurus'),
(21, 'Troodon', 'omnivore', 'Cretaceous', 'https://en.wikipedia.org/wiki/Troodon'),
(22, 'Coelophysis', 'carnivore', 'Triassic', 'https://en.wikipedia.org/wiki/Coelophysis'),
(23, 'Carnotaurus', 'carnivore', 'Cretaceous', 'https://en.wikipedia.org/wiki/Carnotaurus'),
(24, 'Plateosaurus', 'herbivore', 'Triassic', 'https://en.wikipedia.org/wiki/Plateosaurus'),
(25, 'Ceratosaurus', 'carnivore', 'Jurassic', 'https://en.wikipedia.org/wiki/Ceratosaurus'),
(26, 'Deinonychus', 'carnivore', 'Cretaceous', 'https://en.wikipedia.org/wiki/Deinonychus'),
(27, 'Protoceratops', 'herbivore',  'Cretaceous', 'https://en.wikipedia.org/wiki/Protoceratops'),
(29, 'Dryosaurus', 'herbivore', 'Jurassic', 'https://en.wikipedia.org/wiki/Dryosaurus'),
(30, 'Styracosaurus', 'herbivore', 'Cretaceous', 'https://en.wikipedia.org/wiki/Styracosaurus'),
(32, 'Irritator', 'carnivore', 'Cretaceous', 'https://en.wikipedia.org/wiki/Irritator'),
(33, 'Edmontosaurus', 'herbivore', 'Cretaceous', 'https://en.wikipedia.org/wiki/Edmontosaurus'),
(34, 'Maiasaura', 'herbivore', 'Cretaceous', 'https://en.wikipedia.org/wiki/Maiasaura'),
(35, 'Cryolophosaurus', 'carnivore', 'Jurassic', 'https://en.wikipedia.org/wiki/Cryolophosaurus'),
(39, 'Ouranosaurus', 'herbivore', 'Cretaceous', 'https://en.wikipedia.org/wiki/Ouranosaurus'),
(40, 'Herrerasaurus', 'carnivore', 'Triassic', 'https://en.wikipedia.org/wiki/Herrerasaurus'),
(41, 'Argentinosaurus', 'herbivore', 'Cretaceous', 'https://en.wikipedia.org/wiki/Argentinosaurus');

-- Museum inserts
INSERT INTO museum(museum_id, museum_name, city_id)
VALUES
(1, 'American Museum of Natural History', 1),
(2, 'Natural History Museum', 2),
(3, 'Field Museum', 3),
(4, 'Royal Tyrrell Museum of Palaeontology', 4),
(5, 'Smithsonian National Museum of Natural History', 5),
(6, 'Fernbank Museum of Natural History', 6),
(7, 'Museum für Naturkunde', 7),
(8, 'Australian Museum', 8),
(9, 'Royal Ontario Museum', 9),
(10, 'Dinosaur National Monument Visitor Center', 10),
(11, 'Denver Museum of Nature & Science', 11),
(12, 'Yale Peabody Museum of Natural History', 12),
(13, 'Royal Belgian Institute of Natural Sciences', 13),
(14, 'National Museum of Nature and Science', 14),
(15, 'Iziko South African Museum', 15),
(16, 'Natural History Museum of Los Angeles County', 16),
(17, 'Houston Museum of Natural Science', 17),
(18, 'Carnegie Museum of Natural History', 18),
(19, 'Perot Museum of Nature and Science', 19),
(20, 'Fukui Prefectural Dinosaur Museum', 20),
(21, 'Museum of Paleontology Egidio Feruglio', 21),
(22, 'Naturalis Biodiversity Center', 22);

-- Museum-Dinosaur inserts
INSERT INTO museum_dinosaur(museum_id, dinosaur_id)
VALUES
-- AMNH (New York)
(1, 1),  -- T-Rex
(1, 6),  -- Triceratops
(1, 3),  -- Brachiosaurus
(1, 13), -- Microraptor
(1, 22), -- Coelophysis
(1, 4),  -- Gallimimus
(1, 2),  -- Velociraptor

-- NHM (London)
(2, 3),  -- Brachiosaurus
(2, 5),  -- Stegosaurus
(2, 12), -- Iguanodon
(2, 6),  -- Triceratops
(2, 21), -- Troodon

-- Field Museum (Chicago)
(3, 1),  -- T-Rex
(3, 11), -- Allosaurus
(3, 15), -- Apatosaurus

-- Royal Tyrrell Museum (Drumheller)
(4, 6),  -- Triceratops
(4, 8),  -- Giganotosaurus
(4, 7),  -- Ankylosaurus
(4, 10), -- Pachycephalosaurus
(4, 9),  -- Dilophosaurus

-- Smithsonian (Washington D.C.)
(5, 1),  -- T-Rex
(5, 2),  -- Velociraptor
(5, 5),  -- Stegosaurus
(5, 9),  -- Dilophosaurus
(5, 16), -- Spinosaurus
(5, 19), -- Oviraptor

-- Fernbank (Atlanta)
(6, 3),  -- Brachiosaurus
(6, 18), -- Ornithomimus
(6, 6),  -- Triceratops

-- Berlin (Museum für Naturkunde)
(7, 3),  -- Brachiosaurus
(7, 11), -- Allosaurus
(7, 15), -- Apatosaurus

-- Australian Museum (Sydney)
(8, 7),  -- Ankylosaurus
(8, 20), -- Therizinosaurus
(8, 6),  -- Triceratops

-- Royal Ontario Museum (Toronto)
(9, 1),  -- T-Rex
(9, 17), -- Mosasaurus
(9, 12), -- Iguanodon
(9, 2),  -- Velociraptor

-- Dinosaur National Monument (Jensen)
(10, 14), -- Camarasaurus
(10, 15), -- Apatosaurus
(10, 11), -- Allosaurus

-- Denver Museum of Nature & Science
(11, 23),  -- Carnotaurus
(11, 28),  -- Utahraptor
(11, 5),   -- Stegosaurus

-- Yale Peabody Museum of Natural History
(12, 26),  -- Deinonychus
(12, 30),  -- Styracosaurus
(12, 6),   -- Triceratops

-- Royal Belgian Institute of Natural Sciences (Brussels)
(13, 24),  -- Plateosaurus
(13, 29),  -- Dryosaurus
(13, 12),  -- Iguanodon

-- National Museum of Nature and Science (Tokyo)
(14, 27),  -- Protoceratops
(14, 22),  -- Coelophysis
(14, 1),   -- T-Rex

-- Iziko South African Museum (Cape Town)
(15, 25),  -- Ceratosaurus
(15, 30),  -- Styracosaurus

-- Natural History Museum of Los Angeles County
(16, 1),  -- T-Rex
(16, 6),  -- Triceratops
(16, 15), -- Apatosaurus

-- Houston Museum of Natural Science
(17, 16), -- Spinosaurus
(17, 8),  -- Giganotosaurus
(17, 15), -- Apatosaurus

-- Carnegie Museum of Natural History
(18, 11), -- Allosaurus
(18, 5),  -- Stegosaurus
(18, 15), -- Apatosaurus

-- Perot Museum of Nature and Science
(19, 1), -- T-Rex
(19, 10), -- Pachycephalosaurus
(19, 3), -- Brachiosaurus

-- Fukui Prefectural Dinosaur Museum
(20, 28), -- Utahraptor
(20, 21), -- Troodon
(20, 20), -- Therizinosaurus

-- Museo Paleontológico Egidio Feruglio (Trelew, Argentina)
(21, 41),  -- Argentinosaurus
(21, 23), -- Carnotaurus

-- Naturalis Biodiversity Center (Leiden, Netherlands)
(22, 1),  -- T-Rex
(22, 6),  -- Triceratops
(22, 5);  -- Stegosaurus

-- Habitat inserts
-- ... Paste your long habitat INSERTS here exactly as you have them! ...
INSERT INTO habitat(dinosaur_id, country_id)
VALUES
-- Tyrannosaurus Rex
(1, 1),  -- USA
(1, 2),  -- Canada

-- Velociraptor
(2, 5),  -- China
(2, 26), -- Mongolia

-- Brachiosaurus
(3, 1),  -- USA
(3, 2),  -- Canada

-- Gallimimus
(4, 26),  -- Mongolia

-- Stegosaurus
(5, 1),  -- USA
(5, 13), -- France (fragmentary fossils found)

-- Triceratops
(6, 1),  -- USA
(6, 2),  -- Canada

--  Ankylosaurus
(7, 1),  -- USA
(7, 2),  -- Canada

-- Giganotosaurus
(8, 11), -- Argentina

-- Dilophosaurus
(9, 1),  -- USA

-- Pachycephalosaurus
(10, 1), -- USA
(10, 2), -- Canada

-- Allosaurus
(11, 1),  -- USA
(11, 12), -- Germany

-- Iguanodon
(12, 13), -- France
(12, 3),  -- Great Britain

-- Microraptor
(13, 5),  -- China

-- Camarasaurus
(14, 1),  -- USA
(14, 2),  -- Canada

-- Apatosaurus
(15, 1), -- USA

-- Spinosaurus
(16, 7),  -- Egypt
(16, 30), -- Niger
(16, 31), -- Morocco

-- Mosasaurus
(17, 1),  -- USA
(17, 10), -- Mexico

-- Ornithomimus
(18, 1),  -- USA
(18, 2),  -- Canada

-- Oviraptor
(19, 5),  -- China

-- Therizinosaurus
(20, 5),  -- China
(20, 14), -- India

-- Troodon
(21, 2),  -- Canada
(21, 1),  -- USA

-- Coelophysis
(22, 1), -- USA

-- Carnotaurus
(23, 11),  -- Argentina

-- Plateosaurus
(24, 12),  -- Germany
(24, 13),  -- France
(24, 29),  -- Switzerland

-- Ceratosaurus
(25, 1),   -- USA
(25, 27),  -- Portugal
(25, 28),  -- Tanzania

-- Deinonychus
(26, 1),   -- USA

-- Protoceratops
(27, 26),  -- Mongolia

-- Utahraptor
(28, 1),   -- USA

-- Dryosaurus
(29, 1),   -- USA
(29, 27),  -- Portugal
(29, 28),  -- Tanzania

-- Styracosaurus
(30, 2),   -- Canada

-- Pachyrhinosaurus
(31, 2), -- Canada
(31, 1), -- USA

-- Irritator
(32, 4), -- Brazil

-- Edmontosaurus
(33, 1), -- USA
(33, 2), -- Canada

-- Maiasura
(34, 1), -- USA
(34, 2), -- Canada

-- Cryolophosaurus
(35, 9), -- Antarctica

-- Psittacosaurus
(36, 5), -- China
(36, 26), -- Mongolia
(36, 32), -- Russia
(36, 22), -- Thailand

-- Sauroposeidon
(37, 1), -- USA

-- Suchomimus
(38, 30), -- Niger

-- Ouranosaurus
(39, 30), -- Niger
(39, 33), -- Cameroon

-- Herrerasaurus
(40, 11); -- Argentina
