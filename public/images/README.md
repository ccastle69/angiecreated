# Images — angiecreated.com

Drop your photos into the correct subfolder, then update the data files.

## /public/images/products/
Photos of your shop items.
- `tote-bag-1.jpg` — Custom tote bag (main product photo)
- `custom-project.jpg` — Custom project inquiry card image
- `workshop.jpg` — Workshop card image

## /public/images/portfolio/
All your portfolio/gallery photos. Name them to match the imageSrc in `/data/portfolio.ts`.
- `wine-bottle-glasses.jpg`
- `bachelorette-totes.jpg`
- `herb-garden.jpg`
- `roast-chicken.jpg`
- `macrame.jpg`
- `friend-totes.jpg`
- `workshop-class.jpg`
- `tin-planters.jpg`
- `galette.jpg`
- `decoupage-vases.jpg`

## /public/images/workshops/
Photos for workshop cards (optional, currently using gradients).

## /public/images/about/
- `angie-hero.jpg` — Main photo of Angie (shows on hero and About page)
- `workspace.jpg` — Photo of your workspace or a project in progress

## How to add a photo
1. Drop the file in the correct subfolder
2. Update the relevant data file (`/data/products.ts`, `/data/portfolio.ts`, etc.)
3. Replace the placeholder `<div>` with `<Image src="..." alt="..." ... />`

## Recommended sizes
- Product photos: 800x600px minimum
- Portfolio photos: 600x600 to 600x900px
- Hero/About photos: 800x800px minimum
- All images: JPG or WebP, under 500KB ideally
