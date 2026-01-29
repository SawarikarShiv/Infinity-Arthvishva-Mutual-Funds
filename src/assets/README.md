This directory contains all the dynamic assets used in the Infinity Arthvishva Mutual Funds application.

## Structure

### `/logos/`
Contains all logo variations:
- `logo-main.svg` - Primary logo with dark text
- `logo-white.svg` - Logo with white text (for dark backgrounds)
- `logo-icon.svg` - Icon-only version for favicons, mobile apps, etc.

### `/illustrations/`
SVG illustrations used throughout the app:
- `investment.svg` - Illustration for investment concepts
- `portfolio-growth.svg` - Portfolio growth visualization
- `risk-analysis.svg` - Risk analysis and assessment
- `sip-calculator.svg` - SIP calculation illustration

### `/images/placeholder/`
Placeholder images for loading states:
- `avatar.svg` - Default user avatar
- `fund-placeholder.svg` - Placeholder for fund images
- `chart-placeholder.svg` - Placeholder for charts/graphs

## Usage

Import assets using the index files:

```javascript
import { LogoMain, LogoWhite } from '@/assets/logos';
import { InvestmentIllustration } from '@/assets/illustrations';
import { AvatarPlaceholder } from '@/assets/images/placeholder';