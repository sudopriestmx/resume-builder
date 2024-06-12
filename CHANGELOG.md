# Changelog

THe format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
This project uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0]() (2024-06-11)

### Added

- Added option to export resume in HTML format for better machine readability and for easier text selection (PDF export currently supports exporting to image only).

## [0.1.0]() (2024-06-05)

### Added

- Added saving configuration to the browser functionality to store current CV configuration in local storage.
- Added exporting and importing configuration as JSON files.

### Fixed

- Fixed miscelaneous styling.

## [0.0.9]() (2024-06-05)

### Added

- Added export to PDF functionality using [html2pdf.js](https://ekoopmans.github.io/html2pdf.js/).

### Fixed

- Added 'Export Mode' Label to toggle.

## [0.0.8]() (2024-06-05)

### Added

- Added upload profile picture functionality.
- Added option to hide profile picture.

### Fixed

- Structured sidebar configuration sections and added styling to them.
- Renamed EditToggle to ToggleSwitch to make it reusable.

## [0.0.7]() (2024-06-05)

### Added

- Added config sidebar to change CV colors, shape of profile picture, and weight of headlines.
- Added description to the project, including references to the original project and course.

## [0.0.6]() (2024-06-05)

### Added

- Added an 'Edit Mode' toggle and implemented edit mode functionality to the whole project.

## [0.0.5]() (2024-05-27)

### Added

- Added buttons to add/remove skills, certifications, experience, education, and experience/education description entries.

## [0.0.4]() (2024-05-27)

### Added

- Separated Resume Section, Section Title, and Contact Data sections of the CV into their own Vue components to facilitate readability and scalability.container
- Added font-awesome icons to the Contact section.

## [0.0.3]() (2024-05-27)

### Added

- Implemented functionality to be able to edit any field inside the CV, synchronizing the content with the internal state of the model with 2-way binding.

## [0.0.2]() (2024-05-27)

### Added

- Implemented rendering data logic to CV content, now loading data from the script section and applying reusable structures.
- Added profile picture to CV.

## [0.0.1]() (2024-05-26)

- Initial project scaffolding
