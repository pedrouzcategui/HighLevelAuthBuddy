export interface CompanyResponse {
  company: CompanyResource;
}

export interface CompanyResource {
  id: string;
  name: string;
  email: string;
  logoUrl: string;
  phone: string;
  website: string;
  domain: string;
  spareDomain: string;
  privacyPolicy: string;
  termsConditions: string;
  theme: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  state: string;
  timezone: string;
  relationshipNumber: string;
  faviconUrl: string;
  subdomain: string;
  plan: number;
  currency: string;
  customerType: string;
  termsOfServiceVersion: string;
  termsOfServiceAcceptedBy: string;
  twilioTrialMode: boolean;
  twilioFreeCredits: number;
  termsOfServiceAcceptedDate: string;
  privacyPolicyVersion: string;
  privacyPolicyAcceptedBy: string;
  privacyPolicyAcceptedDate: string;
  affiliatePolicyVersion: string;
  affiliatePolicyAcceptedBy: string;
  affiliatePolicyAcceptedDate: string;
  isReselling: boolean;
  onboardingInfo: string;
  stripeId: string;
  upgradeEnabledForClients: boolean;
  cancelEnabledForClients: boolean;
  autoSuspendEnabled: boolean;
  saasSettings: SaasSettings;
  stripeActivePlan: string;
  stripeConnectId: string;
  enableDepreciatedFeatures: boolean;
  premiumUpgraded: boolean;
  status: string;
  locationCount: number;
  disableEmailService: boolean;
  billingInfo: BillingInfo;
}

export interface BillingInfo {
  first_trial_extension_processed_on: Date;
  first_trial_extension_reason: string;
  second_trial_extension_processed_on: Date;
  second_trial_extension_reason: string;
  pause_subscription_requested_on: Date;
  pause_subscription_reason: string;
  pause_subscription_status: string;
  pause_subscription_req_processed_on: Date;
  pause_subscription_req_by: string;
  end_trial_early: EndTrialEarly;
  agency_pro_addon: AgencyProAddon;
  coupons_added: string[];
  reactivation_attempt: ReactivationAttempt;
  downgrade: Downgrade;
  first_payment_date: Date;
  pause_subscription_info: PauseSubscriptionInfo;
}

export interface AgencyProAddon {
  is_active: boolean;
  agency_pro_addon_subscription_id: string;
  agency_pro_addon_active_plan: string;
}

export interface Downgrade {
  attempted_on: Date;
  attempted_by: string;
  previous_plan: string;
  current_plan: string;
  reason: string;
}

export interface EndTrialEarly {
  trial_end_req_by: string;
  trial_ended_on: Date;
}

export interface PauseSubscriptionInfo {
  requested_on: Date;
  req_by: string;
  reason: string;
  status: string;
  processed_on: Date;
}

export interface ReactivationAttempt {
  attempted_on: Date;
  attempted_by: string;
  invoice_id: string;
}

export interface SaasSettings {
  agencyDashboardVisibleTo: string;
  stripeConnectInitiatedBy: string;
}
