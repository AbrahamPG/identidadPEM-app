import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7F8F4",
  },
  content: {
    flexGrow: 1,
    padding: 22,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  eyebrow: {
    color: "#245536",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.3,
  },
  organization: {
    color: "#667064",
    fontSize: 13,
    marginTop: 5,
  },
  changeButton: {
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 10,
    backgroundColor: "#EAF2E8",
  },
  changeButtonText: {
    color: "#245536",
    fontSize: 12,
    fontWeight: "700",
  },
  iconContainer: {
    width: 66,
    height: 66,
    borderRadius: 20,
    backgroundColor: "#EAF2E8",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  title: {
    color: "#17251A",
    fontSize: 28,
    fontWeight: "800",
  },
  description: {
    color: "#667064",
    fontSize: 15,
    lineHeight: 23,
    marginTop: 10,
    marginBottom: 24,
  },
  infoCard: {
    padding: 17,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E7EAE1",
    marginBottom: 12,
  },
  infoTitle: {
    color: "#17251A",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 6,
  },
  infoDescription: {
    color: "#667064",
    fontSize: 13,
    lineHeight: 20,
  },
  demoText: {
    color: "#7B8478",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 12,
  },
});
