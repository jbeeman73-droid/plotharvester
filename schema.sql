-- Use your database (edit this if needed)
-- CREATE DATABASE IF NOT EXISTS plotharvester CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE plotharvester;

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- -----------------------------------------------------
-- Table: users
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  avatar VARCHAR(255) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Table: user_settings
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS user_settings (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  setting_key VARCHAR(50) NOT NULL,
  setting_value TEXT,
  PRIMARY KEY (id),
  INDEX idx_user_settings_user (user_id),
  CONSTRAINT fk_user_settings_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Table: plots (land / fields / zones)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS plots (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  acreage DECIMAL(6,2) DEFAULT NULL,
  plot_type ENUM('food_plot','garden','timber','pasture','water','other') DEFAULT 'other',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_plots_user (user_id),
  CONSTRAINT fk_plots_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Table: locations (stands, blinds, beds, ponds, etc.)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS locations (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  plot_id INT DEFAULT NULL,
  name VARCHAR(100) NOT NULL,
  location_type ENUM('stand','blind','trail_cam','bed','feeding_area','water','other') DEFAULT 'other',
  latitude DECIMAL(9,6) DEFAULT NULL,
  longitude DECIMAL(9,6) DEFAULT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_locations_user (user_id),
  INDEX idx_locations_plot (plot_id),
  CONSTRAINT fk_locations_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_locations_plot
    FOREIGN KEY (plot_id) REFERENCES plots(id)
    ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Table: activity_types (normalized list)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS activity_types (
  id INT NOT NULL AUTO_INCREMENT,
  code VARCHAR(50) NOT NULL,
  label VARCHAR(100) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_activity_types_code (code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed some core activity types
INSERT INTO activity_types (code, label) VALUES
  ('hunting', 'Hunting'),
  ('fishing', 'Fishing'),
  ('gardening', 'Gardening'),
  ('scouting', 'Scouting'),
  ('habitat_work', 'Habitat Work'),
  ('maintenance', 'Maintenance'),
  ('general', 'General')
ON DUPLICATE KEY UPDATE label = VALUES(label);

-- -----------------------------------------------------
-- Table: activities (generic log wrapper)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS activities (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  activity_type_id INT NOT NULL,
  plot_id INT DEFAULT NULL,
  location_id INT DEFAULT NULL,
  title VARCHAR(150) NOT NULL,
  notes TEXT,
  activity_date DATE NOT NULL,
  start_time TIME DEFAULT NULL,
  end_time TIME DEFAULT NULL,
  weather VARCHAR(100) DEFAULT NULL,
  temperature_c DECIMAL(5,2) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_activities_user (user_id),
  INDEX idx_activities_type (activity_type_id),
  INDEX idx_activities_plot (plot_id),
  INDEX idx_activities_location (location_id),
  CONSTRAINT fk_activities_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_activities_type
    FOREIGN KEY (activity_type_id) REFERENCES activity_types(id)
    ON DELETE RESTRICT,
  CONSTRAINT fk_activities_plot
    FOREIGN KEY (plot_id) REFERENCES plots(id)
    ON DELETE SET NULL,
  CONSTRAINT fk_activities_location
    FOREIGN KEY (location_id) REFERENCES locations(id)
    ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Table: hunting_logs (details tied to activities)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS hunting_logs (
  id INT NOT NULL AUTO_INCREMENT,
  activity_id INT NOT NULL,
  species VARCHAR(100) DEFAULT NULL,
  weapon ENUM('rifle','shotgun','bow','crossbow','muzzleloader','other') DEFAULT 'other',
  method ENUM('stand','still_hunt','spot_and_stalk','ground_blind','drive','other') DEFAULT 'other',
  shots_fired INT DEFAULT 0,
  animals_seen INT DEFAULT 0,
  animals_harvested INT DEFAULT 0,
  notes TEXT,
  PRIMARY KEY (id),
  UNIQUE KEY uq_hunting_logs_activity (activity_id),
  CONSTRAINT fk_hunting_logs_activity
    FOREIGN KEY (activity_id) REFERENCES activities(id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Table: fishing_logs
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS fishing_logs (
  id INT NOT NULL AUTO_INCREMENT,
  activity_id INT NOT NULL,
  water_body VARCHAR(100) DEFAULT NULL,
  technique VARCHAR(100) DEFAULT NULL,
  bait_or_lure VARCHAR(100) DEFAULT NULL,
  fish_caught INT DEFAULT 0,
  biggest_fish_length_cm DECIMAL(5,2) DEFAULT NULL,
  biggest_fish_weight_kg DECIMAL(5,2) DEFAULT NULL,
  notes TEXT,
  PRIMARY KEY (id),
  UNIQUE KEY uq_fishing_logs_activity (activity_id),
  CONSTRAINT fk_fishing_logs_activity
    FOREIGN KEY (activity_id) REFERENCES activities(id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Table: gardening_logs
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS gardening_logs (
  id INT NOT NULL AUTO_INCREMENT,
  activity_id INT NOT NULL,
  crop VARCHAR(100) DEFAULT NULL,
  action ENUM('planting','watering','fertilizing','weeding','harvest','pruning','other') DEFAULT 'other',
  quantity VARCHAR(50) DEFAULT NULL,
  notes TEXT,
  PRIMARY KEY (id),
  UNIQUE KEY uq_gardening_logs_activity (activity_id),
  CONSTRAINT fk_gardening_logs_activity
    FOREIGN KEY (activity_id) REFERENCES activities(id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Table: collection_logs (sheds, skulls, feathers, artifacts, etc.)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS collection_logs (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  plot_id INT DEFAULT NULL,
  location_id INT DEFAULT NULL,
  item_type ENUM('shed','skull','bone','feather','artifact','other') DEFAULT 'other',
  species_or_origin VARCHAR(100) DEFAULT NULL,
  description TEXT,
  found_date DATE NOT NULL,
  photo_url VARCHAR(255) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_collection_user (user_id),
  INDEX idx_collection_plot (plot_id),
  INDEX idx_collection_location (location_id),
  CONSTRAINT fk_collection_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_collection_plot
    FOREIGN KEY (plot_id) REFERENCES plots(id)
    ON DELETE SET NULL,
  CONSTRAINT fk_collection_location
    FOREIGN KEY (location_id) REFERENCES locations(id)
    ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Table: wildlife_sightings
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS wildlife_sightings (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  plot_id INT DEFAULT NULL,
  location_id INT DEFAULT NULL,
  species VARCHAR(100) NOT NULL,
  count_seen INT DEFAULT 1,
  behavior VARCHAR(255) DEFAULT NULL,
  sighting_date DATE NOT NULL,
  sighting_time TIME DEFAULT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_sightings_user (user_id),
  INDEX idx_sightings_plot (plot_id),
  INDEX idx_sightings_location (location_id),
  CONSTRAINT fk_sightings_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_sightings_plot
    FOREIGN KEY (plot_id) REFERENCES plots(id)
    ON DELETE SET NULL,
  CONSTRAINT fk_sightings_location
    FOREIGN KEY (location_id) REFERENCES locations(id)
    ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Table: gear (equipment inventory)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS gear (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  category ENUM('weapon','optics','clothing','stand','camera','tool','other') DEFAULT 'other',
  brand VARCHAR(100) DEFAULT NULL,
  model VARCHAR(100) DEFAULT NULL,
  notes TEXT,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_gear_user (user_id),
  CONSTRAINT fk_gear_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;