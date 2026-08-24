import { writeFileSync } from 'node:fs';
import { INITIAL_ARTISANS, INITIAL_EVENTS, INITIAL_INVESTMENTS, INITIAL_NEWS, INITIAL_SITES } from '../src/data/initialData';

const sqlString = (value: string) => `'${value.replaceAll("'", "''")}'`;
const json = (value: unknown) => sqlString(JSON.stringify(value));
const text = (value: unknown) => sqlString(String(value));

const statements: string[] = [
  '-- Generated from src/data/initialData.ts. No citizen requests are seeded.',
  'begin;',
  'delete from public.sites;',
  'delete from public.events;',
  'delete from public.artisans;',
  'delete from public.investments;',
  'delete from public.news;',
];

for (const site of INITIAL_SITES) {
  statements.push(`insert into public.sites (id, name, category, commune, coordinates, description, history, images, visiting_hours, entry_fee, amenities, address, rating, reviews_count, is_featured, best_time_to_visit, is_published) values (${text(site.id)}, ${json(site.name)}, ${text(site.category)}, ${json(site.commune)}, ${json(site.coordinates)}, ${json(site.description)}, ${json(site.history)}, ${json(site.images)}, ${json(site.visitingHours)}, ${json(site.entryFee)}, ${json(site.amenities)}, ${json(site.address)}, ${site.rating}, ${site.reviewsCount}, ${site.isFeatured ?? false}, ${site.bestTimeToVisit ? json(site.bestTimeToVisit) : 'null'}, true);`);
}
for (const event of INITIAL_EVENTS) {
  statements.push(`insert into public.events (id, title, type, date_start, date_end, location, description, image, organizer, category, is_upcoming, is_published) values (${text(event.id)}, ${json(event.title)}, ${text(event.type)}, ${text(event.dateStart)}, ${text(event.dateEnd)}, ${json(event.location)}, ${json(event.description)}, ${text(event.image)}, ${json(event.organizer)}, ${text(event.category)}, ${event.isUpcoming}, true);`);
}
for (const artisan of INITIAL_ARTISANS) {
  statements.push(`insert into public.artisans (id, name, craft_category, commune, address, phone, whatsapp, photo, bio, products, is_certified, registration_number, experience_years, is_published) values (${text(artisan.id)}, ${json(artisan.name)}, ${text(artisan.craftCategory)}, ${json(artisan.commune)}, ${json(artisan.address)}, ${text(artisan.phone)}, ${artisan.whatsapp ? text(artisan.whatsapp) : 'null'}, ${text(artisan.photo)}, ${json(artisan.bio)}, ${json(artisan.products)}, ${artisan.isCertified}, ${text(artisan.registrationNumber)}, ${artisan.experienceYears}, true);`);
}
for (const investment of INITIAL_INVESTMENTS) {
  statements.push(`insert into public.investments (id, title, category, location, area_hectares, zet_zone_name, estimated_cost_dzd, status, description, advantages, image, pdf_title, is_published) values (${text(investment.id)}, ${json(investment.title)}, ${text(investment.category)}, ${json(investment.location)}, ${investment.areaHectares}, ${investment.zetZoneName ? json(investment.zetZoneName) : 'null'}, ${text(investment.estimatedCostDZD)}, ${text(investment.status)}, ${json(investment.description)}, ${json(investment.advantages)}, ${text(investment.image)}, ${text(investment.pdfTitle)}, true);`);
}
for (const article of INITIAL_NEWS) {
  statements.push(`insert into public.news (id, title, excerpt, content, published_date, category, image, is_important, is_published) values (${text(article.id)}, ${json(article.title)}, ${json(article.excerpt)}, ${json(article.content)}, ${text(article.date)}, ${text(article.category)}, ${text(article.image)}, ${article.isImportant ?? false}, true);`);
}

statements.push('commit;');
writeFileSync('supabase/seed.sql', `${statements.join('\n')}\n`);
console.log(`Generated supabase/seed.sql with ${INITIAL_SITES.length} sites, ${INITIAL_EVENTS.length} events, ${INITIAL_ARTISANS.length} artisans, ${INITIAL_INVESTMENTS.length} investments and ${INITIAL_NEWS.length} news articles.`);
