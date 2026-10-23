import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F8F1",
  },
  businessPhoto: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },

  brandLeaf: {
    width: 28,
    height: 28,
  },

  hero: {
    backgroundColor: "#14532D",
    borderRadius: 28,
    padding: 24,
    paddingTop: 30,
    paddingBottom: 24,
    overflow: "hidden",
    position: "relative",
  },

  heroImage: {
    borderRadius: 28,
    resizeMode: "cover",
  },

  heroOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(8, 40, 24, 0.58)",
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 35,
    width: "100%",
    maxWidth: 900,
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 23,
  },
  brand: {
    color: "#183B29",
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: -0.9,
  },
  brandAccent: {
    color: "#329251",
  },
  location: {
    color: "#7B8279",
    fontSize: 11,
    marginTop: 5,
  },
  headerBadge: {
    width: 45,
    height: 45,
    borderRadius: 16,
    backgroundColor: "#E5EEDC",
    alignItems: "center",
    justifyContent: "center",
  },
  headerBadgeEmoji: {
    fontSize: 24,
  },

  heroEyebrow: {
    color: "#BCE4BF",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.7,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "900",
    letterSpacing: -0.8,
    marginTop: 13,
  },
  heroDescription: {
    color: "#D6E7D8",
    fontSize: 13,
    lineHeight: 20,
    marginTop: 10,
    maxWidth: 420,
  },
  searchButton: {
    minHeight: 53,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    marginTop: 22,
  },
  searchIcon: {
    color: "#326B42",
    fontSize: 27,
    marginRight: 10,
  },
  searchPlaceholder: {
    flex: 1,
    color: "#7B8279",
    fontSize: 13,
  },
  searchArrow: {
    color: "#23663D",
    fontSize: 20,
    fontWeight: "800",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 15,
  },
  sectionHeading: {
    flex: 1,
  },
  sectionTitle: {
    color: "#193B29",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: -0.3,
  },
  sectionSubtitle: {
    color: "#7B8279",
    fontSize: 12,
    marginTop: 5,
  },
  seeAll: {
    color: "#23663D",
    fontSize: 11,
    fontWeight: "900",
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  categoryCard: {
    width: "48%",
    flexGrow: 1,
    minWidth: 0,
    borderRadius: 17,
    padding: 8,
    paddingBottom: 12,
    backgroundColor: "#FFFFFF",
    position: "relative",
    overflow: "hidden",
  },

  categoryImage: {
    width: "100%",
    height: 88,
    borderRadius: 12,
  },

  categoryLabel: {
    color: "#193B29",
    fontSize: 13,
    fontWeight: "900",
    marginTop: 10,
    marginLeft: 3,
  },

  categoryArrow: {
    position: "absolute",
    right: 14,
    bottom: 10,
    color: "#326B42",
    fontSize: 18,
  },
  featuredHeader: {
    marginTop: 31,
  },
  featuredList: {
    gap: 13,
  },
  businessCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E7E9E0",
    borderRadius: 19,
    overflow: "hidden",
  },
  businessMain: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    padding: 12,
  },
  businessArtwork: {
    width: 83,
    height: 94,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  businessEmoji: {
    fontSize: 37,
  },
  businessInfo: {
    flex: 1,
    paddingVertical: 3,
  },
  businessCategory: {
    color: "#329251",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 0.9,
  },
  businessName: {
    color: "#193B29",
    fontSize: 15,
    fontWeight: "900",
    marginTop: 5,
  },
  businessDescription: {
    color: "#69736A",
    fontSize: 11,
    lineHeight: 16,
    marginTop: 4,
  },
  businessLocation: {
    color: "#798078",
    fontSize: 10,
    marginTop: 7,
  },
  businessArrow: {
    color: "#23663D",
    fontSize: 25,
    paddingHorizontal: 2,
  },
  favoriteButton: {
    borderTopWidth: 1,
    borderTopColor: "#EDF0E9",
    paddingHorizontal: 15,
    paddingVertical: 11,
  },
  favoriteText: {
    color: "#326B42",
    fontSize: 11,
    fontWeight: "800",
  },
  favoriteTextActive: {
    color: "#14532D",
  },
  noFeatured: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E7E9E0",
    borderRadius: 19,
    padding: 20,
    gap: 10,
  },
  noFeaturedTitle: {
    color: "#193B29",
    fontSize: 15,
    fontWeight: "900",
  },
  noFeaturedText: {
    color: "#7B8279",
    fontSize: 12,
    lineHeight: 19,
  },
  exploreBanner: {
    backgroundColor: "#E8F1E4",
    borderRadius: 23,
    padding: 21,
    alignItems: "center",
    marginTop: 29,
  },
  exploreBannerEmoji: {
    fontSize: 30,
    marginBottom: 9,
  },
  exploreBannerTitle: {
    color: "#193B29",
    fontSize: 18,
    fontWeight: "900",
    textAlign: "center",
  },
  exploreBannerDescription: {
    color: "#69736A",
    fontSize: 12,
    lineHeight: 19,
    textAlign: "center",
    marginTop: 8,
  },
  exploreButton: {
    backgroundColor: "#329251",
    borderRadius: 13,
    paddingHorizontal: 17,
    paddingVertical: 13,
    marginTop: 17,
  },
  exploreButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "900",
  },
  pressed: {
    opacity: 0.75,
  },
  footer: {
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#E5E8DF",
    marginTop: 34,
    paddingTop: 23,
  },
  footerBrand: {
    color: "#23663D",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 2,
  },
  footerText: {
    color: "#7B8279",
    fontSize: 11,
    marginTop: 7,
    textAlign: "center",
  },
  footerCopyright: {
    color: "#9AA094",
    fontSize: 10,
    marginTop: 12,
  },
});
