import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#102D20",
  },
  webFallback: {
    flex: 1,
    backgroundColor: "#F8F8F1",
  },
  scrollView: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    backgroundColor: "#102D20",
  },
  backgroundImageContent: {
    resizeMode: "cover",
  },
  imageOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(5, 25, 15, 0.32)",
  },
  header: {
    paddingTop: 58,
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },
  brandMark: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.18)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  brandMarkText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
  },
  brandName: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  brandAccent: {
    color: "#C8E8A0",
  },
  skipText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
    padding: 8,
  },
  bottomContent: {
    paddingHorizontal: 26,
    paddingTop: 40,
    paddingBottom: 38,
  },
  eyebrow: {
    color: "#D1E8B5",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2,
    marginBottom: 14,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 38,
    lineHeight: 44,
    fontWeight: "800",
    letterSpacing: -0.8,
    marginBottom: 14,
    textShadowColor: "rgba(0,0,0,0.18)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  description: {
    color: "rgba(255,255,255,0.91)",
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 420,
  },
  pagination: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginTop: 28,
    marginBottom: 22,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: "rgba(255,255,255,0.48)",
  },
  activeDot: {
    width: 25,
    backgroundColor: "#FFFFFF",
  },
  button: {
    width: "100%",
    minHeight: 56,
    borderRadius: 17,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 19,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
  buttonText: {
    color: "#183B29",
    fontSize: 15,
    fontWeight: "800",
  },
  buttonArrow: {
    color: "#183B29",
    fontSize: 24,
    fontWeight: "600",
  },
  location: {
    marginTop: 20,
    textAlign: "center",
    color: "rgba(255,255,255,0.72)",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 2,
  },
});
