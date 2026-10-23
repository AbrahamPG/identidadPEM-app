import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8F2",
  },
  content: {
    padding: 20,
    paddingBottom: 32,
    gap: 18,
    width: "100%",
    maxWidth: 900,
    alignSelf: "center",
  },
  header: {
    gap: 7,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.5,
    color: "#648064",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#173B2B",
  },
  description: {
    fontSize: 14,
    lineHeight: 21,
    color: "#68756A",
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAF0E5",
    borderRadius: 18,
    padding: 18,
    gap: 24,
  },
  summaryLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#617260",
  },
  summaryNumber: {
    marginTop: 5,
    fontSize: 25,
    fontWeight: "800",
    color: "#173B2B",
  },
  summaryDivider: {
    width: 1,
    height: 42,
    backgroundColor: "#CCD8C8",
  },
  card: {
    width: "100%",
    maxWidth: 620,
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E7EAE1",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#173B2B",
  },
  helper: {
    marginTop: 5,
    fontSize: 12,
    lineHeight: 18,
    color: "#788477",
  },
  label: {
    marginTop: 18,
    marginBottom: 8,
    fontSize: 13,
    fontWeight: "700",
    color: "#344C38",
  },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: "#DFE5DB",
    borderRadius: 12,
    paddingHorizontal: 13,
    paddingVertical: 12,
    fontSize: 14,
    color: "#173B2B",
    backgroundColor: "#FCFDFB",
  },
  textArea: {
    minHeight: 94,
  },
  primaryButton: {
    minHeight: 50,
    marginTop: 18,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#245536",
  },
  primaryButtonText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  buttonPressed: {
    opacity: 0.82,
  },
  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  listCount: {
    fontSize: 12,
    color: "#788477",
  },

  productCard: {
    width: "100%",
    minWidth: 0,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    gap: 12,
    padding: 15,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#E7EAE1",
    backgroundColor: "#FFFFFF",
  },

  productInfo: {
    flex: 1,
    minWidth: 180,
  },

  productName: {
    fontSize: 15,
    fontWeight: "800",
    color: "#173B2B",
    flexShrink: 1,
  },

  productPrice: {
    marginTop: 9,
    fontSize: 15,
    fontWeight: "800",
    color: "#245536",
  },

  statusBadge: {
    alignSelf: "flex-start",
    marginTop: 10,
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 6,
  },
  availableBadge: {
    backgroundColor: "#E6F3E6",
  },
  unavailableBadge: {
    backgroundColor: "#F0F1ED",
  },
  statusText: {
    fontSize: 10,
    fontWeight: "700",
  },
  availableText: {
    color: "#245536",
  },
  unavailableText: {
    color: "#737B70",
  },
  emptyState: {
    padding: 22,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#173B2B",
  },
  footerNote: {
    fontSize: 10,
    lineHeight: 16,
    textAlign: "center",
    color: "#899287",
  },
});
