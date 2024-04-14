export interface LocationResponse {
  location: LocationClass;
}

export interface LocationClass {
  id: string;
  companyId: string;
  name: string;
  domain: string;
  address: string;
  city: string;
  state: string;
  logoUrl: string;
  country: string;
  postalCode: string;
  website: string;
  timezone: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  business: Business;
  social: Social;
  settings: Settings;
  reseller: Reseller;
}

export interface Business {
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  website: string;
  timezone: string;
  logoUrl: string;
}

export interface Reseller {}

export interface Settings {
  allowDuplicateContact: boolean;
  allowDuplicateOpportunity: boolean;
  allowFacebookNameMerge: boolean;
  disableContactTimezone: boolean;
}

export interface Social {
  facebookUrl: string;
  googlePlus: string;
  linkedIn: string;
  foursquare: string;
  twitter: string;
  yelp: string;
  instagram: string;
  youtube: string;
  pinterest: string;
  blogRss: string;
  googlePlacesId: string;
}
