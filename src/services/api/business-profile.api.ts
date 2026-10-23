import { apiRequest } from "./client";

export type BusinessHours = {
  open: string;
  close: string;
};

export type BusinessOpeningHours = Record<string, BusinessHours>;

export type BusinessProfile = {
  id: string;
  tenantId: string;
  businessType: string | null;
  description: string | null;
  address: string | null;
  phone: string | null;
  coverImageUrl: string | null;
  photos: string[] | null;
  socialLinks: Record<string, string> | null;
  openingHours: BusinessOpeningHours | null;
  isPublished: boolean;
};

export type SaveBusinessProfile = {
  businessType?: string;
  description?: string;
  address?: string;
  phone?: string;
  coverImageUrl?: string;
  photos?: string[];
  openingHours?: BusinessOpeningHours;
};

export type PublishBusinessProfileResponse = {
  message: string;
  profile: BusinessProfile;
};

export type PublishBusinessProfileError = {
  message: string;
  missingFields?: string[];
};

export function getMyBusinessProfile() {
  return apiRequest<BusinessProfile>("/business-profile/me");
}

export type BusinessProfileLimits = {
  maxPhotos: number;
};

export function getBusinessProfileLimits() {
  return apiRequest<BusinessProfileLimits>("/business-profile/limits");
}

export function createBusinessProfile(data: SaveBusinessProfile) {
  return apiRequest<BusinessProfile>("/business-profile", {
    method: "POST",
    body: data,
  });
}

export function updateBusinessProfile(data: SaveBusinessProfile) {
  return apiRequest<BusinessProfile>("/business-profile/me", {
    method: "PATCH",
    body: data,
  });
}

export function publishBusinessProfile() {
  return apiRequest<PublishBusinessProfileResponse>(
    "/business-profile/publish",
    {
      method: "POST",
    },
  );
}

export function unpublishBusinessProfile() {
  return apiRequest<PublishBusinessProfileResponse>(
    "/business-profile/unpublish",
    {
      method: "POST",
    },
  );
}
