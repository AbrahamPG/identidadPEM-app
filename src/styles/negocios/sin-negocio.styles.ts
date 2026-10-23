import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7F8F2",
  },
  content: {
    flexGrow: 1,
    padding: 24,
    justifyContent: "center",
    gap: 18,
  },
  header: {
    marginBottom: 12,
    gap: 10,
  },
  eyebrow: {
    color: "#47734E",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.5,
  },
  title: {
    color: "#1F3525",
    fontSize: 30,
    fontWeight: "800",
  },
  description: {
    color: "#657065",
    fontSize: 15,
    lineHeight: 23,
  },
  primaryCard: {
    backgroundColor: "#FFFFFF",
    borderColor: "#B8D1B7",
    borderWidth: 1,
    borderRadius: 20,
    padding: 22,
    gap: 10,
  },
  secondaryCard: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E0E5DC",
    borderWidth: 1,
    borderRadius: 20,
    padding: 22,
    gap: 10,
  },
  cardIcon: {
    fontSize: 30,
  },
  cardTitle: {
    color: "#1F3525",
    fontSize: 19,
    fontWeight: "700",
  },
  cardDescription: {
    color: "#657065",
    fontSize: 14,
    lineHeight: 21,
  },
  actionText: {
    color: "#28613B",
    fontSize: 15,
    fontWeight: "700",
    marginTop: 4,
  },
  logoutText: {
    color: "#657065",
    textAlign: "center",
    padding: 12,
  },
});
