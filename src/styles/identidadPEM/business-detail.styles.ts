import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F8F1",
  },

  catalogCard: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
    marginTop: 20,
  },

  catalogHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },

  productRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
  },

  productEmojiBox: {
    width: 64,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
  },

  heroImage: {
    width: "100%",
    height: 260,
    borderRadius: 24,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  heroPhoto: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  heroEmoji: {
    fontSize: 100,
    textAlign: "center",
  },
  content: {
    flexGrow: 1,
    width: "100%",
    maxWidth: 800,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 35,
  },
  backButton: {
    alignSelf: "flex-start",
    paddingVertical: 12,
    paddingRight: 15,
    marginBottom: 10,
  },
  backText: {
    color: "#23663D",
    fontSize: 14,
    fontWeight: "800",
  },
  artwork: {
    height: 225,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  emoji: {
    fontSize: 83,
  },
  demoBadge: {
    position: "absolute",
    top: 14,
    right: 14,
    backgroundColor: "#FFFFFF",
    borderRadius: 9,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  demoBadgeText: {
    color: "#69736A",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 0.7,
  },
  details: {
    paddingTop: 23,
  },
  eyebrow: {
    color: "#329251",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.4,
  },
  title: {
    color: "#193B29",
    fontSize: 29,
    lineHeight: 35,
    fontWeight: "900",
    letterSpacing: -0.6,
    marginTop: 8,
  },
  description: {
    color: "#69736A",
    fontSize: 15,
    lineHeight: 23,
    marginTop: 9,
  },
  locationCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E7E9E0",
    borderRadius: 17,
    padding: 16,
    marginTop: 23,
  },
  locationEmoji: {
    fontSize: 24,
  },
  locationInfo: {
    flex: 1,
  },
  locationLabel: {
    color: "#7B8279",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1,
  },
  locationValue: {
    color: "#193B29",
    fontSize: 13,
    fontWeight: "800",
    marginTop: 5,
  },
  aboutCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E7E9E0",
    borderRadius: 18,
    padding: 18,
    marginTop: 15,
  },
  aboutTitle: {
    color: "#193B29",
    fontSize: 16,
    fontWeight: "900",
  },
  aboutText: {
    color: "#69736A",
    fontSize: 12,
    lineHeight: 20,
    marginTop: 9,
  },
  favoriteButton: {
    backgroundColor: "#14532D",
    borderRadius: 15,
    minHeight: 52,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
    paddingVertical: 15,
    marginTop: 22,
  },
  favoriteButtonActive: {
    backgroundColor: "#E8F1E4",
    borderWidth: 1,
    borderColor: "#D4E5D0",
  },
  favoriteButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
  },
  favoriteButtonTextActive: {
    color: "#14532D",
  },
  disabledButton: {
    opacity: 0.65,
  },
  pressed: {
    opacity: 0.75,
  },
  disclaimer: {
    color: "#8A9185",
    fontSize: 10,
    lineHeight: 16,
    textAlign: "center",
    marginTop: 15,
  },
  center: {
    flex: 1,
    padding: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  notFoundEmoji: {
    fontSize: 42,
    marginBottom: 12,
  },
  notFoundTitle: {
    color: "#193B29",
    fontSize: 19,
    fontWeight: "900",
    textAlign: "center",
  },
  notFoundText: {
    color: "#69736A",
    fontSize: 13,
    textAlign: "center",
    marginTop: 8,
  },
  primaryButton: {
    backgroundColor: "#14532D",
    borderRadius: 13,
    paddingHorizontal: 22,
    paddingVertical: 13,
    marginTop: 20,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
  },
});
