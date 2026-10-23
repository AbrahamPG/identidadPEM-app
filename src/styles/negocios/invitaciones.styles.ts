import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F7F8F2" },
  content: { flex: 1, padding: 24, gap: 16 },
  back: { color: "#47734E", fontSize: 15, fontWeight: "700" },
  eyebrow: {
    marginTop: 12,
    color: "#47734E",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.4,
  },
  title: { color: "#1F3525", fontSize: 29, fontWeight: "800" },
  description: { color: "#657065", fontSize: 14, lineHeight: 22 },
  card: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DCE3D8",
    borderRadius: 18,
    padding: 18,
    gap: 12,
  },
  label: { color: "#304533", fontSize: 14, fontWeight: "700" },
  input: {
    borderColor: "#DCE3D8",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 15,
  },
  primaryButton: {
    backgroundColor: "#28613B",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  primaryButtonText: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },
  emptyTitle: {
    color: "#304533",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 8,
  },
});
