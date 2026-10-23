import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F7F8F2" },
  content: { flex: 1, padding: 24, gap: 14 },
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
  label: {
    color: "#304533",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 8,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderColor: "#DCE3D8",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 15,
  },
  option: {
    padding: 13,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DCE3D8",
    backgroundColor: "#FFFFFF",
  },
  optionSelected: {
    borderColor: "#47734E",
    backgroundColor: "#EAF2E7",
  },
  optionText: { color: "#657065", fontSize: 14 },
  optionTextSelected: { color: "#28613B", fontWeight: "700" },
  primaryButton: {
    backgroundColor: "#28613B",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
  },
  primaryButtonText: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },
  notice: { color: "#788074", fontSize: 12, lineHeight: 18 },
});
