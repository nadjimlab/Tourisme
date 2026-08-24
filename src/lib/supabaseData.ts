import { supabase } from './supabase';
import {
  DigitalRequest,
  InvestmentOpportunity,
  MasterArtisan,
  NewsArticle,
  TouristSite,
  TourismEvent,
} from '../types';

export type StaffProfile = {
  id: string;
  display_name: string | null;
  role: 'admin' | 'editor' | 'viewer';
};

type JsonRecord = Record<string, unknown>;

const localized = (value: unknown) => (value && typeof value === 'object' ? value : { ar: '', fr: '', en: '' }) as TouristSite['name'];
const localizedArrays = (value: unknown) => (value && typeof value === 'object' ? value : { ar: [], fr: [], en: [] }) as TouristSite['amenities'];

const toSite = (row: JsonRecord): TouristSite => ({
  id: String(row.id),
  name: localized(row.name),
  category: row.category as TouristSite['category'],
  commune: localized(row.commune),
  coordinates: row.coordinates as [number, number],
  description: localized(row.description),
  history: localized(row.history),
  images: (row.images as string[]) ?? [],
  visitingHours: localized(row.visiting_hours),
  entryFee: localized(row.entry_fee),
  amenities: localizedArrays(row.amenities),
  address: localized(row.address),
  rating: Number(row.rating ?? 0),
  reviewsCount: Number(row.reviews_count ?? 0),
  isFeatured: Boolean(row.is_featured),
  bestTimeToVisit: row.best_time_to_visit ? localized(row.best_time_to_visit) : undefined,
});

const toEvent = (row: JsonRecord): TourismEvent => ({
  id: String(row.id),
  title: localized(row.title),
  type: row.type as TourismEvent['type'],
  dateStart: String(row.date_start),
  dateEnd: String(row.date_end),
  location: localized(row.location),
  description: localized(row.description),
  image: String(row.image),
  organizer: localized(row.organizer),
  category: row.category as TourismEvent['category'],
  isUpcoming: Boolean(row.is_upcoming),
});

const toArtisan = (row: JsonRecord): MasterArtisan => ({
  id: String(row.id),
  name: localized(row.name),
  craftCategory: row.craft_category as MasterArtisan['craftCategory'],
  commune: localized(row.commune),
  address: localized(row.address),
  phone: String(row.phone),
  whatsapp: row.whatsapp ? String(row.whatsapp) : undefined,
  photo: String(row.photo),
  bio: localized(row.bio),
  products: (row.products as MasterArtisan['products']) ?? [],
  isCertified: Boolean(row.is_certified),
  registrationNumber: String(row.registration_number),
  experienceYears: Number(row.experience_years ?? 0),
});

const toInvestment = (row: JsonRecord): InvestmentOpportunity => ({
  id: String(row.id),
  title: localized(row.title),
  category: row.category as InvestmentOpportunity['category'],
  location: localized(row.location),
  areaHectares: Number(row.area_hectares ?? 0),
  zetZoneName: row.zet_zone_name ? localized(row.zet_zone_name) : undefined,
  estimatedCostDZD: String(row.estimated_cost_dzd),
  status: row.status as InvestmentOpportunity['status'],
  description: localized(row.description),
  advantages: localizedArrays(row.advantages),
  image: String(row.image),
  pdfTitle: String(row.pdf_title),
});

const toNews = (row: JsonRecord): NewsArticle => ({
  id: String(row.id),
  title: localized(row.title),
  excerpt: localized(row.excerpt),
  content: localized(row.content),
  date: String(row.published_date),
  category: row.category as NewsArticle['category'],
  image: String(row.image),
  isImportant: Boolean(row.is_important),
});

export const toRequest = (row: JsonRecord): DigitalRequest => ({
  id: String(row.id),
  trackingNumber: String(row.tracking_number),
  serviceType: row.service_type as DigitalRequest['serviceType'],
  fullName: String(row.full_name ?? ''),
  nationalIdOrPassport: String(row.national_id_or_passport ?? ''),
  email: String(row.email ?? ''),
  phone: String(row.phone ?? ''),
  subject: String(row.subject ?? ''),
  details: String(row.details ?? ''),
  status: row.status as DigitalRequest['status'],
  createdAt: String(row.created_at),
  updatedAt: row.updated_at ? String(row.updated_at) : undefined,
  adminResponse: row.admin_response ? String(row.admin_response) : undefined,
  departmentAssigned: row.department_assigned ? String(row.department_assigned) : undefined,
});

export type PublicCollections = {
  sites: TouristSite[];
  events: TourismEvent[];
  artisans: MasterArtisan[];
  investments: InvestmentOpportunity[];
  news: NewsArticle[];
};

export type StaffCollections = PublicCollections & { requests: DigitalRequest[] };

const unwrap = <T>(result: { data: T | null; error: { message: string } | null }) => {
  if (result.error) throw new Error(result.error.message);
  return result.data ?? ([] as unknown as T);
};

export async function fetchPublicCollections(): Promise<PublicCollections> {
  const [sites, events, artisans, investments, news] = await Promise.all([
    supabase.from('sites').select('*').eq('is_published', true).order('created_at', { ascending: false }),
    supabase.from('events').select('*').eq('is_published', true).order('date_start', { ascending: true }),
    supabase.from('artisans').select('*').eq('is_published', true).order('created_at', { ascending: false }),
    supabase.from('investments').select('*').eq('is_published', true).order('created_at', { ascending: false }),
    supabase.from('news').select('*').eq('is_published', true).order('published_date', { ascending: false }),
  ]);
  return {
    sites: unwrap(sites).map(toSite),
    events: unwrap(events).map(toEvent),
    artisans: unwrap(artisans).map(toArtisan),
    investments: unwrap(investments).map(toInvestment),
    news: unwrap(news).map(toNews),
  };
}

export async function fetchStaffCollections(): Promise<StaffCollections> {
  const publicCollections = await fetchPublicCollections();
  const requests = await supabase.from('requests').select('*').order('created_at', { ascending: false });
  return { ...publicCollections, requests: unwrap(requests).map(toRequest) };
}

export async function getStaffProfile(userId: string): Promise<StaffProfile | null> {
  const result = await supabase.from('profiles').select('id, display_name, role').eq('id', userId).maybeSingle();
  if (result.error) throw new Error(result.error.message);
  return result.data as StaffProfile | null;
}

export async function submitPublicRequest(input: Omit<DigitalRequest, 'id' | 'trackingNumber' | 'status' | 'createdAt' | 'updatedAt' | 'adminResponse' | 'departmentAssigned'>): Promise<DigitalRequest> {
  const result = await supabase.rpc('submit_public_request', {
    p_service_type: input.serviceType,
    p_full_name: input.fullName,
    p_national_id_or_passport: input.nationalIdOrPassport,
    p_email: input.email,
    p_phone: input.phone,
    p_subject: input.subject,
    p_details: input.details,
  });
  const rows = unwrap(result) as JsonRecord[];
  if (!rows[0]) throw new Error('La demande n’a pas pu être enregistrée.');
  return toRequest(rows[0]);
}

export async function trackPublicRequest(trackingNumber: string): Promise<DigitalRequest | null> {
  const result = await supabase.rpc('track_public_request', { p_tracking_number: trackingNumber });
  const rows = unwrap(result) as JsonRecord[];
  return rows[0] ? toRequest(rows[0]) : null;
}

const asJson = (value: unknown) => value as unknown as JsonRecord;

export async function insertSite(site: TouristSite) {
  const result = await supabase.from('sites').upsert({
    id: site.id,
    name: asJson(site.name),
    category: site.category,
    commune: asJson(site.commune),
    coordinates: site.coordinates,
    description: asJson(site.description),
    history: asJson(site.history),
    images: site.images,
    visiting_hours: asJson(site.visitingHours),
    entry_fee: asJson(site.entryFee),
    amenities: asJson(site.amenities),
    address: asJson(site.address),
    rating: site.rating,
    reviews_count: site.reviewsCount,
    is_featured: site.isFeatured ?? false,
    best_time_to_visit: site.bestTimeToVisit ? asJson(site.bestTimeToVisit) : null,
    is_published: true,
  });
  if (result.error) throw new Error(result.error.message);
}

export async function insertEvent(event: TourismEvent) {
  const result = await supabase.from('events').upsert({
    id: event.id, title: asJson(event.title), type: event.type, date_start: event.dateStart, date_end: event.dateEnd,
    location: asJson(event.location), description: asJson(event.description), image: event.image, organizer: asJson(event.organizer),
    category: event.category, is_upcoming: event.isUpcoming, is_published: true,
  });
  if (result.error) throw new Error(result.error.message);
}

export async function insertArtisan(artisan: MasterArtisan) {
  const result = await supabase.from('artisans').upsert({
    id: artisan.id, name: asJson(artisan.name), craft_category: artisan.craftCategory, commune: asJson(artisan.commune),
    address: asJson(artisan.address), phone: artisan.phone, whatsapp: artisan.whatsapp ?? null, photo: artisan.photo,
    bio: asJson(artisan.bio), products: artisan.products, is_certified: artisan.isCertified, registration_number: artisan.registrationNumber,
    experience_years: artisan.experienceYears, is_published: true,
  });
  if (result.error) throw new Error(result.error.message);
}

export async function insertNews(article: NewsArticle) {
  const result = await supabase.from('news').upsert({
    id: article.id, title: asJson(article.title), excerpt: asJson(article.excerpt), content: asJson(article.content),
    published_date: article.date, category: article.category, image: article.image, is_important: article.isImportant ?? false, is_published: true,
  });
  if (result.error) throw new Error(result.error.message);
}

export async function deleteContent(table: 'sites' | 'events' | 'artisans' | 'news', id: string) {
  const result = await supabase.from(table).delete().eq('id', id);
  if (result.error) throw new Error(result.error.message);
}

export async function updateRequest(id: string, status: DigitalRequest['status'], responseNotes?: string, department?: string) {
  const result = await supabase.from('requests').update({
    status,
    admin_response: responseNotes ?? null,
    department_assigned: department ?? null,
  }).eq('id', id);
  if (result.error) throw new Error(result.error.message);
}

export function subscribeToRealtime(onChange: () => void) {
  const tables = ['sites', 'events', 'artisans', 'investments', 'news', 'requests'] as const;
  const channel = tables.reduce((current, table) => current.on('postgres_changes', { event: '*', schema: 'public', table }, onChange), supabase.channel(`eloued-realtime-${Date.now()}`));
  channel.subscribe();
  return () => { void supabase.removeChannel(channel); };
}
