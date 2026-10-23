import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7F8F2",
  },
  content: {
    flexGrow: 1,
    padding: 24,
    gap: 20,
    justifyContent: "center",
  },
  eyebrow: {
    color: "#47734E",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.3,
  },
  hero: {
    alignItems: "flex-start",
    gap: 12,
  },
  heroIcon: {
    fontSize: 42,
  },
  title: {
    color: "#1F3525",
    fontSize: 29,
    fontWeight: "800",
    lineHeight: 36,
  },
  description: {
    color: "#657065",
    fontSize: 14,
    lineHeight: 22,
  },
  businessCard: {
    backgroundColor: "#FFFFFF",
    borderColor: "#DCE3D8",
    borderWidth: 1,
    borderRadius: 18,
    padding: 20,
    gap: 10,
  },
  label: {
    color: "#788074",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
  },
  businessName: {
    color: "#1F3525",
    fontSize: 22,
    fontWeight: "800",
  },
  divider: {
    height: 1,
    backgroundColor: "#E8ECE4",
    marginVertical: 6,
  },
  businessType: {
    color: "#304533",
    fontSize: 16,
    fontWeight: "600",
  },
  notice: {
    backgroundColor: "#EAF2E7",
    borderRadius: 14,
    padding: 16,
    gap: 6,
  },
  noticeTitle: {
    color: "#28613B",
    fontSize: 15,
    fontWeight: "800",
  },
  noticeDescription: {
    color: "#52684F",
    fontSize: 13,
    lineHeight: 20,
  },
  primaryButton: {
    backgroundColor: "#28613B",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },
  secondaryButton: {
    padding: 12,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#47734E",
    fontSize: 14,
    fontWeight: "700",
  },
  footer: {
    color: "#8A9185",
    fontSize: 10,
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: 0.6,
  },
});
