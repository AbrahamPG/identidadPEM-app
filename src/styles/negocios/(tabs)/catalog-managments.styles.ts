import type { TextStyle, ViewStyle } from "react-native";

export const ui = {
  pageContent: {
    paddingBottom: 32,
    gap: 12,
  },

  proLockedContent: {
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 12,
    gap: 12,
  } satisfies ViewStyle,

  proLockedIcon: {
    fontSize: 36,
  },

  // Dentro de tu objeto ui:
  productPhotoPlaceholder: {
    minHeight: 110,
    borderWidth: 1,
    borderColor: "#D6DDD3",
    borderStyle: "dashed",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    gap: 8,
  } satisfies ViewStyle,

  productPhotoIcon: {
    fontSize: 28,
  } satisfies TextStyle,

  overline: {
    color: "#718073",
    fontSize: 10,
    fontWeight: "800" as const,
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  businessSelector: {
    backgroundColor: "#EAF0E3",
    borderRadius: 18,
    padding: 12,
    gap: 8,
  },
  selectedBusiness: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 12,
    paddingVertical: 4,
  },
  businessAvatar: {
    width: 46,
    height: 46,
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  businessName: {
    color: "#173B2B",
    fontSize: 14,
    fontWeight: "700" as const,
  },
  businessMeta: {
    color: "#68756A",
    fontSize: 12,
  },
  chevron: {
    color: "#55764C",
    fontSize: 24,
    paddingHorizontal: 4,
  },
  businessList: {
    borderTopWidth: 1,
    borderTopColor: "#D6E0CE",
    paddingTop: 8,
    gap: 4,
  },
  businessOption: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 10,
    padding: 10,
    borderRadius: 12,
  },
  businessOptionSelected: {
    backgroundColor: "#FFFFFF",
  },
  selectedMark: {
    color: "#245536",
    fontSize: 18,
    fontWeight: "800" as const,
  },
  demoNote: {
    color: "#68756A",
    fontSize: 11,
    lineHeight: 17,
    marginTop: 5,
  },
  sectionHeading: {
    marginTop: 8,
    color: "#718073",
    fontSize: 11,
    fontWeight: "800" as const,
    letterSpacing: 1,
  },
  accordion: {
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#E7EADF",
    overflow: "hidden" as const,
  },
  accordionHeader: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 12,
    padding: 14,
  },
  accordionIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#F0F4E9",
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  accordionTitle: {
    color: "#173B2B",
    fontSize: 14,
    fontWeight: "800" as const,
  },
  accordionSubtitle: {
    color: "#68756A",
    fontSize: 11,
    lineHeight: 16,
  },
  accordionBody: {
    borderTopWidth: 1,
    borderTopColor: "#E7EADF",
    padding: 15,
    gap: 10,
  },
  listDivider: {
    height: 1,
    backgroundColor: "#E7EADF",
    marginVertical: 8,
  },
  readOnlyInput: {
    backgroundColor: "#F2F4EF",
  },
  fieldHint: {
    color: "#718073",
    fontSize: 11,
    lineHeight: 17,
  },
  secondaryButton: {
    backgroundColor: "#EAF0E3",
    borderRadius: 12,
    alignItems: "center" as const,
    paddingVertical: 13,
    paddingHorizontal: 12,
    marginTop: 4,
  },
  secondaryButtonText: {
    color: "#245536",
    fontSize: 13,
    fontWeight: "800" as const,
  },
  photoIntro: {
    color: "#68756A",
    fontSize: 13,
    lineHeight: 20,
  },
  photoGrid: {
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
    gap: 8,
  },
  photoSlot: {
    width: "31%" as const,
    minHeight: 92,
    backgroundColor: "#F2F4EF",
    borderWidth: 1,
    borderColor: "#DCE3D7",
    borderStyle: "dashed" as const,
    borderRadius: 12,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    gap: 5,
  },
  photoEmoji: {
    color: "#55764C",
    fontSize: 24,
  },
  photoNumber: {
    color: "#68756A",
    fontSize: 10,
  },
  proCard: {
    backgroundColor: "#173B2B",
    borderRadius: 20,
    padding: 19,
    gap: 9,
    marginTop: 4,
  },
  proEyebrow: {
    color: "#C8D9A9",
    fontSize: 10,
    fontWeight: "800" as const,
    letterSpacing: 1.4,
  },
  proTitle: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "800" as const,
    lineHeight: 26,
  },
  proDescription: {
    color: "#D7E2D7",
    fontSize: 12,
    lineHeight: 19,
  },
  priceRow: {
    flexDirection: "row" as const,
    alignItems: "baseline" as const,
    marginTop: 3,
  },
  proPrice: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "800" as const,
  },
  proPeriod: {
    color: "#D7E2D7",
    fontSize: 12,
    marginLeft: 5,
  },
  proTrial: {
    color: "#D7E2D7",
    fontSize: 12,
  },
  proBadge: {
    alignSelf: "flex-start" as const,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 4,
  },
  proBadgeText: {
    color: "#173B2B",
    fontSize: 11,
    fontWeight: "800" as const,
  },
};
